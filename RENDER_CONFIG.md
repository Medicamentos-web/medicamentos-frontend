# Configuración Render — medicamentos-backend

## Dos repos posibles

### Opción A: medicamentos-backend (repo solo backend)
- **Root Directory:** vacío (dejar en blanco)
- El código del backend está en la raíz del repo

### Opción B: medicamentos-frontend (monorepo)
- **Root Directory:** `backend`
- El backend está en la carpeta `backend/`

## Error "Root directory backend does not exist"

Significa que Render usa un repo que **no tiene** carpeta `backend/` (probablemente medicamentos-backend).

**Solución:** En Render → Settings → Build & Deploy → **Root Directory**: borra el valor y déjalo vacío.

## Sincronizar código entre repos

**Render usa medicamentos-backend** (repo separado). Los cambios en `medicamentos_v3/backend/` NO se despliegan automáticamente.

**Para que los cambios se vean en producción:**
1. Copia los cambios de `medicamentos_v3/backend/src/index.js` a `medicamentos-backend/src/index.js` (o a la carpeta local que tengas clonada de medicamentos-backend).
2. Haz commit y push en el repo medicamentos-backend.
