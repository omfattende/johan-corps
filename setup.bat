@echo off
echo ============================
echo  Mecánica Web - Setup Script
echo ============================

echo.
echo [1/4] Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo [2/4] Installing backend dependencies...
cd backend
call composer install --no-interaction --prefer-dist
cd ..

echo.
echo [3/4] Generating Laravel application key...
cd backend
call php artisan key:generate
cd ..

echo.
echo Setup complete!
echo.
echo Next steps:
echo - Configure your PostgreSQL password in backend\.env
echo - Run: cd backend ^&^& php artisan migrate --seed
echo - Run: cd frontend ^&^& npm start  (in another terminal)
echo - Run: cd backend ^&^& php artisan serve  (in another terminal)
echo - Open http://localhost:4200
pause
