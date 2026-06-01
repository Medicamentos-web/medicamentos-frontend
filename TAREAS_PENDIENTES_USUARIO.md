# Lista de tareas pendientes — Lo que debes hacer tú

Checklist de acciones que requieren tu intervención (cuentas, API keys, configuración, etc.).

---

## 1. Base de datos

- [ ] **Crear base PostgreSQL** (Render, Supabase, Neon, Railway, etc.)
- [ ] **Obtener `DATABASE_URL`** (connection string completo)
- [ ] Añadir `DATABASE_URL` en Render → Environment

---

## 2. Email (obligatorio para registro, recordatorios, bienvenida)

Elige **una** opción:

**Opción A — Brevo (recomendado, gratis sin dominio):**
- [ ] Crear cuenta en [brevo.com](https://www.brevo.com)
- [ ] Ir a SMTP & API → API Keys → Crear API Key
- [ ] Verificar remitente (ej. alertas.medicamentos@gmail.com)
- [ ] Añadir en Render: `BREVO_API_KEY` = tu API key
- [ ] Añadir en Render: `FROM_EMAIL` = `MediControl <tu@email.com>`

**Opción B — Resend (requiere dominio):**
- [ ] Crear cuenta en [resend.com](https://resend.com)
- [ ] Verificar tu dominio
- [ ] Crear API Key
- [ ] Añadir en Render: `RESEND_API_KEY` = tu API key
- [ ] Añadir en Render: `FROM_EMAIL` = `MediControl <noreply@tudominio.com>`

**Común:**
- [ ] Añadir en Render: `ADMIN_EMAIL` = email donde recibir alertas del sistema

---

## 3. Pagos (Stripe)

- [ ] Crear cuenta en [stripe.com](https://stripe.com)
- [ ] Crear productos y precios (mensual CHF 5.99, anual CHF 53.90)
- [ ] Obtener `STRIPE_SECRET_KEY` (Dashboard → Developers → API Keys)
- [ ] Obtener `STRIPE_PRICE_ID` (ID del precio mensual)
- [ ] Obtener `STRIPE_PRICE_ID_YEARLY` (ID del precio anual)
- [ ] Configurar Webhook: URL = `https://tu-backend.onrender.com/api/billing/webhook`
- [ ] Eventos: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- [ ] Obtener `STRIPE_WEBHOOK_SECRET` del webhook
- [ ] Añadir en Render: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`, `STRIPE_PRICE_ID_YEARLY`

---

## 4. OAuth (Google / Facebook) — opcional

**Google:**
- [ ] Crear proyecto en [Google Cloud Console](https://console.cloud.google.com)
- [ ] Activar Google+ API
- [ ] Crear credenciales OAuth 2.0 (tipo: Web application)
- [ ] Añadir URL de callback: `https://tu-backend.onrender.com/auth/google/callback`
- [ ] Obtener Client ID y Client Secret
- [ ] Añadir en Render: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- [ ] Añadir en Render: `BACKEND_PUBLIC_URL` = URL pública del backend

**Facebook:**
- [ ] Crear app en [developers.facebook.com](https://developers.facebook.com)
- [ ] Añadir producto "Facebook Login"
- [ ] Configurar URL de redirección OAuth
- [ ] Obtener App ID y App Secret
- [ ] Añadir en Render: `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`
- [ ] Añadir en Render: `BACKEND_PUBLIC_URL` = URL pública del backend

---

## 5. Push notifications (opcional)

- [ ] Generar claves VAPID (o usar [vapidkeys.com](https://vapidkeys.com))
- [ ] Añadir en Render: `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`

---

## 6. Interacciones medicamentosas (opcional)

- [ ] Crear cuenta en [dev.drugbank.com](https://dev.drugbank.com)
- [ ] Solicitar API key (académica o comercial)
- [ ] Añadir en Render: `DRUGBANK_API_KEY`
- *Sin clave: la app usa un fallback local con interacciones comunes*

---

## 7. Frontend / URLs

- [ ] Definir `FRONTEND_URL` en Render (ej. `https://medicamentos-frontend.vercel.app`)
- [ ] Si usas Vercel para el frontend: configurar `FRONTEND_URL` en el backend
- [ ] Añadir en Render: `CORS_EXTRA_ORIGINS` si el frontend está en otro dominio (ej. `https://tudominio.com`)

---

## 8. Google Ads (opcional, para conversiones)

- [ ] Crear campaña en Google Ads
- [ ] Crear etiqueta de conversión
- [ ] Añadir en Vercel/Frontend: `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` = ID de la conversión

---

## 9. Contenido / copy

- [ ] Aclarar en landing qué funciones son solo en planes de pago (OCR, interacciones, presión, SOS, etc.)
- [ ] Revisar precios en landing y billing (CHF 5.99/mes, CHF 53.90/año)
- [ ] Actualizar guías PDF si cambian flujos

---

## 10. Despliegue

- [ ] Conectar repositorio a Render (backend)
- [ ] Conectar repositorio a Vercel (frontend, si aplica)
- [ ] Configurar todas las variables de entorno en Render
- [ ] Probar registro, login, pago, emails
- [ ] Probar webhook de Stripe (modo test primero)

---

## Resumen rápido — Mínimo para que funcione

| Variable / Acción        | Obligatorio | Dónde obtenerlo              |
|--------------------------|------------|-------------------------------|
| DATABASE_URL             | Sí         | Render, Supabase, Neon, etc. |
| JWT_SECRET               | Sí         | Render lo genera              |
| BREVO_API_KEY o RESEND   | Sí         | brevo.com o resend.com        |
| FROM_EMAIL               | Sí         | Tu email verificado           |
| ADMIN_EMAIL              | Sí         | Tu email                      |
| STRIPE_*                 | Sí (pagos) | stripe.com                    |
| FRONTEND_URL             | Sí         | URL de tu frontend            |
| GOOGLE/FACEBOOK_*        | No         | Para login social             |
| DRUGBANK_API_KEY         | No         | Para más interacciones        |
| VAPID_*                  | No         | Para push notifications       |

---

*Actualiza este documento según vayas completando tareas.*
