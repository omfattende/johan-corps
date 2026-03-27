# Guía de Deploy - Autostock

## Estructura del Proyecto

```
autostock/
├── backend/          # API Laravel + SQLite
└── frontend/         # Angular SPA
```

## Preparación para Deploy

### 1. Backend (Laravel + SQLite)

La base de datos es **SQLite**, lo que facilita mucho el deploy - no necesitas configurar PostgreSQL/MySQL.

#### Configuración del archivo `.env`:

```env
APP_NAME="Autostock"
APP_ENV=production
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
APP_DEBUG=false
APP_URL=https://tudominio.com

# SQLite - Simple y sin configuración extra
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# CORS - Actualiza con tu dominio frontend
CORS_ALLOWED_ORIGINS=https://tudominio.com,https://www.tudominio.com

SANCTUM_STATEFUL_DOMAINS=tudominio.com
SESSION_DOMAIN=tudominio.com
```

#### Comandos para deploy:

```bash
cd backend

# Instalar dependencias (sin dev)
composer install --no-dev --optimize-autoloader

# Generar APP_KEY si no existe
php artisan key:generate

# Crear base de datos SQLite
touch database/database.sqlite

# Ejecutar migraciones y seeders
php artisan migrate:fresh --seed --force

# Crear enlace simbólico para storage
php artisan storage:link

# Cachear configuración (producción)
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Iniciar servidor (en hosting compartido o VPS)
php artisan serve --host=0.0.0.0 --port=8000
# O mejor, usar un servidor web real (Apache/Nginx)
```

#### Para Apache/Nginx (Producción real):

El document root debe apuntar a la carpeta `backend/public/`.

Ejemplo configuración Nginx:
```nginx
server {
    listen 80;
    server_name api.tudominio.com;
    root /var/www/autostock/backend/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 2. Frontend (Angular)

#### Configuración:

Edita `frontend/src/environments/environment.prod.ts` (crear si no existe):

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.tudominio.com/api'  // URL de tu backend
};
```

#### Build para producción:

```bash
cd frontend

# Instalar dependencias
npm install

# Build de producción (optimizado)
npm run build -- --configuration production

# Los archivos compilados estarán en:
# frontend/dist/autostock-frontend/
```

#### Deploy del frontend:

Sube el contenido de `frontend/dist/autostock-frontend/` a tu hosting estático:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Cualquier hosting estático

## Opciones de Hosting Recomendadas

### Opción 1: VPS (DigitalOcean, Linode, AWS EC2)
- Mayor control
- Mejor rendimiento
- Requiere configuración de servidor

### Opción 2: Hosting Compartido (cPanel)
- Económico
- Fácil de usar
- Subir archivos por FTP

### Opción 3: Plataformas Serverless
- **Backend**: Railway, Render, Heroku, Laravel Forge
- **Frontend**: Vercel, Netlify, Cloudflare Pages

## Checklist Pre-Deploy

- [ ] Actualizar `APP_URL` en `.env`
- [ ] Configurar `CORS_ALLOWED_ORIGINS` con dominios reales
- [ ] Generar `APP_KEY` único
- [ ] Configurar `APP_DEBUG=false`
- [ ] Ejecutar migraciones con `--seed`
- [ ] Verificar permisos de carpetas:
  - `backend/storage/` (777 o www-data)
  - `backend/bootstrap/cache/` (777 o www-data)
  - `backend/database/database.sqlite` (666 o www-data)
- [ ] Actualizar URL de API en Angular
- [ ] Hacer build de producción del frontend

## Comandos Rápidos

```bash
# Setup completo (después de clonar)
cd backend
composer install --no-dev
php artisan key:generate
touch database/database.sqlite
php artisan migrate:fresh --seed --force
php artisan config:cache

cd ../frontend
npm install
npm run build
```

## Solución de Problemas

### Error: "Database file does not exist"
```bash
cd backend
touch database/database.sqlite
php artisan migrate:fresh --seed --force
```

### Error: "Permission denied"
```bash
cd backend
chmod -R 775 storage bootstrap/cache
chmod 664 database/database.sqlite
# En Windows: Asegurar que IIS/Apache tiene permisos de escritura
```

### Error: "CORS policy"
Verificar que `CORS_ALLOWED_ORIGINS` incluye el dominio del frontend.

## Credenciales de Prueba (Después del seed)

| Tipo | Email | Contraseña |
|------|-------|------------|
| Admin | admin@autostock.mx | password123 |
| Cliente | juan@example.com | password123 |
| Dueño Taller | carlos@garciamotors.com | password123 |
| Dueño Refaccionaria | maria@autoparteshn.com | password123 |

## URLs de la API

### Talleres
- `GET /api/workshops` - Listar talleres
- `GET /api/workshops/types` - Tipos de taller
- `GET /api/workshops/{id}` - Detalle de taller
- `GET /api/workshops/{id}/reviews` - Reseñas del taller

### Refaccionarias
- `GET /api/stores` - Listar refaccionarias
- `GET /api/stores/types` - Tipos de refaccionaria
- `GET /api/stores/{id}` - Detalle de refaccionaria
- `GET /api/stores/{id}/reviews` - Reseñas de refaccionaria

### Refacciones
- `GET /api/parts` - Listar refacciones
- `GET /api/parts/categories` - Categorías de refacciones
- `GET /api/parts/{id}` - Detalle de refacción
- `GET /api/parts/{id}/alternatives` - Alternativas
- `GET /api/parts/{id}/reviews` - Reseñas de refacción

### Vehículos
- `GET /api/vehicles/brands` - Marcas
- `GET /api/vehicles/models?brand=Toyota` - Modelos por marca
- `GET /api/vehicles/years?brand=Toyota&model=Corolla` - Años
- `GET /api/vehicles/engines?brand=Toyota&model=Corolla&year=2020` - Motores

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout (requiere auth)
- `GET /api/auth/me` - Perfil (requiere auth)

### Reseñas (requieren autenticación)
- `POST /api/workshop-reviews` - Crear reseña de taller
- `POST /api/part-reviews` - Crear reseña de refacción
- `POST /api/store-reviews` - Crear reseña de refaccionaria
