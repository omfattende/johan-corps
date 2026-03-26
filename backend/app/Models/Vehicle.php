<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'model',
        'year',
        'engine',
        'version',
        'transmission',
    ];

    // Relaciones
    public function parts()
    {
        return $this->belongsToMany(Part::class, 'part_vehicle')
                    ->withTimestamps();
    }

    // Scopes para filtros
    public function scopeByBrand($query, $brand)
    {
        return $query->where('brand', $brand);
    }

    public function scopeByModel($query, $model)
    {
        return $query->where('model', $model);
    }

    public function scopeByYear($query, $year)
    {
        return $query->where('year', $year);
    }

    public function scopeByEngine($query, $engine)
    {
        return $query->where('engine', $engine);
    }

    // Obtener marcas únicas
    public static function getBrands(): array
    {
        return self::distinct()->orderBy('brand')->pluck('brand')->toArray();
    }

    // Obtener modelos por marca
    public static function getModelsByBrand(string $brand): array
    {
        return self::where('brand', $brand)
                   ->distinct()
                   ->orderBy('model')
                   ->pluck('model')
                   ->toArray();
    }

    // Obtener años por marca y modelo
    public static function getYearsByBrandAndModel(string $brand, string $model): array
    {
        return self::where('brand', $brand)
                   ->where('model', $model)
                   ->distinct()
                   ->orderBy('year', 'desc')
                   ->pluck('year')
                   ->toArray();
    }

    // Obtener motores por marca, modelo y año
    public static function getEnginesByBrandModelYear(string $brand, string $model, int $year): array
    {
        return self::where('brand', $brand)
                   ->where('model', $model)
                   ->where('year', $year)
                   ->distinct()
                   ->orderBy('engine')
                   ->pluck('engine')
                   ->toArray();
    }

    // Nombre completo del vehículo
    public function getFullNameAttribute(): string
    {
        return "{$this->brand} {$this->model} {$this->year} {$this->engine}";
    }
}
