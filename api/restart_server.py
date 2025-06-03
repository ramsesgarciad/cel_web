import subprocess
import logging
import os
import signal
import time
import sys

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def restart_server():
    """
    Script para reiniciar el servidor FastAPI después de aplicar todos los cambios a la base de datos.
    """
    try:
        logger.info("Iniciando reinicio del servidor FastAPI...")
        
        # Buscar procesos de uvicorn en ejecución
        logger.info("Buscando procesos de uvicorn en ejecución...")
        ps_output = subprocess.check_output(["ps", "-ef"]).decode()
        
        # Filtrar procesos de uvicorn
        uvicorn_processes = []
        for line in ps_output.split('\n'):
            if 'uvicorn' in line and 'main:app' in line and not 'grep' in line:
                parts = line.split()
                if len(parts) > 1:
                    pid = int(parts[1])
                    uvicorn_processes.append(pid)
        
        # Detener procesos de uvicorn si existen
        if uvicorn_processes:
            logger.info(f"Encontrados {len(uvicorn_processes)} procesos de uvicorn: {uvicorn_processes}")
            for pid in uvicorn_processes:
                logger.info(f"Deteniendo proceso uvicorn con PID {pid}...")
                try:
                    os.kill(pid, signal.SIGTERM)
                    logger.info(f"Proceso {pid} terminado correctamente")
                except Exception as e:
                    logger.error(f"Error al detener el proceso {pid}: {e}")
        else:
            logger.info("No se encontraron procesos de uvicorn en ejecución")
        
        # Esperar un momento para asegurarse de que los procesos se hayan detenido
        time.sleep(2)
        
        # Iniciar el servidor FastAPI
        logger.info("Iniciando el servidor FastAPI...")
        
        # Construir el comando para iniciar el servidor
        cmd = ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
        
        # Iniciar el servidor en modo no bloqueante
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            cwd=os.getcwd()
        )
        
        # Esperar un momento para verificar que el servidor inicie correctamente
        time.sleep(3)
        
        # Verificar si el proceso sigue en ejecución
        if process.poll() is None:
            logger.info("Servidor FastAPI iniciado correctamente")
            logger.info(f"PID del nuevo proceso: {process.pid}")
            logger.info("El servidor está escuchando en http://0.0.0.0:8000")
            
            # Mostrar las primeras líneas de salida
            stdout, stderr = process.communicate(timeout=0.1)
            if stdout:
                logger.info("Salida del servidor:")
                for line in stdout.split('\n')[:5]:
                    if line.strip():
                        logger.info(f"  {line.strip()}")
            
            if stderr:
                logger.warning("Errores del servidor:")
                for line in stderr.split('\n')[:5]:
                    if line.strip():
                        logger.warning(f"  {line.strip()}")
            
            logger.info("Servidor reiniciado exitosamente")
        else:
            stdout, stderr = process.communicate()
            logger.error("Error al iniciar el servidor FastAPI")
            if stdout:
                logger.error(f"Salida: {stdout}")
            if stderr:
                logger.error(f"Error: {stderr}")
            sys.exit(1)
        
    except Exception as e:
        logger.error(f"Error durante el reinicio del servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    restart_server()
