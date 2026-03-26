<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Part;
use Illuminate\Http\Request;

class PartController extends Controller
{
    /**
     * Listado de refacciones con filtros
     */
    public function index(Request $request)
    {
        $query = Part::with(['store', 'vehicles'])
            ->where('active', true);

        // Filtro por compatibilidad con vehículo
        if ($request->brand || $request->model || $request->year || $request->engine) {
            $query->whereHas('vehicles', function ($q) use ($request) {
                if ($request->brand) {
                    $q->where('brand', $request->brand);
                }
                if ($request->model) {
                    $q->where('model', $request->model);
                }
                if ($request->year) {
                    $q->where('year', $request->year);
                }
                if ($request->engine) {
                    $q->where('engine', $request->engine);
                }
            });
        }

        // Filtro por categoría
        if ($request->category) {
            $query->where('category', $request->category);
        }

        // Filtro por refaccionaria
        if ($request->store_id) {
            $query->where('store_id', $request->store_id);
        }

        // Filtro por condición (nuevo/usado)
        if ($request->condition) {
            $query->where('condition', $request->condition);
        }

        // Filtro por rango de precio
        if ($request->price_min) {
            $query->where('price', '>=', $request->price_min);
        }
        if ($request->price_max) {
            $query->where('price', '<=', $request->price_max);
        }

        // Búsqueda por nombre, marca o número de parte
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('brand', 'like', "%{$search}%")
                  ->orWhere('part_number', 'like', "%{$search}%")
                  ->orWhereHas('store', function ($sq) use ($search) {
                      $sq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Opciones de ordenamiento
        $sort = $request->sort ?? 'rating';
        switch ($sort) {
            case 'price_asc':
                $query->orderBy('price');
                break;
            case 'price_desc':
                $query->orderByDesc('price');
                break;
            case 'newest':
                $query->orderByDesc('created_at');
                break;
            default:
                $query->orderByDesc('rating');
        }

        $parts = $query->paginate(12);

        return response()->json($parts);
    }

    /**
     * Detalle de una refacción
     */
    public function show($id)
    {
        $part = Part::with(['store', 'vehicles', 'images'])->findOrFail($id);
        return response()->json($part);
    }

    /**
     * Obtener alternativas para una refacción
     */
    public function alternatives($id)
    {
        $part = Part::with('vehicles')->findOrFail($id);
        $vehicleIds = $part->vehicles->pluck('id');

        $alternatives = Part::with(['store', 'vehicles'])
            ->where('id', '!=', $id)
            ->where('active', true)
            ->where('category', $part->category)
            ->whereHas('vehicles', fn($q) => $q->whereIn('id', $vehicleIds))
            ->limit(4)
            ->get();

        return response()->json($alternatives);
    }

    /**
     * Obtener categorías de refacciones
     */
    public function getCategories()
    {
        return response()->json(Part::getCategories());
    }
}
