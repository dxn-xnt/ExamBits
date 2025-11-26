<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ExamController;
use App\Http\Controllers\API\AIController;

// Exam management
Route::get('/exams', [ExamController::class, 'index']);
Route::post('/exams', [ExamController::class, 'store']);
Route::get('/exams/{id}', [ExamController::class, 'show']);
Route::delete('/exams/{id}', [ExamController::class, 'destroy']);

// Exam sharing & taking (public routes)
Route::get('/exam/{shareCode}', [ExamController::class, 'getByShareCode']);
Route::post('/exam/{shareCode}/submit', [ExamController::class, 'submitAttempt']);
Route::get('/exam/{shareCode}/results/{attemptId}', [ExamController::class, 'getResults']);

// AI endpoints
Route::post('/ai/upload-pdf', [AIController::class, 'uploadPdfAndGenerate']);
Route::post('/ai/generate-text', [AIController::class, 'generateFromText']);
Route::post('/ai/evaluate', [AIController::class, 'evaluateDifficulty']);
Route::post('/ai/improve', [AIController::class, 'improveQuestion']);
