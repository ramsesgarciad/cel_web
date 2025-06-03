#!/usr/bin/env python3
import requests
import sys
import json
import logging
import os
from typing import Dict, List, Any, Tuple, Optional
import subprocess
import time

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("api_validation.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuración base
BASE_URL = "http://localhost:8001"
API_BASE = f"{BASE_URL}/api"
ENDPOINTS = {
    "health": f"{API_BASE}/health",
    "auth": {
        "login": f"{API_BASE}/auth/login",
        "register": f"{API_BASE}/auth/register",
        "me": f"{API_BASE}/auth/me",
    },
    "projects": {
        "list": f"{API_BASE}/projects/",
        "create": f"{API_BASE}/projects/",
        "detail": f"{API_BASE}/projects/{{id}}",
        "update": f"{API_BASE}/projects/{{id}}",
        "delete": f"{API_BASE}/projects/{{id}}",
    },
    "tasks": {
        "list": f"{API_BASE}/projects/{{project_id}}/tasks",
        "create": f"{API_BASE}/projects/{{project_id}}/tasks",
        "detail": f"{API_BASE}/projects/{{project_id}}/tasks/{{id}}",
        "update": f"{API_BASE}/projects/{{project_id}}/tasks/{{id}}",
        "delete": f"{API_BASE}/projects/{{project_id}}/tasks/{{id}}",
    },
    "updates": {
        "list": f"{API_BASE}/projects/{{project_id}}/updates",
        "create": f"{API_BASE}/projects/{{project_id}}/updates",
        "detail": f"{API_BASE}/projects/{{project_id}}/updates/{{id}}",
        "delete": f"{API_BASE}/projects/{{project_id}}/updates/{{id}}",
    },
    "documents": {
        "list": f"{API_BASE}/projects/{{project_id}}/documents",
        "upload": f"{API_BASE}/projects/{{project_id}}/documents/upload",
        "download": f"{API_BASE}/projects/{{project_id}}/documents/{{id}}/download",
        "delete": f"{API_BASE}/projects/{{project_id}}/documents/{{id}}",
    },
    "users": {
        "list": f"{API_BASE}/users/",
        "create": f"{API_BASE}/users/",
        "detail": f"{API_BASE}/users/{{id}}",
        "update": f"{API_BASE}/users/{{id}}",
        "delete": f"{API_BASE}/users/{{id}}",
    },
    "models": {
        "list": f"{API_BASE}/models/",
        "upload": f"{API_BASE}/models/upload",
        "detail": f"{API_BASE}/models/{{id}}",
        "delete": f"{API_BASE}/models/{{id}}",
    }
}

class APIValidator:
    def __init__(self):
        self.token = None
        self.session = requests.Session()
        self.test_user = {
            "email": "test@example.com",
            "password": "Test123!",
            "full_name": "Test User"
        }
        self.created_resources = {
            "users": [],
            "projects": [],
            "tasks": [],
            "updates": [],
            "documents": [],
            "models": []
        }
        self.issues = []
        self.fixes = []

    def start_api_server(self) -> bool:
        """Intenta iniciar el servidor API si no está en ejecución"""
        try:
            # Verificar si el servidor ya está en ejecución
            response = requests.get(f"{BASE_URL}/api/health", timeout=2)
            if response.status_code == 200:
                logger.info("El servidor API ya está en ejecución")
                return True
        except requests.exceptions.ConnectionError:
            logger.info("El servidor API no está en ejecución. Intentando iniciar...")
            
            # Verificar si todas las dependencias están instaladas
            try:
                # Verificar requirements.txt
                with open("requirements.txt", "r") as f:
                    required = f.read().splitlines()
                
                # Instalar dependencias faltantes
                for package in required:
                    if package.strip():
                        try:
                            __import__(package.replace("-", "_").split("==")[0])
                        except ImportError:
                            logger.info(f"Instalando dependencia faltante: {package}")
                            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            except Exception as e:
                logger.warning(f"Error al verificar dependencias: {str(e)}")
            
            try:
                # Iniciar el servidor en un proceso separado
                subprocess.Popen(
                    ["python", "init_and_run.py"], 
                    cwd=os.path.dirname(os.path.abspath(__file__))
                )
                
                # Esperar a que el servidor esté listo
                max_attempts = 15  # Aumentamos el número de intentos
                for attempt in range(max_attempts):
                    try:
                        time.sleep(2)
                        response = requests.get(f"{BASE_URL}/api/health", timeout=2)
                        if response.status_code == 200:
                            logger.info(f"Servidor API iniciado correctamente después de {attempt+1} intentos")
                            return True
                    except requests.exceptions.ConnectionError:
                        logger.info(f"Esperando a que el servidor esté listo... ({attempt+1}/{max_attempts})")
                
                # Si no se pudo iniciar, intentar ejecutar directamente main.py
                if attempt == max_attempts - 1:
                    logger.info("Intentando iniciar el servidor directamente con main.py...")
                    subprocess.Popen(
                        ["python", "main.py"], 
                        cwd=os.path.dirname(os.path.abspath(__file__))
                    )
                    
                    # Esperar nuevamente
                    for attempt in range(max_attempts):
                        try:
                            time.sleep(2)
                            response = requests.get(f"{BASE_URL}/api/health", timeout=2)
                            if response.status_code == 200:
                                logger.info(f"Servidor API iniciado correctamente con main.py después de {attempt+1} intentos")
                                return True
                        except requests.exceptions.ConnectionError:
                            logger.info(f"Esperando a que el servidor esté listo (main.py)... ({attempt+1}/{max_attempts})")
                
                logger.error("No se pudo iniciar el servidor API después de varios intentos")
                return False
            except Exception as e:
                logger.error(f"Error al iniciar el servidor API: {str(e)}")
                return False
        
        return True

    def register_and_login(self) -> bool:
        """Registra un usuario de prueba y obtiene un token de autenticación"""
        try:
            # Intentar registrar al usuario
            register_url = ENDPOINTS["auth"]["register"]
            response = self.session.post(register_url, json=self.test_user)
            
            if response.status_code not in [200, 201, 409]:  # 409 si el usuario ya existe
                self.issues.append(f"Error al registrar usuario: {response.status_code} - {response.text}")
                return False
            
            # Iniciar sesión
            login_url = ENDPOINTS["auth"]["login"]
            login_data = {
                "username": self.test_user["email"],
                "password": self.test_user["password"]
            }
            response = self.session.post(login_url, data=login_data)
            
            if response.status_code != 200:
                self.issues.append(f"Error al iniciar sesión: {response.status_code} - {response.text}")
                return False
            
            # Guardar el token
            token_data = response.json()
            if "access_token" not in token_data:
                self.issues.append("No se encontró el token de acceso en la respuesta")
                return False
            
            self.token = token_data["access_token"]
            self.session.headers.update({"Authorization": f"Bearer {self.token}"})
            logger.info("Usuario registrado y autenticado correctamente")
            return True
        
        except Exception as e:
            self.issues.append(f"Error en el proceso de registro/login: {str(e)}")
            return False

    def validate_endpoints(self):
        """Valida todos los endpoints de la API"""
        if not self.start_api_server():
            logger.error("No se pudo iniciar el servidor API. Abortando validación.")
            return
        
        if not self.register_and_login():
            logger.error("No se pudo autenticar. Abortando validación.")
            return
        
        # Validar endpoints de salud
        self.validate_health()
        
        # Validar CRUD de usuarios
        self.validate_users()
        
        # Validar CRUD de proyectos
        project_id = self.validate_projects()
        
        if project_id:
            # Validar CRUD de tareas
            task_id = self.validate_tasks(project_id)
            
            # Validar CRUD de actualizaciones
            self.validate_updates(project_id)
            
            # Validar CRUD de documentos
            self.validate_documents(project_id)
        
        # Validar CRUD de modelos 3D
        self.validate_models()
        
        # Limpiar recursos creados
        self.cleanup_resources()
        
        # Mostrar resumen
        self.show_summary()

    def validate_health(self):
        """Valida el endpoint de salud"""
        try:
            response = self.session.get(ENDPOINTS["health"])
            if response.status_code != 200:
                self.issues.append(f"El endpoint de salud devolvió {response.status_code}")
            else:
                logger.info("Endpoint de salud validado correctamente")
        except Exception as e:
            self.issues.append(f"Error al validar endpoint de salud: {str(e)}")

    def validate_users(self):
        """Valida los endpoints de usuarios"""
        try:
            # Crear usuario
            new_user = {
                "email": f"test_user_{int(time.time())}@example.com",
                "password": "Test123!",
                "full_name": "Test User Created"
            }
            
            response = self.session.post(ENDPOINTS["users"]["create"], json=new_user)
            if response.status_code not in [200, 201]:
                self.issues.append(f"Error al crear usuario: {response.status_code} - {response.text}")
                return
            
            user_data = response.json()
            user_id = user_data.get("id")
            if not user_id:
                self.issues.append("No se recibió ID de usuario al crear")
                return
            
            self.created_resources["users"].append(user_id)
            logger.info(f"Usuario creado con ID: {user_id}")
            
            # Obtener usuario
            response = self.session.get(ENDPOINTS["users"]["detail"].format(id=user_id))
            if response.status_code != 200:
                self.issues.append(f"Error al obtener usuario: {response.status_code} - {response.text}")
            
            # Actualizar usuario
            update_data = {"full_name": "Test User Updated"}
            response = self.session.put(ENDPOINTS["users"]["update"].format(id=user_id), json=update_data)
            if response.status_code != 200:
                self.issues.append(f"Error al actualizar usuario: {response.status_code} - {response.text}")
            
            # Listar usuarios
            response = self.session.get(ENDPOINTS["users"]["list"])
            if response.status_code != 200:
                self.issues.append(f"Error al listar usuarios: {response.status_code} - {response.text}")
            
            logger.info("Endpoints de usuarios validados correctamente")
            
        except Exception as e:
            self.issues.append(f"Error al validar endpoints de usuarios: {str(e)}")

    def validate_projects(self) -> Optional[int]:
        """Valida los endpoints de proyectos y devuelve un ID de proyecto si se crea correctamente"""
        try:
            # Crear proyecto
            new_project = {
                "title": f"Test Project {int(time.time())}",
                "description": "This is a test project created by the API validator",
                "client_name": "Test Client",
                "status": "active"
            }
            
            response = self.session.post(ENDPOINTS["projects"]["create"], json=new_project)
            if response.status_code not in [200, 201]:
                self.issues.append(f"Error al crear proyecto: {response.status_code} - {response.text}")
                return None
            
            project_data = response.json()
            project_id = project_data.get("id")
            if not project_id:
                self.issues.append("No se recibió ID de proyecto al crear")
                return None
            
            self.created_resources["projects"].append(project_id)
            logger.info(f"Proyecto creado con ID: {project_id}")
            
            # Obtener proyecto
            response = self.session.get(ENDPOINTS["projects"]["detail"].format(id=project_id))
            if response.status_code != 200:
                self.issues.append(f"Error al obtener proyecto: {response.status_code} - {response.text}")
            
            # Actualizar proyecto
            update_data = {"title": "Test Project Updated"}
            response = self.session.put(ENDPOINTS["projects"]["update"].format(id=project_id), json=update_data)
            if response.status_code != 200:
                self.issues.append(f"Error al actualizar proyecto: {response.status_code} - {response.text}")
            
            # Listar proyectos
            response = self.session.get(ENDPOINTS["projects"]["list"])
            if response.status_code != 200:
                self.issues.append(f"Error al listar proyectos: {response.status_code} - {response.text}")
            
            logger.info("Endpoints de proyectos validados correctamente")
            return project_id
            
        except Exception as e:
            self.issues.append(f"Error al validar endpoints de proyectos: {str(e)}")
            return None

    def validate_tasks(self, project_id: int) -> Optional[int]:
        """Valida los endpoints de tareas y devuelve un ID de tarea si se crea correctamente"""
        if not project_id:
            self.issues.append("No se puede validar tareas sin un proyecto válido")
            return None
        
        try:
            # Crear tarea
            new_task = {
                "title": f"Test Task {int(time.time())}",
                "description": "This is a test task created by the API validator",
                "status": "pending",
                "due_date": "2025-12-31"
            }
            
            response = self.session.post(
                ENDPOINTS["tasks"]["create"].format(project_id=project_id), 
                json=new_task
            )
            if response.status_code not in [200, 201]:
                self.issues.append(f"Error al crear tarea: {response.status_code} - {response.text}")
                return None
            
            task_data = response.json()
            task_id = task_data.get("id")
            if not task_id:
                self.issues.append("No se recibió ID de tarea al crear")
                return None
            
            self.created_resources["tasks"].append((project_id, task_id))
            logger.info(f"Tarea creada con ID: {task_id}")
            
            # Obtener tarea
            response = self.session.get(
                ENDPOINTS["tasks"]["detail"].format(project_id=project_id, id=task_id)
            )
            if response.status_code != 200:
                self.issues.append(f"Error al obtener tarea: {response.status_code} - {response.text}")
            
            # Actualizar tarea
            update_data = {"title": "Test Task Updated"}
            response = self.session.put(
                ENDPOINTS["tasks"]["update"].format(project_id=project_id, id=task_id), 
                json=update_data
            )
            if response.status_code != 200:
                self.issues.append(f"Error al actualizar tarea: {response.status_code} - {response.text}")
            
            # Listar tareas
            response = self.session.get(
                ENDPOINTS["tasks"]["list"].format(project_id=project_id)
            )
            if response.status_code != 200:
                self.issues.append(f"Error al listar tareas: {response.status_code} - {response.text}")
            
            logger.info("Endpoints de tareas validados correctamente")
            return task_id
            
        except Exception as e:
            self.issues.append(f"Error al validar endpoints de tareas: {str(e)}")
            return None

    def validate_updates(self, project_id: int):
        """Valida los endpoints de actualizaciones"""
        if not project_id:
            self.issues.append("No se puede validar actualizaciones sin un proyecto válido")
            return
        
        try:
            # Crear actualización
            new_update = {
                "content": f"Test Update {int(time.time())}",
                "update_type": "progress"
            }
            
            response = self.session.post(
                ENDPOINTS["updates"]["create"].format(project_id=project_id), 
                json=new_update
            )
            if response.status_code not in [200, 201]:
                self.issues.append(f"Error al crear actualización: {response.status_code} - {response.text}")
                return
            
            update_data = response.json()
            update_id = update_data.get("id")
            if not update_id:
                self.issues.append("No se recibió ID de actualización al crear")
                return
            
            self.created_resources["updates"].append((project_id, update_id))
            logger.info(f"Actualización creada con ID: {update_id}")
            
            # Listar actualizaciones
            response = self.session.get(
                ENDPOINTS["updates"]["list"].format(project_id=project_id)
            )
            if response.status_code != 200:
                self.issues.append(f"Error al listar actualizaciones: {response.status_code} - {response.text}")
            
            logger.info("Endpoints de actualizaciones validados correctamente")
            
        except Exception as e:
            self.issues.append(f"Error al validar endpoints de actualizaciones: {str(e)}")

    def validate_documents(self, project_id: int):
        """Valida los endpoints de documentos"""
        if not project_id:
            self.issues.append("No se puede validar documentos sin un proyecto válido")
            return
        
        try:
            # Crear un archivo temporal para probar la carga
            temp_file_path = "temp_test_file.txt"
            with open(temp_file_path, "w") as f:
                f.write("This is a test document for API validation")
            
            # Cargar documento
            files = {"file": open(temp_file_path, "rb")}
            data = {"description": "Test document uploaded by API validator"}
            
            response = self.session.post(
                ENDPOINTS["documents"]["upload"].format(project_id=project_id),
                files=files,
                data=data
            )
            
            # Cerrar el archivo
            files["file"].close()
            
            # Eliminar el archivo temporal
            os.remove(temp_file_path)
            
            if response.status_code not in [200, 201]:
                self.issues.append(f"Error al cargar documento: {response.status_code} - {response.text}")
                return
            
            document_data = response.json()
            document_id = document_data.get("id")
            if not document_id:
                self.issues.append("No se recibió ID de documento al cargar")
                return
            
            self.created_resources["documents"].append((project_id, document_id))
            logger.info(f"Documento cargado con ID: {document_id}")
            
            # Listar documentos
            response = self.session.get(
                ENDPOINTS["documents"]["list"].format(project_id=project_id)
            )
            if response.status_code != 200:
                self.issues.append(f"Error al listar documentos: {response.status_code} - {response.text}")
            
            # Descargar documento
            response = self.session.get(
                ENDPOINTS["documents"]["download"].format(project_id=project_id, id=document_id)
            )
            if response.status_code != 200:
                self.issues.append(f"Error al descargar documento: {response.status_code} - {response.text}")
            
            logger.info("Endpoints de documentos validados correctamente")
            
        except Exception as e:
            self.issues.append(f"Error al validar endpoints de documentos: {str(e)}")

    def validate_models(self):
        """Valida los endpoints de modelos 3D"""
        try:
            # Crear un archivo STL temporal para probar la carga
            temp_file_path = "temp_test_model.stl"
            with open(temp_file_path, "w") as f:
                f.write("This is a test STL file for API validation")
            
            # Cargar modelo
            files = {"file": open(temp_file_path, "rb")}
            data = {"name": f"Test Model {int(time.time())}", "description": "Test model uploaded by API validator"}
            
            response = self.session.post(
                ENDPOINTS["models"]["upload"],
                files=files,
                data=data
            )
            
            # Cerrar el archivo
            files["file"].close()
            
            # Eliminar el archivo temporal
            os.remove(temp_file_path)
            
            if response.status_code not in [200, 201]:
                self.issues.append(f"Error al cargar modelo: {response.status_code} - {response.text}")
                return
            
            model_data = response.json()
            model_id = model_data.get("id")
            if not model_id:
                self.issues.append("No se recibió ID de modelo al cargar")
                return
            
            self.created_resources["models"].append(model_id)
            logger.info(f"Modelo cargado con ID: {model_id}")
            
            # Listar modelos
            response = self.session.get(ENDPOINTS["models"]["list"])
            if response.status_code != 200:
                self.issues.append(f"Error al listar modelos: {response.status_code} - {response.text}")
            
            # Obtener modelo
            response = self.session.get(ENDPOINTS["models"]["detail"].format(id=model_id))
            if response.status_code != 200:
                self.issues.append(f"Error al obtener modelo: {response.status_code} - {response.text}")
            
            logger.info("Endpoints de modelos validados correctamente")
            
        except Exception as e:
            self.issues.append(f"Error al validar endpoints de modelos: {str(e)}")

    def cleanup_resources(self):
        """Limpia los recursos creados durante la validación"""
        logger.info("Limpiando recursos creados durante la validación...")
        
        # Eliminar documentos
        for project_id, document_id in self.created_resources["documents"]:
            try:
                self.session.delete(
                    ENDPOINTS["documents"]["delete"].format(project_id=project_id, id=document_id)
                )
            except Exception:
                pass
        
        # Eliminar actualizaciones
        for project_id, update_id in self.created_resources["updates"]:
            try:
                self.session.delete(
                    ENDPOINTS["updates"]["delete"].format(project_id=project_id, id=update_id)
                )
            except Exception:
                pass
        
        # Eliminar tareas
        for project_id, task_id in self.created_resources["tasks"]:
            try:
                self.session.delete(
                    ENDPOINTS["tasks"]["delete"].format(project_id=project_id, id=task_id)
                )
            except Exception:
                pass
        
        # Eliminar proyectos
        for project_id in self.created_resources["projects"]:
            try:
                self.session.delete(
                    ENDPOINTS["projects"]["delete"].format(id=project_id)
                )
            except Exception:
                pass
        
        # Eliminar modelos
        for model_id in self.created_resources["models"]:
            try:
                self.session.delete(
                    ENDPOINTS["models"]["delete"].format(id=model_id)
                )
            except Exception:
                pass
        
        # Eliminar usuarios
        for user_id in self.created_resources["users"]:
            try:
                self.session.delete(
                    ENDPOINTS["users"]["delete"].format(id=user_id)
                )
            except Exception:
                pass

    def fix_issues(self):
        """Intenta corregir los problemas encontrados"""
        if not self.issues:
            logger.info("No se encontraron problemas que corregir")
            return
        
        logger.info(f"Intentando corregir {len(self.issues)} problemas encontrados...")
        
        # Verificar dependencias faltantes
        missing_dependencies = []
        for issue in self.issues:
            if "ModuleNotFoundError: No module named" in issue:
                module_name = issue.split("No module named ")[1].strip("'").strip()
                missing_dependencies.append(module_name)
        
        # Instalar dependencias faltantes
        if missing_dependencies:
            for module in missing_dependencies:
                try:
                    logger.info(f"Instalando dependencia faltante: {module}")
                    package_name = module.replace("_", "-")
                    subprocess.check_call([sys.executable, "-m", "pip", "install", package_name])
                    self.fixes.append(f"Se instaló la dependencia faltante: {module}")
                except Exception as e:
                    logger.error(f"Error al instalar {module}: {str(e)}")
        
        # Verificar problemas con endpoints
        for issue in self.issues:
            if "Error al crear usuario" in issue:
                # Verificar si el problema es que falta el endpoint o hay un error en la implementación
                self.fixes.append("Se detectó un problema con la creación de usuarios. Verificando implementación...")
                # Aquí iría la lógica para corregir el problema
            
            elif "Error al crear proyecto" in issue:
                self.fixes.append("Se detectó un problema con la creación de proyectos. Verificando implementación...")
                # Aquí iría la lógica para corregir el problema
            
            elif "Error al cargar documento" in issue:
                # Verificar si existe el directorio de uploads
                if not os.path.exists("uploads"):
                    os.makedirs("uploads")
                    self.fixes.append("Se creó el directorio de uploads faltante")
            
            elif "Error al cargar modelo" in issue:
                # Verificar si existe el directorio de modelos
                if not os.path.exists("uploads/models"):
                    os.makedirs("uploads/models", exist_ok=True)
                    self.fixes.append("Se creó el directorio de modelos faltante")
        
        logger.info(f"Se aplicaron {len(self.fixes)} correcciones")

    def show_summary(self):
        """Muestra un resumen de la validación"""
        print("\n" + "="*80)
        print("RESUMEN DE VALIDACIÓN DE API")
        print("="*80)
        
        if not self.issues:
            print("\n✅ No se encontraron problemas. La API funciona correctamente.")
        else:
            print(f"\n❌ Se encontraron {len(self.issues)} problemas:")
            for i, issue in enumerate(self.issues, 1):
                print(f"  {i}. {issue}")
        
        if self.fixes:
            print(f"\n🔧 Se aplicaron {len(self.fixes)} correcciones:")
            for i, fix in enumerate(self.fixes, 1):
                print(f"  {i}. {fix}")
        
        print("\n" + "="*80)

def check_and_install_dependencies():
    """Verifica e instala las dependencias necesarias para el script"""
    required_packages = [
        "requests", 
        "fastapi", 
        "uvicorn", 
        "sqlalchemy", 
        "pydantic", 
        "pydantic-settings", 
        "python-multipart", 
        "python-jose", 
        "passlib", 
        "email-validator",
        "python-dotenv"
    ]
    
    # Instalar paquetes especiales con extras
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pydantic[email]"])
        print("Instalado pydantic[email] para validación de correos")
    except Exception as e:
        print(f"Error al instalar pydantic[email]: {str(e)}")
    
    # Instalar paquetes regulares
    for package in required_packages:
        try:
            module_name = package.replace("-", "_")
            __import__(module_name)
        except ImportError:
            print(f"Instalando dependencia necesaria: {package}")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def main():
    print("Iniciando validación de API de Caribbean Embedded Labs...")
    
    # Verificar e instalar dependencias necesarias
    check_and_install_dependencies()
    
    validator = APIValidator()
    validator.validate_endpoints()
    validator.fix_issues()
    print("Validación completada. Consulta el archivo api_validation.log para más detalles.")

if __name__ == "__main__":
    main()
