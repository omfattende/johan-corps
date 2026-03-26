<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Obtener todas las marcas disponibles
     */
    public function brands()
    {
        $brands = Vehicle::getBrands();
        return response()->json($brands);
    }

    /**
     * Obtener modelos por marca
     */
    public function models(Request $request)
    {
        if (!$request->brand) {
            return response()->json(['error' => 'Se requiere la marca'], 400);
        }

        $models = Vehicle::getModelsByBrand($request->brand);
        return response()->json($models);
    }

    /**
     * Obtener años por marca y modelo
     */
    public function years(Request $request)
    {
        if (!$request->brand || !$request->model) {
            return response()->json(['error' => 'Se requieren marca y modelo'], 400);
        }

        $years = Vehicle::getYearsByBrandAndModel($request->brand, $request->model);
        return response()->json($years);
    }

    /**
     * Obtener motores por marca, modelo y año
     */
    public function engines(Request $request)
    {
        if (!$request->brand || !$request->model || !$request->year) {
            return response()->json(['error' => 'Se requieren marca, modelo y año'], 400);
        }

        $engines = Vehicle::getEnginesByBrandModelYear(
            $request->brand, 
            $request->model, 
            $request->year
        );
        return response()->json($engines);
    }
}
