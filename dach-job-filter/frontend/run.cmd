@echo off
title DACH Job Filter — Web
cd /d "%~dp0"

echo Web en http://127.0.0.1:3000
echo.

echo Liberando puerto 3000 si quedo un Next colgado...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"
echo.

if not exist "node_modules\" (
  echo Instalando dependencias npm...
  call npm install
  echo.
)

echo Limpieza previa ^(evita chunks rotos tras cambiar rutas o puerto^)...
call npm run clean
echo.

call npm run dev -- --hostname 127.0.0.1 --port 3000

echo.
pause
