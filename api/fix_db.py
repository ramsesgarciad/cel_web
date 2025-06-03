import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_database():
    """
    Script simple para añadir la columna is_active a la tabla users.
    """
    try:
        # Conectar directamente a la base de datos SQLite
        # Asumiendo que la base de datos está en el directorio actual
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar si la columna is_active ya existe
        cursor.execute("PRAGMA table_info(users)")
        columns = [row[1] for row in cursor.fetchall()]
        
        # Añadir columnas faltantes
        if 'is_active' not in columns:
            logger.info("Añadiendo columna is_active a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1")
        
        if 'phone' not in columns:
            logger.info("Añadiendo columna phone a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN phone VARCHAR")
        
        if 'company' not in columns:
            logger.info("Añadiendo columna company a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN company VARCHAR")
        
        if 'address' not in columns:
            logger.info("Añadiendo columna address a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN address VARCHAR")
        
        if 'preferences' not in columns:
            logger.info("Añadiendo columna preferences a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN preferences VARCHAR")
        
        if 'last_login' not in columns:
            logger.info("Añadiendo columna last_login a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN last_login TIMESTAMP")
        
        # Guardar cambios y cerrar
        conn.commit()
        conn.close()
        logger.info("Migración completada exitosamente")
        
    except Exception as e:
        logger.error(f"Error durante la migración: {e}")
        raise

if __name__ == "__main__":
    logger.info("Iniciando migración de la base de datos...")
    fix_database()
    logger.info("Migración finalizada")
