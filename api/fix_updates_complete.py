import sqlite3
import logging
from datetime import datetime

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_updates_complete():
    """
    Script para verificar y corregir completamente la estructura de la tabla updates
    para que coincida con el modelo SQLAlchemy.
    """
    try:
        logger.info("Iniciando corrección completa de la tabla updates...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar la estructura actual de la tabla updates
        cursor.execute("PRAGMA table_info(updates)")
        columns = cursor.fetchall()
        column_names = [column[1] for column in columns]
        
        logger.info(f"Columnas actuales en la tabla updates: {', '.join(column_names)}")
        
        # Columnas esperadas según el modelo SQLAlchemy
        expected_columns = ["id", "content", "project_id", "created_by_id", "created_at"]
        
        # Verificar columnas adicionales que no deberían estar en el modelo
        extra_columns = [col for col in column_names if col not in expected_columns]
        if extra_columns:
            logger.warning(f"Columnas adicionales en la tabla updates: {', '.join(extra_columns)}")
        
        # Verificar columnas faltantes que deberían estar en el modelo
        missing_columns = [col for col in expected_columns if col not in column_names]
        if missing_columns:
            logger.warning(f"Columnas faltantes en la tabla updates: {', '.join(missing_columns)}")
        
        # Añadir columnas faltantes
        for column in missing_columns:
            logger.info(f"Añadiendo columna {column} a la tabla updates")
            
            if column == "created_at":
                cursor.execute("ALTER TABLE updates ADD COLUMN created_at DATETIME")
                # Actualizar con la fecha actual
                cursor.execute("UPDATE updates SET created_at = ?", (datetime.now().isoformat(),))
                logger.info("Columna created_at añadida y actualizada")
            
            elif column == "created_by_id":
                cursor.execute("ALTER TABLE updates ADD COLUMN created_by_id TEXT")
                
                # Obtener el ID del usuario admin para asignarlo como creador por defecto
                cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
                admin_id = cursor.fetchone()
                
                if admin_id:
                    admin_id = admin_id[0]
                    cursor.execute("UPDATE updates SET created_by_id = ?", (admin_id,))
                    logger.info(f"Columna created_by_id añadida y actualizada con admin ID: {admin_id}")
                else:
                    logger.warning("No se encontró el usuario admin, no se pudo asignar created_by_id")
            
            elif column == "project_id":
                cursor.execute("ALTER TABLE updates ADD COLUMN project_id TEXT")
                
                # Obtener el ID del primer proyecto para asignarlo por defecto
                cursor.execute("SELECT id FROM projects LIMIT 1")
                project_id = cursor.fetchone()
                
                if project_id:
                    project_id = project_id[0]
                    cursor.execute("UPDATE updates SET project_id = ?", (project_id,))
                    logger.info(f"Columna project_id añadida y actualizada con proyecto ID: {project_id}")
                else:
                    logger.warning("No se encontraron proyectos, no se pudo asignar project_id")
            
            else:
                cursor.execute(f"ALTER TABLE updates ADD COLUMN {column} TEXT")
                logger.info(f"Columna {column} añadida")
        
        # Verificar si hay actualizaciones sin project_id o created_by_id
        cursor.execute("SELECT id FROM updates WHERE project_id IS NULL OR project_id = ''")
        updates_without_project = cursor.fetchall()
        
        if updates_without_project:
            logger.info(f"Encontradas {len(updates_without_project)} actualizaciones sin project_id")
            
            # Obtener el ID del primer proyecto para asignarlo por defecto
            cursor.execute("SELECT id FROM projects LIMIT 1")
            project_id = cursor.fetchone()
            
            if project_id:
                project_id = project_id[0]
                cursor.execute("UPDATE updates SET project_id = ? WHERE project_id IS NULL OR project_id = ''", (project_id,))
                logger.info(f"Actualizaciones sin project_id actualizadas con proyecto ID: {project_id}")
        
        cursor.execute("SELECT id FROM updates WHERE created_by_id IS NULL OR created_by_id = ''")
        updates_without_creator = cursor.fetchall()
        
        if updates_without_creator:
            logger.info(f"Encontradas {len(updates_without_creator)} actualizaciones sin created_by_id")
            
            # Obtener el ID del usuario admin para asignarlo como creador por defecto
            cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
            admin_id = cursor.fetchone()
            
            if admin_id:
                admin_id = admin_id[0]
                cursor.execute("UPDATE updates SET created_by_id = ? WHERE created_by_id IS NULL OR created_by_id = ''", (admin_id,))
                logger.info(f"Actualizaciones sin created_by_id actualizadas con admin ID: {admin_id}")
        
        conn.commit()
        logger.info("Corrección de la tabla updates completada")
        
        # Verificar la estructura final de la tabla updates
        cursor.execute("PRAGMA table_info(updates)")
        final_columns = cursor.fetchall()
        final_column_names = [column[1] for column in final_columns]
        
        logger.info(f"Estructura final de la tabla updates: {', '.join(final_column_names)}")
        
        # Mostrar algunas actualizaciones para verificar
        cursor.execute("SELECT id, content, project_id, created_by_id, created_at FROM updates LIMIT 5")
        updates = cursor.fetchall()
        
        logger.info("Muestra de actualizaciones:")
        for update in updates:
            logger.info(f"ID: {update[0]}, Contenido: {update[1][:30]}..., Proyecto: {update[2]}, Creador: {update[3]}, Fecha: {update[4]}")
        
    except Exception as e:
        logger.error(f"Error al corregir la tabla updates: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    fix_updates_complete()
