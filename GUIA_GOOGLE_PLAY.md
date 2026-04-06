# Guía: Subir MediControl a Google Play

## Paso 1: Crear cuenta de desarrollador

1. Entra en **[play.google.com/console](https://play.google.com/console)**
2. Inicia sesión con tu cuenta de Google
3. Acepta el **Acuerdo de distribución de desarrolladores**
4. Paga la **cuota única de 25 USD**
5. Completa el perfil (nombre del desarrollador, email de contacto, etc.)

---

## Paso 2: Crear una nueva app

Sí, debes crear una nueva app en la consola:

1. En **Play Console** → **Todas las aplicaciones**
2. Pulsa **Crear aplicación**
3. Rellena:
   - **Nombre de la aplicación**: MediControl
   - **Idioma predeterminado**: Alemán (Suiza) o el que prefieras
   - **Tipo**: Aplicación o juego → **Aplicación**
   - **Gratuita o de pago**: **Gratuita** (con compras dentro de la app)
4. Marca las declaraciones (política de privacidad, normativas, etc.)
5. Pulsa **Crear aplicación**

---

## Paso 3: Generar el AAB (Android App Bundle)

**Importante:** Debe ser un AAB **firmado en release** (no debug). Play Store rechaza builds de depuración.

### Opción A: Android Studio

1. Abre el proyecto: `npm run cap:open:android`
2. **Build** → **Generate Signed Bundle / APK**
3. Elige **Android App Bundle** → **Next**
4. **Create new...** para crear un keystore (guárdalo bien, lo necesitarás para actualizaciones)
5. Rellena: ruta del keystore, contraseña, alias, etc. → **Next**
6. Elige **release** (no debug) → **Create**
7. Al terminar, Android Studio muestra la ruta. Suele ser `android/app/release/` o donde hayas elegido guardar.

### Opción B: Línea de comandos (Windows)

1. **Primera vez:** crea el keystore con Android Studio (Opción A, paso 4) y guárdalo (ej. `android/medicontrol.keystore`)
2. Copia `android/keystore.properties.example` como `android/keystore.properties`
3. Edita `keystore.properties` con la ruta del keystore, contraseñas y alias
4. Ejecuta: `npm run cap:build:aab`
5. El AAB se genera en: **`android/app/build/outputs/bundle/release/app-release.aab`**

### Ubicación del AAB

| Método | Ruta del archivo |
|--------|------------------|
| Android Studio | La que elijas al final, o `android/app/release/` |
| `npm run cap:build:aab` | `android/app/build/outputs/bundle/release/app-release.aab` |

---

## Paso 4: Completar la ficha en Play Console

Antes de subir el AAB, completa:

| Sección | Qué incluir |
|---------|-------------|
| **Ficha de la tienda** | Título, descripción corta (80 caracteres), descripción larga (4000 caracteres) |
| **Gráficos** | Icono 512×512, capturas de pantalla (mín. 2, recomendado 4–8) |
| **Clasificación de contenido** | Cuestionario (edad, tipo de contenido) |
| **Política de privacidad** | URL: `https://medicamentos-frontend.vercel.app/privacy` (debe coincidir con lo declarado abajo) |
| **Términos de uso** | URL: `https://medicamentos-frontend.vercel.app/terms` (recomendado para apps de salud) |
| **Publicidad** | Si solo cargas Google Ads tras consentimiento de cookies en la web: en la ficha puedes indicar que la app puede usar medición de campañas; revisa la categoría «Anuncios» según lo real |
| **Público objetivo** | Edad (p. ej. 16+ o «no dirigida a menores»), países |

### Seguridad de datos (Data safety) en Play Console

En **Política de la aplicación → Seguridad de datos** debes declarar qué datos recopila o comparte la app. Alinea las respuestas con la política publicada en `/privacy`:

| Categoría en Play Console | MediControl (orientación) |
|---------------------------|---------------------------|
| **Datos personales** | Nombre, correo, identificadores de cuenta |
| **Datos de salud y fitness** | Medicación, horarios, tomas, stock, opcional presión arterial, fecha de nacimiento si la introduces para validación |
| **Fotos y vídeos** | Imágenes que el usuario sube para OCR (etiquetas/recetas); finalidad: extracción de texto, no publicidad |
| **Información financiera** | Pagos procesados por **Stripe** (la app no guarda el número completo de tarjeta) |
| **Mensajes** | Solo si en el futuro hay chat; hoy: correos de soporte / transaccionales |
| **Actividad en la app** | Uso del servicio, logs técnicos para seguridad |
| **Identificadores del dispositivo** | Notificaciones web push según el navegador; sin ID de publicidad obligatorio si no usas el SDK de anuncios en la app nativa |

**Compartido con terceros:** indica proveedores necesarios (alojamiento/infraestructura, Stripe, correo, y **Google** solo si el usuario acepta marketing/cookies para medición de anuncios).

**Cifrado:** datos en tránsito (HTTPS); indica según tu backend.

**Eliminación de cuenta:** la app ofrece el flujo web `/delete-account`; declara que el usuario puede solicitar borrado.

**Categoría / Declaraciones de salud:** clasifica la app como herramienta de seguimiento de medicación (no diagnóstico); el aviso legal en la app y `/terms` indica que no sustituye consejo médico.

---

## Paso 5: Subir el AAB

**Rutas exactas en Play Console:**

| Canal | URL directa (tras seleccionar tu app) |
|-------|--------------------------------------|
| **Prueba interna** | `play.google.com/console/developers/app/internal-testing` |
| **Prueba cerrada** | `play.google.com/console/developers/app/closed-testing` |
| **Prueba abierta** | `play.google.com/console/developers/app/open-testing` |
| **Producción** | `play.google.com/console/developers/app/production` |

**Pasos:**

1. Entra en **[play.google.com/console](https://play.google.com/console)** y selecciona tu app **MediControl**
2. Ve a uno de los canales (por ejemplo, Prueba interna para probar primero):
   - Menú lateral → **Versión** → **Prueba interna**
   - O abre directamente: **[play.google.com/console/developers/app/internal-testing](https://play.google.com/console/developers/app/internal-testing)** (con la app ya seleccionada)
3. En la página del canal, arriba a la **derecha**, pulsa **Crear nueva versión**
   - Si no ves el botón: puede que haya tareas pendientes en el **Panel de control**
4. En la pantalla de preparación:
   - **App bundles** → **Subir** (o arrastra el archivo `.aab`)
   - **Novedades de esta versión** → escribe las notas (ej: "Primera versión de MediControl")
5. Abajo, pulsa **Siguiente** (o **Guardar**)
6. Revisa y pulsa **Iniciar lanzamiento** (o **Iniciar lanzamiento a producción** si es Producción)

**Nota:** Las cuentas nuevas (desde nov 2023) deben pasar por **Prueba cerrada** antes de publicar en Producción.

---

## Paso 6: Revisión de Google

- Google revisa la app (suele tardar **unas horas o 1–3 días**)
- Te avisarán por email si hay problemas o cuando esté publicada
- La app aparecerá en Google Play cuando la revisión sea correcta

---

## Resumen rápido

| Paso | Acción |
|------|--------|
| 1 | Crear cuenta en play.google.com/console (25 USD) |
| 2 | **Crear aplicación** → MediControl |
| 3 | Generar AAB en Android Studio (menú Build → Generate Signed Bundle / APK) |
| 4 | Completar ficha, gráficos, privacidad, clasificación |
| 5 | Menú Versión → canal (Prueba interna/Producción) → Crear nueva versión → Subir AAB |
| 6 | Esperar la revisión de Google |

---

## Enlaces útiles

- **Play Console**: https://play.google.com/console
- **Prueba interna** (subir AAB): https://play.google.com/console/developers/app/internal-testing
- **Prueba cerrada**: https://play.google.com/console/developers/app/closed-testing
- **Producción**: https://play.google.com/console/developers/app/production
- **Guía de publicación**: https://support.google.com/googleplay/android-developer/answer/9859152
- **Requisitos de gráficos**: https://support.google.com/googleplay/android-developer/answer/9866151
