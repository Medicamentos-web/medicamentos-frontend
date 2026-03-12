# Checklist para publicar MediControl en Apple App Store

## ⚠️ Importante: tu app es una web app

Apple **no acepta PWAs directamente** en el App Store. Necesitas envolver tu app en un contenedor nativo. La opción recomendada es **Capacitor** (Ionic).

---

## 1. Requisitos técnicos

### 1.1 Wrapper nativo (Capacitor)

Tu app Next.js debe convertirse en una app nativa iOS:

```
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init
npx cap add ios
```

- **Build**: `npm run build` → los archivos estáticos van a `out/` o `dist/`
- **Sync**: `npx cap sync ios`
- **Abrir en Xcode**: `npx cap open ios`

### 1.2 Iconos y splash

- **App Store**: icono 1024×1024 px (PNG, sin transparencia)
- **App**: iconos 20, 29, 40, 60, 76, 83.5, 1024 px
- **Splash screen**: para iPhone y iPad

Tu `manifest.json` referencia `icon-192.png` e `icon-512.png` — verifica que existan en `/public`. Capacitor puede generar los iconos desde uno de 1024×1024.

### 1.3 URLs de producción

En Capacitor (`capacitor.config.ts`), la app cargará tu URL de producción (Vercel) o los archivos estáticos locales. Para una web app alojada:

```ts
// capacitor.config.ts
server: {
  url: "https://medicamentos-frontend.vercel.app",
  cleartext: true  // solo para desarrollo
}
```

---

## 2. Requisitos de Apple

### 2.1 Cuenta Apple Developer

- **Coste**: 99 USD/año
- Registro en [developer.apple.com](https://developer.apple.com)

### 2.2 Sign in with Apple

Si ofreces **Google** o **Facebook** como login, Apple **exige** que también ofrezcas **Sign in with Apple** (mismo tamaño y visibilidad).

**Acción**: Implementar Sign in with Apple en el backend y en el frontend.

### 2.3 Pagos (Stripe vs Apple IAP)

**Norma general de Apple**: para suscripciones que desbloquean funciones dentro de la app, Apple exige **In-App Purchase (IAP)** y se queda un 15–30 %.

**Tu caso**: Suscripción CHF 5.99/mes para desbloquear funciones.

**Opciones**:

| Opción | Descripción |
|-------|-------------|
| **A) Apple IAP** | Implementar StoreKit 2. Sincronizar con tu backend (webhook de App Store). Cumple 100 % con las normas. |
| **B) Stripe + enlace externo** | Tras el fallo Epic v. Apple (2025), en EE.UU. se permite enlazar a checkout externo. En Europa/Suiza la situación puede ser distinta. |
| **C) Solo web** | Mantener la app en la web (PWA) y no publicar en App Store. Los usuarios la instalan desde Safari "Añadir a pantalla de inicio". |

**Recomendación**: Para evitar rechazos, usa **Apple IAP** para la versión iOS. Mantén Stripe para web y Android.

### 2.4 Política de privacidad

- **URL obligatoria** en App Store Connect
- Ya tienes `/privacy` — usa: `https://medicamentos-frontend.vercel.app/privacy`
- Debe cubrir: datos que recoges, uso, terceros (Google Ads, etc.)

### 2.5 Términos de uso

Apple puede pedir términos de uso. Crea `/terms` si no existe.

---

## 3. Lo que ya tienes listo ✅

- [x] Login (email, Google, Facebook)
- [x] Stripe para web
- [x] Política de privacidad (`/privacy`)
- [x] Manifest y meta tags para PWA
- [x] Service Worker para notificaciones
- [x] Diseño responsive
- [x] Cookie consent

---

## 4. Lo que falta o hay que adaptar

| Tarea | Prioridad | Esfuerzo |
|-------|-----------|----------|
| Instalar y configurar Capacitor | Alta | 1–2 h |
| Generar iconos iOS (1024, set completo) | Alta | 30 min |
| Implementar Sign in with Apple | Alta | 2–4 h |
| Decidir: IAP o Stripe externo | Alta | — |
| Si IAP: integrar StoreKit 2 + webhooks | Alta | 4–8 h |
| Crear splash screen | Media | 30 min |
| Página de términos (`/terms`) | Media | 1 h |
| Probar en dispositivo físico | Alta | 1–2 h |
| Preparar capturas para App Store | Media | 1 h |

---

## 5. Pasos sugeridos

1. **Crear cuenta Apple Developer** (99 USD/año).
2. **Añadir Capacitor** y generar el proyecto iOS.
3. **Implementar Sign in with Apple** (obligatorio si usas Google/Facebook).
4. **Definir estrategia de pagos**: IAP o enlace a Stripe (según región y riesgo de rechazo).
5. **Probar** en iPhone real.
6. **Subir** a App Store Connect y enviar a revisión.

---

## 6. Alternativa sin App Store

Si quieres evitar IAP y Sign in with Apple:

- Mantener la app como **PWA**
- Los usuarios la instalan desde Safari: Compartir → Añadir a pantalla de inicio
- No hay coste de 99 USD ni comisiones de Apple
- Limitación: no aparece en la App Store ni en búsquedas

---

## Resumen

| ¿Listo? | Sí/No |
|---------|-------|
| Login | ✅ Sí |
| Stripe (web) | ✅ Sí |
| Privacidad | ✅ Sí |
| Wrapper nativo (Capacitor) | ❌ Falta |
| Sign in with Apple | ❌ Falta |
| Pagos iOS (IAP o alternativa) | ❌ Por decidir |
| Iconos y assets iOS | ⚠️ Revisar |

¿Quieres que te guíe paso a paso para añadir Capacitor y preparar el proyecto iOS?
