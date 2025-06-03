import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def update_project_status():
    """
    Script para actualizar los valores de la columna status en la tabla projects
    y asignar valores predeterminados a los proyectos existentes.
    """
    try:
        logger.info("Iniciando actualización de estados de proyectos...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar si hay proyectos sin estado
        cursor.execute("SELECT id, name FROM projects WHERE status IS NULL OR status = ''")
        projects_without_status = cursor.fetchall()
        
        if projects_without_status:
            logger.info(f"Encontrados {len(projects_without_status)} proyectos sin estado")
            
            # Actualizar los proyectos sin estado
            for project_id, project_name in projects_without_status:
                # Asignar estado "En progreso" por defecto
                cursor.execute(
                    "UPDATE projects SET status = ? WHERE id = ?",
                    ("En progreso", project_id)
                )
                logger.info(f"Proyecto '{project_name}' (ID: {project_id}) actualizado con estado 'En progreso'")
            
            conn.commit()
            logger.info("Estados de proyectos actualizados correctamente")
        else:
            logger.info("No se encontraron proyectos sin estado")
        
        # Mostrar todos los proyectos con sus estados
        cursor.execute("SELECT id, name, status FROM projects")
        all_projects = cursor.fetchall()
        
        logger.info("Estado actual de los proyectos:")
        for project_id, name, status in all_projects:
            logger.info(f"Proyecto '{name}' (ID: {project_id}): Estado = {status or 'Sin estado'}")
        
    except Exception as e:
        logger.error(f"Error al actualizar estados de proyectos: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    update_project_status()
