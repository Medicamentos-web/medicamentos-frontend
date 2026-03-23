# Configurar Codemagic para MediControl iOS

## 1. Subir el proyecto a GitHub

Si aún no está en GitHub:

```bash
cd c:\docker-projects\medicamentos_v3
git init
git add .
git commit -m "Add codemagic.yaml for iOS build"
git remote add origin https://github.com/TU_USUARIO/medicamentos_v3.git
git push -u origin main
```

## 2. Añadir la app en Codemagic

1. [codemagic.io](https://codemagic.io) → **Add application**
2. Conecta tu repo de GitHub
3. Selecciona el repositorio
4. Codemagic detectará `codemagic.yaml` automáticamente

## 3. Configurar firma (Code Signing)

1. **Team settings** → **codemagic.yaml settings** → **Code signing identities**
2. **iOS certificates:** Sube tu certificado `.p12` de distribución o genera uno con la API key de App Store Connect
3. **iOS provisioning profiles:** Sube el `.mobileprovision` para App Store o fétch desde Apple Developer Portal

Si tienes **App Store Connect API key** en Codemagic, puedes generar certificados y perfiles desde la interfaz.

## 4. Crear App Store Connect API key (recomendado)

1. [App Store Connect](https://appstoreconnect.apple.com) → **Users and Access** → **Integrations** → **App Store Connect API**
2. Crea una clave con permisos **App Manager**
3. Descarga el `.p8` (solo una vez)
4. En Codemagic: **Team** → **Developer Portal** → **Manage keys** → Añade la clave con Issuer ID, Key ID y el archivo `.p8`

## 5. Añadir tu email para recibir el IPA

Edita `codemagic.yaml` y en `publishing.email.recipients` añade tu correo:

```yaml
recipients:
  - tu-email@gmail.com
```

## 6. Ejecutar el build

1. En Codemagic → tu app → **Start new build**
2. Elige el workflow **MediControl iOS**
3. El build tarda ~15–25 min
4. Descarga el IPA desde **Artifacts** o recíbelo por email

## 7. Subir a App Store Connect

Opciones:
- **Transporter** (Windows/Mac): [apps.apple.com/transporter](https://apps.apple.com/app/transporter/id1450874784)
- O configura `publishing.app_store_connect` en el YAML para subida automática

## Solución de problemas

**"No signing certificate"** → Añade certificado y provisioning profile en Code signing identities.

**"Bundle ID mismatch"** → El provisioning profile debe coincidir con `com.medicontrol.app`.

**"Scheme not found"** → El esquema por defecto es "App". Si falla, verifica en Xcode que exista el scheme "App".
