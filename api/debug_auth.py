import sqlite3
import logging
import jwt
from datetime import datetime, timedelta

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuración de JWT (debe coincidir con la de la aplicación)
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"

def debug_auth():
    """
    Script para depurar el proceso de autenticación y verificar la generación
    y validación de tokens JWT.
    """
    try:
        logger.info("Iniciando depuración de autenticación...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Obtener usuarios de prueba
        cursor.execute("""
            SELECT id, email, is_admin, is_active 
            FROM users 
            WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')
        """)
        users = cursor.fetchall()
        
        if not users:
            logger.error("No se encontraron usuarios de prueba")
            return
        
        # Probar la generación y validación de tokens para cada usuario
        for user in users:
            logger.info(f"Probando autenticación para: {user['email']}")
            
            # Generar token JWT
            access_token_expires = timedelta(days=1)
            expires = datetime.utcnow() + access_token_expires
            
            to_encode = {
                "sub": user['email'],
                "admin": bool(user['is_admin']),
                "exp": expires
            }
            
            access_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
            logger.info(f"Token generado: {access_token[:20]}...")
            
            # Verificar decodificación del token
            try:
                payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
                logger.info(f"Token decodificado correctamente: {payload}")
                
                # Verificar que los datos del payload son correctos
                if payload.get("sub") != user['email']:
                    logger.error(f"El email en el payload no coincide: {payload.get('sub')} vs {user['email']}")
                
                if payload.get("admin") != bool(user['is_admin']):
                    logger.error(f"El flag admin en el payload no coincide: {payload.get('admin')} vs {bool(user['is_admin'])}")
                
            except Exception as e:
                logger.error(f"Error al decodificar token: {e}")
        
        # Verificar configuración de cookies en la aplicación
        logger.info("Verificando configuración de cookies en la aplicación...")
        logger.info("Asegúrate de que las cookies se estén estableciendo correctamente con httponly=True")
        logger.info("Comprueba que el dominio y la ruta de las cookies sean correctos")
        
        # Verificar rutas de redirección
        logger.info("Verificando rutas de redirección...")
        logger.info("Ruta de redirección para admin: /admin")
        logger.info("Ruta de redirección para usuarios normales: /dashboard")
        logger.info("Asegúrate de que estas rutas existan y sean accesibles")
        
    except Exception as e:
        logger.error(f"Error en la depuración de autenticación: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso de depuración finalizado")

if __name__ == "__main__":
    debug_auth()
