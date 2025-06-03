#!/bin/bash

echo "[INFO] Cerrando proceso de Next.js en puerto 3000..."
kill -9 $(lsof -t -i:3000) 2>/dev/null || echo "No hay proceso en puerto 3000"

echo "[INFO] Limpiando caché de Next.js..."
rm -rf /home/cel_web/web/.next/cache 2>/dev/null

echo "[INFO] Reiniciando servidor Next.js..."
cd /home/cel_web/web
npm run dev &

echo "[INFO] Servidor reiniciado. Por favor, recarga la página con Ctrl+Shift+R"
