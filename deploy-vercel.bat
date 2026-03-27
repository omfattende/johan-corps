@echo off
echo Deploy a Vercel - Autostock
echo ===============================
echo.

echo Verificando build...
if not exist "frontend\dist\autostock-frontend\browser\index.html" (
    echo Compilando frontend...
    cd frontend
    call npm run build
    cd ..
)

echo Subiendo cambios a Git...
git add .
git commit -m "Prepare for deploy" 2>nul
git push 2>nul

echo.
echo Iniciando deploy en Vercel...
echo Cuando te pregunte, selecciona:
echo   - Framework: Angular
echo   - Root Directory: frontend
echo   - Build Command: npm run build
echo   - Output Directory: dist/autostock-frontend/browser
echo.

call npx vercel --prod

echo.
echo Deploy completado!
pause
