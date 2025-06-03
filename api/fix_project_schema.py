import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_project_schema():
    """
    Script para corregir la estructura de la tabla projects y asegurar que coincida
    con el modelo que se está utilizando en la aplicación.
    """
    try:
        logger.info("Iniciando corrección de la estructura de la tabla projects...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar la estructura actual de la tabla projects
        cursor.execute("PRAGMA table_info(projects)")
        columns = cursor.fetchall()
        column_names = [column[1] for column in columns]
        
        logger.info(f"Columnas actuales en la tabla projects: {', '.join(column_names)}")
        
        # Verificar si faltan las columnas requirements y notes
        missing_columns = []
        if 'requirements' not in column_names:
            missing_columns.append('requirements')
        if 'notes' not in column_names:
            missing_columns.append('notes')
        if 'status' not in column_names:
            missing_columns.append('status')
            
        # Añadir las columnas faltantes
        if missing_columns:
            logger.info(f"Añadiendo columnas faltantes: {', '.join(missing_columns)}")
            
            for column in missing_columns:
                try:
                    cursor.execute(f"ALTER TABLE projects ADD COLUMN {column} TEXT")
                    logger.info(f"Columna {column} añadida correctamente")
                except sqlite3.OperationalError as e:
                    logger.error(f"Error al añadir columna {column}: {e}")
            
            conn.commit()
        else:
            logger.info("No hay columnas faltantes en la tabla projects")
        
        # Verificar el tipo de la columna id
        cursor.execute("SELECT typeof(id) FROM projects LIMIT 1")
        id_type = cursor.fetchone()
        
        if id_type:
            logger.info(f"Tipo actual de la columna id: {id_type[0]}")
            # No vamos a cambiar el tipo de la columna id para evitar problemas con los datos existentes
        
        # Verificar si hay datos en la tabla
        cursor.execute("SELECT COUNT(*) FROM projects")
        count = cursor.fetchone()[0]
        logger.info(f"Número de proyectos en la base de datos: {count}")
        
        # Mostrar los proyectos existentes
        if count > 0:
            cursor.execute("SELECT id, name FROM projects")
            projects = cursor.fetchall()
            for project in projects:
                logger.info(f"Proyecto ID: {project[0]}, Nombre: {project[1]}")
        
        logger.info("Corrección de la estructura de la tabla projects completada")
        
    except Exception as e:
        logger.error(f"Error al corregir la estructura de la tabla projects: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    fix_project_schema()
