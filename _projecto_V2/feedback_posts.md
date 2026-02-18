# MediControl — Posts para validación de interés
## Objetivo: recopilar feedback ANTES de hacer marketing

---

## 🎯 ESTRATEGIA

El objetivo NO es vender. Es hacer estas 3 preguntas:
1. ¿Tienes este problema? (olvidar medicamentos)
2. ¿Usarías algo así?
3. ¿Qué te falta / qué cambiarías?

Las respuestas te dicen si hay mercado real.

---

## REDDIT (anónimo, gratis, alto alcance)

### Post 1 — r/DigitalHealth o r/healthIT
**Título:** "I built a free medication management PWA — looking for honest feedback"

```
Hey everyone,

I've been working on a web app called MediControl that helps patients
(especially elderly) manage their daily medications.

The problem I'm trying to solve:
- People forget doses
- They lose track of stock
- Family members have no visibility
- Paper medication plans are hard to manage

What it does:
- Daily dose tracking with push reminders
- Scan prescriptions with your phone camera (OCR)
- Manual entry if scanning doesn't work
- Stock alerts
- Family management (multiple patients, one account)
- Works on iPhone and Android (PWA, no app store needed)

It's free to try (7 days, no credit card).

I'm NOT here to sell anything — I genuinely want to know:
1. Would you or someone you know use this?
2. What features are missing?
3. Is the pricing fair? (CHF 9.90/month per patient)

Live demo: [medicamentos-frontend.vercel.app/landing]

Thanks for any feedback, even brutal honesty 🙏
```

### Post 2 — r/Switzerland o r/askswitzerland
**Titel:** "Medikamenten-App für Patienten/Familien — Feedback gesucht"

```
Hallo zusammen,

ich habe eine Web-App entwickelt, die Patienten (v.a. ältere Personen)
bei der täglichen Medikamenteneinnahme unterstützt.

Das Problem:
- Dosen werden vergessen
- Bestand wird nicht kontrolliert
- Familienangehörige haben keinen Überblick
- Medikationspläne vom Arzt sind schwer zu verwalten

Die App (MediControl) bietet:
- Tägliche Einnahme-Erinnerungen per Push
- Rezept scannen mit der Handy-Kamera (OCR)
- Manuelle Eingabe möglich
- Bestandskontrolle mit automatischen Warnungen
- Familienverwaltung (mehrere Patienten)
- Funktioniert auf iPhone & Android (Web-App, kein App Store)

7 Tage kostenlos zum Testen.

Meine Fragen an euch:
1. Kennt ihr jemanden, der sowas brauchen könnte?
2. Was fehlt eurer Meinung nach?
3. Ist CHF 9.90/Monat pro Patient fair?

Demo: [medicamentos-frontend.vercel.app/landing]

Danke für ehrliches Feedback 🙏
```

### Post 3 — r/eldercare o r/CaregiverSupport
**Title:** "Free app to help elderly parents remember their medications — would you use it?"

```
My parent struggles to keep track of daily medications (multiple pills,
different times, refills running out).

I built a simple web app that:
- Sends push reminders for each dose
- Tracks stock and warns when running low
- Lets me see what they've taken (family view)
- Works on any phone (no app download needed)

Before I invest more time in this, I want to know:
- Do you deal with this problem?
- Would something like this help?
- What would make it actually useful for YOU?

You can try it free: [medicamentos-frontend.vercel.app/landing]

No sales pitch, just looking for real feedback from real caregivers.
```

---

## PRODUCT HUNT (seudónimo, gratis, tech-savvy audience)

### Tagline:
"MediControl — Smart medication management for patients & families 🇨🇭"

### Description:
```
MediControl helps patients never miss a dose again.

🔔 Push reminders for every scheduled medication
📸 Scan prescriptions with your phone (OCR)
✏️ Edit medications if OCR made mistakes
📦 Stock tracking with automatic alerts
👨‍👩‍👧‍👦 Family management — one account, multiple patients
💾 Admin panel with backup & restore

Built as a PWA — works on iPhone, Android, and desktop without
downloading from any app store.

Swiss quality, hosted in Europe, GDPR compliant.

Free 7-day trial, then CHF 9.90/month per patient.

Looking for feedback from healthcare professionals, caregivers,
and anyone managing medications for themselves or family members.
```

