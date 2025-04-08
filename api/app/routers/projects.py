from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import json
from datetime import datetime

from app.db.database import get_db
from app.core.deps import get_current_user, get_current_admin_user
from app.models.project import Project
from app.models.user import User
from app.models.task import Task
from app.schemas.project import Project as ProjectSchema, ProjectCreate, ProjectList, ProjectProgress

router = APIRouter()

# Función auxiliar para agregar encabezados CORS a las respuestas
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@router.get("", response_model=List[ProjectList])
async def read_projects(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """
    Obtener todos los proyectos.
    Durante el desarrollo, no requiere autenticación.
    """
    try:
        # Obtener los proyectos reales de la base de datos
        projects = db.query(Project).offset(skip).limit(limit).all()
        print(f"Proyectos encontrados en la base de datos: {len(projects)}")
        
        # Convertir los proyectos a diccionarios para la respuesta JSON
        project_list = []
        for project in projects:
            try:
                # Determinar el estado basado en el progreso
                status = "Planificación"
                if project.progress > 0 and project.progress < 100:
                    status = "En progreso"
                elif project.progress >= 100:
                    status = "Completado"
                
                project_dict = {
                    "id": project.id,
                    "name": project.name,
                    "description": project.description,
                    "client": project.client,
                    "status": status,  # Calculamos el estado basado en el progreso
                    "progress": project.progress,
                    "start_date": project.start_date.strftime("%Y-%m-%d") if project.start_date else None,
                    "end_date": project.end_date.strftime("%Y-%m-%d") if project.end_date else None,
                    "created_at": project.created_at.isoformat() if project.created_at else None,
                    "updated_at": project.updated_at.isoformat() if project.updated_at else None
                }
                project_list.append(project_dict)
                print(f"Proyecto procesado: {project_dict['id']}, {project_dict['name']}, estado: {status}")
            except Exception as e:
                print(f"Error al procesar proyecto {project.id}: {e}")
        
        # Si no hay proyectos en la base de datos, devolver datos de ejemplo
        if not project_list:
            print("No se encontraron proyectos en la base de datos, devolviendo ejemplos")
            from datetime import datetime, timedelta
            
            # Crear fecha actual y fechas relativas
            now = datetime.now()
            one_month_ago = now - timedelta(days=30)
            three_months_future = now + timedelta(days=90)
            
            # Proyectos de ejemplo
            project_list = [
                {
                    "id": 1,
                    "name": "Sistema de Monitoreo Ambiental",
                    "description": "Sistema IoT para monitorear variables ambientales en tiempo real",
                    "client": "Ministerio de Medio Ambiente",
                    "status": "En progreso",
                    "progress": 65,
                    "start_date": one_month_ago.strftime("%Y-%m-%d"),
                    "end_date": three_months_future.strftime("%Y-%m-%d"),
                    "created_at": one_month_ago.isoformat(),
                    "updated_at": now.isoformat()
                },
                {
                    "id": 2,
                    "name": "Automatización Industrial",
                    "description": "Sistema de automatización para procesos de manufactura",
                    "client": "Caribbean Manufacturing Co.",
                    "status": "Completado",
                    "progress": 100,
                    "start_date": (one_month_ago - timedelta(days=60)).strftime("%Y-%m-%d"),
                    "end_date": (now - timedelta(days=10)).strftime("%Y-%m-%d"),
                    "created_at": (one_month_ago - timedelta(days=60)).isoformat(),
                    "updated_at": (now - timedelta(days=10)).isoformat()
                },
                {
                    "id": 3,
                    "name": "Sistema de Seguridad Inteligente",
                    "description": "Sistema de vigilancia con reconocimiento facial y alertas automáticas",
                    "client": "Hotel Caribe Resort",
                    "status": "Planificación",
                    "progress": 25,
                    "start_date": now.strftime("%Y-%m-%d"),
                    "end_date": (now + timedelta(days=120)).strftime("%Y-%m-%d"),
                    "created_at": (now - timedelta(days=5)).isoformat(),
                    "updated_at": now.isoformat()
                }
            ]
        
        # Crear una respuesta JSON con los encabezados CORS
        response = JSONResponse(content=project_list)
        return add_cors_headers(response)
    except Exception as e:
        print(f"Error al obtener proyectos: {e}")
        # Devolver una lista vacía con los encabezados CORS
        response = JSONResponse(content=[])
        return add_cors_headers(response)

@router.get("/examples", response_model=List[ProjectList], dependencies=[])
async def get_example_projects():
    """Endpoint para obtener proyectos de ejemplo sin necesidad de base de datos ni autenticación"""
    from datetime import datetime, timedelta
    
    # Crear fecha actual y fechas relativas
    now = datetime.now()
    one_month_ago = now - timedelta(days=30)
    three_months_future = now + timedelta(days=90)
    
    # Proyectos de ejemplo
    examples = [
        {
            "id": 1,
            "name": "Sistema de Monitoreo Ambiental",
            "description": "Sistema IoT para monitorear variables ambientales en tiempo real",
            "client": "Ministerio de Medio Ambiente",
            "status": "En progreso",
            "progress": 65,
            "start_date": one_month_ago.strftime("%Y-%m-%d"),
            "end_date": three_months_future.strftime("%Y-%m-%d"),
            "created_at": one_month_ago.isoformat(),
            "updated_at": now.isoformat()
        },
        {
            "id": 2,
            "name": "Automatización Industrial",
            "description": "Sistema de automatización para procesos de manufactura",
            "client": "Caribbean Manufacturing Co.",
            "status": "Completado",
            "progress": 100,
            "start_date": (one_month_ago - timedelta(days=60)).strftime("%Y-%m-%d"),
            "end_date": (now - timedelta(days=10)).strftime("%Y-%m-%d"),
            "created_at": (one_month_ago - timedelta(days=60)).isoformat(),
            "updated_at": (now - timedelta(days=10)).isoformat()
        },
        {
            "id": 3,
            "name": "Sistema de Seguridad Inteligente",
            "description": "Sistema de vigilancia con reconocimiento facial y alertas automáticas",
            "client": "Hotel Caribe Resort",
            "status": "Planificación",
            "progress": 25,
            "start_date": now.strftime("%Y-%m-%d"),
            "end_date": (now + timedelta(days=120)).strftime("%Y-%m-%d"),
            "created_at": (now - timedelta(days=5)).isoformat(),
            "updated_at": now.isoformat()
        }
    ]
    
    # Crear una respuesta JSON con los encabezados CORS
    response = JSONResponse(content=examples)
    return add_cors_headers(response)

@router.get("/{project_id}", response_model=ProjectSchema)
async def read_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    """
    Obtener un proyecto específico por su ID.
    Durante el desarrollo, no requiere autenticación.
    """
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            # Crear una respuesta de error con encabezados CORS
            response = JSONResponse(
                status_code=404,
                content={"detail": "Project not found"}
            )
            return add_cors_headers(response)
        
        # Convertir el proyecto a un diccionario para la respuesta JSON
        project_dict = {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "client": project.client,
            "status": "Planificación" if project.progress == 0 else ("En progreso" if project.progress < 100 else "Completado"),
            "progress": project.progress,
            "start_date": project.start_date.strftime("%Y-%m-%d") if project.start_date else None,
            "end_date": project.end_date.strftime("%Y-%m-%d") if project.end_date else None,
            "created_at": project.created_at.isoformat() if project.created_at else None,
            "updated_at": project.updated_at.isoformat() if project.updated_at else None
        }
        
        # Crear una respuesta JSON con los encabezados CORS
        response = JSONResponse(content=project_dict)
        return add_cors_headers(response)
    except Exception as e:
        print(f"Error al obtener proyecto: {e}")
        # Devolver una respuesta de error con los encabezados CORS
        response = JSONResponse(
            status_code=500,
            content={"detail": f"Error al obtener proyecto: {str(e)}"}
        )
        return add_cors_headers(response)

@router.post("", response_model=ProjectSchema, status_code=status.HTTP_201_CREATED)
async def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
):
    """
    Crear un nuevo proyecto.
    Durante el desarrollo, no requiere autenticación.
    """
    try:
        # Crear el proyecto en la base de datos
        db_project = Project(
            name=project_in.name,
            client=project_in.client,
            description=project_in.description,
            start_date=project_in.start_date,
            end_date=project_in.end_date,
            progress=project_in.progress if hasattr(project_in, 'progress') else 0
        )
        
        # Agregar usuarios si se proporcionan
        if hasattr(project_in, 'users') and project_in.users:
            users = db.query(User).filter(User.id.in_(project_in.users)).all()
            db_project.users = users
        
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        
        # Convertir el proyecto a un diccionario para la respuesta JSON
        project_dict = {
            "id": db_project.id,
            "name": db_project.name,
            "description": db_project.description,
            "client": db_project.client,
            "status": "Planificación" if db_project.progress == 0 else ("En progreso" if db_project.progress < 100 else "Completado"),
            "progress": db_project.progress,
            "start_date": db_project.start_date.strftime("%Y-%m-%d") if db_project.start_date else None,
            "end_date": db_project.end_date.strftime("%Y-%m-%d") if db_project.end_date else None,
            "created_at": db_project.created_at.isoformat() if db_project.created_at else None,
            "updated_at": db_project.updated_at.isoformat() if db_project.updated_at else None
        }
        
        # Crear una respuesta JSON con los encabezados CORS
        response = JSONResponse(
            status_code=201,
            content=project_dict
        )
        return add_cors_headers(response)
    except Exception as e:
        print(f"Error al crear proyecto: {e}")
        # Devolver una respuesta de error con los encabezados CORS
        response = JSONResponse(
            status_code=500,
            content={"detail": f"Error al crear proyecto: {str(e)}"}
        )
        return add_cors_headers(response)

