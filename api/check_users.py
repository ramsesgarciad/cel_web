import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def check_users():
    """
    Script para verificar el estado de los usuarios en la base de datos
    y asegurarse de que tengan los campos necesarios correctamente configurados.
    """
    try:
        logger.info("Verificando usuarios en la base de datos...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        
        # Verificar estructura de la tabla users
        cursor.execute("PRAGMA table_info(users)")
        columns = cursor.fetchall()
        column_names = [column['name'] for column in columns]
        
        logger.info(f"Columnas en la tabla users: {', '.join(column_names)}")
        
        # Verificar si existen los usuarios
        cursor.execute("""
            SELECT id, name, email, role, is_admin, is_active, hashed_password 
            FROM users 
            WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')
        """)
        users = cursor.fetchall()
        
        if not users:
            logger.info("No se encontraron los usuarios de demostración")
            return
        
        # Mostrar información de los usuarios
        for user in users:
            logger.info(f"Usuario ID: {user['id']}")
            logger.info(f"  Nombre: {user['name']}")
            logger.info(f"  Email: {user['email']}")
            logger.info(f"  Rol: {user['role']}")
            logger.info(f"  Es admin: {user['is_admin']}")
            logger.info(f"  Está activo: {user['is_active']}")
            logger.info(f"  Hash de contraseña: {user['hashed_password'][:20]}...")
        
        # Asegurarse de que los usuarios estén activos
        cursor.execute("""
            UPDATE users 
            SET is_active = 1, is_admin = CASE WHEN role = 'admin' THEN 1 ELSE 0 END 
            WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')
        """)
        
        conn.commit()
        logger.info("Usuarios actualizados para asegurar que estén activos")
        
    except Exception as e:
        logger.error(f"Error al verificar usuarios: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    check_users()
