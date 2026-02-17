# MediControl — Ihre Medikamente. Unter Kontrolle.

Intelligentes Medikamentenmanagement für Patienten und Familien.
Erinnerungen, Bestandskontrolle, Rezeptscanning.

## Requisitos

- Docker Desktop (Windows/Mac)
- Node.js 18+ (para el frontend Next.js)

## Paso a paso (primer arranque en localhost)

1. Abre una terminal en la raíz del proyecto.
2. Inicia PostgreSQL + Backend con Docker:
   ```bash
   docker compose up -d
   ```
3. Verifica que los contenedores estén corriendo:
   ```bash
   docker compose ps
   ```
4. Instala dependencias del frontend:
   ```bash
   npm install
   ```
5. Ejecuta el healthcheck:
   ```bash
   npm run healthcheck
   ```
6. Inicia el frontend (Next.js):
   ```bash
   npm run dev
   ```
7. Abre la app en el navegador:
   - **http://localhost:3000**

## Variables de entorno (Frontend)

Crea un archivo `.env.local` en la raíz con estas variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=medicamentos
DB_PASSWORD=medicamentos_secret
DB_NAME=medicamentos
DEFAULT_FAMILY_ID=1
INVENTORY_MAX_STOCK=30
BACKEND_INTERNAL_URL=http://localhost:4000
```

## Servicios

| Servicio   | Puerto | Descripción                   |
|------------|--------|-------------------------------|
| Frontend   | 3000   | Next.js (UI)                  |
| Backend    | 4000   | API Node.js (Express)         |
| PostgreSQL | 5432   | Base de datos                 |

## Estructura del proyecto

```
medicamentos_v3/
├── app/                    # Páginas Next.js (App Router)
│   ├── layout.jsx          # Layout principal
│   ├── page.jsx            # Dashboard
│   ├── globals.css         # Estilos globales
│   ├── auth/               # Página de autenticación
│   ├── billing/            # Planes y suscripción
│   ├── landing/            # Landing page multiidioma
│   └── promo/              # Video promocional
├── backend/                # API backend (Docker)
├── components/             # Componentes React
│   ├── LoginUI.jsx         # Pantalla de login
│   ├── auth-status.jsx     # Estado de autenticación
│   └── ui/                 # Componentes UI (shadcn)
├── database/               # Scripts SQL de inicialización
│   └── init/
├── database_storage/       # Datos PostgreSQL (bind mount)
├── lib/                    # Utilidades (db, helpers)
├── public/                 # Assets estáticos
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service Worker
│   ├── icon-192.svg        # Icono PWA 192x192
│   └── icon-512.svg        # Icono PWA 512x512
├── docker-compose.yml      # Servicios Docker (DB + Backend)
├── next.config.mjs         # Configuración Next.js
├── vercel.json             # Configuración Vercel (producción)
├── package.json            # Dependencias frontend
└── healthcheck.js          # Verificación de conexión DB
```

## Despliegue

- **Producción**: Vercel (frontend) + Backend Docker
- **PWA**: Instalable como app en móvil (manifest.json + Service Worker)

## Notas importantes

- El esquema SQL se ejecuta **solo la primera vez** que PostgreSQL inicializa `database_storage/`.
- Para reinicializar desde cero: detén los contenedores y elimina el contenido de `database_storage/`.
- Los datos de la DB son visibles en Windows para respaldo manual (bind mount).

---

© 2026 MediControl. All rights reserved. Swiss law applies.