@router.put("/{project_id}", response_model=ProjectSchema)
async def update_project(
    project_id: int,
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
):
    """
    Actualizar un proyecto existente.
    Durante el desarrollo, no requiere autenticación.
    """
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            # Crear una respuesta de error con encabezados CORS
            response = JSONResponse(
                status_code=404,
                content={"detail": "Project not found"}
            )
            return add_cors_headers(response)
        
        # Update project fields
        project.name = project_in.name
        project.client = project_in.client
        project.description = project_in.description
        project.start_date = project_in.start_date
        project.end_date = project_in.end_date
        project.progress = project_in.progress
        
        # Update users if provided
        if hasattr(project_in, 'users') and project_in.users:
            users = db.query(User).filter(User.id.in_(project_in.users)).all()
            project.users = users
        
        db.add(project)
        db.commit()
        db.refresh(project)
        
        # Convertir el proyecto a un diccionario para la respuesta JSON
        project_dict = {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "client": project.client,
            "status": "Planificación" if project.progress == 0 else ("En progreso" if project.progress < 100 else "Completado"),
            "progress": project.progress,
            "start_date": project.start_date.strftime("%Y-%m-%d") if project.start_date else None,
            "end_date": project.end_date.strftime("%Y-%m-%d") if project.end_date else None,
            "created_at": project.created_at.isoformat() if project.created_at else None,
            "updated_at": project.updated_at.isoformat() if project.updated_at else None
        }
        
        # Crear una respuesta JSON con los encabezados CORS
        response = JSONResponse(content=project_dict)
        return add_cors_headers(response)
    except Exception as e:
        print(f"Error al actualizar proyecto: {e}")
        # Devolver una respuesta de error con los encabezados CORS
        response = JSONResponse(
            status_code=500,
            content={"detail": f"Error al actualizar proyecto: {str(e)}"}
        )
        return add_cors_headers(response)

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    """
    Eliminar un proyecto existente.
    Durante el desarrollo, no requiere autenticación.
    """
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            # Crear una respuesta de error con encabezados CORS
            response = JSONResponse(
                status_code=404,
                content={"detail": "Project not found"}
            )
            return add_cors_headers(response)
        
        db.delete(project)
        db.commit()
        
        # Crear una respuesta vacía con los encabezados CORS
        response = Response(status_code=204)
        return add_cors_headers(response)
    except Exception as e:
        print(f"Error al eliminar proyecto: {e}")
        # Devolver una respuesta de error con los encabezados CORS
        response = JSONResponse(
            status_code=500,
            content={"detail": f"Error al eliminar proyecto: {str(e)}"}
        )
        return add_cors_headers(response)

