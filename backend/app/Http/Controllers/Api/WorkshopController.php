<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Workshop;
use Illuminate\Http\Request;

class WorkshopController extends Controller
{
    /**
     * Listado de talleres con filtros
     */
    public function index(Request $request)
    {
        $query = Workshop::with(['services', 'images'])
            ->where('active', true);

        // Búsqueda por nombre o servicio
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('services', function ($sq) use ($search) {
                      $sq->where('name', 'like', "%{$search}%")
                         ->orWhere('category', 'like', "%{$search}%");
                  });
            });
        }

        // Filtro por tipo de taller
        if ($request->type) {
            $query->where('type', $request->type);
        }

        // Filtro por categoría de servicio
        if ($request->service_category) {
            $query->whereHas('services', fn($q) =>
                $q->where('category', $request->service_category)
            );
        }

        // Filtro por calificación mínima
        if ($request->min_rating) {
            $query->where('rating', '>=', $request->min_rating);
        }

        // Filtro por ciudad
        if ($request->city) {
            $query->where('city', 'like', "%{$request->city}%");
        }

        // Ordenar por distancia si se proporcionan coordenadas
        if ($request->lat && $request->lng) {
            $lat = $request->lat;
            $lng = $request->lng;
            $query->selectRaw("*, ( 6371 * acos( cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( latitude ) ) ) ) AS distance", [$lat, $lng, $lat])
                  ->orderBy('distance');
        } else {
            // Por defecto ordenar por destacados primero, luego por rating
            $query->orderByRaw('CASE WHEN featured_until > datetime("now") THEN 0 ELSE 1 END')
                  ->orderByDesc('rating');
        }

        $workshops = $query->paginate(12);

        return response()->json($workshops);
    }

    /**
     * Detalle de un taller
     */
    public function show($id)
    {
        $workshop = Workshop::with([
            'services', 
            'images', 
            'reviews' => fn($q) => $q->with('user')->latest()->limit(10)
        ])->findOrFail($id);

        return response()->json($workshop);
    }

    /**
     * Obtener tipos de taller para filtros
     */
    public function getTypes()
    {
        return response()->json(Workshop::getTypes());
    }
}
