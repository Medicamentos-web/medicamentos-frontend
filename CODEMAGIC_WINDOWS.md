# Codemagic en Windows — Sin Mac

La **Opción 1** (App Store Connect API key) es la más sencilla en Windows: **no necesitas crear certificados en tu PC**.

---

## Paso 1: Crear App Store Connect API key

1. Entra en: **https://appstoreconnect.apple.com**
2. **Users and Access** → **Integrations** → **App Store Connect API**
3. Pulsa **+** para crear una clave
4. **Name:** Codemagic (o el que prefieras)
5. **Access:** App Manager
6. **Generate**
7. **Download** el archivo `.p8` (solo se puede una vez, guárdalo bien)
8. Anota:
   - **Issuer ID** (arriba de la tabla)
   - **Key ID** (en la fila de la nueva clave)

---

## Paso 2: Añadir la key en Codemagic

1. **https://codemagic.io** → entra en tu cuenta
2. **Team** (o tu equipo) → **Developer Portal** → **Manage keys**
3. **Add key**
4. Rellena:
   - **Name:** App Store Connect (o el nombre que quieras)
   - **Issuer ID:** (el que anotaste)
   - **Key ID:** (el que anotaste)
   - **File:** sube el `.p8`
5. **Save**

---

## Paso 3: Generar certificado y perfil en Codemagic

1. **Team** → **codemagic.yaml settings** → **Code signing identities**
2. **iOS certificates** → **Generate certificate**
   - **Reference name:** medicontrol-distribution
   - **Certificate type:** Apple Distribution
   - **App Store Connect API key:** selecciona la que añadiste
   - **Create**
3. **iOS provisioning profiles** → **Fetch profiles**
   - Selecciona el perfil de App Store para `com.medicontrol.app` (si existe)
   - O créalo antes en Apple Developer Portal:
     - https://developer.apple.com/account/resources/profiles/add
     - Tipo: App Store
     - App ID: com.medicontrol.app
     - Luego vuelve a Codemagic y haz **Fetch profiles** de nuevo

---

## Paso 4: Actualizar codemagic.yaml

En el YAML, cambia `TU_APP_STORE_CONNECT_KEY` por el **nombre exacto** que pusiste a la key en Codemagic (ej. "App Store Connect"):

```yaml
integrations:
  app_store_connect: App Store Connect  # ← nombre de tu key
```

---

## Paso 5: Lanzar el build

En Codemagic → **Start new build** → Workflow **MediControl iOS**.

---

## Enlaces directos

| Dónde | Enlace |
|------|--------|
| App Store Connect API | https://appstoreconnect.apple.com/access/integrations/api |
| Añadir App ID (si no existe) | https://developer.apple.com/account/resources/identifiers/add |
| Añadir perfil (si no existe) | https://developer.apple.com/account/resources/profiles/add |
| Codemagic Team settings | https://codemagic.io/teams |