@router.patch("/{project_id}/progress", response_model=ProjectSchema)
async def update_project_progress(
    project_id: int,
    progress_data: ProjectProgress,
    db: Session = Depends(get_db),
):
    """
    Actualizar el progreso de un proyecto existente.
    Durante el desarrollo, no requiere autenticación.
    """
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            # Crear una respuesta de error con encabezados CORS
            response = JSONResponse(
                status_code=404,
                content={"detail": "Project not found"}
            )
            return add_cors_headers(response)
        
        project.progress = progress_data.progress
        db.add(project)
        db.commit()
        db.refresh(project)
        
        # Convertir el proyecto a un diccionario para la respuesta JSON
        project_dict = {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "client": project.client,
            "status": "Planificación" if project.progress == 0 else ("En progreso" if project.progress < 100 else "Completado"),
            "progress": project.progress,
            "start_date": project.start_date.strftime("%Y-%m-%d") if project.start_date else None,
            "end_date": project.end_date.strftime("%Y-%m-%d") if project.end_date else None,
            "created_at": project.created_at.isoformat() if project.created_at else None,
            "updated_at": project.updated_at.isoformat() if project.updated_at else None
        }
        
        # Crear una respuesta JSON con los encabezados CORS
        response = JSONResponse(content=project_dict)
        return add_cors_headers(response)
    except Exception as e:
        print(f"Error al actualizar progreso del proyecto: {e}")
        # Devolver una respuesta de error con los encabezados CORS
        response = JSONResponse(
            status_code=500,
            content={"detail": f"Error al actualizar progreso del proyecto: {str(e)}"}
        )
        return add_cors_headers(response)
