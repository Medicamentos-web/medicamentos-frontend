# Versión 3 (1.1) — Cambios

**versionCode:** 3  
**versionName:** 1.1  

---

## Android

- **Icono de la app** alineado con iOS: logo MediControl (gradiente verde–cian, “M”) en iconos estándar, redondos y adaptativos (Android 8+).
- **Pantallas de inicio (splash)** regeneradas con el mismo estilo de marca.
- **Recursos de iconos** generados desde `resources/` con `@capacitor/assets` (fuente: icono de App Store 1024×1024).
- **Nombre de paquete** estable en **`com.medicontrol.app`** (coincide con la ficha en Google Play Console).

---

## Herramientas y documentación

- Script **`build-aab.ps1`** y comando **`npm run android:aab`** para generar el AAB en Windows (usa el JDK de Android Studio).
- Guías: **`SUBIR_AAB_PLAY_STORE.md`**, **`CODEMAGIC_SETUP.md`**, **`CODEMAGIC_WINDOWS.md`**, **`GUIA_APP_STORE_PASO_A_PASO.md`**.
- **`codemagic.yaml`**: build iOS en la nube (Codemagic).

---

## Otros

- **`capacitor.config.ts`**: `appId` `com.medicontrol.app`.
- Enlace a Google Play en el panel admin del backend actualizado al package correcto.

---

## Texto para “Detalles de la versión” / Play Store

**Español (copiar y pegar):**

```
Versión 1.1

• Icono de la app unificado con la marca MediControl
• Pantalla de inicio actualizada
• Mejoras de estabilidad en la app Android
```

**Alemán (de-CH):**

```
Version 1.1

• App-Icon an MediControl-Branding angeglichen
• Aktualisierter Startbildschirm
• Stabilitätsverbesserungen (Android)
```

**Inglés:**

```
Version 1.1

• App icon aligned with MediControl branding
• Updated splash screen
• Stability improvements (Android)
```
