# Checklist Produccion + Monetizacion (MediControl)

Objetivo: salir a produccion con cobro activo y medicion de conversiones para escalar anuncios.

## 1) Infra y despliegue

- [ ] Frontend en Vercel en dominio final (sin errores 5xx).
- [ ] Backend en Render actualizado desde `medicamentos-backend-sync`.
- [ ] Variables de entorno de produccion revisadas (frontend + backend).
- [ ] Endpoint de salud verificado (`/health` o equivalente).

## 2) Facturacion en vivo (Stripe)

- [ ] Stripe en modo live (no test).
- [ ] Productos/precios activos:
  - [ ] Mensual: CHF 4.99
  - [ ] Anual: CHF 53.90
- [ ] Webhook live funcionando (alta, renovacion, cancelacion, pago fallido).
- [ ] Flujo completo verificado:
  - [ ] Checkout mensual
  - [ ] Checkout anual
  - [ ] Retorno `success=1`
  - [ ] Cancelacion `cancelled=1`
  - [ ] Portal de cliente

## 3) Conversion tracking (ads)

- [ ] Consentimiento de cookies activo (necesarias/marketing).
- [ ] Google Ads tag cargado solo con consentimiento marketing.
- [ ] Eventos instrumentados:
  - [ ] `trial_signup` (landing/care)
  - [ ] `lead_signup` (landing/care)
  - [ ] `subscribe_success` (billing success)
- [ ] Etiquetas conversion Google Ads configuradas:
  - [ ] `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_TRIAL`
  - [ ] `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SUBSCRIBE`
  - [ ] fallback `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
- [ ] Meta Pixel verificado si se usa (`Lead`, `StartTrial`, `Subscribe`).

## 4) Stores (publicacion)

- [ ] Android: AAB nuevo con `versionCode` superior al ultimo usado.
- [ ] Ruta AAB: `android/app/build/outputs/bundle/release/`.
- [ ] iOS: build TestFlight generado y subido desde Codemagic.
- [ ] Ficha y politicas actualizadas:
  - [ ] `/privacy`
  - [ ] `/terms`
  - [ ] `/cookies`
  - [ ] `/delete-account`

## 5) Go-to-market y dinero

- [ ] Campanas DE/ES/EN activas con creatives por idioma.
- [ ] CTA unico: registro/prueba gratis.
- [ ] UTM por canal (`utm_source`, `utm_campaign`) en enlaces de anuncios.
- [ ] Dashboard semanal con KPIs:
  - [ ] Trials/semana
  - [ ] Trial->Pago
  - [ ] CAC
  - [ ] Churn mensual
  - [ ] MRR

## 6) Operacion

- [ ] Soporte comercial listo (respuestas pago/login).
- [ ] Flujo de recuperacion de pago fallido por email.
- [ ] Backups y monitoreo de errores.

## Nota rapida de ejecucion

Prioridad para empezar a facturar hoy:
1. Stripe live + webhook OK.
2. Subir AAB/IPA vigentes.
3. Activar campana con CTA a landing.
4. Confirmar en analytics que entran `trial_signup` y `subscribe_success`.
