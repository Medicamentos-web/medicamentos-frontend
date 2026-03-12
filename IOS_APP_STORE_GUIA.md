# Guía: Publicar MediControl en App Store / Google Play

## ✅ Lo que ya está hecho

- **Capacitor** instalado y configurado
- **Plataforma iOS** añadida (`ios/` folder)
- **Plataforma Android** añadida (`android/` folder) — para probar en Windows
- **Modo remoto**: la app carga desde `https://medicamentos-frontend.vercel.app` (no necesitas rebuild para cada cambio web)
- **Scripts** en `package.json`:
  - `npm run cap:sync` — sincroniza cambios con iOS y Android
  - `npm run cap:open:ios` — abre el proyecto en Xcode (solo Mac)
  - `npm run cap:open:android` — abre el proyecto en Android Studio (Windows/Mac)
  - `npm run cap:verify` — verifica que la configuración esté correcta

---

## 🧪 Probar primero (en Windows)

Puedes probar la app en **Android** sin necesidad de Mac:

1. **Instala Android Studio**: [developer.android.com/studio](https://developer.android.com/studio)
2. Durante la instalación, acepta instalar el **Android SDK**
3. Ejecuta:
   ```bash
   npm run cap:open:android
   ```
4. En Android Studio: **Run** ▶️ (o Shift+F10) para lanzar en emulador o dispositivo conectado

**Verificar configuración** (sin instalar nada extra):
```bash
npm run cap:verify
```

---

## ☁️ Publicar iOS sin Mac (solo Windows)

Puedes compilar y subir a App Store **sin tener Mac** usando servicios en la nube:

| Servicio | Precio | Cómo funciona |
|----------|--------|----------------|
| **[Capgo Build](https://capgo.app)** | ~2–5 €/build | Especializado en Capacitor. Subes el proyecto, compila en la nube y obtienes el IPA. |
| **[Codemagic](https://codemagic.io)** | Plan gratuito limitado | CI/CD con runners macOS. Conectas tu repo, configuras firma y sube a App Store. |
| **[Ionic Appflow](https://ionic.io/appflow)** | De pago | Builds nativos para Capacitor. Integración directa con App Store Connect. |
| **MacinCloud / MacStadium** | ~50 €/mes | Alquilas un Mac remoto, te conectas por escritorio y usas Xcode como si fuera local. |

**Requisitos comunes** (sin excepción):
- Cuenta **Apple Developer** (99 USD/año)
- Certificados y perfiles de firma (los servicios suelen guiarte)

**Recomendación**: Para Capacitor, **Capgo Build** es la opción más directa.

---

## 🍎 Si tienes Mac

1. **Mac** con macOS (Xcode solo funciona en Mac)
2. **Xcode** (gratis desde App Store)
3. **Cuenta Apple Developer** (99 USD/año) — [developer.apple.com](https://developer.apple.com)

---

## 📱 Pasos para compilar y probar

### 1. Abrir el proyecto en Xcode

```bash
cd c:\docker-projects\medicamentos_v3
npm run cap:open:ios
```

(O desde Mac: `npx cap open ios`)

### 2. Firmar la app

En Xcode:
- Selecciona el proyecto **App** en el navegador
- Pestaña **Signing & Capabilities**
- Marca **Automatically manage signing**
- Selecciona tu **Team** (cuenta Apple Developer)
- Si no tienes: Xcode → Preferences → Accounts → añade tu Apple ID

### 3. Configurar el Bundle Identifier

- Debe ser único: `com.medicontrol.app` (o `ch.medicontrol.app` para Suiza)
- Si ya existe en App Store, cambia a algo como `com.tudominio.medicontrol`

### 4. Probar en simulador o dispositivo

- Conecta un iPhone o usa el simulador
- Pulsa ▶️ (Run) en Xcode

---

## 🚀 Publicar en App Store

### 1. Crear App en App Store Connect

1. [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. **My Apps** → **+** → **New App**
3. Nombre: **MediControl**
4. Idioma: Alemán (Suiza) o el que prefieras
5. Bundle ID: el mismo que en Xcode

### 2. Preparar assets

- **Icono 1024×1024 px** (PNG, sin transparencia)
- **Capturas de pantalla** (iPhone 6.7", 6.5", 5.5")
- **Descripción** de la app
- **URL de privacidad**: `https://medicamentos-frontend.vercel.app/privacy`
- **URL de soporte**: tu email o web

### 3. Archivar y subir

En Xcode:
1. **Product** → **Archive**
2. Cuando termine: **Distribute App** → **App Store Connect** → **Upload**
3. En App Store Connect: completa la ficha y envía a **revisión**

---

## ⚠️ Pendiente antes de enviar a revisión

| Tarea | Estado |
|-------|--------|
| Sign in with Apple | ❌ Falta (obligatorio si usas Google/Facebook) |
| Icono 1024×1024 | ❌ Crear |
| Capturas App Store | ❌ Crear |
| Política de privacidad | ✅ Ya tienes `/privacy` |

---

## 🔧 Cambiar la URL de la app

Si la app carga desde otra URL, edita `capacitor.config.ts`:

```ts
server: {
  url: "https://tu-nueva-url.com",
  cleartext: false,
},
```

Luego: `npm run cap:sync`

---

## 📁 Estructura del proyecto

```
medicamentos_v3/
├── capacitor.config.ts    # Configuración Capacitor
├── capacitor-public/      # Assets mínimos (fallback)
│   └── index.html
├── ios/                   # Proyecto Xcode (nativo)
│   └── App/
└── ...
```

---

## Problemas frecuentes

**"No signing certificate"**  
→ Añade tu Apple ID en Xcode → Preferences → Accounts → Download Manual Profiles

**"Bundle ID already in use"**  
→ Cambia el Bundle ID a uno único (ej: `com.tunombre.medicontrol`)

**La app no carga**  
→ Verifica que `medicamentos-frontend.vercel.app` esté accesible. La app usa esa URL en modo remoto.
