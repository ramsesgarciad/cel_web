#!/usr/bin/env python3
import os
import sys
import logging
import time
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import json
import importlib.util

# Importar la configuración de la aplicación
sys.path.append('/home/cel_web/api')
try:
    from app.core.config import settings
    DATABASE_URL = settings.DATABASE_URL
    print(f"Usando URL de base de datos desde configuración: {DATABASE_URL}")
    
    # Convertir ruta relativa a absoluta para SQLite
    if DATABASE_URL.startswith("sqlite:///./"):
        import os
        db_path = DATABASE_URL.replace("sqlite:///./", "")
        abs_db_path = os.path.abspath(db_path)
        DATABASE_URL = f"sqlite:///{abs_db_path}"
        print(f"URL de SQLite convertida a ruta absoluta: {DATABASE_URL}")
        
        # Verificar si el archivo existe
        if not os.path.exists(abs_db_path):
            print(f"ADVERTENCIA: El archivo de base de datos {abs_db_path} no existe!")
            
except ImportError:
    # Fallback a una URL por defecto
    DATABASE_URL = "sqlite:///./app.db"
    print(f"No se pudo importar configuración, usando URL por defecto: {DATABASE_URL}")

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("db_verification.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# La configuración de la base de datos se importa desde app.core.config

class DatabaseVerifier:
    def __init__(self):
        self.engine = create_engine(DATABASE_URL)
        self.Session = sessionmaker(bind=self.engine)
        self.session = self.Session()
        self.snapshots = {}
    
    def take_snapshot(self, table_name):
        """Toma una instantánea del estado actual de una tabla"""
        try:
            query = text(f"SELECT * FROM {table_name}")
            result = self.session.execute(query)
            
            # Convertir a lista de diccionarios
            records = []
            for row in result:
                record = {}
                for column, value in row._mapping.items():
                    # Convertir valores no serializables a string
                    if isinstance(value, (bytes, bytearray)):
                        value = str(value)
                    record[column] = value
                records.append(record)
            
            self.snapshots[table_name] = records
            logger.info(f"Snapshot tomado de la tabla {table_name}: {len(records)} registros")
            return records
        except Exception as e:
            logger.error(f"Error al tomar snapshot de {table_name}: {e}")
            return []
    
    def compare_with_current(self, table_name):
        """Compara el snapshot anterior con el estado actual de la tabla"""
        if table_name not in self.snapshots:
            logger.error(f"No hay snapshot previo para la tabla {table_name}")
            return False
        
        try:
            # Obtener estado actual
            query = text(f"SELECT * FROM {table_name}")
            result = self.session.execute(query)
            
            current_records = []
            for row in result:
                record = {}
                for column, value in row._mapping.items():
                    if isinstance(value, (bytes, bytearray)):
                        value = str(value)
                    record[column] = value
                current_records.append(record)
            
            # Comparar cantidad de registros
            prev_count = len(self.snapshots[table_name])
            curr_count = len(current_records)
            
            if prev_count != curr_count:
                logger.info(f"Cambio detectado en {table_name}: {prev_count} -> {curr_count} registros")
                
                # Identificar registros nuevos
                if curr_count > prev_count:
                    prev_ids = set(r.get('id') for r in self.snapshots[table_name])
                    new_records = [r for r in current_records if r.get('id') not in prev_ids]
                    logger.info(f"Nuevos registros: {len(new_records)}")
                    for record in new_records:
                        logger.info(f"Nuevo registro: {record}")
                
                # Identificar registros eliminados
                if curr_count < prev_count:
                    curr_ids = set(r.get('id') for r in current_records)
                    deleted_records = [r for r in self.snapshots[table_name] if r.get('id') not in curr_ids]
                    logger.info(f"Registros eliminados: {len(deleted_records)}")
                    for record in deleted_records:
                        logger.info(f"Registro eliminado: {record}")
                
                return True
            else:
                # Verificar si hay cambios en los registros existentes
                changes = False
                for i, prev_record in enumerate(self.snapshots[table_name]):
                    if i < len(current_records):
                        curr_record = current_records[i]
                        if prev_record != curr_record:
                            logger.info(f"Registro modificado: {prev_record} -> {curr_record}")
                            changes = True
                
                if not changes:
                    logger.info(f"No se detectaron cambios en la tabla {table_name}")
                
                return changes
        except Exception as e:
            logger.error(f"Error al comparar snapshots de {table_name}: {e}")
            return False
    
    def verify_tables(self, tables=None):
        """Verifica cambios en las tablas especificadas"""
        if tables is None:
            tables = ["users", "projects", "tasks", "updates", "documents", "models"]
        
        for table in tables:
            self.compare_with_current(table)
    
    def close(self):
        """Cierra la conexión a la base de datos"""
        self.session.close()

if __name__ == "__main__":
    verifier = DatabaseVerifier()
    
    # Tomar snapshot inicial o verificar cambios
    if len(sys.argv) > 1 and sys.argv[1] == "snapshot":
        # Tomar snapshot inicial
        tables = ["users", "projects", "tasks", "updates", "documents", "models"]
        for table in tables:
            verifier.take_snapshot(table)
        
        # Guardar snapshots en un archivo
        snapshot_file = "db_snapshot.json"
        with open(snapshot_file, "w") as f:
            json.dump(verifier.snapshots, f, default=str)
        logger.info(f"Snapshots guardados en {snapshot_file}")
    
    elif len(sys.argv) > 1 and sys.argv[1] == "verify":
        # Cargar snapshots previos
        snapshot_file = "db_snapshot.json"
        if os.path.exists(snapshot_file):
            with open(snapshot_file, "r") as f:
                verifier.snapshots = json.load(f)
            logger.info(f"Snapshots cargados desde {snapshot_file}")
            
            # Verificar cambios
            verifier.verify_tables()
        else:
            logger.error(f"No se encontró el archivo de snapshots {snapshot_file}")
    
    else:
        logger.info("Uso: python db_verification.py [snapshot|verify]")
    
    verifier.close()
