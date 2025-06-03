import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_models3d_table():
    """
    Script para verificar y corregir la estructura de la tabla models3d.
    """
    try:
        logger.info("Iniciando verificación de la tabla models3d...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar si la tabla models3d existe
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='models3d'")
        table_exists = cursor.fetchone()
        
        if table_exists:
            logger.info("La tabla models3d existe en la base de datos")
            
            # Verificar la estructura de la tabla models3d
            cursor.execute("PRAGMA table_info(models3d)")
            columns = cursor.fetchall()
            column_names = [column[1] for column in columns]
            
            logger.info(f"Columnas actuales en la tabla models3d: {', '.join(column_names)}")
            
            # Verificar si hay datos en la tabla
            cursor.execute("SELECT COUNT(*) FROM models3d")
            count = cursor.fetchone()[0]
            logger.info(f"Número de registros en la tabla models3d: {count}")
            
            # Verificar si la tabla models existe (que debería ser el nombre correcto según el modelo)
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='models'")
            models_table_exists = cursor.fetchone()
            
            if not models_table_exists:
                logger.info("La tabla models no existe, se creará basada en models3d")
                
                # Crear la tabla models con la estructura correcta
                cursor.execute("""
                CREATE TABLE models (
                    id TEXT PRIMARY KEY,
                    name TEXT,
                    description TEXT,
                    file_url TEXT,
                    file_type TEXT,
                    file_size INTEGER,
                    created_at DATETIME
                )
                """)
                
                # Copiar datos de models3d a models si es necesario
                if count > 0:
                    # Verificar las columnas comunes entre models3d y la nueva tabla models
                    common_columns = [col for col in column_names if col in ["id", "name", "description", "file_url", "file_type", "file_size", "created_at"]]
                    
                    if common_columns:
                        columns_str = ", ".join(common_columns)
                        logger.info(f"Copiando datos de models3d a models para las columnas: {columns_str}")
                        
                        cursor.execute(f"INSERT INTO models ({columns_str}) SELECT {columns_str} FROM models3d")
                        logger.info(f"Datos copiados de models3d a models")
                
                conn.commit()
                logger.info("Tabla models creada correctamente")
            else:
                logger.info("La tabla models ya existe, no es necesario crearla")
        else:
            logger.info("La tabla models3d no existe en la base de datos")
        
        logger.info("Verificación de la tabla models3d completada")
        
    except Exception as e:
        logger.error(f"Error al verificar la tabla models3d: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    fix_models3d_table()
