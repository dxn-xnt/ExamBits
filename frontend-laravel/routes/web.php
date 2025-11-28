<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExamController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Home / Landing Page - Shows all exams
Route::get('/', function () {
    return Inertia::render('landing-page', []);
})->name('home');

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

    // View generated exam
    Route::get('/view/{id}', [ExamController::class, 'view'])
        ->name('exam.view');

    // Export generated exam (PDF / Word / etc.)
    Route::get('/export/{examId}', [ExamController::class, 'export'])
        ->name('exam.export');
});
