import sqlite3
import logging
import sys

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def final_verification():
    """
    Script final para verificar que todas las tablas y columnas necesarias estén
    correctamente configuradas en la base de datos y que la aplicación pueda funcionar sin errores.
    """
    try:
        logger.info("Iniciando verificación final de la base de datos...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar las tablas existentes
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        table_names = [table[0] for table in tables]
        
        logger.info(f"Tablas existentes en la base de datos: {', '.join(table_names)}")
        
        # Verificar usuarios admin y demo
        logger.info("Verificando usuarios admin y demo...")
        cursor.execute("SELECT id, email, is_active, is_admin FROM users WHERE email IN ('admin@caribbeanembeddedlabs.com', 'demo@caribbeanembeddedlabs.com')")
        users = cursor.fetchall()
        
        if len(users) < 2:
            logger.error("No se encontraron los usuarios admin y demo. La autenticación podría fallar.")
            sys.exit(1)
        
        for user in users:
            user_id, email, is_active, is_admin = user
            logger.info(f"Usuario {email} (ID: {user_id}): Activo = {bool(is_active)}, Admin = {bool(is_admin)}")
            
            # Verificar que los usuarios tengan los flags correctos
            if email == 'admin@caribbeanembeddedlabs.com' and not bool(is_admin):
                logger.error("El usuario admin no tiene el flag is_admin establecido. Corrigiendo...")
                cursor.execute("UPDATE users SET is_admin = 1 WHERE email = 'admin@caribbeanembeddedlabs.com'")
                conn.commit()
            
            if not bool(is_active):
                logger.error(f"El usuario {email} no está activo. Corrigiendo...")
                cursor.execute("UPDATE users SET is_active = 1 WHERE email = ?", (email,))
                conn.commit()
        
        # Verificar proyectos y sus estados
        logger.info("Verificando proyectos y sus estados...")
        cursor.execute("""
            SELECT p.id, p.name, p.status, p.client_id, u.email 
            FROM projects p 
            LEFT JOIN users u ON p.client_id = u.id
        """)
        projects = cursor.fetchall()
        
        if not projects:
            logger.error("No se encontraron proyectos en la base de datos.")
            sys.exit(1)
        
        for project in projects:
            project_id, name, status, client_id, client_email = project
            logger.info(f"Proyecto '{name}' (ID: {project_id}): Estado = {status or 'Sin estado'}, Cliente = {client_email or 'Sin cliente'}")
            
            # Verificar que los proyectos tengan un estado y un cliente asignado
            if not status:
                logger.error(f"El proyecto '{name}' no tiene un estado asignado. Corrigiendo...")
                cursor.execute("UPDATE projects SET status = 'En progreso' WHERE id = ?", (project_id,))
                conn.commit()
            
            if not client_id:
                logger.error(f"El proyecto '{name}' no tiene un cliente asignado. Corrigiendo...")
                cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
                admin_id = cursor.fetchone()[0]
                cursor.execute("UPDATE projects SET client_id = ? WHERE id = ?", (admin_id, project_id))
                conn.commit()
        
        # Verificar la tabla updates
        logger.info("Verificando la tabla updates...")
        cursor.execute("PRAGMA table_info(updates)")
        update_columns = cursor.fetchall()
        update_column_names = [column[1] for column in update_columns]
        
        required_update_columns = ["id", "content", "project_id", "created_by_id", "created_at"]
        missing_update_columns = [col for col in required_update_columns if col not in update_column_names]
        
        if missing_update_columns:
            logger.error(f"Columnas faltantes en la tabla updates: {', '.join(missing_update_columns)}")
            sys.exit(1)
        else:
            logger.info("La tabla updates tiene todas las columnas necesarias")
        
        # Verificar que las actualizaciones tengan project_id y created_by_id
        cursor.execute("SELECT id, content FROM updates WHERE project_id IS NULL OR project_id = '' OR created_by_id IS NULL OR created_by_id = ''")
        updates_without_refs = cursor.fetchall()
        
        if updates_without_refs:
            logger.error(f"Se encontraron {len(updates_without_refs)} actualizaciones sin project_id o created_by_id")
            
            # Obtener IDs para asignar por defecto
            cursor.execute("SELECT id FROM projects LIMIT 1")
            project_id = cursor.fetchone()[0]
            
            cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
            admin_id = cursor.fetchone()[0]
            
            # Actualizar las actualizaciones sin referencias
            for update_id, content in updates_without_refs:
                logger.info(f"Corrigiendo actualización ID {update_id}: {content[:30]}...")
                cursor.execute(
                    "UPDATE updates SET project_id = ?, created_by_id = ? WHERE id = ?",
                    (project_id, admin_id, update_id)
                )
            
            conn.commit()
            logger.info("Actualizaciones corregidas")
        
        # Verificar la tabla models
        logger.info("Verificando la tabla models...")
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='models'")
        models_table_exists = cursor.fetchone()
        
        if not models_table_exists:
            logger.error("La tabla models no existe")
            sys.exit(1)
        else:
            logger.info("La tabla models existe")
        
        logger.info("\n=== RESUMEN FINAL ===")
        logger.info("✓ Usuarios admin y demo verificados")
        logger.info("✓ Proyectos y sus estados verificados")
        logger.info("✓ Tabla updates verificada")
        logger.info("✓ Tabla models verificada")
        logger.info("La base de datos está correctamente configurada y lista para usar")
        logger.info("=====================")
        
    except Exception as e:
        logger.error(f"Error en la verificación final: {e}")
        sys.exit(1)
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        logger.info("Proceso de verificación finalizado")

if __name__ == "__main__":
    final_verification()
