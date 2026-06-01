@echo off
setlocal
title DACH Job Filter — lanzador
cd /d "%~dp0"

cls
echo.
echo ============================================================
echo   DACH Job Filter
echo ============================================================
echo.
echo Carpeta actual:
echo   %CD%
echo.

if not exist "backend\main.py" (
  echo [ERROR] No encuentro backend\main.py
  echo Debes ejecutar este archivo dentro de la carpeta:
  echo   medicamentos_v3\dach-job-filter\
  echo.
  pause
  exit /b 1
)

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js no esta en el PATH.
  echo Instala Node 18+ desde https://nodejs.org y vuelve a intentar.
  pause
  exit /b 1
)

echo Comprobando Python...
py -3.13 --version >nul 2>&1
if errorlevel 1 (
  python --version >nul 2>&1
  if errorlevel 1 (
    echo [ERROR] No hay Python ^(ni py -3.13 ni python^).
    pause
    exit /b 1
  )
)

if not exist "frontend\node_modules\" (
  echo Instalando npm en frontend ^(primera vez^)...
  pushd frontend
  call npm install
  popd
  echo.
)

echo Abriendo ventana del API ^(puerto 8765^)...
start "DACH API (8765)" cmd /k "%~dp0backend\run.cmd"

echo Esperando 6 segundos a que arranque el API...
timeout /t 6 /nobreak >nul

echo Abriendo ventana de Next.js ^(puerto 3000^)...
start "DACH Web (3000)" cmd /k "%~dp0frontend\run.cmd"

echo Esperando 12 segundos a que compile Next...
timeout /t 12 /nobreak >nul

echo Abriendo el navegador...
start "" "http://127.0.0.1:3000"

echo.
echo ------------------------------------------------------------
echo Listo.
echo  - "missing required error components" o Cannot find module ./421.js ./610.js:
echo    cierra TODAS las ventanas Next. En frontend: npm run clean, luego npm run dev
echo    ^(usa Turbopack^). Si Turbo falla: npm run dev:webpack
echo  - Si el navegador esta vacio: espera un poco y pulsa F5.
echo  - Si ves error rojo en la web: mira la ventana "DACH API".
echo  - Documentacion API: http://127.0.0.1:8765/docs
echo ------------------------------------------------------------
echo.
pause
