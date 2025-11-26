<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'question_text',
        'type',
        'options',
        'correct_answer',
        'explanation',
        'difficulty',
        'ai_generated',
        'order'
    ];

    protected $casts = [
        'options' => 'array',
        'ai_generated' => 'boolean'
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
