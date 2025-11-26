<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Question;
use App\Models\ExamAttempt;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    public function index()
    {
        $exams = Exam::withCount('questions', 'attempts')
            ->latest()
            ->get();

        return response()->json($exams);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'settings' => 'nullable|array',
            'questions' => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.type' => 'required|in:multiple-choice,true-false,short-answer',
            'questions.*.options' => 'nullable|array',
            'questions.*.correct_answer' => 'required|string',
            'questions.*.explanation' => 'nullable|string',
            'questions.*.difficulty' => 'nullable|string',
            'questions.*.ai_generated' => 'nullable|boolean',
        ]);

        $exam = Exam::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'settings' => $validated['settings'] ?? [],
            'total_questions' => count($validated['questions'])
        ]);

        foreach ($validated['questions'] as $index => $questionData) {
            Question::create([
                'exam_id' => $exam->id,
                'question_text' => $questionData['question_text'],
                'type' => $questionData['type'],
                'options' => $questionData['options'] ?? [],
                'correct_answer' => $questionData['correct_answer'],
                'explanation' => $questionData['explanation'] ?? null,
                'difficulty' => $questionData['difficulty'] ?? 'medium',
                'ai_generated' => $questionData['ai_generated'] ?? false,
                'order' => $index + 1
            ]);
        }

        return response()->json([
            'success' => true,
            'exam' => $exam->load('questions'),
            'share_link' => url("/exam/{$exam->share_code}"),
            'share_code' => $exam->share_code
        ], 201);
    }

    public function show($id)
    {
        $exam = Exam::with('questions')->findOrFail($id);
        return response()->json($exam);
    }

    public function getByShareCode($shareCode)
    {
        $exam = Exam::where('share_code', $shareCode)
            ->with('questions')
            ->firstOrFail();

        // Don't expose correct answers when fetching for taking exam
        $exam->questions->transform(function ($question) {
            return [
                'id' => $question->id,
                'question_text' => $question->question_text,
                'type' => $question->type,
                'options' => $question->options,
                'order' => $question->order
            ];
        });

        return response()->json($exam);
    }

    public function submitAttempt(Request $request, $shareCode)
    {
        $exam = Exam::where('share_code', $shareCode)->firstOrFail();

        $validated = $request->validate([
            'taker_name' => 'nullable|string|max:255',
            'answers' => 'required|array',
            'started_at' => 'nullable|date',
        ]);

        // Calculate score
        $questions = $exam->questions;
        $correctCount = 0;

        foreach ($questions as $question) {
            $userAnswer = $validated['answers'][$question->id] ?? null;
            if ($userAnswer === $question->correct_answer) {
                $correctCount++;
            }
        }

        $attempt = ExamAttempt::create([
            'exam_id' => $exam->id,
            'taker_name' => $validated['taker_name'] ?? 'Anonymous',
            'answers' => $validated['answers'],
            'score' => $correctCount,
            'total_points' => $questions->count(),
            'started_at' => $validated['started_at'] ?? now(),
            'submitted_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'score' => $correctCount,
            'total' => $questions->count(),
            'percentage' => round(($correctCount / $questions->count()) * 100, 2),
            'attempt_id' => $attempt->id
        ]);
    }

    public function getResults($shareCode, $attemptId)
    {
        $exam = Exam::where('share_code', $shareCode)->firstOrFail();
        $attempt = ExamAttempt::where('exam_id', $exam->id)
            ->where('id', $attemptId)
            ->firstOrFail();

        $questions = $exam->questions;
        $results = [];

        foreach ($questions as $question) {
            $userAnswer = $attempt->answers[$question->id] ?? null;
            $isCorrect = $userAnswer === $question->correct_answer;

            $results[] = [
                'question' => $question->question_text,
                'type' => $question->type,
                'options' => $question->options,
                'user_answer' => $userAnswer,
                'correct_answer' => $question->correct_answer,
                'is_correct' => $isCorrect,
                'explanation' => $question->explanation
            ];
        }

        return response()->json([
            'attempt' => $attempt,
            'results' => $results
        ]);
    }

    public function destroy($id)
    {
        $exam = Exam::findOrFail($id);
        $exam->delete();

        return response()->json(['success' => true, 'message' => 'Exam deleted successfully']);
    }
}
