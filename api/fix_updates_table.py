import sqlite3
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def fix_updates_table():
    """
    Script para corregir la estructura de la tabla updates, añadiendo la columna created_by_id
    que está definida en el modelo SQLAlchemy pero no existe en la base de datos.
    """
    try:
        logger.info("Iniciando corrección de la tabla updates...")
        
        # Conectar a la base de datos SQLite
        conn = sqlite3.connect('app.db')
        cursor = conn.cursor()
        
        # Verificar la estructura actual de la tabla updates
        cursor.execute("PRAGMA table_info(updates)")
        columns = cursor.fetchall()
        column_names = [column[1] for column in columns]
        
        logger.info(f"Columnas actuales en la tabla updates: {', '.join(column_names)}")
        
        # Verificar si existe la columna created_by_id
        if 'created_by_id' not in column_names:
            logger.info("Añadiendo columna created_by_id a la tabla updates")
            
            # Añadir la columna created_by_id
            cursor.execute("ALTER TABLE updates ADD COLUMN created_by_id TEXT")
            
            # Obtener el ID del usuario admin para asignarlo como creador por defecto
            cursor.execute("SELECT id FROM users WHERE email = 'admin@caribbeanembeddedlabs.com'")
            admin_id = cursor.fetchone()
            
            if admin_id:
                admin_id = admin_id[0]
                logger.info(f"Asignando usuario admin (ID: {admin_id}) como creador por defecto para todas las actualizaciones")
                
                # Actualizar todas las actualizaciones para asignar el admin como creador
                cursor.execute("UPDATE updates SET created_by_id = ?", (admin_id,))
                logger.info("Actualizaciones actualizadas con created_by_id del admin")
            else:
                logger.warning("No se encontró el usuario admin, no se pudo asignar created_by_id por defecto")
            
            conn.commit()
            logger.info("Columna created_by_id añadida y actualizada correctamente")
        else:
            logger.info("La columna created_by_id ya existe en la tabla updates")
        
        # Verificar si hay actualizaciones en la tabla
        cursor.execute("SELECT COUNT(*) FROM updates")
        count = cursor.fetchone()[0]
        logger.info(f"Número de actualizaciones en la base de datos: {count}")
        
        if count > 0:
            # Mostrar algunas actualizaciones para verificar
            cursor.execute("SELECT id, content, created_by_id FROM updates LIMIT 5")
            updates = cursor.fetchall()
            for update in updates:
                logger.info(f"Actualización ID: {update[0]}, Contenido: {update[1][:30]}..., Creador ID: {update[2] or 'Sin creador'}")
        
        logger.info("Corrección de la tabla updates completada")
        
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
    fix_updates_table()
