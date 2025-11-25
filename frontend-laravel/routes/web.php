<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ExamController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Home / Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome', []);
})->name('home');

// Exam Generator - input form
Route::get('/exam-generator', [ExamController::class, 'index'])
    ->name('exam.index');

// Submit exam generation request (AI generates exam)
Route::post('/exam-generator/generate', [ExamController::class, 'generate'])
    ->name('exam.generate');

// View generated exam before export
Route::get('/exam-generator/view/{examId}', [ExamController::class, 'view'])
    ->name('exam.view');

// Export generated exam (PDF / Word / etc.)
Route::get('/exam-generator/export/{examId}', [ExamController::class, 'export'])
    ->name('exam.export');

