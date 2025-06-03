import sqlite3
import logging
import os

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def verify_database_schema():
    """
    Script para verificar que todas las tablas y columnas necesarias estén
    correctamente configuradas en la base de datos.
    """
    try:
        logger.info("Iniciando verificación del esquema de la base de datos...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar las tablas existentes
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        table_names = [table[0] for table in tables]
        
        logger.info(f"Tablas existentes en la base de datos: {', '.join(table_names)}")
        
        # Verificar la estructura de la tabla users
        logger.info("Verificando estructura de la tabla users...")
        cursor.execute("PRAGMA table_info(users)")
        user_columns = cursor.fetchall()
        user_column_names = [column[1] for column in user_columns]
        
        required_user_columns = [
            "id", "email", "hashed_password", "full_name", "is_active", 
            "is_admin", "created_at", "updated_at", "last_login",
            "phone", "company", "address", "preferences"
        ]
        
        missing_user_columns = [col for col in required_user_columns if col not in user_column_names]
        if missing_user_columns:
            logger.warning(f"Columnas faltantes en la tabla users: {', '.join(missing_user_columns)}")
        else:
            logger.info("Estructura de la tabla users correcta")
        
        # Verificar la estructura de la tabla projects
        logger.info("Verificando estructura de la tabla projects...")
        cursor.execute("PRAGMA table_info(projects)")
        project_columns = cursor.fetchall()
        project_column_names = [column[1] for column in project_columns]
        
        required_project_columns = [
            "id", "name", "description", "start_date", "end_date", 
            "progress", "created_at", "updated_at", "requirements", 
            "notes", "status", "client_id"
        ]
        
        missing_project_columns = [col for col in required_project_columns if col not in project_column_names]
        if missing_project_columns:
            logger.warning(f"Columnas faltantes en la tabla projects: {', '.join(missing_project_columns)}")
        else:
            logger.info("Estructura de la tabla projects correcta")
        
        # Verificar la estructura de la tabla tasks
        logger.info("Verificando estructura de la tabla tasks...")
        cursor.execute("PRAGMA table_info(tasks)")
        task_columns = cursor.fetchall()
        task_column_names = [column[1] for column in task_columns]
        
        required_task_columns = [
            "id", "title", "description", "status", "priority", 
            "due_date", "completed_at", "project_id", "assigned_to", 
            "created_at", "updated_at"
        ]
        
        missing_task_columns = [col for col in required_task_columns if col not in task_column_names]
        if missing_task_columns:
            logger.warning(f"Columnas faltantes en la tabla tasks: {', '.join(missing_task_columns)}")
        else:
            logger.info("Estructura de la tabla tasks correcta")
        
        # Verificar usuarios admin y demo
        logger.info("Verificando usuarios admin y demo...")
        cursor.execute("SELECT id, email, is_active, is_admin FROM users WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')")
        users = cursor.fetchall()
        
        for user in users:
            user_id, email, is_active, is_admin = user
            logger.info(f"Usuario {email} (ID: {user_id}): Activo = {bool(is_active)}, Admin = {bool(is_admin)}")
        
        # Verificar proyectos y sus estados
        logger.info("Verificando proyectos y sus estados...")
        cursor.execute("SELECT id, name, status, client_id FROM projects")
        projects = cursor.fetchall()
        
        for project in projects:
            project_id, name, status, client_id = project
            logger.info(f"Proyecto '{name}' (ID: {project_id}): Estado = {status or 'Sin estado'}, Cliente ID = {client_id or 'Sin cliente'}")
        
        # Verificar tareas
        logger.info("Verificando tareas...")
        cursor.execute("SELECT COUNT(*) FROM tasks")
        task_count = cursor.fetchone()[0]
        logger.info(f"Número total de tareas: {task_count}")
        
        logger.info("Verificación del esquema de la base de datos completada")
        
        # Resumen final
        logger.info("\n=== RESUMEN DEL ESTADO DE LA BASE DE DATOS ===")
        logger.info(f"Tablas existentes: {len(table_names)}")
        logger.info(f"Columnas faltantes en users: {len(missing_user_columns)}")
        logger.info(f"Columnas faltantes en projects: {len(missing_project_columns)}")
        logger.info(f"Columnas faltantes en tasks: {len(missing_task_columns)}")
        logger.info(f"Número de proyectos: {len(projects)}")
        logger.info(f"Número de tareas: {task_count}")
        logger.info("==========================================")
        
    except Exception as e:
        logger.error(f"Error al verificar el esquema de la base de datos: {e}")
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso finalizado")

if __name__ == "__main__":
    verify_database_schema()
