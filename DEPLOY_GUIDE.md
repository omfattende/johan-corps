# Guía de Deploy - Autostock

## Opción 1: Vercel (Frontend) + Render (Backend) - RECOMENDADO

### Ventajas:
- Gratis para proyectos pequeños
- SSL automático
- Deploy continuo desde GitHub
- Muy fácil de configurar

---

## PREPARACIÓN INICIAL

### 1. Subir a GitHub

```bash
# En la carpeta raíz del proyecto
git init
git add .
git commit -m "Initial commit - Autostock"
git branch -M main

# Crear repositorio en GitHub y:
git remote add origin https://github.com/TU_USUARIO/autostock.git
git push -u origin main
```

---

## OPCIÓN A: DEPLOY EN VERCEL (Frontend)

### Paso 1: Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Regístrate con GitHub
3. Click en "Add New Project"

### Paso 2: Importar proyecto
1. Selecciona tu repositorio `autostock`
2. En "Root Directory" escribe: `frontend`
3. Framework Preset: `Angular`
4. Build Command: `npm run build`
5. Output Directory: `dist/mecanica-web-frontend/browser`

### Paso 3: Variables de entorno (Environment Variables)
```
NODE_VERSION = 20
```

### Paso 4: Deploy
Click en "Deploy" y espera ~2 minutos.

**Tu frontend estará en:** `https://autostock-frontend.vercel.app`

---

## OPCIÓN B: DEPLOY EN RENDER (Backend)

### Paso 1: Crear cuenta en Render
1. Ve a https://render.com
2. Regístrate con GitHub

### Paso 2: Crear Web Service
1. Click "New" → "Web Service"
2. Conecta tu repositorio GitHub
3. Configuración:
   - **Name**: `autostock-backend`
   - **Root Directory**: `backend`
   - **Environment**: `PHP`
   - **Build Command**:
     ```bash
     composer install --no-dev --optimize-autoloader
     php artisan config:cache
     php artisan route:cache
     php artisan view:cache
     php artisan migrate --force
     ```
   - **Start Command**:
     ```bash
     php artisan serve --host=0.0.0.0 --port=$PORT
     ```

### Paso 3: Variables de Entorno
```
APP_ENV = production
APP_DEBUG = false
APP_KEY = (generar con: php artisan key:generate --show)
APP_URL = https://autostock-backend.onrender.com

DB_CONNECTION = sqlite
DB_DATABASE = database/database.sqlite

SANCTUM_STATEFUL_DOMAINS = autostock-frontend.vercel.app
SESSION_DOMAIN = autostock-frontend.vercel.app
CORS_ALLOWED_ORIGINS = https://autostock-frontend.vercel.app
```

### Paso 4: Deploy
Click en "Create Web Service"

**Tu backend estará en:** `https://autostock-backend.onrender.com`

---

## CONECTAR FRONTEND CON BACKEND

### Actualizar URL del Backend en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega:
   ```
   API_URL = https://autostock-backend.onrender.com/api
   ```
4. Re-deploy: "Redeploy" en la última versión

### O actualizar en código:
Edita `frontend/src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://autostock-backend.onrender.com/api'
};
```

Haz commit y push:
```bash
git add .
git commit -m "Update production API URL"
git push
```

---

## OPCIÓN 2: NETLIFY (Frontend) + RAILWAY (Backend)

### Netlify (Frontend)
1. Ve a https://netlify.com
2. "Add new site" → "Import an existing project"
3. Selecciona GitHub repo
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist/mecanica-web-frontend/browser`

### Railway (Backend)
1. Ve a https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Selecciona tu repo
4. Variables de entorno (mismas que Render)

---

## OPCIÓN 3: HOSTING COMPARTIDO (cPanel)

Para hosting tradicional como Hostinger, Bluehost, etc.

### Frontend (Subir archivos estáticos)
```bash
cd frontend
npm run build
# Subir contenido de dist/mecanica-web-frontend/browser a public_html
```

### Backend (Subir por FTP)
```bash
cd backend
# Subir TODO excepto:
# - vendor/ (hacer composer install en el servidor)
# - .env (crear manualmente en el servidor)
# - storage/logs/* (limpiar)
```

En el hosting, editar `.htaccess`:
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

---

## OPCIÓN 4: VPS (DigitalOcean, AWS, Linode)

### Requisitos del servidor:
- Ubuntu 22.04 LTS
- PHP 8.2+
- Composer
- Node.js 20+
- Nginx o Apache

### Instalación rápida:
```bash
# En el servidor Ubuntu
sudo apt update && sudo apt upgrade -y

# Instalar PHP y extensiones
sudo apt install php8.2 php8.2-sqlite3 php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip unzip -y

# Instalar Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Clonar proyecto
git clone https://github.com/TU_USUARIO/autostock.git
cd autostock

# Backend
cd backend
composer install --no-dev
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache

# Frontend
cd ../frontend
npm install
npm run build

# Servir con Nginx (configuración necesaria)
```

---

## CHECKLIST POST-DEPLOY

### Verificar Backend:
```bash
curl https://TU_BACKEND_URL/api/workshops
curl https://TU_BACKEND_URL/api/vehicles/brands
```

### Verificar Frontend:
- [ ] Logo carga correctamente
- [ ] Lista de talleres aparece
- [ ] Selector de vehículos funciona
- [ ] Login/registro funciona
- [ ] Favicon visible

---

## SOLUCIÓN DE PROBLEMAS

### Error: CORS
Verificar `CORS_ALLOWED_ORIGINS` en backend coincida con la URL del frontend.

### Error: 500 en API
Verificar que la base de datos SQLite existe y tiene datos:
```bash
# En el servidor backend
php artisan migrate:fresh --seed --force
```

### Error: No se ven las imágenes
Las imágenes de Unsplash deben cargar. Si usas imágenes locales, súbelas al storage del hosting.

---

## SOPORTE

Si tienes problemas con el deploy:
1. Revisar logs en el dashboard de la plataforma
2. Verificar variables de entorno
3. Asegurar que la base de datos SQLite tenga permisos de escritura

---

**¿Necesitas ayuda con algún paso específico?**
