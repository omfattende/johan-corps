<?php

namespace Database\Seeders;

use App\Models\Part;
use App\Models\PartReview;
use App\Models\Store;
use App\Models\StoreImage;
use App\Models\StoreReview;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\Workshop;
use App\Models\WorkshopImage;
use App\Models\WorkshopReview;
use App\Models\WorkshopService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ===== USUARIOS =====
        // Admin
        $admin = User::create([
            'name' => 'Administrador',
            'email' => 'admin@autostock.mx',
            'password' => Hash::make('password123'),
            'role' => User::ROLE_ADMIN,
            'phone' => '55-0000-0000',
        ]);

        // Cliente de prueba
        $client = User::create([
            'name' => 'Juan Pérez',
            'email' => 'juan@example.com',
            'password' => Hash::make('password123'),
            'role' => User::ROLE_CLIENT,
            'phone' => '55-1111-2222',
        ]);

        // Dueño de taller
        $workshopOwner = User::create([
            'name' => 'Carlos García',
            'email' => 'carlos@garciamotors.com',
            'password' => Hash::make('password123'),
            'role' => User::ROLE_WORKSHOP_OWNER,
            'phone' => '55-3333-4444',
        ]);

        // Dueño de refaccionaria
        $storeOwner = User::create([
            'name' => 'María Hernández',
            'email' => 'maria@autoparteshn.com',
            'password' => Hash::make('password123'),
            'role' => User::ROLE_STORE_OWNER,
            'phone' => '55-5555-6666',
        ]);

        // ===== TALLERES =====
        $workshopsData = [
            [
                'owner_id' => $workshopOwner->id,
                'name' => 'García Motors',
                'slug' => 'garcia-motors',
                'address' => 'Av. Insurgentes Sur 1234, Col. Del Valle, CDMX',
                'city' => 'CDMX',
                'state' => 'Ciudad de México',
                'latitude' => 19.3736,
                'longitude' => -99.1657,
                'phone' => '55-1234-5678',
                'whatsapp' => '5512345678',
                'email' => 'contacto@garciamotors.com',
                'description' => 'Taller mecánico con más de 15 años de experiencia. Especialistas en motores y transmisiones. Trabajamos con todas las marcas.',
                'schedule' => [
                    'monday' => ['open' => '08:00', 'close' => '19:00'],
                    'tuesday' => ['open' => '08:00', 'close' => '19:00'],
                    'wednesday' => ['open' => '08:00', 'close' => '19:00'],
                    'thursday' => ['open' => '08:00', 'close' => '19:00'],
                    'friday' => ['open' => '08:00', 'close' => '19:00'],
                    'saturday' => ['open' => '08:00', 'close' => '14:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Workshop::TYPE_MECANICO,
                'logo' => 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400',
                'active' => true,
                'verified' => true,
                'services' => [
                    ['name' => 'Afinación mayor y menor', 'category' => 'Motor', 'price_from' => 1200, 'price_to' => 3500],
                    ['name' => 'Frenos (delanteros y traseros)', 'category' => 'Frenos', 'price_from' => 800, 'price_to' => 2500],
                    ['name' => 'Reparación de transmisión', 'category' => 'Transmisión', 'price_from' => 5000, 'price_to' => 15000],
                    ['name' => 'Cambio de aceite y filtros', 'category' => 'Mantenimiento', 'price_from' => 400, 'price_to' => 800],
                    ['name' => 'Diagnóstico por computadora', 'category' => 'Diagnóstico', 'price_from' => 300, 'price_to' => 500],
                ],
                'images' => [
                    ['image' => 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800', 'caption' => 'Nuestras instalaciones'],
                    ['image' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800', 'caption' => 'Equipo de trabajo'],
                ],
            ],
            [
                'name' => 'Taller Eléctrico Ramírez',
                'slug' => 'taller-electrico-ramirez',
                'address' => 'Calle Reforma 456, Naucalpan, Edo. Méx.',
                'city' => 'Naucalpan',
                'state' => 'Estado de México',
                'latitude' => 19.4769,
                'longitude' => -99.2388,
                'phone' => '55-2345-6789',
                'whatsapp' => '5523456789',
                'email' => 'taller@electricoramirez.com',
                'description' => 'Especialistas en sistemas eléctricos automotrices, sensores, computadoras y alternadores. Más de 20 años de experiencia.',
                'schedule' => [
                    'monday' => ['open' => '09:00', 'close' => '18:00'],
                    'tuesday' => ['open' => '09:00', 'close' => '18:00'],
                    'wednesday' => ['open' => '09:00', 'close' => '18:00'],
                    'thursday' => ['open' => '09:00', 'close' => '18:00'],
                    'friday' => ['open' => '09:00', 'close' => '18:00'],
                    'saturday' => ['open' => '09:00', 'close' => '14:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Workshop::TYPE_ELECTRICO,
                'logo' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
                'active' => true,
                'verified' => true,
                'services' => [
                    ['name' => 'Reparación sistema eléctrico', 'category' => 'Eléctrico', 'price_from' => 500, 'price_to' => 3000],
                    ['name' => 'Alternadores y marchas', 'category' => 'Eléctrico', 'price_from' => 800, 'price_to' => 2500],
                    ['name' => 'Sensores y diagnóstico', 'category' => 'Diagnóstico', 'price_from' => 300, 'price_to' => 1500],
                    ['name' => 'Instalación de audio y alarmas', 'category' => 'Accesorios', 'price_from' => 1500, 'price_to' => 8000],
                ],
                'images' => [
                    ['image' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800', 'caption' => 'Taller especializado'],
                ],
            ],
            [
                'name' => 'Suspensiones del Norte',
                'slug' => 'suspensiones-del-norte',
                'address' => 'Blvd. Manuel Ávila Camacho 789, Tlalnepantla',
                'city' => 'Tlalnepantla',
                'state' => 'Estado de México',
                'latitude' => 19.5367,
                'longitude' => -99.1981,
                'phone' => '55-3456-7890',
                'whatsapp' => '5534567890',
                'email' => 'info@suspensionesnorte.com',
                'description' => 'Taller especializado en suspensión y dirección. Alineación, balanceo y amortiguadores de todas las marcas.',
                'schedule' => [
                    'monday' => ['open' => '08:30', 'close' => '18:30'],
                    'tuesday' => ['open' => '08:30', 'close' => '18:30'],
                    'wednesday' => ['open' => '08:30', 'close' => '18:30'],
                    'thursday' => ['open' => '08:30', 'close' => '18:30'],
                    'friday' => ['open' => '08:30', 'close' => '18:30'],
                    'saturday' => ['open' => '08:30', 'close' => '14:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Workshop::TYPE_ESPECIALIZADO,
                'logo' => 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
                'active' => true,
                'verified' => true,
                'services' => [
                    ['name' => 'Reparación de suspensión', 'category' => 'Suspensión', 'price_from' => 1200, 'price_to' => 5000],
                    ['name' => 'Alineación y balanceo', 'category' => 'Suspensión', 'price_from' => 250, 'price_to' => 450],
                    ['name' => 'Reparación de dirección', 'category' => 'Dirección', 'price_from' => 800, 'price_to' => 3500],
                    ['name' => 'Cambio de amortiguadores', 'category' => 'Suspensión', 'price_from' => 1500, 'price_to' => 4000],
                ],
                'images' => [],
            ],
            [
                'name' => 'Hojalatería y Pintura López',
                'slug' => 'hojalateria-pintura-lopez',
                'address' => 'Calle Juárez 321, Cuautitlán Izcalli',
                'city' => 'Cuautitlán Izcalli',
                'state' => 'Estado de México',
                'latitude' => 19.6489,
                'longitude' => -99.2097,
                'phone' => '55-4567-8901',
                'whatsapp' => '5545678901',
                'email' => 'pintura@lopezautomotriz.com',
                'description' => 'Expertos en hojalatería, pintura y enderezado. Trabajos de alta calidad con pintura de horno y garantía de 2 años.',
                'schedule' => [
                    'monday' => ['open' => '08:00', 'close' => '17:00'],
                    'tuesday' => ['open' => '08:00', 'close' => '17:00'],
                    'wednesday' => ['open' => '08:00', 'close' => '17:00'],
                    'thursday' => ['open' => '08:00', 'close' => '17:00'],
                    'friday' => ['open' => '08:00', 'close' => '17:00'],
                    'saturday' => ['open' => '09:00', 'close' => '13:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Workshop::TYPE_HOJALATERIA,
                'logo' => 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400',
                'active' => true,
                'verified' => false,
                'services' => [
                    ['name' => 'Hojalatería', 'category' => 'Hojalatería', 'price_from' => 500, 'price_to' => 8000],
                    ['name' => 'Pintura completa', 'category' => 'Pintura', 'price_from' => 8000, 'price_to' => 25000],
                    ['name' => 'Enderezado de chasis', 'category' => 'Hojalatería', 'price_from' => 1500, 'price_to' => 5000],
                    ['name' => 'Cambio de cristales', 'category' => 'Hojalatería', 'price_from' => 800, 'price_to' => 3500],
                ],
                'images' => [],
            ],
            [
                'name' => 'AutoService Express',
                'slug' => 'autoservice-express',
                'address' => 'Periférico Sur 2500, Col. Pedregal, CDMX',
                'city' => 'CDMX',
                'state' => 'Ciudad de México',
                'latitude' => 19.3284,
                'longitude' => -99.1851,
                'phone' => '55-5678-9012',
                'whatsapp' => '5556789012',
                'email' => 'express@autoservice.com',
                'description' => 'Servicio rápido de mantenimiento preventivo. Cambio de aceite, afinaciones y más en solo 45 minutos. Sin cita previa.',
                'schedule' => [
                    'monday' => ['open' => '07:00', 'close' => '20:00'],
                    'tuesday' => ['open' => '07:00', 'close' => '20:00'],
                    'wednesday' => ['open' => '07:00', 'close' => '20:00'],
                    'thursday' => ['open' => '07:00', 'close' => '20:00'],
                    'friday' => ['open' => '07:00', 'close' => '20:00'],
                    'saturday' => ['open' => '08:00', 'close' => '18:00'],
                    'sunday' => ['open' => '09:00', 'close' => '14:00'],
                ],
                'type' => Workshop::TYPE_ACEITE,
                'logo' => 'https://images.unsplash.com/photo-1609220136736-443140cfeaa8?w=400',
                'active' => true,
                'verified' => true,
                'services' => [
                    ['name' => 'Cambio de aceite rápido', 'category' => 'Mantenimiento', 'price_from' => 350, 'price_to' => 600],
                    ['name' => 'Afinación', 'category' => 'Motor', 'price_from' => 800, 'price_to' => 2000],
                    ['name' => 'Frenos express', 'category' => 'Frenos', 'price_from' => 600, 'price_to' => 1200],
                    ['name' => 'Diagnóstico gratuito', 'category' => 'Diagnóstico', 'price_from' => 0, 'price_to' => 0],
                ],
                'images' => [],
            ],
            [
                'name' => 'Mecánica Integral Hernández',
                'slug' => 'mecanica-integral-hernandez',
                'address' => 'Av. Central 890, Ecatepec, Edo. Méx.',
                'city' => 'Ecatepec',
                'state' => 'Estado de México',
                'latitude' => 19.6001,
                'longitude' => -99.0297,
                'phone' => '55-6789-0123',
                'whatsapp' => '5567890123',
                'email' => 'taller@hernandez.com',
                'description' => 'Taller mecánico general con servicio completo. Motores, transmisiones, frenos, suspensión y más. Garantía en todos los trabajos.',
                'schedule' => [
                    'monday' => ['open' => '08:00', 'close' => '18:00'],
                    'tuesday' => ['open' => '08:00', 'close' => '18:00'],
                    'wednesday' => ['open' => '08:00', 'close' => '18:00'],
                    'thursday' => ['open' => '08:00', 'close' => '18:00'],
                    'friday' => ['open' => '08:00', 'close' => '18:00'],
                    'saturday' => ['open' => '08:00', 'close' => '14:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Workshop::TYPE_GENERAL,
                'logo' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                'active' => true,
                'verified' => true,
                'services' => [
                    ['name' => 'Mecánica general', 'category' => 'Motor', 'price_from' => 500, 'price_to' => 8000],
                    ['name' => 'Frenos', 'category' => 'Frenos', 'price_from' => 700, 'price_to' => 2200],
                    ['name' => 'Suspensión completa', 'category' => 'Suspensión', 'price_from' => 2000, 'price_to' => 6000],
                    ['name' => 'Transmisión', 'category' => 'Transmisión', 'price_from' => 3000, 'price_to' => 12000],
                ],
                'images' => [],
            ],
        ];

        $workshopModels = [];
        foreach ($workshopsData as $workshopData) {
            $services = $workshopData['services'] ?? [];
            $images = $workshopData['images'] ?? [];
            unset($workshopData['services'], $workshopData['images']);
            
            $workshop = Workshop::create($workshopData);
            $workshopModels[] = $workshop;
            
            foreach ($services as $service) {
                WorkshopService::create(array_merge($service, ['workshop_id' => $workshop->id]));
            }
            
            foreach ($images as $image) {
                WorkshopImage::create(array_merge($image, ['workshop_id' => $workshop->id]));
            }
        }

        // ===== REFACCIONARIAS =====
        $storesData = [
            [
                'owner_id' => $storeOwner->id,
                'name' => 'AutoPartes Hernández',
                'slug' => 'autopartes-hernandez',
                'address' => 'Av. Hidalgo 456, Col. Centro, CDMX',
                'city' => 'CDMX',
                'state' => 'Ciudad de México',
                'latitude' => 19.4326,
                'longitude' => -99.1332,
                'phone' => '55-7890-1234',
                'whatsapp' => '5578901234',
                'email' => 'ventas@autoparteshn.com',
                'description' => 'Refaccionaria con amplio inventario de autopartes para todas las marcas. Precios competitivos y envío a domicilio.',
                'schedule' => [
                    'monday' => ['open' => '08:00', 'close' => '19:00'],
                    'tuesday' => ['open' => '08:00', 'close' => '19:00'],
                    'wednesday' => ['open' => '08:00', 'close' => '19:00'],
                    'thursday' => ['open' => '08:00', 'close' => '19:00'],
                    'friday' => ['open' => '08:00', 'close' => '19:00'],
                    'saturday' => ['open' => '08:00', 'close' => '14:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Store::TYPE_REFACCIONARIA,
                'logo' => 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400',
                'active' => true,
                'verified' => true,
                'images' => [
                    ['image' => 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800', 'caption' => 'Tienda principal'],
                ],
            ],
            [
                'name' => 'Refaccionaria del Norte',
                'slug' => 'refaccionaria-del-norte',
                'address' => 'Blvd. López Portillo 789, Coacalco',
                'city' => 'Coacalco',
                'state' => 'Estado de México',
                'latitude' => 19.6281,
                'longitude' => -99.1002,
                'phone' => '55-8901-2345',
                'whatsapp' => '5589012345',
                'email' => 'contacto@refaccionariadelnorte.com',
                'description' => 'Especialistas en partes de suspensión, frenos y motor. Importamos directamente de Estados Unidos.',
                'schedule' => [
                    'monday' => ['open' => '08:30', 'close' => '18:30'],
                    'tuesday' => ['open' => '08:30', 'close' => '18:30'],
                    'wednesday' => ['open' => '08:30', 'close' => '18:30'],
                    'thursday' => ['open' => '08:30', 'close' => '18:30'],
                    'friday' => ['open' => '08:30', 'close' => '18:30'],
                    'saturday' => ['open' => '09:00', 'close' => '13:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Store::TYPE_ESPECIALIZADA,
                'logo' => 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
                'active' => true,
                'verified' => true,
                'images' => [],
            ],
            [
                'name' => 'Agencia Nissan Tlalnepantla',
                'slug' => 'agencia-nissan-tlalnepantla',
                'address' => 'Av. Tlalnepantla 1500, Tlalnepantla',
                'city' => 'Tlalnepantla',
                'state' => 'Estado de México',
                'latitude' => 19.5409,
                'longitude' => -99.1947,
                'phone' => '55-9012-3456',
                'whatsapp' => '5590123456',
                'email' => 'refacciones@nissantlalnepantla.com',
                'description' => 'Refacciones originales Nissan. Garantía de agencia en todas nuestras partes. Servicio express disponible.',
                'schedule' => [
                    'monday' => ['open' => '09:00', 'close' => '19:00'],
                    'tuesday' => ['open' => '09:00', 'close' => '19:00'],
                    'wednesday' => ['open' => '09:00', 'close' => '19:00'],
                    'thursday' => ['open' => '09:00', 'close' => '19:00'],
                    'friday' => ['open' => '09:00', 'close' => '19:00'],
                    'saturday' => ['open' => '09:00', 'close' => '14:00'],
                    'sunday' => ['open' => null, 'close' => null],
                ],
                'type' => Store::TYPE_AGENCIA,
                'logo' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
                'active' => true,
                'verified' => true,
                'images' => [],
            ],
        ];

        $storeModels = [];
        foreach ($storesData as $storeData) {
            $images = $storeData['images'] ?? [];
            unset($storeData['images']);
            
            $store = Store::create($storeData);
            $storeModels[] = $store;
            
            foreach ($images as $image) {
                StoreImage::create(array_merge($image, ['store_id' => $store->id]));
            }
        }

        // ===== VEHÍCULOS =====
        $vehiclesData = [
            ['brand' => 'Nissan', 'model' => 'Sentra', 'year' => 2018, 'engine' => '1.8L', 'transmission' => 'Automática'],
            ['brand' => 'Nissan', 'model' => 'Sentra', 'year' => 2019, 'engine' => '1.8L', 'transmission' => 'Automática'],
            ['brand' => 'Nissan', 'model' => 'Sentra', 'year' => 2020, 'engine' => '2.0L', 'transmission' => 'Automática'],
            ['brand' => 'Nissan', 'model' => 'Versa', 'year' => 2020, 'engine' => '1.6L', 'transmission' => 'Automática'],
            ['brand' => 'Nissan', 'model' => 'Versa', 'year' => 2021, 'engine' => '1.6L', 'transmission' => 'Automática'],
            ['brand' => 'Nissan', 'model' => 'Frontier', 'year' => 2019, 'engine' => '2.5L', 'transmission' => 'Manual'],
            ['brand' => 'Toyota', 'model' => 'Corolla', 'year' => 2015, 'engine' => '1.8L', 'transmission' => 'Automática'],
            ['brand' => 'Toyota', 'model' => 'Corolla', 'year' => 2016, 'engine' => '1.8L', 'transmission' => 'Automática'],
            ['brand' => 'Toyota', 'model' => 'Corolla', 'year' => 2020, 'engine' => '2.0L', 'transmission' => 'Automática'],
            ['brand' => 'Toyota', 'model' => 'Camry', 'year' => 2018, 'engine' => '2.5L', 'transmission' => 'Automática'],
            ['brand' => 'Toyota', 'model' => 'Hilux', 'year' => 2019, 'engine' => '2.8L', 'transmission' => 'Manual'],
            ['brand' => 'Chevrolet', 'model' => 'Aveo', 'year' => 2017, 'engine' => '1.6L', 'transmission' => 'Manual'],
            ['brand' => 'Chevrolet', 'model' => 'Aveo', 'year' => 2018, 'engine' => '1.6L', 'transmission' => 'Automática'],
            ['brand' => 'Chevrolet', 'model' => 'Spark', 'year' => 2019, 'engine' => '1.4L', 'transmission' => 'Manual'],
            ['brand' => 'Chevrolet', 'model' => 'Captiva', 'year' => 2020, 'engine' => '1.5L', 'transmission' => 'Automática'],
            ['brand' => 'Volkswagen', 'model' => 'Jetta', 'year' => 2018, 'engine' => '2.0L', 'transmission' => 'Manual'],
            ['brand' => 'Volkswagen', 'model' => 'Jetta', 'year' => 2019, 'engine' => '1.4L TSI', 'transmission' => 'Automática'],
            ['brand' => 'Volkswagen', 'model' => 'Jetta', 'year' => 2020, 'engine' => '1.4L TSI', 'transmission' => 'Automática'],
            ['brand' => 'Volkswagen', 'model' => 'Golf', 'year' => 2017, 'engine' => '1.4L TSI', 'transmission' => 'Manual'],
            ['brand' => 'Honda', 'model' => 'Civic', 'year' => 2019, 'engine' => '1.5L Turbo', 'transmission' => 'Automática'],
            ['brand' => 'Honda', 'model' => 'Civic', 'year' => 2020, 'engine' => '2.0L', 'transmission' => 'Automática'],
            ['brand' => 'Honda', 'model' => 'HRV', 'year' => 2020, 'engine' => '1.8L', 'transmission' => 'Automática'],
            ['brand' => 'Kia', 'model' => 'Rio', 'year' => 2018, 'engine' => '1.4L', 'transmission' => 'Manual'],
            ['brand' => 'Kia', 'model' => 'Rio', 'year' => 2019, 'engine' => '1.4L', 'transmission' => 'Automática'],
            ['brand' => 'Kia', 'model' => 'Sportage', 'year' => 2019, 'engine' => '2.0L', 'transmission' => 'Automática'],
            ['brand' => 'Mazda', 'model' => '3', 'year' => 2019, 'engine' => '2.5L', 'transmission' => 'Automática'],
            ['brand' => 'Mazda', 'model' => 'CX-5', 'year' => 2020, 'engine' => '2.5L', 'transmission' => 'Automática'],
            ['brand' => 'Ford', 'model' => 'Focus', 'year' => 2018, 'engine' => '2.0L', 'transmission' => 'Manual'],
            ['brand' => 'Ford', 'model' => 'F-150', 'year' => 2019, 'engine' => '3.5L', 'transmission' => 'Automática'],
        ];

        $vehicleModels = [];
        foreach ($vehiclesData as $vData) {
            $vehicleModels[] = Vehicle::create($vData);
        }

        // ===== REFACCIONES =====
        $partsData = [
            // Frenos
            [
                'store_id' => $storeModels[0]->id,
                'name' => 'Balatas delanteras Bosch',
                'slug' => 'balatas-delanteras-bosch',
                'brand' => 'Bosch',
                'part_number' => 'BP-NI-001',
                'price' => 850,
                'description' => 'Balatas delanteras de alta calidad, larga durabilidad y excelente frenado.',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
                'stock' => 25,
                'category' => Part::CATEGORY_FRENOS,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '6 meses',
                'vehicles' => [0, 1, 2, 3, 4],
            ],
            [
                'store_id' => $storeModels[1]->id,
                'name' => 'Pastillas de freno Brembo',
                'brand' => 'Brembo',
                'part_number' => 'PF-TO-101',
                'price' => 1200,
                'description' => 'Pastillas de freno premium para Toyota. Alta resistencia al calor.',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
                'stock' => 8,
                'category' => Part::CATEGORY_FRENOS,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '1 año',
                'vehicles' => [6, 7, 8, 9],
            ],
            // Motor
            [
                'store_id' => $storeModels[0]->id,
                'name' => 'Filtro de aceite Fram',
                'brand' => 'Fram',
                'part_number' => 'FO-NI-101',
                'price' => 120,
                'description' => 'Filtro de aceite de alto rendimiento. Retiene impurezas eficientemente.',
                'image' => 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300',
                'stock' => 50,
                'category' => Part::CATEGORY_FILTROS,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '3 meses',
                'vehicles' => [0, 1, 2, 3, 4, 5],
            ],
            [
                'store_id' => $storeModels[2]->id,
                'name' => 'Bujías NGK iridium',
                'brand' => 'NGK',
                'part_number' => 'BU-NI-201',
                'price' => 380,
                'description' => 'Bujías de iridio para mejor arranque y eficiencia. Pack de 4 piezas.',
                'image' => 'https://images.unsplash.com/photo-1617469767282-a9be1695b553?w=300',
                'stock' => 30,
                'category' => Part::CATEGORY_MOTOR,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '1 año',
                'vehicles' => [0, 1, 3, 4],
            ],
            // Suspensión
            [
                'store_id' => $storeModels[1]->id,
                'name' => 'Amortiguadores delanteros Monroe',
                'brand' => 'Monroe',
                'part_number' => 'AM-NI-301',
                'price' => 1450,
                'description' => 'Par de amortiguadores delanteros. Mayor control y confort.',
                'image' => 'https://images.unsplash.com/photo-1592840062661-a5a7f78e2056?w=300',
                'stock' => 12,
                'category' => Part::CATEGORY_SUSPENSION,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '1 año',
                'vehicles' => [0, 1, 2],
            ],
            // Filtros
            [
                'store_id' => $storeModels[0]->id,
                'name' => 'Filtro de aire K&N',
                'brand' => 'K&N',
                'part_number' => 'FA-TO-001',
                'price' => 650,
                'description' => 'Filtro de alto flujo lavable y reutilizable. Mejora el rendimiento.',
                'image' => 'https://images.unsplash.com/photo-1617469767282-a9be1695b553?w=300',
                'stock' => 18,
                'category' => Part::CATEGORY_FILTROS,
                'condition' => Part::CONDITION_NEW,
                'warranty' => 'Millón de millas',
                'vehicles' => [6, 7, 8],
            ],
            // Eléctrico
            [
                'store_id' => $storeModels[2]->id,
                'name' => 'Bobina encendido Denso',
                'brand' => 'Denso',
                'part_number' => 'BE-HO-001',
                'price' => 520,
                'description' => 'Bobina de encendido para Honda Civic 1.5L Turbo.',
                'image' => 'https://images.unsplash.com/photo-1617469767282-a9be1695b553?w=300',
                'stock' => 10,
                'category' => Part::CATEGORY_ELECTRICO,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '6 meses',
                'vehicles' => [19],
            ],
            // Aceites
            [
                'store_id' => $storeModels[0]->id,
                'name' => 'Aceite 5W-30 Mobil 1',
                'brand' => 'Mobil',
                'part_number' => 'AC-UN-001',
                'price' => 420,
                'description' => 'Aceite sintético 5W-30 para motor. 4 litros.',
                'image' => 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=300',
                'stock' => 100,
                'category' => Part::CATEGORY_ACEITES,
                'condition' => Part::CONDITION_NEW,
                'warranty' => null,
                'vehicles' => [0, 1, 2, 3, 4, 6, 7, 8, 11, 12, 15, 16, 18, 19],
            ],
            // Baterías
            [
                'store_id' => $storeModels[1]->id,
                'name' => 'Batería Optima RedTop',
                'brand' => 'Optima',
                'part_number' => 'BT-OP-001',
                'price' => 2800,
                'description' => 'Batería de alto rendimiento con tecnología SpiralCell.',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
                'stock' => 6,
                'category' => Part::CATEGORY_BATERIAS,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '2 años',
                'vehicles' => [0, 1, 2, 6, 7, 8, 15, 16],
            ],
            // Llantas
            [
                'store_id' => $storeModels[0]->id,
                'name' => 'Llanta Michelin Primacy 4',
                'brand' => 'Michelin',
                'part_number' => 'LL-MI-001',
                'price' => 1850,
                'description' => 'Llanta de alto rendimiento 205/55 R16. Excelente agarre.',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
                'stock' => 20,
                'category' => Part::CATEGORY_LLANTAS,
                'condition' => Part::CONDITION_NEW,
                'warranty' => '60,000 km',
                'vehicles' => [0, 1, 2, 6, 7, 8, 15, 16],
            ],
        ];

        $partModels = [];
        foreach ($partsData as $partData) {
            $vehicleIndices = $partData['vehicles'];
            unset($partData['vehicles']);
            
            $partData['slug'] = $partData['slug'] ?? Str::slug($partData['name']);
            $part = Part::create($partData);
            $partModels[] = $part;
            
            foreach ($vehicleIndices as $idx) {
                if (isset($vehicleModels[$idx])) {
                    $part->vehicles()->attach($vehicleModels[$idx]->id);
                }
            }
        }

        // ===== RESEÑAS DE TALLERES =====
        $workshopReviews = [
            ['user_id' => $client->id, 'workshop_id' => $workshopModels[0]->id, 'rating' => 5, 'comment' => 'Excelente servicio, muy profesionales y honestos. Regresaré sin duda.', 'tags' => ['profesional', 'honesto', 'rápido']],
            ['user_id' => $admin->id, 'workshop_id' => $workshopModels[0]->id, 'rating' => 4, 'comment' => 'Buen trabajo en general, tardaron un poco más de lo prometido pero el resultado fue perfecto.', 'tags' => ['buen_trabajo', 'calidad']],
            ['user_id' => $client->id, 'workshop_id' => $workshopModels[1]->id, 'rating' => 5, 'comment' => 'Los mejores en eléctrico. Diagnosticaron mi problema en minutos.', 'tags' => ['experto', 'rápido', 'recomendado']],
            ['user_id' => $admin->id, 'workshop_id' => $workshopModels[1]->id, 'rating' => 5, 'comment' => 'Muy recomendados, resolvieron una falla que otro taller no pudo.', 'tags' => ['recomendado', 'especializado']],
            ['user_id' => $client->id, 'workshop_id' => $workshopModels[2]->id, 'rating' => 4, 'comment' => 'Muy buen trabajo de suspensión. Precio justo y trabajo limpio.', 'tags' => ['buen_precio', 'limpio']],
            ['user_id' => $admin->id, 'workshop_id' => $workshopModels[2]->id, 'rating' => 5, 'comment' => 'Mi carro quedó como nuevo. Excelente atención.', 'tags' => ['atención', 'calidad']],
            ['user_id' => $client->id, 'workshop_id' => $workshopModels[3]->id, 'rating' => 4, 'comment' => 'Buena calidad de pintura, igualaron perfectamente el color.', 'tags' => ['calidad', 'color_exacto']],
            ['user_id' => $admin->id, 'workshop_id' => $workshopModels[3]->id, 'rating' => 4, 'comment' => 'Buen servicio aunque tardaron 2 días más de lo estimado.', 'tags' => ['calidad', 'tardanza']],
            ['user_id' => $client->id, 'workshop_id' => $workshopModels[4]->id, 'rating' => 3, 'comment' => 'Servicio rápido pero un poco caro para lo que hacen.', 'tags' => ['rápido', 'caro']],
            ['user_id' => $admin->id, 'workshop_id' => $workshopModels[4]->id, 'rating' => 5, 'comment' => 'Muy conveniente para cambio de aceite express. Eficientes.', 'tags' => ['conveniente', 'eficiente']],
            ['user_id' => $client->id, 'workshop_id' => $workshopModels[5]->id, 'rating' => 5, 'comment' => 'El mejor taller de la zona. Trabajo garantizado y precios honestos.', 'tags' => ['garantía', 'honesto', 'mejor']],
            ['user_id' => $admin->id, 'workshop_id' => $workshopModels[5]->id, 'rating' => 4, 'comment' => 'Muy buen servicio. Revisaron todo el auto sin costo adicional.', 'tags' => ['servicio', 'revisión_gratis']],
        ];

        foreach ($workshopReviews as $reviewData) {
            WorkshopReview::create($reviewData);
        }

        // Actualizar ratings de talleres
        foreach ($workshopModels as $workshop) {
            $workshop->updateRating();
        }

        // ===== RESEÑAS DE REFACCIONARIAS =====
        $storeReviews = [
            ['user_id' => $client->id, 'store_id' => $storeModels[0]->id, 'rating' => 5, 'comment' => 'Excelente inventario, siempre tienen lo que busco y a buen precio.'],
            ['user_id' => $admin->id, 'store_id' => $storeModels[0]->id, 'rating' => 4, 'comment' => 'Buen servicio y envío rápido. Recomendado.'],
            ['user_id' => $client->id, 'store_id' => $storeModels[1]->id, 'rating' => 4, 'comment' => 'Especialistas en suspensión. Partes de calidad.'],
            ['user_id' => $client->id, 'store_id' => $storeModels[2]->id, 'rating' => 5, 'comment' => 'Partes originales Nissan. Excelente garantía.'],
        ];

        foreach ($storeReviews as $reviewData) {
            StoreReview::create($reviewData);
        }

        // Actualizar ratings de refaccionarias
        foreach ($storeModels as $store) {
            $store->updateRating();
        }

        // ===== RESEÑAS DE REFACCIONES =====
        $partReviews = [
            ['user_id' => $client->id, 'part_id' => $partModels[0]->id, 'rating' => 5, 'comment' => 'Excelente calidad, freno perfecto.', 'verified_purchase' => true],
            ['user_id' => $admin->id, 'part_id' => $partModels[0]->id, 'rating' => 4, 'comment' => 'Buenas balatas, fácil instalación.', 'verified_purchase' => true],
            ['user_id' => $client->id, 'part_id' => $partModels[3]->id, 'rating' => 5, 'comment' => 'Las mejores bujías que he usado.', 'verified_purchase' => true],
            ['user_id' => $client->id, 'part_id' => $partModels[5]->id, 'rating' => 4, 'comment' => 'Excelente filtro, se nota la diferencia.', 'verified_purchase' => true],
        ];

        foreach ($partReviews as $reviewData) {
            PartReview::create($reviewData);
        }

        // Actualizar ratings de refacciones
        foreach ($partModels as $part) {
            $part->updateRating();
        }
    }
}
