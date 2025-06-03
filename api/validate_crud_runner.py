#!/usr/bin/env python3
import sys
import logging
import os
import json
import time
from sqlalchemy import text
from validate_crud import CRUDValidator
from template_analyzer import TemplateAnalyzer
from db_verification import DatabaseVerifier

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("crud_validation_runner.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def run_validation():
    """Ejecuta la validación completa de CRUD y plantillas"""
    logger.info("=== Iniciando validación completa de CRUD y plantillas ===")
    
    # Inicializar verificador de base de datos
    db_verifier = DatabaseVerifier()
    
    # Tomar snapshot inicial de las tablas
    logger.info("Tomando snapshot inicial de la base de datos...")
    tables = ["users", "projects"]
    snapshots = {}
    for table in tables:
        snapshots[table] = db_verifier.take_snapshot(table)
    
    # Guardar snapshot inicial
    snapshot_file = "db_snapshot_before.json"
    with open(snapshot_file, "w") as f:
        json.dump(snapshots, f, default=str)
    logger.info(f"Snapshot inicial guardado en {snapshot_file}")
    
    # Configurar credenciales de administrador
    admin_credentials = {
        "username": "admin@example.com",
        "password": "admin123"
    }
    
    # Validar operaciones CRUD
    crud_validator = CRUDValidator()
    # Asegurarse de que estamos usando las credenciales correctas
    crud_validator.admin_credentials = admin_credentials
    
    crud_success = crud_validator.run_validation() if hasattr(crud_validator, 'run_validation') else False
    
    if not hasattr(crud_validator, 'run_validation'):
        # Si no existe el método run_validation, ejecutamos los métodos individuales
        logger.info("Ejecutando métodos de validación individuales...")
        
        # Iniciar sesión como administrador
        if not crud_validator.login_admin():
            logger.error("No se pudo iniciar sesión como administrador. Abortando validación.")
            return False
        
        # Validar operaciones CRUD
        user_crud_ok = crud_validator.validate_user_crud()
        project_crud_ok = crud_validator.validate_project_crud()
        
        # Limpiar recursos
        cleanup_resources(crud_validator)
        
        crud_success = user_crud_ok and project_crud_ok
    
    # Analizar y corregir plantillas
    template_analyzer = TemplateAnalyzer()
    template_analyzer.analyze_templates()
    templates_fixed = len(template_analyzer.fixes_applied) > 0
    
    # Mostrar resumen
    logger.info("\n=== RESUMEN DE VALIDACIÓN ===")
    logger.info(f"Validación CRUD: {'OK' if crud_success else 'FALLÓ'}")
    logger.info(f"Plantillas corregidas: {'Sí' if templates_fixed else 'No'}")
    
    if crud_validator.issues:
        logger.info("\nProblemas encontrados en CRUD:")
        for issue in crud_validator.issues:
            logger.info(f"- {issue}")
    
    if template_analyzer.template_issues:
        logger.info("\nProblemas encontrados en plantillas:")
        for issue in template_analyzer.template_issues:
            logger.info(f"- {issue}")
    
    return crud_success and not template_analyzer.template_issues

def cleanup_resources(validator):
    """Limpia los recursos creados durante las pruebas"""
    logger.info("\n=== Limpiando recursos creados ===")
    
    # Eliminar proyectos creados
    for project_id in validator.created_resources["projects"]:
        try:
            logger.info(f"Eliminando proyecto {project_id}...")
            validator.session.delete(validator.ENDPOINTS["projects"]["delete"].format(id=project_id))
        except Exception as e:
            logger.error(f"Error al eliminar proyecto {project_id}: {e}")
    
    # Eliminar usuarios creados
    for user_id in validator.created_resources["users"]:
        try:
            logger.info(f"Eliminando usuario {user_id}...")
            validator.session.delete(validator.ENDPOINTS["users"]["delete"].format(id=user_id))
        except Exception as e:
            logger.error(f"Error al eliminar usuario {user_id}: {e}")

if __name__ == "__main__":
    success = run_validation()
    
    # Verificar cambios en la base de datos después de las pruebas
    logger.info("\n=== Verificando cambios en la base de datos ===")
    db_verifier = DatabaseVerifier()
    
    # Cargar snapshot inicial
    with open("db_snapshot_before.json", "r") as f:
        db_verifier.snapshots = json.load(f)
    
    # Verificar cambios en las tablas
    db_changes = False
    for table in ["users", "projects"]:
        table_changes = db_verifier.compare_with_current(table)
        if table_changes:
            db_changes = True
    
    # Ejecutar consultas SQL directas para verificar el estado actual de la base de datos
    logger.info("\n=== Ejecutando consultas SQL directas ===")
    try:
        # Crear un usuario de prueba directamente en la base de datos
        test_user_email = f"direct_sql_test_{int(time.time())}@example.com"
        db_verifier.session.execute(
            text(f"INSERT INTO users (name, email, hashed_password, is_active, role) "
                 f"VALUES ('SQL Test User', '{test_user_email}', 'hashed_password', 1, 'client')")
        )
        db_verifier.session.commit()
        logger.info(f"Insertado usuario de prueba directo en SQL: {test_user_email}")
        
        # Verificar que el usuario fue creado
        result = db_verifier.session.execute(text(f"SELECT * FROM users WHERE email = '{test_user_email}'"))
        user_exists = result.fetchone() is not None
        logger.info(f"Usuario encontrado en la base de datos: {user_exists}")
        
        if user_exists:
            logger.info("✅ La conexión directa a la base de datos funciona correctamente")
            db_changes = True
        else:
            logger.warning("⚠️ No se pudo verificar la inserción directa en la base de datos")
    except Exception as e:
        logger.error(f"Error al ejecutar consultas SQL directas: {e}")
        import traceback
        logger.error(traceback.format_exc())
    
    # Guardar snapshot final
    snapshot_file = "db_snapshot_after.json"
    snapshots = {}
    for table in ["users", "projects"]:
        snapshots[table] = db_verifier.take_snapshot(table)
    
    with open(snapshot_file, "w") as f:
        json.dump(snapshots, f, default=str)
    logger.info(f"Snapshot final guardado en {snapshot_file}")
    
    # Cerrar conexión a la base de datos
    db_verifier.close()
    
    if success:
        if db_changes:
            logger.info("\n✅ Validación completada con éxito y se detectaron cambios en la base de datos")
        else:
            logger.warning("\n⚠️ Validación completada pero NO se detectaron cambios en la base de datos")
            logger.warning("Esto podría indicar que las operaciones CRUD no están afectando realmente a la base de datos")
            success = False
        
        sys.exit(0 if success else 1)
    else:
        logger.error("\n❌ La validación falló")
        sys.exit(1)
