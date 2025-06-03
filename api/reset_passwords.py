import sqlite3
import logging
from passlib.context import CryptContext

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuración de hash de contraseñas igual que en la aplicación
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    """Genera un hash para la contraseña usando bcrypt."""
    return pwd_context.hash(password)

def reset_passwords():
    """
    Script para restablecer las contraseñas de los usuarios existentes
    utilizando el mismo algoritmo de hash que usa la aplicación.
    """
    try:
        logger.info("Iniciando restablecimiento de contraseñas...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar si existen los usuarios
        cursor.execute("SELECT id, email FROM users WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')")
        users = cursor.fetchall()
        
        if not users:
            logger.info("No se encontraron los usuarios para restablecer contraseñas")
            return
        
        # Actualizar contraseñas para cada usuario encontrado
        for user_id, email in users:
            if 'admin' in email:
                password = 'admin123'
            else:
                password = 'demo123'
                
            hashed_password = get_password_hash(password)
            
            cursor.execute(
                "UPDATE users SET hashed_password = ? WHERE id = ?",
                (hashed_password, user_id)
            )
            logger.info(f"Contraseña restablecida para {email}")
        
        # Confirmar cambios
        conn.commit()
        logger.info("Restablecimiento de contraseñas completado exitosamente")
        logger.info("Credenciales de acceso:")
        logger.info("Admin - Email: admin@caribbeanembeddedlabs.com, Contraseña: admin123")
        logger.info("Demo - Email: demo@caribbeanembeddedlabs.com, Contraseña: demo123")
        
    except Exception as e:
        logger.error(f"Error al restablecer contraseñas: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    reset_passwords()
