<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Catálogo de vehículos (para filtrado de compatibilidad)
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('brand'); // Marca: Toyota, Honda, Nissan, etc.
            $table->string('model'); // Modelo: Corolla, Civic, Sentra, etc.
            $table->integer('year'); // Año: 2020, 2021, etc.
            $table->string('engine'); // Motor: 1.8L, 2.0L, V6, etc.
            $table->string('version')->nullable(); // Versión: XLE, Sport, etc.
            $table->string('transmission')->nullable(); // Transmisión: Automatica, Manual
            $table->timestamps();
            
            $table->unique(['brand', 'model', 'year', 'engine']);
            $table->index(['brand', 'model']);
        });

        // Refacciones/Autopartes
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique()->nullable();
            $table->string('brand')->nullable(); // Marca de la pieza: Bosch, Denso, etc.
            $table->string('part_number')->nullable(); // Número de parte
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('condition')->default('new'); // new, used, refurbished
            $table->string('warranty')->nullable(); // Garantía: 6 meses, 1 año, etc.
            
            // Categoría de la pieza
            $table->enum('category', [
                'motor', 'transmision', 'frenos', 'suspension', 'direccion',
                'electrico', 'carroceria', 'accesorios', 'filtros', 'aceites',
                'llantas', 'baterias', 'escape', 'enfriamiento', 'interior'
            ])->default('motor');
            
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
            
            $table->index(['active', 'category']);
            $table->index(['store_id', 'active']);
        });

        // Relación muchos a muchos: qué vehículos son compatibles con qué piezas
        Schema::create('part_vehicle', function (Blueprint $table) {
            $table->id();
            $table->foreignId('part_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            
            $table->unique(['part_id', 'vehicle_id']);
        });

        // Galería de imágenes de cada pieza
        Schema::create('part_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('part_id')->constrained()->cascadeOnDelete();
            $table->string('image');
            $table->string('caption')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('part_images');
        Schema::dropIfExists('part_vehicle');
        Schema::dropIfExists('parts');
        Schema::dropIfExists('vehicles');
    }
};
