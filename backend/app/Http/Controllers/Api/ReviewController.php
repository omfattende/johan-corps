<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WorkshopReview;
use App\Models\PartReview;
use App\Models\StoreReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    // ==================== RESEÑAS DE TALLERES ====================
    
    /**
     * Crear reseña de taller
     */
    public function storeWorkshopReview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'workshop_id' => 'required|exists:workshops,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000',
            'tags' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Evitar duplicados
        $existing = WorkshopReview::where('user_id', $request->user()->id)
            ->where('workshop_id', $request->workshop_id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Ya dejaste una reseña para este taller'], 409);
        }

        $review = WorkshopReview::create([
            'user_id' => $request->user()->id,
            'workshop_id' => $request->workshop_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'tags' => $request->tags,
        ]);

        return response()->json($review->load('user'), 201);
    }

    /**
     * Listar reseñas de un taller
     */
    public function workshopReviews($workshopId)
    {
        $reviews = WorkshopReview::with('user')
            ->where('workshop_id', $workshopId)
            ->orderByDesc('created_at')
            ->paginate(10);

        return response()->json($reviews);
    }

    // ==================== RESEÑAS DE REFACCIONES ====================
    
    /**
     * Crear reseña de refacción
     */
    public function storePartReview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'part_id' => 'required|exists:parts,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $existing = PartReview::where('user_id', $request->user()->id)
            ->where('part_id', $request->part_id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Ya dejaste una reseña para esta refacción'], 409);
        }

        $review = PartReview::create([
            'user_id' => $request->user()->id,
            'part_id' => $request->part_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json($review->load('user'), 201);
    }

    /**
     * Listar reseñas de una refacción
     */
    public function partReviews($partId)
    {
        $reviews = PartReview::with('user')
            ->where('part_id', $partId)
            ->orderByDesc('created_at')
            ->paginate(10);

        return response()->json($reviews);
    }

    // ==================== RESEÑAS DE REFACCIONARIAS ====================
    
    /**
     * Crear reseña de refaccionaria
     */
    public function storeStoreReview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'store_id' => 'required|exists:stores,id',
            'rating' => 'required|integer|between:1,5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $existing = StoreReview::where('user_id', $request->user()->id)
            ->where('store_id', $request->store_id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Ya dejaste una reseña para esta refaccionaria'], 409);
        }

        $review = StoreReview::create([
            'user_id' => $request->user()->id,
            'store_id' => $request->store_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json($review->load('user'), 201);
    }

    /**
     * Listar reseñas de una refaccionaria
     */
    public function storeReviews($storeId)
    {
        $reviews = StoreReview::with('user')
            ->where('store_id', $storeId)
            ->orderByDesc('created_at')
            ->paginate(10);

        return response()->json($reviews);
    }
}
