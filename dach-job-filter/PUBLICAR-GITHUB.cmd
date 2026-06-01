@echo off
setlocal
title DACH Job Filter — Publicar en GitHub
cd /d "%~dp0"

echo.
echo ============================================================
echo   Publicar dach-job-filter en GitHub
echo ============================================================
echo.
echo Antes: crea un repo VACIO en github.com (sin README) y copia la URL.
echo Uso con URL en la linea de comandos:
echo   PUBLICAR-GITHUB.cmd https://github.com/USUARIO/dach-job-filter.git
echo.

if "%~1"=="" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\push-github.ps1"
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\push-github.ps1" -RepoUrl "%~1"
)

echo.
pause
