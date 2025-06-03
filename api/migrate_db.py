cd /home/cel_web/api
python migrate_db.pyimport sqlite3
import logging
from sqlalchemy import create_engine, text
from app.db.database import SQLALCHEMY_DATABASE_URL

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate_database():
    """
    Migra la base de datos para añadir las columnas faltantes al modelo User
    sin perder los datos existentes.
    """
    try:
        # Conectar a la base de datos
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
        conn = engine.connect()
        
        # Verificar si la columna is_active ya existe
        result = conn.execute(text("PRAGMA table_info(users)"))
        columns = [row[1] for row in result.fetchall()]
        
        # Añadir columnas faltantes
        with conn.begin():
            if 'is_active' not in columns:
                logger.info("Añadiendo columna is_active a la tabla users")
                conn.execute(text("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1"))
            
            if 'phone' not in columns:
                logger.info("Añadiendo columna phone a la tabla users")
                conn.execute(text("ALTER TABLE users ADD COLUMN phone VARCHAR"))
            
            if 'company' not in columns:
                logger.info("Añadiendo columna company a la tabla users")
                conn.execute(text("ALTER TABLE users ADD COLUMN company VARCHAR"))
            
            if 'address' not in columns:
                logger.info("Añadiendo columna address a la tabla users")
                conn.execute(text("ALTER TABLE users ADD COLUMN address VARCHAR"))
            
            if 'preferences' not in columns:
                logger.info("Añadiendo columna preferences a la tabla users")
                conn.execute(text("ALTER TABLE users ADD COLUMN preferences VARCHAR"))
            
            if 'last_login' not in columns:
                logger.info("Añadiendo columna last_login a la tabla users")
                conn.execute(text("ALTER TABLE users ADD COLUMN last_login TIMESTAMP"))
        
        # Cerrar conexión
        conn.close()
        logger.info("Migración completada exitosamente")
        
    except Exception as e:
        logger.error(f"Error durante la migración: {e}")
        raise

if __name__ == "__main__":
    logger.info("Iniciando migración de la base de datos...")
    migrate_database()
    logger.info("Migración finalizada")
