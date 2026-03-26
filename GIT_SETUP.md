# Subir a GitHub para Deploy

## Si NO tienes cuenta en GitHub:

1. Ve a https://github.com
2. Click "Sign up" (Registrarse)
3. Usa tu email, crea contraseña
4. Verifica tu email

## Si YA tienes cuenta:

### Crear nuevo repositorio:
1. Ve a https://github.com/new
2. **Repository name**: `johan-corps`
3. **Description**: `Johan Corps - Plataforma de talleres y refacciones`
4. Deja en "Public" (gratis)
5. NO marques "Add a README"
6. Click **"Create repository"**

### Subir el código:

En tu terminal (en la carpeta del proyecto):

```bash
# Inicializar git
git init

# Agregar todos los archivos
git add .

# Crear commit
git commit -m "Initial commit - Johan Corps ready for deploy"

# Renombrar rama
git branch -M main

# Conectar con GitHub (reemplaza TU_USUARIO con tu nombre de usuario)
git remote add origin https://github.com/TU_USUARIO/johan-corps.git

# Subir código
git push -u origin main
```

## Verificar:

Ve a `https://github.com/TU_USUARIO/johan-corps` y deberías ver todos los archivos.

---

## ¿No tienes Git instalado?

### Opción A: Descargar ZIP y subir manualmente
1. Comprime esta carpeta en ZIP
2. Ve a tu repo en GitHub
3. Click en "Upload files"
4. Arrastra el ZIP y súbelo

### Opción B: Usar GitHub Desktop (más fácil)
1. Descarga https://desktop.github.com
2. Login con tu cuenta
3. "Add local repository"
4. Selecciona esta carpeta
5. Click "Publish repository"
