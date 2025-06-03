import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_project_client_id():
    """
    Script para añadir la columna client_id a la tabla projects y
    actualizar la relación entre proyectos y clientes.
    """
    try:
        logger.info("Iniciando corrección de la columna client_id en la tabla projects...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar la estructura actual de la tabla projects
        cursor.execute("PRAGMA table_info(projects)")
        columns = cursor.fetchall()
        column_names = [column[1] for column in columns]
        
        logger.info(f"Columnas actuales en la tabla projects: {', '.join(column_names)}")
        
        # Añadir la columna client_id si no existe
        if 'client_id' not in column_names:
            logger.info("Añadiendo columna client_id a la tabla projects")
            cursor.execute("ALTER TABLE projects ADD COLUMN client_id TEXT")
            
            # Obtener el ID del usuario admin para asignarlo como cliente por defecto
            cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
            admin_id = cursor.fetchone()
            
            if admin_id:
                admin_id = admin_id[0]
                logger.info(f"Asignando usuario admin (ID: {admin_id}) como cliente por defecto para todos los proyectos")
                
                # Actualizar todos los proyectos para asignar el admin como cliente
                cursor.execute("UPDATE projects SET client_id = ?", (admin_id,))
                logger.info("Proyectos actualizados con client_id del admin")
            else:
                logger.warning("No se encontró el usuario admin, no se pudo asignar client_id por defecto")
            
            conn.commit()
            logger.info("Columna client_id añadida y actualizada correctamente")
        else:
            logger.info("La columna client_id ya existe en la tabla projects")
        
        # Verificar si hay proyectos sin client_id
        cursor.execute("SELECT id, name FROM projects WHERE client_id IS NULL OR client_id = ''")
        projects_without_client = cursor.fetchall()
        
        if projects_without_client:
            logger.info(f"Encontrados {len(projects_without_client)} proyectos sin client_id")
            
            # Obtener el ID del usuario admin para asignarlo como cliente por defecto
            cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
            admin_id = cursor.fetchone()
            
            if admin_id:
                admin_id = admin_id[0]
                
                # Actualizar los proyectos sin client_id
                for project_id, project_name in projects_without_client:
                    cursor.execute(
                        "UPDATE projects SET client_id = ? WHERE id = ?",
                        (admin_id, project_id)
                    )
                    logger.info(f"Proyecto '{project_name}' (ID: {project_id}) actualizado con client_id del admin")
                
                conn.commit()
                logger.info("Proyectos sin client_id actualizados correctamente")
            else:
                logger.warning("No se encontró el usuario admin, no se pudo asignar client_id a proyectos sin cliente")
        else:
            logger.info("No se encontraron proyectos sin client_id")
        
        # Mostrar todos los proyectos con sus client_id
        cursor.execute("""
            SELECT p.id, p.name, p.client_id, u.email 
            FROM projects p 
            LEFT JOIN users u ON p.client_id = u.id
        """)
        all_projects = cursor.fetchall()
        
        logger.info("Estado actual de los proyectos con sus clientes:")
        for project_id, name, client_id, client_email in all_projects:
            logger.info(f"Proyecto '{name}' (ID: {project_id}): Cliente = {client_email or 'Sin cliente'} (ID: {client_id or 'N/A'})")
        
        logger.info("Corrección de la columna client_id completada")
        
    except Exception as e:
        logger.error(f"Error al corregir la columna client_id: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    fix_project_client_id()
