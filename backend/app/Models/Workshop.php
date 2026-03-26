<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workshop extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'name',
        'slug',
        'address',
        'city',
        'state',
        'latitude',
        'longitude',
        'phone',
        'whatsapp',
        'email',
        'description',
        'schedule',
        'type',
        'rating',
        'review_count',
        'logo',
        'active',
        'verified',
        'featured_until',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'rating' => 'float',
        'active' => 'boolean',
        'verified' => 'boolean',
        'featured_until' => 'datetime',
        'schedule' => 'json',
    ];

    // Tipos de taller
    public const TYPE_MECANICO = 'mecanico';
    public const TYPE_ELECTRICO = 'electrico';
    public const TYPE_HOJALATERIA = 'hojalateria';
    public const TYPE_PINTURA = 'pintura';
    public const TYPE_GENERAL = 'general';
    public const TYPE_ESPECIALIZADO = 'especializado';
    public const TYPE_LLANTERIA = 'llanteria';
    public const TYPE_ACEITE = 'aceite';

    public static function getTypes(): array
    {
        return [
            self::TYPE_MECANICO => 'Mecánico',
            self::TYPE_ELECTRICO => 'Eléctrico',
            self::TYPE_HOJALATERIA => 'Hojalatería',
            self::TYPE_PINTURA => 'Pintura',
            self::TYPE_GENERAL => 'General',
            self::TYPE_ESPECIALIZADO => 'Especializado',
            self::TYPE_LLANTERIA => 'Llantería',
            self::TYPE_ACEITE => 'Cambio de Aceite',
        ];
    }

    // Relaciones
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function services()
    {
        return $this->hasMany(WorkshopService::class);
    }

    public function reviews()
    {
        return $this->hasMany(WorkshopReview::class);
    }

    public function images()
    {
        return $this->hasMany(WorkshopImage::class)->orderBy('order');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeVerified($query)
    {
        return $query->where('verified', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured_until', '>', now());
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city', 'like', "%{$city}%");
    }

    public function scopeByService($query, $service)
    {
        return $query->whereHas('services', function ($q) use ($service) {
            $q->where('name', 'like', "%{$service}%")
              ->orWhere('category', 'like', "%{$service}%");
        });
    }

    // Calcular distancia desde coordenadas (en km)
    public function scopeNearby($query, $lat, $lng, $radius = 10)
    {
        return $query->selectRaw(
            "*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance",
            [$lat, $lng, $lat]
        )
        ->having('distance', '<=', $radius)
        ->orderBy('distance');
    }

    // Actualizar rating promedio
    public function updateRating(): void
    {
        $avg = $this->reviews()->avg('rating');
        $count = $this->reviews()->count();
        $this->update([
            'rating' => round($avg, 2),
            'review_count' => $count,
        ]);
    }
}
