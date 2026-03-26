<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    /**
     * Listado de refaccionarias con filtros
     */
    public function index(Request $request)
    {
        $query = Store::with(['images'])
            ->where('active', true);

        // Búsqueda por nombre
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filtro por tipo
        if ($request->type) {
            $query->where('type', $request->type);
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
            $query->orderByDesc('rating');
        }

        $stores = $query->paginate(12);

        return response()->json($stores);
    }

    /**
     * Detalle de una refaccionaria
     */
    public function show($id)
    {
        $store = Store::with([
            'images',
            'parts' => fn($q) => $q->where('active', true)->limit(20),
            'reviews' => fn($q) => $q->with('user')->latest()->limit(10)
        ])->findOrFail($id);

        return response()->json($store);
    }

    /**
     * Obtener tipos de refaccionarias para filtros
     */
    public function getTypes()
    {
        return response()->json(Store::getTypes());
    }
}
