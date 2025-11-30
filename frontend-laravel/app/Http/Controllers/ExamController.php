<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ExamController extends Controller
{
    private $flaskUrl;

    public function __construct()
    {
        $this->flaskUrl = env('FLASK_AI_URL', 'http://localhost:5000');
    }

    public function index(): \Inertia\Response
    {
        $exams = Exam::orderBy('created_at', 'desc')->get();

        return Inertia::render('landing-page', [
            'exams' => $exams
        ]);
    }

    public function generate(Request $request)
    {
        if ($request->isMethod('get')) {
            return Inertia::render('form/generate-exam-form', []);
        }

        // Increase PHP execution time for AI processing
        set_time_limit(180); // 3 minutes
        ini_set('max_execution_time', '180');

        // Handle POST - Generate exam
        $request->validate([
            'file' => 'required|mimes:pdf|max:10240',
            'difficulty' => 'required|in:easy,moderate,hard',
            'question_types' => 'required|array|min:1',
            'question_types.*' => 'in:multipleChoice,trueOrFalse,identification',
            'num_questions' => 'integer|min:1|max:50'
        ]);

        try {
            // Map frontend difficulty to backend
            $difficultyMap = [
                'easy' => 'easy',
                'moderate' => 'medium',
                'hard' => 'hard'
            ];

            // Map frontend question types to backend
            $typeMap = [
                'multipleChoice' => 'multiple-choice',
                'trueOrFalse' => 'true-false',
                'identification' => 'identification'  // Changed from 'short-answer'
            ];

            $selectedTypes = array_map(function($type) use ($typeMap) {
                return $typeMap[$type] ?? 'multiple-choice';
            }, $request->question_types);

            // ===== STEP 1: Extract PDF content =====
            Log::info('Step 1: Extracting PDF content');

            $pdfResponse = Http::timeout(60)
                ->attach(
                    'file',
                    file_get_contents($request->file('file')->path()),
                    $request->file('file')->getClientOriginalName()
                )
                ->post("{$this->flaskUrl}/api/ai/extract-pdf");

            if (!$pdfResponse->successful()) {
                Log::error('PDF extraction failed', ['response' => $pdfResponse->json()]);
                return back()->with('error', 'Failed to extract PDF content. Please try again.');
            }

            $pdfData = $pdfResponse->json();
            $content = $pdfData['content'];

            Log::info('PDF extracted', [
                'pages' => $pdfData['pages'],
                'chars' => strlen($content)
            ]);

            // ===== STEP 2: Analyze topic from content =====
            Log::info('Step 2: Analyzing main topic from content');

            $topicResponse = Http::timeout(60)
                ->post("{$this->flaskUrl}/api/ai/analyze-topic", [
                    'content' => $content
                ]);

            if (!$topicResponse->successful()) {
                Log::error('Topic analysis failed', ['response' => $topicResponse->json()]);
                return back()->with('error', 'Failed to analyze content topic. Please try again.');
            }

            $topicData = $topicResponse->json();
            $topic = $topicData['topic'];

            Log::info('Topic extracted', ['topic' => $topic]);

            // ===== STEP 3: Generate questions from TOPIC =====
            Log::info('Step 3: Generating questions from topic');

            $allQuestions = [];
            $questionsPerType = ceil(($request->num_questions ?? 10) / count($selectedTypes));

            foreach ($selectedTypes as $type) {
                Log::info("Generating {$questionsPerType} {$type} questions");

                // Generate questions one at a time to stay within token limits
                $successCount = 0;
                $attempts = 0;
                $maxAttempts = $questionsPerType * 3; // Allow up to 3x retries

                while ($successCount < $questionsPerType && $attempts < $maxAttempts) {
                    $attempts++;

                    try {
                        $questionsResponse = Http::timeout(90)
                            ->post("{$this->flaskUrl}/api/ai/generate-questions", [
                                'topic' => $topic,
                                'num_questions' => 1,
                                'difficulty' => $difficultyMap[$request->difficulty],
                                'type' => $type
                            ]);

                        if ($questionsResponse->successful()) {
                            $data = $questionsResponse->json();
                            if (isset($data['questions']) && count($data['questions']) > 0) {
                                // Add the type to each question for proper identification
                                foreach ($data['questions'] as &$question) {
                                    $question['type'] = $type;
                                }
                                $allQuestions = array_merge($allQuestions, $data['questions']);
                                $successCount++;
                                Log::info("Generated {$type} question {$successCount} of {$questionsPerType} (attempt {$attempts})");
                            } else {
                                Log::warning("Question generation returned empty - attempt {$attempts}");
                            }
                        } else {
                            Log::warning("Question generation failed - attempt {$attempts}");
                        }

                        // Small delay to avoid rate limits
                        usleep(500000); // 0.5 second delay

                    } catch (\Exception $e) {
                        Log::warning("Failed to generate question on attempt {$attempts}: " . $e->getMessage());
                    }
                }
            }

            if (empty($allQuestions)) {
                return back()->with('error', 'Failed to generate questions. Please try again.');
            }

            Log::info('Total questions generated', ['count' => count($allQuestions)]);

            // ===== STEP 4: Save to database =====
            $exam = Exam::create([
                'title' => 'Generated Exam - ' . now()->format('Y-m-d H:i'),
                'description' => "Generated from {$request->file('file')->getClientOriginalName()}",
                'total_questions' => count($allQuestions),
                'settings' => [
                    'difficulty' => $request->difficulty,
                    'question_types' => $request->question_types,
                    'source_file' => $request->file('file')->getClientOriginalName(),
                    'source_pages' => $pdfData['pages'] ?? null,
                    'extracted_topic' => $topic
                ]
            ]);

            // Save questions with their original type
            foreach ($allQuestions as $index => $q) {
                Question::create([
                    'exam_id' => $exam->id,
                    'question_text' => $q['question'],
                    'question_type' => $q['type'] ?? $this->mapQuestionType($q),
                    'options' => json_encode($q['options'] ?? []),
                    'correct_answer' => $q['correct_answer'],
                    'explanation' => null,  // No explanation stored
                    'order' => $index + 1,
                    'points' => 1
                ]);
            }

            Log::info('Exam saved successfully', ['exam_id' => $exam->id]);

            return redirect()->route('exam.view', ['id' => $exam->id])
                ->with('success', "Successfully generated {$exam->total_questions} questions from topic: {$topic}");

        } catch (\Exception $e) {
            Log::error('Exam generation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'Failed to generate exam: ' . $e->getMessage());
        }
    }

    public function view($id)
    {
        $exam = Exam::with('questions')->findOrFail($id);

        // Transform questions for your components
        $transformedQuestions = [
            'multiple' => [],
            'trueOrFalse' => [],
            'identification' => []
        ];

        foreach ($exam->questions as $question) {
            $options = is_string($question->options)
                ? json_decode($question->options, true)
                : $question->options;

            if ($question->question_type === 'multiple-choice') {
                $transformedQuestions['multiple'][] = [
                    'question' => $question->question_text,
                    'choices' => $options ?? [],
                    'answer' => $question->correct_answer
                ];
            } elseif ($question->question_type === 'true-false') {
                $transformedQuestions['trueOrFalse'][] = [
                    'question' => $question->question_text,
                    'answer' => $question->correct_answer
                ];
            } else {  // identification
                $transformedQuestions['identification'][] = [
                    'question' => $question->question_text,
                    'answer' => $question->correct_answer
                ];
            }
        }

        return Inertia::render('exam-view', [
            'exam' => [
                'title' => $exam->title,
                'topics' => $exam->settings['question_types'] ?? [],
                'difficulty' => ucfirst($exam->settings['difficulty'] ?? 'N/A'),
                'extracted_topic' => $exam->settings['extracted_topic'] ?? null
            ],
            'questions' => $transformedQuestions
        ]);
    }

    public function export($examId)
    {
        $exam = Exam::with('questions')->findOrFail($examId);

        // TODO: Implement export functionality
        return response()->json([
            'message' => 'Export functionality coming soon',
            'exam' => $exam
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function edit(Exam $exam)
    {
        //
    }

    public function update(Request $request, Exam $exam)
    {
        //
    }

    public function destroy(Exam $exam)
    {
        //
    }

    private function mapQuestionType($question)
    {
        // Check if it has options
        if (isset($question['options']) && is_array($question['options'])) {
            $optionCount = count($question['options']);

            // True/False: has exactly 2 options with "True" and "False"
            if ($optionCount === 2) {
                $options = array_map('strtolower', $question['options']);
                if (in_array('true', $options) && in_array('false', $options)) {
                    return 'true-false';
                }
            }

            // Multiple Choice: has more than 2 options
            if ($optionCount > 2) {
                return 'multiple-choice';
            }
        }

        // Identification: no options or empty options array
        return 'identification';
    }
}
