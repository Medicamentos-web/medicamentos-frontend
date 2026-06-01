# Guía App Store — MediControl paso a paso

Publicar MediControl en iOS. Adaptada para quienes vienen de Play Store.

---

## Requisitos previos

| Requisito | Estado |
|-----------|--------|
| Cuenta Apple Developer (99 USD/año) | [developer.apple.com](https://developer.apple.com) |
| Proyecto iOS (Capacitor) | ✅ Ya tienes `ios/` |
| Icono 1024×1024 | ✅ Ya tienes en `ios/App/App/Assets.xcassets/AppIcon.appiconset/` |
| Mac o servicio en la nube | Necesario para compilar |

---

## ¿Mac o Windows?

### Si tienes Mac

Sigue la **Sección A** más abajo.

### Si solo tienes Windows

Usa un servicio de build en la nube (no necesitas Mac):

| Servicio | Precio | Recomendado para |
|----------|--------|-------------------|
| **[Capgo Build](https://capgo.app)** | ~3–5 €/build | Capacitor, muy sencillo |
| **[Codemagic](https://codemagic.io)** | Plan gratis (builds limitados) | CI/CD, más flexible |
| **MacinCloud** | ~50 €/mes | Si necesitas Xcode completo |

**Recomendación:** Empieza con **Capgo Build** o **Codemagic**.

---

## ⚠️ Obligatorio antes de enviar a revisión

### Sign in with Apple

**Si tu app tiene login con Google o Facebook, Apple exige también "Sign in with Apple".** Sin esto, Apple rechazará la app.

Opciones:
1. **Implementar Sign in with Apple** (backend + frontend) — 2–4 h
2. **Quitar temporalmente** Google/Facebook y dejar solo email — revisión más rápida

---

## Sección A: Publicar con Mac + Xcode

### Paso 1: Cuenta Apple Developer

1. [developer.apple.com](https://developer.apple.com) → **Account** → **Enroll**
2. Pago 99 USD/año
3. Espera 24–48 h para aprobación

### Paso 2: Abrir el proyecto

```bash
cd c:\docker-projects\medicamentos_v3
npm run build
npm run cap:sync
npx cap open ios
```

(En Mac: `npx cap open ios`)

### Paso 3: Configurar firma en Xcode

1. Selecciona el proyecto **App** (panel izquierdo)
2. Pestaña **Signing & Capabilities**
3. Marca **Automatically manage signing**
4. **Team:** selecciona tu cuenta Apple Developer
5. Si no aparece: **Xcode → Settings → Accounts** → añade tu Apple ID

### Paso 4: Bundle Identifier

- Debe ser único: `com.medicontrol.app`
- Si ya existe en App Store: `ch.medicontrol.app` o `com.tudominio.medicontrol`

### Paso 5: Probar en dispositivo

1. Conecta un iPhone por cable
2. Selecciónalo como destino
3. Pulsa ▶️ **Run**
4. Si pide "Trust": en el iPhone → Ajustes → General → Gestión de dispositivos → Confiar

### Paso 6: Crear app en App Store Connect

1. [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. **My Apps** → **+** → **New App**
3. Rellena:
   - **Platform:** iOS
   - **Name:** MediControl
   - **Primary Language:** German (Switzerland) o English
   - **Bundle ID:** el mismo que en Xcode
   - **SKU:** medicontrol-001 (cualquier identificador único)

### Paso 7: Preparar la ficha en App Store Connect

1. **App Information:** nombre, categoría (Health & Fitness), privacidad
2. **Pricing:** Free (o Paid si cobras)
3. **Privacy Policy URL:** `https://medicamentos-frontend.vercel.app/privacy`
4. **App Privacy:** responde el cuestionario (datos que recoges)

### Paso 8: Capturas de pantalla

Necesitas capturas en estos tamaños (mínimo):

| Dispositivo | Tamaño | Cantidad mínima |
|------------|--------|-----------------|
| iPhone 6.7" | 1290×2796 px | 3 |
| iPhone 6.5" | 1284×2778 px | 3 |
| iPad Pro 12.9" (si soportas iPad) | 2048×2732 px | 3 |

**Cómo obtenerlas:** Ejecuta la app en simulador (iPhone 15 Pro Max) → Cmd+S para captura.

### Paso 9: Archive y subir

1. En Xcode: **Product** → **Archive**
2. Cuando termine: **Distribute App**
3. **App Store Connect** → **Upload**
4. Sigue el asistente (firma automática)
5. Espera 5–15 min para que aparezca en App Store Connect

### Paso 10: Completar y enviar a revisión

1. En App Store Connect → tu app → **App Store** (pestaña)
2. Crea una **nueva versión** (ej. 1.0)
3. Rellena:
   - **What's New:** "Primera versión de MediControl. Recordatorios, escaneo OCR, control de stock."
   - **Description:** (usa el texto de FICHA_PLAY_STORE.md en la sección 4)
   - **Keywords:** medicamentos, recordatorios, recetas, familia, salud
   - **Support URL:** tu web o `mailto:tu@email.com`
   - **Marketing URL:** (opcional) tu web
4. Añade las **capturas**
5. **Build:** selecciona el que acabas de subir
6. Responde las preguntas de **Export Compliance**, **Content Rights**, etc.
7. **Add for Review** → **Submit to App Review**

---

## Sección B: Publicar con Windows (sin Mac)

### Opción B1: Capgo Build

1. [capgo.app](https://capgo.app) → Regístrate
2. Conecta tu repo (GitHub/GitLab) o sube un zip
3. Configura:
   - **Platform:** iOS
   - **Bundle ID:** com.medicontrol.app
   - **Apple credentials:** certificados y provisioning profile (Capgo te guía)
4. Ejecuta el build
5. Descarga el IPA y súbelo con **Transporter** (app de Mac/Windows) a App Store Connect

### Opción B2: Codemagic

1. [codemagic.io](https://codemagic.io) → Regístrate con GitHub
2. Conecta el repo `medicamentos_v3`
3. Crea un **workflow** para iOS
4. Configura firma (certificados en Codemagic)
5. Cada push o manual trigger genera un build
6. Codemagic puede subir directo a App Store Connect

### Opción B3: Transporter (solo para subir IPA)

Si ya tienes un IPA (de Capgo, Codemagic, etc.):

1. Instala **Transporter** desde [Mac App Store](https://apps.apple.com/app/transporter/id1450874784) — también hay versión Windows en algunas regiones, o usa [App Store Connect API](https://appstoreconnect.apple.com/access/api)
2. Arrastra el IPA a Transporter
3. Sube a App Store Connect

---

## Textos listos para copiar (App Store)

### Descripción corta (subtitle, 30 caracteres máx)

```
Recordatorios y control de medicamentos
```

### Descripción (descripción larga)

Usa el texto de la sección 4 de `FICHA_PLAY_STORE.md` (versión en español o alemán).

### Palabras clave

```
medicamentos,recordatorios,recetas,familia,salud,receta médica,stock
```

### What's New (primera versión)

```
Primera versión de MediControl.

• Recordatorios de medicamentos
• Escaneo OCR de recetas
• Control de stock
• Gestión familiar
• Privacidad suiza
```

---

## Checklist final antes de enviar

- [ ] Cuenta Apple Developer activa
- [ ] Sign in with Apple implementado (o sin Google/Facebook)
- [ ] Icono 1024×1024
- [ ] Capturas de pantalla (mín. 3 por tamaño)
- [ ] URL de privacidad
- [ ] App probada en iPhone real
- [ ] Build subido a App Store Connect
- [ ] Ficha completa en App Store Connect
- [ ] Enviado a revisión

---

## Tiempos habituales

| Paso | Tiempo |
|------|--------|
| Crear cuenta Apple Developer | 24–48 h |
| Revisión de Apple | 1–3 días (a veces 24 h) |
| Publicación tras aprobación | Inmediata |

---

## Enlaces útiles

- [App Store Connect](https://appstoreconnect.apple.com)
- [Apple Developer](https://developer.apple.com)
- [Guía de revisión de App Store](https://developer.apple.com/app-store/review/guidelines/)
- [Capgo Build](https://capgo.app)
- [Codemagic](https://codemagic.io)
