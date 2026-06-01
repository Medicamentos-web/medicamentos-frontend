@echo off
title DACH Job Filter — API
cd /d "%~dp0"

echo API en http://127.0.0.1:8765
echo Si falla: pip install -r requirements.txt
echo.

py -3.13 -m uvicorn main:app --reload --host 127.0.0.1 --port 8765
if errorlevel 1 (
  echo.
  echo py -3.13 fallo. Probando "python"...
  python -m uvicorn main:app --reload --host 127.0.0.1 --port 8765
)

echo.
pause
