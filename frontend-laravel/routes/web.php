<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;


// Home / Landing Page - Shows all exams
Route::get('/', [ExamController::class, 'index'])
    ->name('home');

// Exam Generator Routes
Route::prefix('exam-generator')->group(function () {
    // Dashboard - List all exams
    Route::get('/', [ExamController::class, 'index'])
        ->name('exam.index');

    // Show generate form (GET) & Handle generation (POST)
    Route::get('/generate', [ExamController::class, 'generate'])
        ->name('exam.generate-form');
    Route::post('/generate', [ExamController::class, 'generate'])
        ->name('exam.generate-exam');

    // View generated exam - NOW USES QuestionController
    Route::get('/view/{id}', [QuestionController::class, 'index'])
        ->name('exam.view');

    // Export generated exam (PDF / Word / etc.)
    Route::get('/export/{examId}', [ExamController::class, 'export'])
        ->name('exam.export');
});

// Question Management Routes
Route::prefix('questions')->group(function () {
    // Update a question
    Route::put('/{id}', [QuestionController::class, 'update'])
        ->name('question.update');

    // Delete a question
    Route::delete('/{id}', [QuestionController::class, 'destroy'])
        ->name('question.destroy');
});
