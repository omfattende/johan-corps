FROM php:8.4-cli

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    unzip \
    libsqlite3-dev \
    libzip-dev \
    && docker-php-ext-install pdo_sqlite zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www

# Copiar archivos
COPY . .

# Instalar dependencias
RUN composer install --optimize-autoloader --no-dev

# Crear directorios si no existen
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache database

# Permisos
RUN chmod -R 775 storage bootstrap/cache database

# Puerto
EXPOSE 10000

# Comando de inicio
CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port 10000
