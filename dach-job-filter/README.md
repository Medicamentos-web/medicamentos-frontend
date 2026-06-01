# DACH Job Filter — MVP

Plataforma mínima de búsqueda de empleo centrada en **Suiza (CH), Alemania (DE) y Austria (AT)**. Frontend Next.js 14 + Tailwind; backend FastAPI que combina **varios feeds JSON públicos** (Arbeitnow, Remotive, Jobicy, Himalayas), **filtra por país DACH** en la normalización y usa datos mock si todo falla. Lista extendida de **portales conocidos** en **`GET /portals`** (la mayoría sin API abierta gratuita).

## Requisitos

- **Node.js** 18+ (para Next.js 14)
- **Python** 3.11–3.13 recomendado. Si solo tienes 3.14 y falla la instalación de dependencias, usa otro intérprete (por ejemplo en Windows: `py -3.13`).

## Inicio rápido (una sola terminal)

Primera vez (Python + Node):

```bash
cd dach-job-filter/backend
pip install -r requirements.txt
cd ..
npm run install:all
npm run dev
```

Esto levanta **API en http://127.0.0.1:8765** y **Next en http://127.0.0.1:3000** a la vez. (El **8765** evita el error típico de Windows **WinError 10013** al usar el puerto **8000**). Cierra con **Ctrl+C**.

Si `py -3.13` no existe en tu sistema, edita `backend/package.json` y cambia el script `start` por `npm run start:py` o por tu comando `uvicorn`.

**Alternativa Windows:** doble clic o ejecuta `powershell -ExecutionPolicy Bypass -File scripts\start-dev.ps1` (abre dos ventanas).

---

## Ejecutar en local (dos terminales manualmente)

**Terminal 1 — Backend** (desde la carpeta `backend/` donde está `main.py`):

```bash
pip install -r requirements.txt
py -3.13 -m uvicorn main:app --reload --host 127.0.0.1 --port 8765
```

**Terminal 2 — Frontend**:

```bash
cd frontend
npm install
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Abre **http://127.0.0.1:3000**. El frontend usa `frontend/.env.local` → API en **:8765**.

**Windows:** haz **doble clic en `INICIAR.cmd`** en esta carpeta (`dach-job-filter`). Abre **dos ventanas** (API + web), espera unos segundos y **abre el navegador** solo. Si algo falla, la ventana del lanzador te lo indica.

---

## Instalación por componentes (referencia)

### Backend

```bash
cd dach-job-filter/backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
```

### Frontend

```bash
cd dach-job-filter/frontend
npm install
```

Opcional: ajusta `frontend/.env.local` si cambias el puerto del API (por defecto **8765**).

---

## Dependencias principales

| Área      | Paquetes                                      |
|-----------|-----------------------------------------------|
| Frontend  | `next`, `react`, `react-dom`, `tailwindcss`, `typescript` |
| Backend   | `fastapi`, `uvicorn[standard]`, `requests`    |

## API — rutas

La raíz **`GET /`** devuelve un resumen con enlaces a las rutas y a **`/docs`** (Swagger). Si ves `{"detail":"Not Found"}`, suele ser una URL incorrecta (por ejemplo rutas que no existen) o estabas probando `/` antes de esta ruta.

| Método | Ruta           | Descripción                                      |
|--------|----------------|--------------------------------------------------|
| GET    | `/`            | Info rápida + lista de rutas                     |
| GET    | `/health`      | Estado del servicio                              |
| GET    | `/portals`     | Catálogo de portales DACH conocidos + feeds JSON activos |
| GET    | `/jobs`        | Lista normalizada (solo DACH). Query `refresh=true` fuerza nueva petición a todas las fuentes |
| GET    | `/jobs/search` | Filtros + puntuación de coincidencia             |
| GET    | `/portals/switzerland` | Directorio categorizado de sitios para buscar empleo en Suiza (enlaces externos) |

### Parámetros `GET /jobs/search`

| Parametro     | Ejemplo        | Notas |
|---------------|----------------|-------|
| `country`     | `DE`           | Obligatorio: `CH`, `DE` o `AT` |
| `region`      | `Berlin`       | Opcional; substring sobre región / ubicación |
| `pct_band`    | `60-80`        | Banda de dedicación (alternativa: `pct_min` + `pct_max`) |
| `category`    | `IT Support`   | Opcional |
| `languages`   | `german_b2,english` | Opcional; códigos separados por coma |
| `work_model`  | `hybrid`       | Opcional: `remote`, `hybrid`, `onsite` |

### Ejemplo de respuesta `GET /health`

```json
{
  "status": "ok",
  "source": "dach-job-filter"
}
```

### Ejemplo de elemento en `GET /jobs` o `/jobs/search`

```json
{
  "id": "linux-sysadmin-berlin-mock",
  "company": "Berlin Cloud GmbH",
  "title": "Linux System Administrator",
  "region": "Berlin",
  "country": "DE",
  "work_model": "remote",
  "work_percentage": 100,
  "category": "System Administration",
  "languages": ["german", "english"],
  "apply_url": "https://example.com/apply/2",
  "source_portal": "Arbeitnow",
  "match_score": null
}
```

En `/jobs/search`, `match_score` es un entero entre 0 y 100 (por ejemplo `85`). En `/jobs` viene como `null`.

## Estructura

```
dach-job-filter/
  backend/
    main.py              # FastAPI, CORS, rutas, cache en memoria
    normalize.py         # País DACH, categoría, idioma, modelo de trabajo
    scoring.py           # Puntuación respecto a los filtros
    mock_data.py         # Ofertas de respaldo
    providers/
      aggregate.py       # Une Arbeitnow + Remotive + Jobicy + Himalayas
      swiss_portals.py   # Directorio CH (~29 sitios orientativos)
      arbeitnow.py
      remotive.py
      jobicy.py
      himalayas.py
      portals_catalog.py # Lista conocida CH/DE/AT + feeds activos
    requirements.txt
  frontend/
    app/
    components/
    lib/
