FROM php:8.2-cli

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    unzip \
    libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www

# Copiar archivos
COPY . .

# Instalar dependencias
RUN composer install --optimize-autoloader --no-dev

# Permisos
RUN chmod -R 775 storage bootstrap/cache

# Puerto
EXPOSE 10000

# Comando de inicio
CMD php artisan migrate --force && php artisan serve --host 0.0.0.0 --port 10000
