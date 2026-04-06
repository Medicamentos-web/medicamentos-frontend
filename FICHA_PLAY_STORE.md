# Ficha de Play Store predeterminada — MediControl

Todo el contenido listo para copiar y pegar en Play Console.

**Última revisión de esta ficha:** 1 de abril de 2026 · **Versión app Android de referencia:** 1.1.3 (versionCode 6)

---

## 1. Información básica

| Campo | Valor |
|-------|-------|
| **Nombre de la aplicación** | MediControl |
| **Idioma predeterminado** | Alemán (Suiza) / Español / Inglés |
| **Tipo** | Aplicación |
| **Gratuita o de pago** | Gratuita (con compras dentro de la app) |

---

## 2. Título (máx. 30 caracteres)

```
MediControl
```

---

## 3. Descripción corta (máx. 80 caracteres)

**Español:**
```
MediControl: recordatorios, control de stock y escaneo de recetas. Para familias.
```

**Alemán (de-CH):**
```
MediControl: Erinnerungen, Bestandskontrolle, Rezept-Scan. Für Familien.
```

**Inglés:**
```
MediControl: reminders, stock alerts & prescription scan. For families.
```

---

## 4. Descripción larga (máx. 4000 caracteres)

**Español:**

```
MediControl — Tus medicamentos bajo control

¿Te olvidas de tomar tus medicamentos? ¿Gestionas la medicación de varios familiares? MediControl te ayuda a organizar todo en un solo lugar.

FUNCIONES PRINCIPALES

• Recordatorios inteligentes
Recibe notificaciones push en el momento exacto de cada toma. Mañana, mediodía, tarde, noche. Sin estrés.

• Escaneo de recetas (OCR)
Haz una foto a tu receta médica y la app detecta automáticamente todos los medicamentos. Sin escribir nada. Sin errores.

• Control de stock
Alertas automáticas cuando te quedas con poco medicamento. Nunca más te quedarás sin tu tratamiento.

• Gestión familiar
Gestiona los medicamentos de toda la familia desde una sola cuenta. Ideal para cuidadores y familias.

• Contacto médico
Acceso directo a la información de tu médico con el historial completo de medicación.

• Privacidad suiza
Datos alojados en Europa. Cifrado TLS. Compatible con RGPD. Tus datos de salud están seguros.

PRUEBA GRATIS 30 DÍAS

Empieza con hasta 5 medicamentos sin coste. Sin permanencia. Cancela cuando quieras.

Después: CHF 4.99/mes o CHF 53.90/año (ahorra 10%) por paciente.

Diseñado para pacientes, familias y cuidadores en Suiza. MediControl no sustituye el consejo médico profesional. Ante dudas, consulta a tu médico o farmacéutico.
```

**Alemán (de-CH):**

```
MediControl — Ihre Medikamente unter Kontrolle

Vergessen Sie Dosen? Verwalten Sie Medikamente für mehrere Familienmitglieder? MediControl hilft Ihnen, alles an einem Ort zu organisieren.

HAUPTFUNKTIONEN

• Intelligente Erinnerungen
Push-Benachrichtigungen zur richtigen Zeit für jede Dosis. Morgens, mittags, abends, nachts. Ohne Stress.

• Rezept-Scanning (OCR)
Fotografieren Sie Ihr Rezept — die App erkennt automatisch alle Medikamente. Ohne Tippen. Ohne Fehler.

• Bestandskontrolle
Automatische Warnungen bei niedrigem Bestand. Nie wieder ohne Medikament.

• Familienverwaltung
Verwalten Sie Medikamente für die ganze Familie von einem Konto. Ideal für Pflegende und Familien.

• Arzt-Kontakt
Direkter Zugang zu Ihrem Arzt mit vollständiger Medikamentenübersicht.

• Schweizer Datenschutz
Gehostet in Europa. TLS-verschlüsselt. DSGVO-konform. Ihre Gesundheitsdaten sind sicher.

30 TAGE KOSTENLOS TESTEN

Starten Sie mit bis zu 5 Medikamenten kostenlos. Keine Mindestlaufzeit. Jederzeit kündbar.

Danach: CHF 4.99/Monat oder CHF 53.90/Jahr (10% sparen) pro Patient.

Entwickelt für Patienten, Familien und Pflegepersonal in der Schweiz. MediControl ersetzt keine ärztliche Beratung. Bei Fragen konsultieren Sie Ihren Arzt oder Apotheker.
```

