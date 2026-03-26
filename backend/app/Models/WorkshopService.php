<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkshopService extends Model
{
    use HasFactory;

    protected $fillable = [
        'workshop_id',
        'name',
        'category',
        'description',
        'price_from',
        'price_to',
    ];

    protected $casts = [
        'price_from' => 'float',
        'price_to' => 'float',
    ];

    // Relaciones
    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }
}