```

## Notas

- Sin autenticación ni base de datos en v1.
- **Datos en vivo**: Arbeitnow + Remotive + Jobicy + Himalayas; deduplicado por URL. Solo pasan al listado las ofertas cuya ubicación/texto permiten inferir **CH, DE o AT**.
- **`GET /portals/switzerland`** y la página **`/portales-suiza`** del frontend listan un directorio categorizado de sitios suizos (enlaces informativos); **no** scrapean esos portales automáticamente.
- Si todas las peticiones externas fallan, se usan las entradas de `mock_data.py`.

---

## GitHub y despliegue en la nube

El código puede vivir en **GitHub**; para que la app **no sea solo local**, hay que **publicar la API** y **la web** en un hosting (aquí: ejemplo **Render** + **Vercel**).

### Subir solo `dach-job-filter` a un repo nuevo

**Ejecutable en Windows:** doble clic en **`PUBLICAR-GITHUB.cmd`** o desde consola:

```text
PUBLICAR-GITHUB.cmd https://github.com/TU_USUARIO/dach-job-filter.git
```

Equivalente en PowerShell: `.\scripts\push-github.ps1 -RepoUrl https://github.com/...`

1. En GitHub: **New repository** → nombre p. ej. `dach-job-filter` → créalo vacío (sin README).
2. En tu máquina, dentro de la carpeta **`dach-job-filter`** (si está dentro de otro repo y molesta el `.git` padre, **copia esta carpeta** a otra ruta y trabaja ahí):

```bash
git init -b main
git add .
git commit -m "DACH Job Filter MVP"
git remote add origin https://github.com/TU_USUARIO/dach-job-filter.git
git push -u origin main
```

### API (Render)

1. Cuenta en [render.com](https://render.com) y conecta GitHub.
2. **New → Blueprint** y elige este repo: Render leerá **`render.yaml`** (servicio Python con `rootDir: backend`).
3. Crea un valor para la variable **`CORS_ORIGINS`** con la URL **exacta** del frontend (ej. `https://tu-proyecto.vercel.app`). Varias URLs: separadas por **coma**, sin espacios innecesarios.
4. Cuando termine el deploy, copia la URL del API (ej. `https://dach-job-filter-api.onrender.com`).

Alternativa: **Web Service** con **Docker** usando `backend/Dockerfile`.

### Frontend (Vercel)

1. [vercel.com](https://vercel.com) → **Import** del mismo repositorio.
2. **Root Directory**: `frontend`.
3. Variable **`NEXT_PUBLIC_API_URL`**: la URL pública del API (sin `/` final).
4. Deploy.

### CI

`.github/workflows/ci.yml` ejecuta **lint + build** del frontend y una importación rápida del backend en cada push/PR a `main`.

### Backend — variable `CORS_ORIGINS`

Orígenes permitidos **además** de `localhost` / `127.0.0.1`. Obligatorio para que el navegador pueda llamar al API desde tu dominio Vercel.
