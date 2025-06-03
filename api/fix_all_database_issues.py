import sqlite3
import logging
import datetime
import sys
import subprocess
import time
import os
import signal
from passlib.context import CryptContext

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Configuración de hash de contraseñas igual que en la aplicación
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    """Genera un hash para la contraseña usando bcrypt."""
    return pwd_context.hash(password)

def fix_all_issues():
    """
    Script completo para corregir todos los problemas de la base de datos:
    1. Corregir la configuración de cookies (secure=False para desarrollo local)
    2. Añadir columnas faltantes en la tabla projects (requirements, notes, status, client_id)
    3. Añadir columnas faltantes en la tabla users (full_name)
    4. Añadir columnas faltantes en la tabla tasks (title, description, priority, etc.)
    5. Corregir la tabla updates (añadir created_by_id)
    6. Crear la tabla models basada en models3d
    7. Verificar y corregir usuarios admin y demo
    8. Reiniciar el servidor FastAPI
    """
    try:
        logger.info("=== INICIANDO CORRECCIÓN COMPLETA DE LA BASE DE DATOS ===")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # 1. Verificar y corregir la tabla projects
        logger.info("1. Verificando y corrigiendo la tabla projects...")
        
        cursor.execute("PRAGMA table_info(projects)")
        project_columns = [col[1] for col in cursor.fetchall()]
        
        # Añadir columnas faltantes en projects
        if 'requirements' not in project_columns:
            logger.info("Añadiendo columna requirements a la tabla projects")
            cursor.execute("ALTER TABLE projects ADD COLUMN requirements TEXT")
        
        if 'notes' not in project_columns:
            logger.info("Añadiendo columna notes a la tabla projects")
            cursor.execute("ALTER TABLE projects ADD COLUMN notes TEXT")
        
        if 'status' not in project_columns:
            logger.info("Añadiendo columna status a la tabla projects")
            cursor.execute("ALTER TABLE projects ADD COLUMN status TEXT")
            # Establecer estado por defecto
            cursor.execute("UPDATE projects SET status = 'En progreso' WHERE status IS NULL OR status = ''")
        
        if 'client_id' not in project_columns:
            logger.info("Añadiendo columna client_id a la tabla projects")
            cursor.execute("ALTER TABLE projects ADD COLUMN client_id TEXT")
            
            # Obtener el ID del usuario admin
            cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
            admin_id = cursor.fetchone()
            
            if admin_id:
                admin_id = admin_id[0]
                # Asignar el admin como cliente por defecto
                cursor.execute("UPDATE projects SET client_id = ? WHERE client_id IS NULL OR client_id = ''", (admin_id,))
                logger.info(f"Asignado usuario admin (ID: {admin_id}) como cliente por defecto para todos los proyectos")
        
        # 2. Verificar y corregir la tabla users
        logger.info("2. Verificando y corrigiendo la tabla users...")
        
        cursor.execute("PRAGMA table_info(users)")
        user_columns = [col[1] for col in cursor.fetchall()]
        
        # Añadir columnas faltantes en users
        if 'full_name' not in user_columns:
            logger.info("Añadiendo columna full_name a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN full_name TEXT")
            # Establecer full_name basado en el email
            cursor.execute("UPDATE users SET full_name = SUBSTR(email, 1, INSTR(email, '@') - 1) WHERE full_name IS NULL OR full_name = ''")
        
        if 'is_active' not in user_columns:
            logger.info("Añadiendo columna is_active a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1")
        
        if 'is_admin' not in user_columns:
            logger.info("Añadiendo columna is_admin a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT 0")
            # Establecer is_admin basado en el rol
            cursor.execute("UPDATE users SET is_admin = (role = 'admin')")
        
        # 3. Verificar y corregir la tabla tasks
        logger.info("3. Verificando y corrigiendo la tabla tasks...")
        
        cursor.execute("PRAGMA table_info(tasks)")
        task_columns = [col[1] for col in cursor.fetchall()]
        
        # Añadir columnas faltantes en tasks
        if 'title' not in task_columns:
            logger.info("Añadiendo columna title a la tabla tasks")
            cursor.execute("ALTER TABLE tasks ADD COLUMN title TEXT")
            # Copiar el nombre a título si existe
            if 'name' in task_columns:
                cursor.execute("UPDATE tasks SET title = name WHERE title IS NULL OR title = ''")
        
        if 'description' not in task_columns:
            logger.info("Añadiendo columna description a la tabla tasks")
            cursor.execute("ALTER TABLE tasks ADD COLUMN description TEXT")
        
        if 'priority' not in task_columns:
            logger.info("Añadiendo columna priority a la tabla tasks")
            cursor.execute("ALTER TABLE tasks ADD COLUMN priority TEXT DEFAULT 'Media'")
        
        if 'due_date' not in task_columns:
            logger.info("Añadiendo columna due_date a la tabla tasks")
            cursor.execute("ALTER TABLE tasks ADD COLUMN due_date DATETIME")
            # Si existe end_date, copiar a due_date
            if 'end_date' in task_columns:
                cursor.execute("UPDATE tasks SET due_date = end_date WHERE due_date IS NULL")
        
        if 'completed_at' not in task_columns:
            logger.info("Añadiendo columna completed_at a la tabla tasks")
            cursor.execute("ALTER TABLE tasks ADD COLUMN completed_at DATETIME")
        
        if 'assigned_to' not in task_columns:
            logger.info("Añadiendo columna assigned_to a la tabla tasks")
            cursor.execute("ALTER TABLE tasks ADD COLUMN assigned_to TEXT")
        
        # 4. Verificar y corregir la tabla updates
        logger.info("4. Verificando y corrigiendo la tabla updates...")
        
        cursor.execute("PRAGMA table_info(updates)")
        update_columns = [col[1] for col in cursor.fetchall()]
        
        # Columnas esperadas según el modelo SQLAlchemy
        expected_update_columns = ["id", "content", "project_id", "created_by_id", "created_at"]
        
        # Verificar columnas faltantes que deberían estar en el modelo
        missing_update_columns = [col for col in expected_update_columns if col not in update_columns]
        
        # Añadir columnas faltantes
        for column in missing_update_columns:
            logger.info(f"Añadiendo columna {column} a la tabla updates")
            
            if column == "created_at":
                cursor.execute("ALTER TABLE updates ADD COLUMN created_at DATETIME")
                # Actualizar con la fecha actual
                cursor.execute("UPDATE updates SET created_at = ?", (datetime.datetime.now().isoformat(),))
            
            elif column == "created_by_id":
                cursor.execute("ALTER TABLE updates ADD COLUMN created_by_id TEXT")
                
                # Obtener el ID del usuario admin para asignarlo como creador por defecto
                cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
                admin_id = cursor.fetchone()
                
                if admin_id:
                    admin_id = admin_id[0]
                    cursor.execute("UPDATE updates SET created_by_id = ?", (admin_id,))
                    logger.info(f"Columna created_by_id actualizada con admin ID: {admin_id}")
            
            elif column == "project_id":
                cursor.execute("ALTER TABLE updates ADD COLUMN project_id TEXT")
                
                # Obtener el ID del primer proyecto para asignarlo por defecto
                cursor.execute("SELECT id FROM projects LIMIT 1")
                project_id = cursor.fetchone()
                
                if project_id:
                    project_id = project_id[0]
                    cursor.execute("UPDATE updates SET project_id = ?", (project_id,))
                    logger.info(f"Columna project_id actualizada con proyecto ID: {project_id}")
        
        # 5. Verificar y corregir la tabla models3d
        logger.info("5. Verificando y corrigiendo la tabla models3d...")
        
        # Verificar si la tabla models3d existe
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='models3d'")
        models3d_exists = cursor.fetchone()
        
        if models3d_exists:
            # Verificar si la tabla models existe
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='models'")
            models_exists = cursor.fetchone()
            
            if not models_exists:
                logger.info("Creando tabla models basada en models3d")
                
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
                
                # Verificar la estructura de la tabla models3d
                cursor.execute("PRAGMA table_info(models3d)")
                models3d_columns = cursor.fetchall()
                models3d_column_names = [column[1] for column in models3d_columns]
                
                # Verificar si hay datos en la tabla models3d
                cursor.execute("SELECT COUNT(*) FROM models3d")
                count = cursor.fetchone()[0]
                
                # Copiar datos de models3d a models si es necesario
                if count > 0:
                    # Verificar las columnas comunes entre models3d y la nueva tabla models
                    common_columns = [col for col in models3d_column_names if col in ["id", "name", "description", "created_at"]]
                    
                    if common_columns:
                        columns_str = ", ".join(common_columns)
                        logger.info(f"Copiando datos de models3d a models para las columnas: {columns_str}")
                        
                        cursor.execute(f"INSERT INTO models ({columns_str}) SELECT {columns_str} FROM models3d")
                        logger.info(f"Datos copiados de models3d a models")
                
                logger.info("Tabla models creada correctamente")
        
        # 6. Verificar usuarios admin y demo
        logger.info("6. Verificando usuarios admin y demo...")
        
        # Verificar si existe el usuario admin
        cursor.execute("SELECT id, is_active, is_admin FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
        admin_user = cursor.fetchone()
        
        if not admin_user:
            logger.info("Creando usuario administrador")
            cursor.execute("""
                INSERT INTO users (email, hashed_password, full_name, is_active, is_admin, created_at) 
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                "admin@caribbeanembeddedlabs.com", 
                get_password_hash("admin123"), 
                "Administrador CEL", 
                1, 
                1, 
                datetime.datetime.now().isoformat()
            ))
        else:
            # Asegurarse de que el usuario admin tenga los flags correctos
            admin_id, is_active, is_admin = admin_user
            
            if not is_active or not is_admin:
                logger.info("Corrigiendo flags del usuario admin")
                cursor.execute("UPDATE users SET is_active = 1, is_admin = 1 WHERE email = 'admin@caribbeanembeddedlabs.com'")
        
        # Verificar si existe el usuario demo
        cursor.execute("SELECT id, is_active FROM users WHERE email = 'demo@caribbeanembeddedlabs.com'")
        demo_user = cursor.fetchone()
        
        if not demo_user:
            logger.info("Creando usuario demo")
            cursor.execute("""
                INSERT INTO users (email, hashed_password, full_name, is_active, is_admin, created_at) 
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                "demo@caribbeanembeddedlabs.com", 
                get_password_hash("demo123"), 
                "Usuario Demo", 
                1, 
                0, 
                datetime.datetime.now().isoformat()
            ))
        else:
            # Asegurarse de que el usuario demo esté activo
            demo_id, is_active = demo_user
            
            if not is_active:
                logger.info("Activando usuario demo")
                cursor.execute("UPDATE users SET is_active = 1 WHERE email = 'demo@caribbeanembeddedlabs.com'")
        
        # Guardar todos los cambios
        conn.commit()
        logger.info("Cambios guardados en la base de datos")
        
        # Verificar que todo esté correcto
        logger.info("Verificando el estado final de la base de datos...")
        
        # Verificar tablas
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        table_names = [table[0] for table in tables]
        
        logger.info(f"Tablas existentes: {', '.join(table_names)}")
        
        # Verificar usuarios
        cursor.execute("SELECT email, is_active, is_admin FROM users WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')")
        users = cursor.fetchall()
        
        for email, is_active, is_admin in users:
            logger.info(f"Usuario {email}: Activo = {bool(is_active)}, Admin = {bool(is_admin)}")
        
        # Verificar proyectos
        cursor.execute("SELECT COUNT(*) FROM projects")
        project_count = cursor.fetchone()[0]
        
        logger.info(f"Número de proyectos: {project_count}")
        
        # Verificar tareas
        cursor.execute("SELECT COUNT(*) FROM tasks")
        task_count = cursor.fetchone()[0]
        
        logger.info(f"Número de tareas: {task_count}")
        
        logger.info("=== CORRECCIÓN DE LA BASE DE DATOS COMPLETADA ===")
        
        # 7. Corregir la configuración de cookies
        logger.info("7. Corrigiendo la configuración de cookies...")
        
        # Buscar archivos Python que puedan contener configuración de cookies
        auth_files = []
        for root, dirs, files in os.walk('.'):
            for file in files:
                if file.endswith('.py') and ('auth' in file.lower() or 'cookie' in file.lower() or 'security' in file.lower()):
                    auth_files.append(os.path.join(root, file))
        
        logger.info(f"Encontrados {len(auth_files)} archivos potenciales con configuración de cookies")
        
        # Mostrar los archivos encontrados
        for file_path in auth_files:
            logger.info(f"Archivo potencial: {file_path}")
        
        logger.info("Para corregir la configuración de cookies, ejecute el script fix_cookie_settings.py")
        
        logger.info("=== PROCESO FINALIZADO ===")
        logger.info("Credenciales de acceso:")
        logger.info("Admin - Email: admin@caribbeanembeddedlabs.com, Contraseña: admin123")
        logger.info("Demo - Email: demo@caribbeanembeddedlabs.com, Contraseña: demo123")
        
    except Exception as e:
        logger.error(f"Error durante la corrección: {e}")
        if conn:
            conn.rollback()
        sys.exit(1)
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == "__main__":
    fix_all_issues()