---

## 5. Gráficos

| Elemento | Requisitos | Archivo |
|----------|------------|---------|
| **Icono de la aplicación** | 512×512 px, PNG, max 1 MB | `public/icon-512.png` |
| **Gráfico de funciones** | 1024×500 px, PNG/JPEG, max 15 MB | `public/feature-graphic-1024x500.png` |
| **Capturas de pantalla** | Mín. 2, recomendado 4–8. Teléfono: 320–3840 px. | Crear desde la app |

---

## 6. URLs obligatorias

| Campo | URL |
|-------|-----|
| **Política de privacidad** | https://medicamentos-frontend.vercel.app/privacy |
| **Términos de uso** (recomendado) | https://medicamentos-frontend.vercel.app/terms |
| **Cookies** | https://medicamentos-frontend.vercel.app/cookies |
| **Eliminación de cuenta** | https://medicamentos-frontend.vercel.app/delete-account |

---

## 7. Declaraciones

| Pregunta | Respuesta |
|----------|-----------|
| **¿La app muestra anuncios?** | La app web puede cargar etiquetas de medición de campañas (Google Ads) **solo si el usuario acepta cookies de marketing** en el banner. Si no hay SDK de anuncios dentro del APK y no se muestran banners en pantalla, muchos desarrolladores marcan «No» en «anuncios en la app»; revisa la definición actual en Play Console y alinea con **Seguridad de datos** (datos compartidos con Google si aplica). |
| **¿Contiene compras dentro de la app?** | Sí (suscripción Premium) |

---

## 8. Público objetivo

- **Grupos de edad:** Adultos (18+)
- **Países:** Suiza, España, y los que prefieras

---

## 9. Clasificación de contenido

- **Cuestionario:** Completa en Play Console según el tipo de contenido (salud, sin violencia, etc.)
- **Categoría sugerida:** Salud y bienestar / Medicina

---

## 10. Resumen de archivos

```
c:\docker-projects\medicamentos_v3\public\
├── icon-512.png
├── feature-graphic-1024x500.png
└── (capturas: crear manualmente desde la app)
```

---

## 11. Pasos en Play Console

1. **Presencia en la tienda** → **Ficha de la tienda principal**
2. Rellena título, desc corta, desc larga
3. **Gráficos** → Sube icono 512×512, gráfico de funciones 1024×500
4. **Capturas** → Sube al menos 2 capturas de pantalla del teléfono
5. **Política de privacidad** → Pega la URL (y opcionalmente términos `/terms`)
6. **Política de la app** → **Seguridad de datos**: declara salud, fotos/OCR, pagos (Stripe), etc., según `GUIA_GOOGLE_PLAY.md`; **Eliminación de cuenta**: URL `/delete-account`
7. **Publicidad** → Coherente con el punto 7 de la tabla «Declaraciones» arriba
8. **Público objetivo** → Selecciona edad y países

---

## 12. Notas de la versión (ejemplo)

**v1.1.3 (abril 2026)** — copiar en «Novedades de esta versión» al subir el AAB:

```
MediControl 1.1.3

• Política de privacidad ampliada y términos de uso (Google Play)
• Enlaces de cookies, eliminación de cuenta y legal en la web
• Mejoras en importación por escaneo (fecha de nacimiento con calendario)
• Correcciones y estabilidad
```

Versión anterior de ejemplo (primera publicación):

```
Primera versión de MediControl.

• Recordatorios de medicamentos
• Escaneo OCR de recetas
• Control de stock
• Gestión familiar
• Privacidad suiza
```
