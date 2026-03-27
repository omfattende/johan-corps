# Autostock

Plataforma web para encontrar talleres mecánicos confiables y refacciones compatibles con tu vehículo.

## Estructura

```
autostock/
├── backend/     # API Laravel + PostgreSQL
└── frontend/    # SPA Angular
```

## Setup inicial

### 1. Configurar base de datos

Crea la base de datos en PostgreSQL:
```sql
CREATE DATABASE autostock;
```

Edita `backend/.env` y ajusta:
```
DB_PASSWORD=tu_contraseña_postgres
```

### 2. Instalar dependencias y migrar

```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
```

O usa el script: **doble click en `setup.bat`** (solo instala dependencias)

### 3. Iniciar servidores

**Terminal 1 — Backend:**
```bash
cd backend
php artisan serve
# API disponible en: http://localhost:8000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# App disponible en: http://localhost:4200
```

## Credenciales de prueba

| Campo | Valor |
|-------|-------|
| Email | `juan@example.com` |
| Contraseña | `password123` |
| Admin | `admin@autostock.mx` / `password123` |

## Módulos

- **Talleres** — `/talleres` — Búsqueda con filtros (servicio, calificación, cercanía GPS)
- **Refacciones** — `/refacciones` — Selector de vehículo + refacciones compatibles
- **Reseñas** — En la ficha de cada taller (requiere login)
- **Auth** — `/auth/login` y `/auth/registro`

## API Endpoints

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/workshops` | Lista talleres (filtros: search, category, min_rating, lat, lng) |
| GET | `/api/workshops/{id}` | Detalle del taller |
| GET | `/api/workshops/{id}/reviews` | Reseñas del taller |
| GET | `/api/parts` | Lista refacciones (filtros: brand, model, year, engine) |
| GET | `/api/parts/{id}` | Detalle de refacción |
| GET | `/api/parts/{id}/alternatives` | Alternativas |
| GET | `/api/vehicles/brands` | Marcas disponibles |
| GET | `/api/vehicles/models?brand=` | Modelos por marca |
| GET | `/api/vehicles/years?brand=&model=` | Años |
| GET | `/api/vehicles/engines?brand=&model=&year=` | Motores |
| POST | `/api/auth/register` | Registro |
| POST | `/api/auth/login` | Login |
| POST | `/api/reviews` | Crear reseña *(auth requerida)* |
