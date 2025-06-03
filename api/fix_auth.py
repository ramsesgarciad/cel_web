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

def fix_auth():
    """
    Script para corregir problemas de autenticación asegurando que los usuarios
    tengan todos los campos necesarios correctamente configurados.
    """
    try:
        logger.info("Iniciando corrección de problemas de autenticación...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # 1. Asegurarse de que las columnas necesarias existen
        logger.info("Verificando columnas en la tabla users...")
        cursor.execute("PRAGMA table_info(users)")
        columns = [column[1] for column in cursor.fetchall()]
        
        required_columns = ['is_active', 'is_admin']
        for column in required_columns:
            if column not in columns:
                logger.error(f"Falta la columna {column} en la tabla users")
                return
        
        # 2. Actualizar usuarios para asegurar que estén activos y con roles correctos
        logger.info("Actualizando usuarios...")
        cursor.execute("""
            UPDATE users 
            SET is_active = 1, 
                is_admin = CASE WHEN role = 'admin' THEN 1 ELSE 0 END 
            WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')
        """)
        
        # 3. Actualizar contraseñas con hash bcrypt
        logger.info("Actualizando contraseñas...")
        
        # Admin user
        admin_password = get_password_hash("admin123")
        cursor.execute("""
            UPDATE users 
            SET hashed_password = ? 
            WHERE email = 'admin@caribbeanembeddedlabs.com'
        """, (admin_password,))
        
        # Demo user
        demo_password = get_password_hash("demo123")
        cursor.execute("""
            UPDATE users 
            SET hashed_password = ? 
            WHERE email = 'demo@caribbeanembeddedlabs.com'
        """, (demo_password,))
        
        # 4. Verificar que los cambios se aplicaron correctamente
        cursor.execute("""
            SELECT id, email, role, is_admin, is_active 
            FROM users 
            WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')
        """)
        users = cursor.fetchall()
        
        for user in users:
            user_id, email, role, is_admin, is_active = user
            logger.info(f"Usuario {email}: role={role}, is_admin={is_admin}, is_active={is_active}")
        
        # Confirmar cambios
        conn.commit()
        logger.info("Corrección de problemas de autenticación completada")
        logger.info("Credenciales de acceso:")
        logger.info("Admin - Email: admin@caribbeanembeddedlabs.com, Contraseña: admin123")
        logger.info("Demo - Email: demo@caribbeanembeddedlabs.com, Contraseña: demo123")
        
    except Exception as e:
        logger.error(f"Error al corregir problemas de autenticación: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    fix_auth()
