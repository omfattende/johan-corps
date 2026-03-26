<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
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
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'rating' => 'float',
        'active' => 'boolean',
        'verified' => 'boolean',
        'schedule' => 'json',
    ];

    // Tipos de refaccionaria
    public const TYPE_REFACCIONARIA = 'refaccionaria';
    public const TYPE_AGENCIA = 'agencia';
    public const TYPE_ESPECIALIZADA = 'especializada';
    public const TYPE_GENERIC = 'generic';

    public static function getTypes(): array
    {
        return [
            self::TYPE_REFACCIONARIA => 'Refaccionaria',
            self::TYPE_AGENCIA => 'Agencia',
            self::TYPE_ESPECIALIZADA => 'Especializada',
            self::TYPE_GENERIC => 'Genérica',
        ];
    }

    // Relaciones
    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function parts()
    {
        return $this->hasMany(Part::class);
    }

    public function reviews()
    {
        return $this->hasMany(StoreReview::class);
    }

    public function images()
    {
        return $this->hasMany(StoreImage::class)->orderBy('order');
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

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city', 'like', "%{$city}%");
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
