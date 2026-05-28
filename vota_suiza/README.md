# VotaSuiza — MVP completo

App educativa sobre política suiza con **dos frontends** (Flutter móvil + Web Next.js), IA conversacional (Gemini), voz (ElevenLabs) y Firebase.

## Contenido del proyecto

```
vota_suiza/
├── lib/                  # App Flutter (iOS + Android)
├── web/                  # App Web Next.js (MVP demo inmediato)
├── assets/               # Datos, prompts, personajes SVG
├── assets/makko/         # Prompts para generar arte en Makko AI
├── firebase/             # Reglas Firestore
└── scripts/              # Setup automatizado
```

## Inicio rápido — Web (recomendado para demo)

```powershell
cd vota_suiza\web
copy .env.example .env.local
# Editar .env.local con tus claves

npm install
npm run dev
# → http://localhost:3001
```

## Inicio rápido — Flutter (App Store / Play Store)

```powershell
cd vota_suiza
copy .env.example .env
# Editar .env con tus claves

flutter create . --org com.votasuiza
flutter pub get
flutterfire configure
flutter run
```

## Claves API necesarias

| Servicio | Dónde obtenerla | Uso |
|----------|----------------|-----|
| **Gemini** | [Google AI Studio](https://aistudio.google.com/apikey) | Chat con personajes (1.500 req/día gratis) |
| **ElevenLabs** | [elevenlabs.io](https://elevenlabs.io) | Voz realista (10.000 chars/mes gratis) |
| **Firebase** | [Firebase Console](https://console.firebase.google.com) | Auth anónimo + votos + logros |
| Google TTS | Google Cloud (opcional) | Fallback voz en Flutter |

### Configurar `.env` (Flutter) y `.env.local` (Web)

```
GEMINI_API_KEY=AIza...
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_DEFAULT_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# Web además:
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Firebase — Configuración

1. Crear proyecto (plan **Spark** gratuito)
2. Activar **Authentication → Anonymous**
3. Crear **Firestore Database**
4. Publicar reglas desde `firebase/firestore.rules`
5. Ejecutar `flutterfire configure` (Flutter) o copiar config a `.env.local` (Web)

## Funcionalidades implementadas

### Ambas plataformas
- 5 partidos suizos con personajes cartoon (SVG incluidos)
- Chat con Gemini + prompts locales por partido
- Voz ElevenLabs (de/fr/it), rumanche solo texto
- Línea de tiempo histórica interactiva
- Simulación de voto con drag & drop a urna
- Estadísticas anónimas en tiempo real (Firestore)
- Logros gamificados (confeti en Flutter, Firestore en ambos)

### Solo Flutter
- Onboarding de 4 pantallas
- Caché local de audio TTS
- Notificaciones locales de logros
- Navegación con bottom bar

### Solo Web
- API routes proxy (claves seguras en servidor)
- UI responsive con Tailwind
- Listo para deploy en Vercel

## Deploy Web en Vercel

```powershell
cd vota_suiza\web
npx vercel
# Añadir variables de entorno en el dashboard de Vercel
```

## Mejorar personajes con Makko AI

Ver `assets/makko/PROMPTS.md` — prompts listos para copiar en Makko AI y reemplazar los SVG placeholder.

## Arquitectura

```
Usuario → Chat → Gemini API (prompt JSON local)
              → ElevenLabs TTS → Audio
              → Firestore (logros)

Usuario → Voto → Drag&Drop → Firestore votes (anónimo)
                            → Stats en tiempo real
```

## Costes estimados MVP

| Servicio | Capa gratuita | Suficiente para |
|----------|--------------|-----------------|
| Gemini | 1.500 req/día | ~500 usuarios/día demo |
| ElevenLabs | 10.000 chars/mes | ~50 respuestas con voz |
| Firebase Spark | 50K lecturas/día | Miles de votos |
| Vercel | Hobby | Deploy web gratis |

## Próximos pasos sugeridos

1. Configurar claves API y probar web en localhost:3001
2. Generar personajes en Makko AI (prompts incluidos)
3. Deploy web en Vercel para compartir demo
4. Configurar Flutter + publicar en stores
