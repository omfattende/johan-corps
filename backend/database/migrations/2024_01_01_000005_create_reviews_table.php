<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Reseñas de talleres
        Schema::create('workshop_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('workshop_id')->constrained()->cascadeOnDelete();
            $table->tinyInteger('rating'); // 1-5 estrellas
            $table->text('comment')->nullable();
            $table->json('tags')->nullable(); // Tags: ['rapido', 'buen_precio', 'profesional']
            $table->timestamps();
            
            $table->unique(['user_id', 'workshop_id']); // Un usuario solo puede reseñar una vez
        });

        // Reseñas de refacciones/piezas
        Schema::create('part_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('part_id')->constrained()->cascadeOnDelete();
            $table->tinyInteger('rating'); // 1-5 estrellas
            $table->text('comment')->nullable();
            $table->boolean('verified_purchase')->default(false); // Compra verificada
            $table->timestamps();
            
            $table->unique(['user_id', 'part_id']);
        });

        // Reseñas de refaccionarias/tiendas
        Schema::create('store_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->tinyInteger('rating'); // 1-5 estrellas
            $table->text('comment')->nullable();
            $table->timestamps();
            
            $table->unique(['user_id', 'store_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_reviews');
        Schema::dropIfExists('part_reviews');
        Schema::dropIfExists('workshop_reviews');
    }
};
