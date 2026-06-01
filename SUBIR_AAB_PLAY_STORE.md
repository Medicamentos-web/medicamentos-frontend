# Subir AAB a Google Play Store — MediControl

## ✓ AAB generado

**Ubicación:**
```
c:\docker-projects\medicamentos_v3\android\app\build\outputs\bundle\release\app-release.aab
```

**Package name:** `com.medicontrol.app` (debe coincidir con la ficha en Play Console)

**Versión actual:** 1.1 (versionCode 3)

---

## Pasos para subir

### 1. Ir a Play Console

**https://play.google.com/console**

### 2. Seleccionar MediControl

### 3. Crear nueva versión

- **Producción** (para publicar a todos)
- O **Pruebas internas** / **Pruebas cerradas** (para probar primero)

### 4. Subir el AAB

- Arrastra `app-release.aab` a la zona de subida
- O clic en **Subir** y selecciona el archivo

### 5. Notas de la versión (ejemplo)

```
Versión 1.1

• Recordatorios de medicamentos
• Escaneo OCR de recetas
• Control de stock
• Gestión familiar
• Privacidad suiza
```

### 6. Revisar e implementar

- **Guardar** → **Revisar versión** → **Iniciar implementación**

---

## Generar AAB de nuevo (próximas versiones)

**Opción 1 — Script PowerShell:**
```powershell
cd c:\docker-projects\medicamentos_v3
.\build-aab.ps1
```

**Opción 2 — Manual:**
```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
cd c:\docker-projects\medicamentos_v3
npm run build
npx cap sync android
cd android
.\gradlew.bat bundleRelease
```

**Opción 3 — Android Studio:**
Build → Generate Signed Bundle / APK → Android App Bundle

---

## Subir versión nueva

Antes de generar un nuevo AAB, aumenta la versión en:

`android/app/build.gradle`:
```gradle
versionCode 4        // +1 cada subida
versionName "1.2"    // ej. 1.2, 1.3, 2.0
```

---

## Checklist antes de publicar

- [ ] Ficha de tienda completa (título, descripción, icono)
- [ ] Mínimo 2 capturas de pantalla
- [ ] Política de privacidad: https://medicamentos-frontend.vercel.app/privacy
- [ ] Clasificación de contenido completada
- [ ] Público objetivo definido

Textos listos en **FICHA_PLAY_STORE.md**
