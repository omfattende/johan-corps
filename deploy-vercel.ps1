# Script de Deploy para Vercel
Write-Host "🚀 Deploy a Vercel - Johan Corps" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que existe build
if (!(Test-Path "frontend\dist\mecanica-web-frontend\browser\index.html")) {
    Write-Host "❌ No se encontró el build. Compilando..." -ForegroundColor Red
    cd frontend
    npm run build
    cd ..
}

# Instalar Vercel CLI si no existe
Write-Host "📦 Verificando Vercel CLI..." -ForegroundColor Yellow
$vercelExists = Get-Command npx -ErrorAction SilentlyContinue
if (!$vercelExists) {
    Write-Host "❌ Node.js no está instalado correctamente" -ForegroundColor Red
    exit 1
}

# Hacer commit si hay cambios pendientes
Write-Host "📤 Verificando cambios en Git..." -ForegroundColor Yellow
git add .
git commit -m "Prepare for deploy" 2>$null
git push 2>$null

# Deploy con Vercel CLI
Write-Host ""
Write-Host "🚀 Iniciando deploy en Vercel..." -ForegroundColor Green
Write-Host "Cuando te pregunte, selecciona:" -ForegroundColor Cyan
Write-Host "  - Framework: Angular" -ForegroundColor White
Write-Host "  - Root Directory: frontend" -ForegroundColor White
Write-Host "  - Build Command: npm run build" -ForegroundColor White
Write-Host "  - Output Directory: dist/mecanica-web-frontend/browser" -ForegroundColor White
Write-Host ""

npx vercel --prod

Write-Host ""
Write-Host "✅ Deploy completado!" -ForegroundColor Green
