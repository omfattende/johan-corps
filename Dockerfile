FROM php:8.4-cli

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    unzip \
    libsqlite3-dev \
    libzip-dev \
    git \
    && docker-php-ext-install pdo_sqlite zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www

# Copiar archivos del backend
COPY backend/ .

# Crear directorios necesarios
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database

# Crear archivo SQLite vacío
RUN touch /var/www/storage/database.sqlite

# Instalar dependencias de Composer
RUN composer install --optimize-autoloader --no-dev --no-interaction --no-scripts

# Permisos
RUN chmod -R 775 storage bootstrap/cache database

# Puerto
EXPOSE 10000

# Script de inicio
CMD echo "APP_NAME=JohanCorps" > .env \
    && echo "APP_ENV=production" >> .env \
    && echo "APP_DEBUG=false" >> .env \
    && echo "APP_KEY=${APP_KEY}" >> .env \
    && echo "APP_URL=${APP_URL}" >> .env \
    && echo "DB_CONNECTION=sqlite" >> .env \
    && echo "DB_DATABASE=/var/www/storage/database.sqlite" >> .env \
    && echo "BROADCAST_DRIVER=log" >> .env \
    && echo "CACHE_DRIVER=file" >> .env \
    && echo "SESSION_DRIVER=file" >> .env \
    && echo "QUEUE_DRIVER=sync" >> .env \
    && echo "CORS_ALLOWED_ORIGINS=${CORS_ALLOWED_ORIGINS}" >> .env \
    && php artisan migrate --force --no-interaction \
    && php artisan db:seed --force --no-interaction \
    && php artisan serve --host 0.0.0.0 --port 10000
