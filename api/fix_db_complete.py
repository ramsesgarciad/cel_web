import sqlite3
import logging
import datetime
import uuid
from datetime import timedelta
from passlib.context import CryptContext

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuración de hash de contraseñas igual que en la aplicación
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    """Genera un hash para la contraseña usando bcrypt."""
    return pwd_context.hash(password)

def fix_database():
    """
    Script completo para:
    1. Añadir todas las columnas faltantes a la tabla users
    2. Crear usuarios de demostración
    3. Crear proyectos y tareas de ejemplo
    """
    try:
        # Conectar directamente a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # 1. Verificar y añadir columnas faltantes en la tabla users
        cursor.execute("PRAGMA table_info(users)")
        columns = [row[1] for row in cursor.fetchall()]
        
        if 'is_active' not in columns:
            logger.info("Añadiendo columna is_active a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT 1")
        
        if 'is_admin' not in columns:
            logger.info("Añadiendo columna is_admin a la tabla users")
            cursor.execute("ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT 0")
        
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
        
        # 2. Actualizar usuarios existentes para establecer is_admin según el rol
        cursor.execute("UPDATE users SET is_admin = (role = 'admin')")
        
        # 3. Verificar si existen los usuarios de demostración
        cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
        admin_exists = cursor.fetchone()
        
        cursor.execute("SELECT id FROM users WHERE email = 'demo@caribbeanembeddedlabs.com'")
        demo_exists = cursor.fetchone()
        
        # 4. Crear usuario admin si no existe
        if not admin_exists:
            logger.info("Creando usuario administrador")
            cursor.execute("""
                INSERT INTO users (name, email, hashed_password, role, is_admin, is_active, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                "Administrador CEL", 
                "admin@caribbeanembeddedlabs.com", 
                get_password_hash("admin123"), 
                "admin", 
                1, 
                1, 
                datetime.datetime.now()
            ))
            admin_id = cursor.lastrowid
        else:
            admin_id = admin_exists[0]
        
        # 5. Crear usuario demo si no existe
        if not demo_exists:
            logger.info("Creando usuario de demostración")
            cursor.execute("""
                INSERT INTO users (name, email, hashed_password, role, is_admin, is_active, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                "Usuario Demo", 
                "demo@caribbeanembeddedlabs.com", 
                get_password_hash("demo123"), 
                "user", 
                0, 
                1, 
                datetime.datetime.now()
            ))
            demo_id = cursor.lastrowid
        else:
            demo_id = demo_exists[0]
        
        # 6. Crear proyecto de demostración
        now = datetime.datetime.now()
        
        # Verificar si ya existe un proyecto de demostración
        cursor.execute("SELECT id FROM projects WHERE name = 'Proyecto de Demostración'")
        demo_project = cursor.fetchone()
        
        if not demo_project:
            logger.info("Creando proyecto de demostración")
            # Omitir el ID para que SQLite asigne uno automáticamente
            cursor.execute("""
                INSERT INTO projects (name, description, client, start_date, end_date, progress) 
                VALUES (?, ?, ?, ?, ?, ?)
            """, (
                "Proyecto de Demostración", 
                "Este es un proyecto de demostración para mostrar las funcionalidades del sistema", 
                "Caribbean Embedded Labs", 
                now.strftime('%Y-%m-%d'), 
                (now + timedelta(days=30)).strftime('%Y-%m-%d'), 
                25
            ))
            
            # Obtener el ID del proyecto recién creado
            cursor.execute("SELECT id FROM projects WHERE name = 'Proyecto de Demostración'")
            project_id = cursor.fetchone()[0]
            
            # Asignar usuarios al proyecto
            cursor.execute("""
                INSERT INTO user_project (user_id, project_id) 
                VALUES (?, ?)
            """, (admin_id, project_id))
            
            cursor.execute("""
                INSERT INTO user_project (user_id, project_id) 
                VALUES (?, ?)
            """, (demo_id, project_id))
            
            # Crear tareas para el proyecto
            tasks = [
                ("Análisis de requerimientos", "Completada", now - timedelta(days=5), now - timedelta(days=1), "5 días", 100),
                ("Diseño de arquitectura", "En progreso", now - timedelta(days=1), now + timedelta(days=3), "4 días", 50),
                ("Implementación del backend", "Pendiente", now + timedelta(days=3), now + timedelta(days=10), "7 días", 0),
                ("Desarrollo del frontend", "Pendiente", now + timedelta(days=10), now + timedelta(days=20), "10 días", 0),
                ("Pruebas y correcciones", "Pendiente", now + timedelta(days=20), now + timedelta(days=25), "5 días", 0),
                ("Despliegue", "Pendiente", now + timedelta(days=25), now + timedelta(days=30), "5 días", 0)
            ]
            
            logger.info("Creando tareas de demostración")
            for name, status, start_date, end_date, duration, percent_done in tasks:
                cursor.execute("""
                    INSERT INTO tasks (project_id, name, status, start_date, end_date, duration, percent_done, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    project_id,
                    name,
                    status,
                    start_date.strftime('%Y-%m-%d'),
                    end_date.strftime('%Y-%m-%d'),
                    duration,
                    percent_done,
                    now
                ))
        
        # Guardar cambios y cerrar
        conn.commit()
        conn.close()
        logger.info("Migración y creación de datos de demostración completada exitosamente")
        
        # Mostrar credenciales
        logger.info("Credenciales de acceso:")
        logger.info("Admin - Email: admin@caribbeanembeddedlabs.com, Contraseña: admin123")
        logger.info("Demo - Email: demo@caribbeanembeddedlabs.com, Contraseña: demo123")
        
    except Exception as e:
        logger.error(f"Error durante la migración: {e}")
        raise

if __name__ == "__main__":
    logger.info("Iniciando migración y creación de datos de demostración...")
    fix_database()
    logger.info("Proceso finalizado")
