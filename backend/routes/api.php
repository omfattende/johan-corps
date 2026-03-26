<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PartController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\WorkshopController;
use Illuminate\Support\Facades\Route;

// ==================== TALLERES ====================
Route::prefix('workshops')->group(function () {
    Route::get('/', [WorkshopController::class, 'index']);
    Route::get('/types', [WorkshopController::class, 'getTypes']);
    Route::get('/{id}', [WorkshopController::class, 'show']);
    Route::get('/{id}/reviews', [ReviewController::class, 'workshopReviews']);
});

// ==================== REFACCIONARIAS ====================
Route::prefix('stores')->group(function () {
    Route::get('/', [StoreController::class, 'index']);
    Route::get('/types', [StoreController::class, 'getTypes']);
    Route::get('/{id}', [StoreController::class, 'show']);
    Route::get('/{id}/reviews', [ReviewController::class, 'storeReviews']);
});

// ==================== REFACCIONES ====================
Route::prefix('parts')->group(function () {
    Route::get('/', [PartController::class, 'index']);
    Route::get('/categories', [PartController::class, 'getCategories']);
    Route::get('/{id}', [PartController::class, 'show']);
    Route::get('/{id}/reviews', [ReviewController::class, 'partReviews']);
    Route::get('/{id}/alternatives', [PartController::class, 'alternatives']);
});

// ==================== VEHÍCULOS ====================
Route::prefix('vehicles')->group(function () {
    Route::get('/brands', [VehicleController::class, 'brands']);
    Route::get('/models', [VehicleController::class, 'models']);
    Route::get('/years', [VehicleController::class, 'years']);
    Route::get('/engines', [VehicleController::class, 'engines']);
});

// ==================== AUTENTICACIÓN ====================
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// ==================== RUTAS PROTEGIDAS ====================
Route::middleware('auth:sanctum')->group(function () {
    // Reseñas de talleres
    Route::post('/workshop-reviews', [ReviewController::class, 'storeWorkshopReview']);
    
    // Reseñas de refacciones
    Route::post('/part-reviews', [ReviewController::class, 'storePartReview']);
    
    // Reseñas de refaccionarias
    Route::post('/store-reviews', [ReviewController::class, 'storeStoreReview']);
});
