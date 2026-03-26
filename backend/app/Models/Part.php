<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    use HasFactory;

    protected $fillable = [
        'store_id',
        'name',
        'slug',
        'brand',
        'part_number',
        'description',
        'image',
        'price',
        'stock',
        'condition',
        'warranty',
        'category',
        'rating',
        'review_count',
        'active',
    ];

    protected $casts = [
        'price' => 'float',
        'rating' => 'float',
        'active' => 'boolean',
    ];

    // Categorías de piezas
    public const CATEGORY_MOTOR = 'motor';
    public const CATEGORY_TRANSMISION = 'transmision';
    public const CATEGORY_FRENOS = 'frenos';
    public const CATEGORY_SUSPENSION = 'suspension';
    public const CATEGORY_DIRECCION = 'direccion';
    public const CATEGORY_ELECTRICO = 'electrico';
    public const CATEGORY_CARROCERIA = 'carroceria';
    public const CATEGORY_ACCESORIOS = 'accesorios';
    public const CATEGORY_FILTROS = 'filtros';
    public const CATEGORY_ACEITES = 'aceites';
    public const CATEGORY_LLANTAS = 'llantas';
    public const CATEGORY_BATERIAS = 'baterias';
    public const CATEGORY_ESCAPE = 'escape';
    public const CATEGORY_ENFRIAMIENTO = 'enfriamiento';
    public const CATEGORY_INTERIOR = 'interior';

    public static function getCategories(): array
    {
        return [
            self::CATEGORY_MOTOR => 'Motor',
            self::CATEGORY_TRANSMISION => 'Transmisión',
            self::CATEGORY_FRENOS => 'Frenos',
            self::CATEGORY_SUSPENSION => 'Suspensión',
            self::CATEGORY_DIRECCION => 'Dirección',
            self::CATEGORY_ELECTRICO => 'Sistema Eléctrico',
            self::CATEGORY_CARROCERIA => 'Carrocería',
            self::CATEGORY_ACCESORIOS => 'Accesorios',
            self::CATEGORY_FILTROS => 'Filtros',
            self::CATEGORY_ACEITES => 'Aceites y Lubricantes',
            self::CATEGORY_LLANTAS => 'Llantas',
            self::CATEGORY_BATERIAS => 'Baterías',
            self::CATEGORY_ESCAPE => 'Sistema de Escape',
            self::CATEGORY_ENFRIAMIENTO => 'Sistema de Enfriamiento',
            self::CATEGORY_INTERIOR => 'Interior',
        ];
    }

    // Condiciones
    public const CONDITION_NEW = 'new';
    public const CONDITION_USED = 'used';
    public const CONDITION_REFURBISHED = 'refurbished';

    public static function getConditions(): array
    {
        return [
            self::CONDITION_NEW => 'Nuevo',
            self::CONDITION_USED => 'Usado',
            self::CONDITION_REFURBISHED => 'Reacondicionado',
        ];
    }

    // Relaciones
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class, 'part_vehicle')
                    ->withTimestamps();
    }

    public function reviews()
    {
        return $this->hasMany(PartReview::class);
    }

    public function images()
    {
        return $this->hasMany(PartImage::class)->orderBy('order');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByStore($query, $storeId)
    {
        return $query->where('store_id', $storeId);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    public function scopeByCondition($query, $condition)
    {
        return $query->where('condition', $condition);
    }

    public function scopePriceBetween($query, $min, $max)
    {
        return $query->whereBetween('price', [$min, $max]);
    }

    // Filtrar por compatibilidad con vehículo
    public function scopeCompatibleWith($query, $brand, $model, $year = null, $engine = null)
    {
        return $query->whereHas('vehicles', function ($q) use ($brand, $model, $year, $engine) {
            $q->where('brand', $brand)
              ->where('model', $model);
            
            if ($year) {
                $q->where('year', $year);
            }
            if ($engine) {
                $q->where('engine', $engine);
            }
        });
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

    // Precio formateado
    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->price, 2);
    }
}
