<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tabla de refaccionarias/tiendas de autopartes
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique()->nullable();
            $table->string('address');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();
            $table->json('schedule')->nullable();
            // Tipo de tienda: refaccionaria, agencia, especializada, etc.
            $table->enum('type', ['refaccionaria', 'agencia', 'especializada', 'generic'])->default('refaccionaria');
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->string('logo')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('verified')->default(false);
            $table->timestamps();
            
            $table->index(['active', 'type']);
        });

        // Galería de imágenes de la refaccionaria
        Schema::create('store_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('image');
            $table->string('caption')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('store_images');
        Schema::dropIfExists('stores');
    }
};
