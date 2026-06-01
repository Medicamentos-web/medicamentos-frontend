# Configurar Resend (para Render Free)

Render Free **bloquea** los puertos SMTP (587, 465). Resend usa HTTP y funciona.

## Pasos

### 1. Crear cuenta
- [resend.com](https://resend.com) → Sign up (gratis)

### 2. Crear API Key
- Dashboard → **API Keys** → **Create API Key**
- Copia la key (empieza con `re_`)

### 3. Añadir en Render
- Render → **medicamentos-backend** → **Environment**
- **Add Environment Variable**:
  - Key: `RESEND_API_KEY`
  - Value: `re_xxxxxxxxx` (tu API key)

### 4. (Opcional) FROM_EMAIL
- Por defecto: `MediControl <onboarding@resend.dev>` (funciona sin verificar)
- Para tu dominio: verifica en Resend → Domains, luego:
  - Key: `FROM_EMAIL`
  - Value: `MediControl <noreply@tudominio.com>`

### 5. Guardar
- Render reinicia automáticamente
- Espera 1-2 min
- **Ajustes** → **Enviar email de prueba**
