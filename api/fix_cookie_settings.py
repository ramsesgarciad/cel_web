import sqlite3
import logging
import os

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_cookie_settings():
    """
    Script para verificar y corregir la configuración de cookies en la aplicación.
    """
    try:
        logger.info("Verificando configuración de cookies...")
        
        # Ruta al archivo auth.py
        auth_file_path = os.path.join('app', 'routers', 'web', 'auth.py')
        
        # Leer el archivo actual
        with open(auth_file_path, 'r') as file:
            content = file.read()
        
        # Verificar si hay configuraciones de cookies que podrían causar problemas
        if 'secure=True' in content and 'samesite="lax"' in content:
            logger.info("Encontrada configuración de cookies con secure=True y samesite=lax")
            logger.info("Modificando configuración para entorno de desarrollo...")
            
            # Modificar la configuración de cookies para entorno de desarrollo
            new_content = content.replace('secure=True', 'secure=False')
            
            # Guardar el archivo modificado
            with open(auth_file_path, 'w') as file:
                file.write(new_content)
            
            logger.info("Configuración de cookies actualizada para entorno de desarrollo")
            logger.info("Se ha cambiado secure=True a secure=False para permitir cookies en HTTP")
        else:
            logger.info("No se encontraron problemas en la configuración de cookies")
        
        # Verificar configuración de CORS
        cors_file_path = os.path.join('main.py')
        if os.path.exists(cors_file_path):
            with open(cors_file_path, 'r') as file:
                main_content = file.read()
            
            if 'CORSMiddleware' in main_content:
                logger.info("Encontrada configuración CORS en main.py")
                logger.info("Asegúrate de que la configuración CORS incluya:")
                logger.info("  - allow_origins con los dominios correctos")
                logger.info("  - allow_credentials=True para permitir cookies")
                logger.info("  - allow_methods=[\"*\"] para permitir todos los métodos HTTP")
                logger.info("  - allow_headers=[\"*\"] para permitir todos los headers")
        
        logger.info("Verificación de configuración completada")
        logger.info("Recomendaciones:")
        logger.info("1. Reinicia el servidor FastAPI para aplicar los cambios")
        logger.info("2. Prueba el inicio de sesión con las credenciales:")
        logger.info("   - Admin: admin@caribbeanembeddedlabs.com / admin123")
        logger.info("   - Demo: demo@caribbeanembeddedlabs.com / demo123")
        logger.info("3. Verifica que la redirección funcione correctamente")
        
    except Exception as e:
        logger.error(f"Error al verificar configuración: {e}")
    finally:
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    fix_cookie_settings()
