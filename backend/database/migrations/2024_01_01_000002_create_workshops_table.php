<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workshops', function (Blueprint $table) {
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
            // Horario de servicio (JSON para flexibilidad: {lunes: {open: "09:00", close: "18:00"}})
            $table->json('schedule')->nullable();
            // Tipo de taller: mecanico, electrico, hojalateria, pintura, general, etc.
            $table->enum('type', ['mecanico', 'electrico', 'hojalateria', 'pintura', 'general', 'especializado', 'llanteria', 'aceite'])->default('general');
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->string('logo')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('verified')->default(false);
            $table->timestamp('featured_until')->nullable(); // Para promociones destacadas
            $table->timestamps();
            
            $table->index(['active', 'type']);
            $table->index(['latitude', 'longitude']);
        });

        Schema::create('workshop_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workshop_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('category')->nullable(); // motor, transmision, frenos, etc.
            $table->text('description')->nullable();
            $table->decimal('price_from', 10, 2)->nullable();
            $table->decimal('price_to', 10, 2)->nullable();
            $table->timestamps();
        });

        // Galería de imágenes del taller
        Schema::create('workshop_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workshop_id')->constrained()->cascadeOnDelete();
            $table->string('image');
            $table->string('caption')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workshop_images');
        Schema::dropIfExists('workshop_services');
        Schema::dropIfExists('workshops');
    }
};