### First Comment (post it yourself):
```
Hi everyone! 👋

I built MediControl because my family struggled to manage medications
for elderly relatives. Paper lists, forgotten doses, empty boxes...

I'd love your honest feedback:
- Is this solving a real problem for you?
- What would you add or change?
- Would you pay for this?

The app is multilingual (German, Spanish, English) — built for
the Swiss market but works anywhere.

Try it: medicamentos-frontend.vercel.app/landing
```

---

## INDIE HACKERS (seudónimo, gratis, builder community)

### Title: "Validating a medication management SaaS — is there a market?"

```
Hey IH community,

I'm building MediControl, a PWA for medication management
targeting elderly patients and their families in Switzerland.

Stack: Next.js + Node/Express + PostgreSQL
Revenue model: CHF 9.90/month/patient after 7-day trial
Current state: MVP live, ~50 test users

What I need to validate:
1. Is medication management a real pain point people would PAY for?
2. The Swiss/DACH market is small — should I go international?
3. B2C (patients) vs B2B (pharmacies/doctors) — which is easier?

Current features:
- Push reminders per dose
- OCR prescription scanning
- Stock tracking
- Family management
- Multilingual (DE/ES/EN)

Live: medicamentos-frontend.vercel.app/landing

Would appreciate any feedback, especially from anyone in
healthcare or with elderly family members.
```

---

## HACKER NEWS — Show HN

### Title: "Show HN: MediControl – Medication management PWA with OCR scanning"

```
I built a progressive web app to help patients manage daily medications.

Main features:
- Push reminders for each scheduled dose
- OCR prescription scanning (take a photo, it reads the meds)
- Manual entry with inline editing
- Stock tracking with automatic alerts
- Family management (multiple patients per account)
- Backup/snapshot/restore system
- Multilingual (DE, ES, EN)

Tech: Next.js frontend on Vercel, Node/Express + PostgreSQL
backend on Render. Tesseract for OCR. Web Push API for notifications.

One interesting challenge: iOS Lockdown Mode completely disables
Service Workers and the Notification API, even for installed PWAs.
Took a while to figure out why some iPhones couldn't get notifications.

Live demo: medicamentos-frontend.vercel.app/landing

Looking for feedback, especially on the OCR accuracy and UX.
```

---

## 📊 CÓMO MEDIR EL INTERÉS

### Métricas que importan:
1. **Leads capturados** — cuántos dejan su email en /landing
   → Ver en admin: medicamentos-backend.onrender.com/admin/leads
2. **Comentarios/respuestas** — cuántos responden tus posts
3. **Upvotes** — en Reddit/HN/PH indican resonancia
4. **Preguntas sobre precio** — si preguntan "¿cuánto cuesta?" hay interés

### Señales POSITIVAS (sí hay mercado):
- "My mom needs this"
- "I'd pay for this"
- "Can you add X feature?"
- Preguntas sobre integración con sistemas médicos
- 10+ leads en la primera semana

### Señales NEGATIVAS (pivotar):
- "There are already 100 apps like this"
- 0 leads después de 2 semanas
- Solo comentarios técnicos, ningún usuario real
- "I wouldn't pay for this, it should be free"

### Orden de publicación recomendado:
| Día | Dónde | Post |
|-----|-------|------|
| 1   | Reddit r/DigitalHealth | Post 1 (EN) |
| 2   | Reddit r/Switzerland | Post 2 (DE) |
| 3   | Reddit r/eldercare | Post 3 (EN) |
| 5   | Indie Hackers | Validación |
| 7   | Hacker News | Show HN |
| 10  | Product Hunt | Lanzamiento |

Espera 1-2 días entre posts para no parecer spam.
Revisa leads en el admin panel cada día.
