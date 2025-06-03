#!/usr/bin/env python3
import requests
import json
import logging
import os
import sys
from typing import Dict, List, Any, Optional
import time
from template_analyzer import TemplateAnalyzer

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("crud_validation.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Configuración base
BASE_URL = "https://api.caribbeanembeddedlabs.com"
API_BASE = f"{BASE_URL}"
ADMIN_URL = "http://161.97.172.97:8000/admin"

# Endpoints de la API
ENDPOINTS = {
    "auth": {
        "login": f"{API_BASE}/api/auth/login",
        "me": f"{API_BASE}/api/auth/me",
    },
    "users": {
        "list": f"{API_BASE}/api/users",
        "create": f"{API_BASE}/api/users",
        "detail": f"{API_BASE}/api/users/{{id}}",
        "update": f"{API_BASE}/api/users/{{id}}",
        "delete": f"{API_BASE}/api/users/{{id}}",
    },
    "projects": {
        "list": f"{API_BASE}/api/projects",
        "create": f"{API_BASE}/api/projects",
        "detail": f"{API_BASE}/api/projects/{{id}}",
        "update": f"{API_BASE}/api/projects/{{id}}",
        "delete": f"{API_BASE}/api/projects/{{id}}",
    }
}

class CRUDValidator:
    def __init__(self):
        self.session = requests.Session()
        self.token = None
        self.admin_credentials = {
            "username": "admin@example.com",
            "password": "admin123"
        }
        self.test_user = {
            "email": f"test_{int(time.time())}@example.com",
            "name": "Test User",
            "password": "Test123!",
            "is_admin": False,
            "is_active": True,
            "role": "user"  # Campo requerido por la API
        }
        self.test_project = {
            "name": f"Test Project {int(time.time())}",
            "description": "Project created for testing CRUD operations",
            "client": None,  # Se asignará después (campo requerido por la API)
            "status": "in_progress",
            "progress": 50,
            "start_date": time.strftime("%Y-%m-%d"),  # Fecha de inicio (campo requerido)
            "end_date": time.strftime("%Y-%m-%d", time.localtime(time.time() + 30*24*60*60))  # Fecha de fin en 30 días (campo requerido)
        }
        self.created_resources = {
            "users": [],
            "projects": []
        }
        self.issues = []
        self.template_issues = []

    def login_admin(self):
        """Inicia sesión como administrador para obtener token de autenticación"""
        try:
            logger.info("Intentando iniciar sesión como administrador...")
            # La API espera un formulario OAuth2, no JSON
            form_data = {
                "username": self.admin_credentials["username"],
                "password": self.admin_credentials["password"]
            }
            
            response = self.session.post(
                ENDPOINTS["auth"]["login"],
                data=form_data  # Usar data en lugar de json para enviar como form-data
            )
            
            if response.status_code == 200:
                data = response.json()
                self.token = data.get("access_token")
                if self.token:
                    self.session.headers.update({"Authorization": f"Bearer {self.token}"})
                    logger.info("Inicio de sesión exitoso como administrador")
                    return True
                else:
                    logger.error("No se pudo obtener el token de acceso")
                    return False
            else:
                logger.error(f"Error al iniciar sesión: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            logger.error(f"Excepción al iniciar sesión: {e}")
            return False
            
    def validate_user_crud(self) -> bool:
        """Valida las operaciones CRUD para usuarios"""
        logger.info("\n=== Validando operaciones CRUD para usuarios ===")
        success = True
        
        # 1. Listar usuarios (READ - List)
        logger.info("1. Listando usuarios...")
        try:
            response = self.session.get(ENDPOINTS["users"]["list"])
            if response.status_code == 200:
                users = response.json()
                logger.info(f"Se encontraron {len(users)} usuarios")
            else:
                logger.error(f"Error al listar usuarios: {response.status_code} - {response.text}")
                self.issues.append(f"Error al listar usuarios: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al listar usuarios: {e}")
            self.issues.append(f"Excepción al listar usuarios: {str(e)}")
            success = False
        
        # 2. Crear usuario (CREATE)
        logger.info("2. Creando usuario de prueba...")
        user_id = None
        try:
            response = self.session.post(
                ENDPOINTS["users"]["create"],
                json=self.test_user
            )
            if response.status_code in [200, 201]:
                user_data = response.json()
                user_id = user_data.get("id")
                if user_id:
                    logger.info(f"Usuario creado con ID: {user_id}")
                    self.created_resources["users"].append(user_id)
                else:
                    logger.error("No se pudo obtener el ID del usuario creado")
                    self.issues.append("No se pudo obtener el ID del usuario creado")
                    success = False
            else:
                logger.error(f"Error al crear usuario: {response.status_code} - {response.text}")
                self.issues.append(f"Error al crear usuario: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al crear usuario: {e}")
            self.issues.append(f"Excepción al crear usuario: {str(e)}")
            success = False
        
        # Si no se pudo crear el usuario, no podemos continuar con las pruebas
        if not user_id:
            return False
        
        # 3. Obtener usuario específico (READ - Detail)
        logger.info(f"3. Obteniendo detalles del usuario {user_id}...")
        try:
            response = self.session.get(ENDPOINTS["users"]["detail"].format(id=user_id))
            if response.status_code == 200:
                user_data = response.json()
                logger.info(f"Usuario obtenido: {user_data.get('email')}")
            else:
                logger.error(f"Error al obtener usuario: {response.status_code} - {response.text}")
                self.issues.append(f"Error al obtener usuario: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al obtener usuario: {e}")
            self.issues.append(f"Excepción al obtener usuario: {str(e)}")
            success = False
        
        # 4. Actualizar usuario (UPDATE)
        logger.info(f"4. Actualizando usuario {user_id}...")
        updated_user = {
            "name": f"Updated User {int(time.time())}",
            "email": f"updated_{int(time.time())}@example.com",
            "role": "user",
            "is_active": True
        }
        
        try:
            response = self.session.put(
                ENDPOINTS["users"]["update"].format(id=user_id),
                json=updated_user
            )
            if response.status_code == 200:
                updated_user = response.json()
                logger.info(f"Usuario actualizado: {updated_user.get('name')}")
            else:
                logger.error(f"Error al actualizar usuario: {response.status_code} - {response.text}")
                self.issues.append(f"Error al actualizar usuario: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al actualizar usuario: {e}")
            self.issues.append(f"Excepción al actualizar usuario: {str(e)}")
            success = False
        
        # 5. Eliminar usuario (DELETE)
        logger.info(f"5. Eliminando usuario {user_id}...")
        try:
            response = self.session.delete(ENDPOINTS["users"]["delete"].format(id=user_id))
            if response.status_code in [200, 204]:
                logger.info("Usuario eliminado correctamente")
                self.created_resources["users"].remove(user_id)
            else:
                logger.error(f"Error al eliminar usuario: {response.status_code} - {response.text}")
                self.issues.append(f"Error al eliminar usuario: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al eliminar usuario: {e}")
            self.issues.append(f"Excepción al eliminar usuario: {str(e)}")
            success = False
            
        return success
        
    def validate_project_crud(self) -> bool:
        """Valida las operaciones CRUD para proyectos"""
        logger.info("\n=== Validando operaciones CRUD para proyectos ===")
        success = True
        
        # Primero necesitamos obtener un cliente para asignarlo al proyecto
        client_id = None
        try:
            # Obtenemos la lista de clientes (usuarios no admin)
            response = self.session.get(ENDPOINTS["users"]["list"])
            if response.status_code == 200:
                users = response.json()
                for user in users:
                    if not user.get("is_admin", False):
                        client_id = user.get("id")
                        logger.info(f"Cliente seleccionado para el proyecto: {client_id}")
                        break
                
                # Si no hay clientes, creamos uno
                if not client_id:
                    client_data = {
                        "email": f"client_{int(time.time())}@example.com",
                        "name": "Test Client",
                        "password": "Client123!",
                        "is_admin": False,
                        "is_active": True
                    }
                    response = self.session.post(ENDPOINTS["users"]["create"], json=client_data)
                    if response.status_code in [200, 201]:
                        client_id = response.json().get("id")
                        self.created_resources["users"].append(client_id)
                        logger.info(f"Cliente creado con ID: {client_id}")
                    else:
                        logger.error(f"Error al crear cliente: {response.status_code} - {response.text}")
                        self.issues.append(f"Error al crear cliente: {response.status_code}")
                        return False
            else:
                logger.error(f"Error al listar usuarios para seleccionar cliente: {response.status_code}")
                self.issues.append(f"Error al listar usuarios para seleccionar cliente: {response.status_code}")
                return False
        except Exception as e:
            logger.error(f"Excepción al obtener cliente para proyecto: {e}")
            self.issues.append(f"Excepción al obtener cliente para proyecto: {str(e)}")
            return False
        
        # Asignar el cliente al proyecto de prueba
        self.test_project["client"] = client_id
        
        # 1. Listar proyectos (READ - List)
        logger.info("1. Listando proyectos...")
        try:
            response = self.session.get(ENDPOINTS["projects"]["list"])
            if response.status_code == 200:
                projects = response.json()
                logger.info(f"Se encontraron {len(projects)} proyectos")
            else:
                logger.error(f"Error al listar proyectos: {response.status_code} - {response.text}")
                self.issues.append(f"Error al listar proyectos: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al listar proyectos: {e}")
            self.issues.append(f"Excepción al listar proyectos: {str(e)}")
            success = False
        
        # 2. Crear proyecto (CREATE)
        logger.info("2. Creando proyecto de prueba...")
        project_id = None
        try:
            response = self.session.post(
                ENDPOINTS["projects"]["create"],
                json=self.test_project
            )
            if response.status_code in [200, 201]:
                project_data = response.json()
                project_id = project_data.get("id")
                if project_id:
                    logger.info(f"Proyecto creado con ID: {project_id}")
                    self.created_resources["projects"].append(project_id)
                else:
                    logger.error("No se pudo obtener el ID del proyecto creado")
                    self.issues.append("No se pudo obtener el ID del proyecto creado")
                    success = False
            else:
                logger.error(f"Error al crear proyecto: {response.status_code} - {response.text}")
                self.issues.append(f"Error al crear proyecto: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al crear proyecto: {e}")
            self.issues.append(f"Excepción al crear proyecto: {str(e)}")
            success = False
        
        # Si no se pudo crear el proyecto, no podemos continuar con las pruebas
        if not project_id:
            return False
        
        # 3. Obtener proyecto específico (READ - Detail)
        logger.info(f"3. Obteniendo detalles del proyecto {project_id}...")
        try:
            response = self.session.get(ENDPOINTS["projects"]["detail"].format(id=project_id))
            if response.status_code == 200:
                project_data = response.json()
                logger.info(f"Proyecto obtenido: {project_data.get('name')}")
            else:
                logger.error(f"Error al obtener proyecto: {response.status_code} - {response.text}")
                self.issues.append(f"Error al obtener proyecto: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al obtener proyecto: {e}")
            self.issues.append(f"Excepción al obtener proyecto: {str(e)}")
            success = False
        
        # 4. Actualizar proyecto (UPDATE)
        logger.info(f"4. Actualizando proyecto {project_id}...")
        update_data = {
            "name": f"Updated Project {int(time.time())}",
            "description": "Proyecto actualizado para pruebas",
            "progress": 75,
            "status": "completed",
            "client": client_id,
            "start_date": time.strftime("%Y-%m-%d"),
            "end_date": time.strftime("%Y-%m-%d", time.localtime(time.time() + 30*24*60*60))
        }
        try:
            response = self.session.put(
                ENDPOINTS["projects"]["update"].format(id=project_id),
                json=update_data
            )
            if response.status_code == 200:
                updated_project = response.json()
                logger.info(f"Proyecto actualizado: {updated_project.get('name')}")
            else:
                logger.error(f"Error al actualizar proyecto: {response.status_code} - {response.text}")
                self.issues.append(f"Error al actualizar proyecto: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al actualizar proyecto: {e}")
            self.issues.append(f"Excepción al actualizar proyecto: {str(e)}")
            success = False
        
        # 5. Eliminar proyecto (DELETE)
        logger.info(f"5. Eliminando proyecto {project_id}...")
        try:
            response = self.session.delete(ENDPOINTS["projects"]["delete"].format(id=project_id))
            if response.status_code in [200, 204]:
                logger.info("Proyecto eliminado correctamente")
                self.created_resources["projects"].remove(project_id)
            else:
                logger.error(f"Error al eliminar proyecto: {response.status_code} - {response.text}")
                self.issues.append(f"Error al eliminar proyecto: {response.status_code}")
                success = False
        except Exception as e:
            logger.error(f"Excepción al eliminar proyecto: {e}")
            self.issues.append(f"Excepción al eliminar proyecto: {str(e)}")
            success = False
            
        return success
