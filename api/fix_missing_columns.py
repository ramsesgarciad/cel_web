import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_missing_columns():
    """
    Script para añadir las columnas faltantes en las tablas users y tasks.
    """
    try:
        logger.info("Iniciando corrección de columnas faltantes...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Corregir columnas faltantes en la tabla users
        logger.info("Corrigiendo columnas faltantes en la tabla users...")
        cursor.execute("PRAGMA table_info(users)")
        user_columns = cursor.fetchall()
        user_column_names = [column[1] for column in user_columns]
        
        # Añadir columna full_name si no existe
        if 'full_name' not in user_column_names:
            logger.info("Añadiendo columna full_name a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN full_name TEXT")
            
            # Actualizar full_name basado en el email para los usuarios existentes
            cursor.execute("UPDATE users SET full_name = SUBSTR(email, 1, INSTR(email, '@') - 1)")
            logger.info("Columna full_name añadida y actualizada")
        
        # Corregir columnas faltantes en la tabla tasks
        logger.info("Corrigiendo columnas faltantes en la tabla tasks...")
        cursor.execute("PRAGMA table_info(tasks)")
        task_columns = cursor.fetchall()
        task_column_names = [column[1] for column in task_columns]
        
        # Lista de columnas a añadir a la tabla tasks
        task_columns_to_add = [
            ("title", "TEXT"),
            ("description", "TEXT"),
            ("priority", "TEXT"),
            ("due_date", "DATE"),
            ("completed_at", "DATETIME"),
            ("assigned_to", "TEXT")
        ]
        
        # Añadir columnas faltantes a la tabla tasks
        for column_name, column_type in task_columns_to_add:
            if column_name not in task_column_names:
                logger.info(f"Añadiendo columna {column_name} a la tabla tasks")
                cursor.execute(f"ALTER TABLE tasks ADD COLUMN {column_name} {column_type}")
                
                # Si es la columna title, actualizar con valores por defecto
                if column_name == "title":
                    cursor.execute("UPDATE tasks SET title = 'Tarea ' || id")
                    logger.info("Columna title actualizada con valores por defecto")
                
                # Si es la columna priority, establecer 'Media' como valor por defecto
                if column_name == "priority":
                    cursor.execute("UPDATE tasks SET priority = 'Media'")
                    logger.info("Columna priority actualizada con valores por defecto")
        
        conn.commit()
        logger.info("Todas las columnas faltantes han sido añadidas")
        
        # Verificar que todas las columnas se hayan añadido correctamente
        logger.info("Verificando que todas las columnas se hayan añadido correctamente...")
        
        # Verificar users
        cursor.execute("PRAGMA table_info(users)")
        user_columns = cursor.fetchall()
        user_column_names = [column[1] for column in user_columns]
        logger.info(f"Columnas en la tabla users: {', '.join(user_column_names)}")
        
        # Verificar tasks
        cursor.execute("PRAGMA table_info(tasks)")
        task_columns = cursor.fetchall()
        task_column_names = [column[1] for column in task_columns]
        logger.info(f"Columnas en la tabla tasks: {', '.join(task_column_names)}")
        
        logger.info("Corrección de columnas faltantes completada")
        
    except Exception as e:
        logger.error(f"Error al corregir columnas faltantes: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    fix_missing_columns()
