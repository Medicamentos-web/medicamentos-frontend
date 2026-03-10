# Vercel no actualiza — Cómo forzar el deploy

## 1. Comprobar conexión Git

1. Entra en [vercel.com/dashboard](https://vercel.com/dashboard)
2. Abre el proyecto **medicamentos-frontend**
3. **Settings** → **Git**
4. Verifica:
   - **Connected Git Repository**: `Medicamentos-web/medicamentos-frontend`
   - **Production Branch**: `main`
   - **Auto-Deploy**: activado (Deploy on push)

## 2. Redeploy manual

1. En el proyecto → pestaña **Deployments**
2. En el último deployment → menú **⋯** (tres puntos)
3. **Redeploy** → confirma

## 3. Deploy Hook (para forzar desde terminal)

1. **Settings** → **Git** → **Deploy Hooks**
2. **Create Hook**: nombre "Manual" / branch "main"
3. Copia la URL que genera (ej. `https://api.vercel.com/v1/integrations/deploy/...`)
4. Para disparar un deploy:
   ```bash
   curl -X POST "TU_URL_AQUI"
   ```

## 4. Si el repo está mal conectado

- Si el proyecto usa otro repo o no está conectado: **Settings** → **Git** → **Disconnect** y vuelve a conectar con `Medicamentos-web/medicamentos-frontend`.

## 5. Último commit en main

```
3f673e8 Revert: quitar dynamic import, restaurar page.jsx original
```

Si Vercel está bien configurado, cada `git push origin main` debería disparar un deploy automático.
