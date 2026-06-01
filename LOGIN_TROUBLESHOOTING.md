# Solución de problemas de login

## "No veo el botón de Google" / "Google Anmeldung no aparece"

**El login con Google está en la app principal, no en la landing.**

1. **Ve a la app:** [medicamentos-frontend.vercel.app](https://medicamentos-frontend.vercel.app) (raíz `/`)
2. Si estás en `/landing` o `/care`, haz clic en **"Anmelden"** (arriba a la derecha) para ir a la pantalla de login
3. En la pantalla de login verás: Family ID, Email, Contraseña, **y debajo "o continúa con" → Google y Facebook**

**No es solo para usuarios nuevos.** Cualquier persona puede usar Google para entrar (crea cuenta si no existe, o inicia sesión si ya existe).

---

## "Credenciales inválidas" (email + contraseña)

### 1. ¿Te registraste con Google?
Si creaste la cuenta con "Iniciar sesión con Google", **no puedes usar email/contraseña**. Debes usar siempre el botón de Google.

### 2. Contraseña incorrecta
- Usa **"Olvidé mi contraseña"** para recibir un token de recuperación por email
- O contacta al administrador para que reenvíe credenciales desde el panel admin

### 3. Family ID incorrecto
- Si introduces un Family ID que no coincide con tu cuenta, fallará
- **Prueba dejando el Family ID vacío** — el sistema busca por email solo

### 4. Cuenta recién creada (trial)
- Si te registraste desde la landing, recibiste un email con:
  - **Family ID**
  - **Email**
  - **Contraseña temporal**
- Usa exactamente esos datos
- Debes cambiar la contraseña en el primer login

---

## Google OAuth no funciona

### 1. Verificar que el backend tiene las credenciales
En **Render** → tu servicio backend → **Environment**:
- `GOOGLE_CLIENT_ID` (ej: xxx.apps.googleusercontent.com)
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL` = `https://medicamentos-backend.onrender.com/auth/google/callback`
- `FRONTEND_URL` = `https://medicamentos-frontend.vercel.app`
- `BACKEND_PUBLIC_URL` = `https://medicamentos-backend.onrender.com`

Si faltan, el botón de Google redirige a una página 404.

### 2. Verificar Google Cloud Console
1. Ve a [console.cloud.google.com](https://console.cloud.google.com) → APIs y servicios → Credenciales
2. Abre tu **ID de cliente OAuth 2.0**
3. En **URIs de redirección autorizados** debe estar exactamente:
   ```
   https://medicamentos-backend.onrender.com/auth/google/callback
   ```
4. En **Orígenes JavaScript autorizados**:
   ```
   https://medicamentos-frontend.vercel.app
   ```

### 3. Verificar Vercel (frontend)
En **Vercel** → tu proyecto → Settings → Environment Variables:
- `BACKEND_INTERNAL_URL` = `https://medicamentos-backend.onrender.com`

Sin esto, las peticiones `/auth/login` y `/auth/google` no llegan al backend.

### 4. Probar el backend directamente
Abre en el navegador:
```
https://medicamentos-backend.onrender.com/auth/google
```
- Si te redirige a Google → el backend está bien configurado
- Si da 404 → faltan GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en Render

---

## Resumen de variables

| Dónde   | Variable              | Valor                                      |
|---------|-----------------------|--------------------------------------------|
| Render  | GOOGLE_CLIENT_ID      | (de Google Cloud)                          |
| Render  | GOOGLE_CLIENT_SECRET  | (de Google Cloud)                         |
| Render  | GOOGLE_CALLBACK_URL   | https://medicamentos-backend.onrender.com/auth/google/callback |
| Render  | FRONTEND_URL          | https://medicamentos-frontend.vercel.app   |
| Render  | BACKEND_PUBLIC_URL    | https://medicamentos-backend.onrender.com  |
| Vercel  | BACKEND_INTERNAL_URL  | https://medicamentos-backend.onrender.com  |

---

## Acceso de emergencia (admin)

Si tienes acceso al panel admin:
1. Ve a `https://medicamentos-backend.onrender.com/dashboard`
2. Inicia sesión como admin
3. Usuarios → puedes **reenviar credenciales** por email al usuario
4. O ver el **auth_provider** de cada usuario (email / google / facebook)
