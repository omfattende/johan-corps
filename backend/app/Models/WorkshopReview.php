<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkshopReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'workshop_id',
        'rating',
        'comment',
        'tags',
    ];

    protected $casts = [
        'rating' => 'integer',
        'tags' => 'json',
    ];

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }

    // Boot para actualizar rating del taller
    protected static function boot()
    {
        parent::boot();

        static::created(function ($review) {
            $review->workshop->updateRating();
        });

        static::updated(function ($review) {
            $review->workshop->updateRating();
        });

        static::deleted(function ($review) {
            $review->workshop->updateRating();
        });
    }
}
