# Solución de problemas de email

## ETIMEDOUT en Render Free

**Render Free bloquea los puertos SMTP (25, 465, 587).** Gmail SMTP no funcionará.

**Solución:** Usa **Resend** (API HTTP, funciona en Render Free):

1. Regístrate en [resend.com](https://resend.com) (gratis, 3000 emails/mes)
2. Dashboard → API Keys → Create
3. En Render → Environment → Añade:
   - `RESEND_API_KEY` = tu API key (re_xxx...)
   - `FROM_EMAIL` = `MediControl <onboarding@resend.dev>` (para pruebas)
4. Para producción: verifica tu dominio en Resend y usa `FROM_EMAIL=tu@tudominio.com`

---

## Error: "Error al enviar el email. Revisa SMTP."

### 1. Verificar variables en Render

En **Render → Tu servicio → Environment**, asegúrate de tener:

| Variable    | Ejemplo                    | Requerido |
|-------------|----------------------------|-----------|
| SMTP_HOST   | smtp.gmail.com             | Sí        |
| SMTP_PORT   | 587                        | Sí (587 o 465) |
| SMTP_USER   | alertas.medicamentos@gmail.com | Sí    |
| SMTP_PASS   | xxxx xxxx xxxx xxxx        | Sí (contraseña de aplicación) |
| ADMIN_EMAIL | alertas.medicamentos@gmail.com | Sí   |

### 2. Gmail: Contraseña de aplicación

**No uses tu contraseña normal de Gmail.** Con 2FA activada, necesitas una "Contraseña de aplicación":

1. Google Account → Seguridad
2. Verificación en 2 pasos → Activar si no está
3. Contraseñas de aplicaciones → Generar nueva
4. Copia la contraseña de 16 caracteres (sin espacios) en `SMTP_PASS`

### 3. Probar SMTP

1. Entra en **Ajustes** (sidebar → Sistema)
2. En la sección "Configuración SMTP", pulsa **Enviar email de prueba**
3. Revisa la bandeja de `ADMIN_EMAIL`

### 4. Revisar logs en Render

Si falla, en **Render → Logs** busca líneas como:

```
[RESEND WELCOME] Intento 1/3 fallido: ...
[SMTP TEST] Error: ...
```

Errores comunes:
- `Invalid login` → SMTP_PASS incorrecta o no es contraseña de aplicación
- `Connection timeout` → Firewall o SMTP_HOST incorrecto
- `self signed certificate` → Probar con SMTP_PORT=465

### 5. Puerto 465 (SSL)

Si el puerto 587 falla, prueba:

```
SMTP_PORT=465
```

El backend usa `secure: true` automáticamente para el puerto 465.
