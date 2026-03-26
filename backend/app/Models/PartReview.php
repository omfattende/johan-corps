<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PartReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'part_id',
        'rating',
        'comment',
        'verified_purchase',
    ];

    protected $casts = [
        'rating' => 'integer',
        'verified_purchase' => 'boolean',
    ];

    // Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function part()
    {
        return $this->belongsTo(Part::class);
    }

    // Boot para actualizar rating de la pieza
    protected static function boot()
    {
        parent::boot();

        static::created(function ($review) {
            $review->part->updateRating();
        });

        static::updated(function ($review) {
            $review->part->updateRating();
        });

        static::deleted(function ($review) {
            $review->part->updateRating();
        });
    }
}
