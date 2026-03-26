# 🚀 Deploy Rápido - Johan Corps (Inc)

## Opción más fácil y rápida: Vercel + Render

---

## 1️⃣ DEPLOY FRONTEND (Vercel) - 3 minutos

### Paso 1: Preparar
```bash
cd frontend
npm install
npm run build
```

### Paso 2: Deploy
1. Ve a https://vercel.com
2. Login con GitHub
3. "Add New Project" → Importar tu repo
4. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output**: `dist/mecanica-web-frontend/browser`
5. Click "Deploy"

**Listo!** 🎉 Tu frontend estará en: `https://TU_PROYECTO.vercel.app`

---

## 2️⃣ DEPLOY BACKEND (Render) - 5 minutos

### Paso 1: Crear cuenta
1. Ve a https://render.com
2. Login con GitHub

### Paso 2: Crear Web Service
1. "New" → "Web Service"
2. Conectar tu repositorio
3. Configurar:
```yaml
Name: johan-corps-backend
Root Directory: backend
Environment: PHP
Build Command: |
  composer install --no-dev --optimize-autoloader
  php artisan config:cache
  php artisan route:cache
  php artisan view:cache
  php artisan migrate --force
Start Command: php artisan serve --host=0.0.0.0 --port=$PORT
```

### Paso 3: Variables de entorno
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=(genera uno nuevo)
APP_URL=https://johan-corps-backend.onrender.com
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
SANCTUM_STATEFUL_DOMAINS=TU_FRONTEND.vercel.app
CORS_ALLOWED_ORIGINS=https://TU_FRONTEND.vercel.app
```

### Paso 4: Click "Create Web Service"

**Listo!** 🎉 Tu backend estará en: `https://johan-corps-backend.onrender.com`

---

## 3️⃣ CONECTAR FRONTEND Y BACKEND

### Actualizar URL en Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
```
API_URL=https://johan-corps-backend.onrender.com/api
```
4. Re-deploy

### O editar código y push:
Edita `frontend/src/environments/environment.prod.ts`:
```typescript
apiUrl: 'https://johan-corps-backend.onrender.com/api'
```

```bash
git add .
git commit -m "Update API URL for production"
git push
```

---

## ✅ VERIFICAR DEPLOY

Abre tu frontend y prueba:
- [ ] Logo de Johan Corps visible
- [ ] Lista de talleres carga
- [ ] Login funciona
- [ ] Favicon (fav.png) visible

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error CORS:
Actualiza `CORS_ALLOWED_ORIGINS` en Render con tu URL de Vercel exacta.

### Error 500:
Verifica que la base de datos SQLite existe:
```bash
# En Render dashboard → Shell
php artisan migrate:fresh --seed --force
```

### No carga el favicon:
Asegúrate que `fav.png` está en `frontend/public/fav.png`

---

**¿Necesitas ayuda?** Revisa `DEPLOY_GUIDE.md` para más detalles. 🚀
