#!/bin/bash

# Script de Deploy para Johan Corps (Inc)
# Uso: ./deploy.sh [frontend|backend|all]

set -e

echo "🚀 Johan Corps (Inc) - Deploy Script"
echo "===================================="

# Función para deploy del frontend
deploy_frontend() {
    echo ""
    echo "📦 Deploying Frontend..."
    cd frontend
    
    # Instalar dependencias
    echo "📥 Installing dependencies..."
    npm install
    
    # Build de producción
    echo "🔨 Building for production..."
    npm run build
    
    echo "✅ Frontend build complete!"
    echo "📁 Output: frontend/dist/mecanica-web-frontend/browser"
    cd ..
}

# Función para deploy del backend
deploy_backend() {
    echo ""
    echo "⚙️  Deploying Backend..."
    cd backend
    
    # Instalar dependencias de producción
    echo "📥 Installing dependencies..."
    composer install --no-dev --optimize-autoloader
    
    # Optimizaciones de Laravel
    echo "⚡ Optimizing Laravel..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    
    # Migraciones
    echo "🗄️  Running migrations..."
    php artisan migrate --force
    
    echo "✅ Backend ready!"
    cd ..
}

# Menú de opciones
case "${1:-all}" in
    frontend)
        deploy_frontend
        ;;
    backend)
        deploy_backend
        ;;
    all)
        deploy_backend
        deploy_frontend
        echo ""
        echo "🎉 Deploy completo!"
        echo ""
        echo "📋 Archivos listos para subir:"
        echo "   - Backend: ./backend/ (todo excepto vendor/, node_modules/)"
        echo "   - Frontend: ./frontend/dist/mecanica-web-frontend/browser/"
        ;;
    *)
        echo "Uso: $0 [frontend|backend|all]"
        exit 1
        ;;
esac
