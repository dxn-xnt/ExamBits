<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIController extends Controller
{
    private $flaskUrl;

    public function __construct()
    {
        $this->flaskUrl = env('FLASK_AI_URL', 'http://localhost:5000');
    }

    public function uploadPdfAndGenerate(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf|max:10240',
            'num_questions' => 'integer|min:1|max:50',
            'difficulty' => 'in:easy,medium,hard',
            'type' => 'in:multiple-choice,true-false,short-answer'
        ]);

        try {
            // Step 1: Extract PDF text
            $pdfResponse = Http::timeout(30)->attach(
                'file',
                file_get_contents($request->file('file')->path()),
                $request->file('file')->getClientOriginalName()
            )->post("{$this->flaskUrl}/api/ai/extract-pdf");

            if (!$pdfResponse->successful()) {
                Log::error('PDF extraction failed', ['response' => $pdfResponse->json()]);
                return response()->json([
                    'error' => 'PDF extraction failed',
                    'details' => $pdfResponse->json()
                ], 500);
            }

            $content = $pdfResponse->json()['content'];

            // Step 2: Generate questions
            $questionsResponse = Http::timeout(60)->post("{$this->flaskUrl}/api/ai/generate-questions", [
                'content' => $content,
                'num_questions' => $request->num_questions ?? 5,
                'difficulty' => $request->difficulty ?? 'medium',
                'type' => $request->type ?? 'multiple-choice'
            ]);

            if (!$questionsResponse->successful()) {
                Log::error('Question generation failed', ['response' => $questionsResponse->json()]);
                return response()->json([
                    'error' => 'Question generation failed',
                    'details' => $questionsResponse->json()
                ], 500);
            }

            $data = $questionsResponse->json();

            return response()->json([
                'success' => true,
                'questions' => $data['questions'],
                'count' => $data['count'] ?? count($data['questions']),
                'source_pages' => $pdfResponse->json()['pages'] ?? null
            ]);

        } catch (\Exception $e) {
            Log::error('AI processing failed', ['error' => $e->getMessage()]);
            return response()->json([
                'error' => 'AI processing failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function generateFromText(Request $request)
    {
        $request->validate([
            'content' => 'required|string|min:50',
            'num_questions' => 'integer|min:1|max:50',
            'difficulty' => 'in:easy,medium,hard',
            'type' => 'in:multiple-choice,true-false,short-answer'
        ]);

        try {
            $response = Http::timeout(60)->post("{$this->flaskUrl}/api/ai/generate-questions", [
                'content' => $request->content,
                'num_questions' => $request->num_questions ?? 5,
                'difficulty' => $request->difficulty ?? 'medium',
                'type' => $request->type ?? 'multiple-choice'
            ]);

            if (!$response->successful()) {
                return response()->json([
                    'error' => 'Question generation failed',
                    'details' => $response->json()
                ], 500);
            }

            return response()->json($response->json());

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'AI processing failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function evaluateDifficulty(Request $request)
    {
        $request->validate([
            'question' => 'required|string',
            'options' => 'nullable|array'
        ]);

        try {
            $response = Http::post("{$this->flaskUrl}/api/ai/evaluate-difficulty", [
                'question' => $request->question,
                'options' => $request->options ?? []
            ]);

            return response()->json($response->json());

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Evaluation failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function improveQuestion(Request $request)
    {
        $request->validate([
            'question' => 'required|string'
        ]);

        try {
            $response = Http::post("{$this->flaskUrl}/api/ai/improve-question", [
                'question' => $request->question
            ]);

            return response()->json($response->json());

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Improvement failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
