#!/bin/bash

# Salir si algún comando falla
echo "[INFO] Cerrando procesos previos en puertos 3000 y 3001..."
fuser -k 3000/tcp 2>/dev/null
fuser -k 8000/tcp 2>/dev/null

# Lanzar la API en el puerto 8000
cd /home/cel_web/api
if [ -f "main.py" ]; then
  echo "[INFO] Iniciando API (FastAPI) en puerto 8000..."
  # Usa uvicorn si está disponible, si no, python main.py
  if command -v uvicorn &>/dev/null; then
    uvicorn main:app --host 0.0.0.0 --port 8000 &
  else
    python main.py &
  fi
else
  echo "[ERROR] No se encontró main.py en /home/cel_web/api"
  exit 1
fi
API_PID=$!

# Lanzar la web en el puerto 3000
cd /home/cel_web/web
if [ -f "package.json" ]; then
  echo "[INFO] Iniciando Web (Next.js) en puerto 3000..."
  PORT=3000 npm run dev &
else
  echo "[ERROR] No se encontró package.json en /home/cel_web/web"
  exit 1
fi
WEB_PID=$!

# Esperar a que ambos procesos terminen
trap "kill $API_PID $WEB_PID" EXIT
wait $API_PID $WEB_PID
