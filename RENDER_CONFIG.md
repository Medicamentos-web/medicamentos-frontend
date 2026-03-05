# Configuración Render — medicamentos-backend

## Repositorio

- **Repo:** `Medicamentos-web/medicamentos-frontend` (monorepo con frontend + backend)
- **Backend:** carpeta `backend/`

## Configuración necesaria en Render Dashboard

Para que Render despliegue el backend con el código actualizado:

1. **Render** → **medicamentos-backend** → **Settings**
2. En **Build & Deploy**:
   - **Repository:** `Medicamentos-web/medicamentos-frontend`
   - **Branch:** `main`
   - **Root Directory:** `backend` ← **Importante:** debe ser `backend` para que use la carpeta correcta
3. Guarda

## Si Root Directory está vacío o incorrecto

Si Root Directory está vacío, Render usa la raíz del repo y no encuentra `backend/src/index.js`. El código con Brevo está en `backend/src/index.js`.

**Solución:** Pon **Root Directory** = `backend` en Render → Settings → Build & Deploy.

## Verificar deploy

Tras cambiar Root Directory, haz **Manual Deploy** → **Clear build cache & deploy**.

Cuando termine, en Admin → Ajustes debería aparecer **Proveedor: Brevo (API)** (si `BREVO_API_KEY` está configurada).
