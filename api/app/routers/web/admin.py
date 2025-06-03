from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from typing import List, Optional
from datetime import datetime
import logging

from app.core.auth import get_current_user
from app.db.models import User, Project, Task, Update
from app.db.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import desc

# Configurar logger
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin", tags=["Admin Web"])
templates = Jinja2Templates(directory="templates")

@router.get("/")
async def admin_home(
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página principal del panel de administración
    """
    if not current_user.is_admin:
        return RedirectResponse(url="/dashboard")
    
    # Obtener estadísticas para el dashboard
    total_projects = db.query(Project).count()
    total_users = db.query(User).filter(User.is_admin == False).count()
    completed_projects = db.query(Project).filter(Project.status == "Completado").count()
    in_progress_projects = db.query(Project).filter(Project.status == "En progreso").count()
    
    # Obtener proyectos recientes
    recent_projects = db.query(Project).order_by(desc(Project.created_at)).limit(5).all()
    
    # Obtener actualizaciones recientes
    recent_updates = db.query(Update).order_by(desc(Update.created_at)).limit(5).all()
    
    return templates.TemplateResponse(
        "admin/index.html",
        {
            "request": request,
            "user": current_user,
            "total_projects": total_projects,
            "total_users": total_users,
            "completed_projects": completed_projects,
            "in_progress_projects": in_progress_projects,
            "recent_projects": recent_projects,
            "recent_updates": recent_updates
        }
    )

@router.get("/projects")
async def admin_projects(
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página de administración de proyectos
    """
    if not current_user.is_admin:
        return RedirectResponse(url="/dashboard")
    
    # Obtener todos los proyectos
    projects = db.query(Project).order_by(desc(Project.created_at)).all()
    
    return templates.TemplateResponse(
        "admin/projects.html",
        {
            "request": request,
            "user": current_user,
            "projects": projects
        }
    )

@router.get("/projects/new")
async def admin_new_project(
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página para crear un nuevo proyecto
    """
    if not current_user.is_admin:
        return RedirectResponse(url="/dashboard")
    
    # Obtener todos los clientes (usuarios no administradores)
    try:
        clients = db.query(User).filter(User.is_admin == False).all()
    except Exception as e:
        logger.error(f"Error al obtener clientes: {e}")
        clients = []
    
    return templates.TemplateResponse(
        "admin/project_form.html",
        {
            "request": request,
            "user": current_user,
            "project": None,
            "is_new": True,
            "clients": clients
        }
    )

@router.get("/projects/{project_id}/edit")
async def admin_edit_project(
    project_id: str,
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página para editar un proyecto existente
    """
    if not current_user.is_admin:
        return RedirectResponse(url="/dashboard")
    
    # Obtener el proyecto por ID
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    
    # Obtener todos los clientes (usuarios no administradores)
    clients = db.query(User).filter(User.role == "client").all()
    if not clients:
        # Si no hay usuarios con rol 'client', buscar usuarios que no sean administradores
        clients = db.query(User).filter(User.is_admin == False).all()
    
    return templates.TemplateResponse(
        "admin/project_form.html",
        {
            "request": request,
            "user": current_user,
            "project": project,
            "is_new": False,
            "clients": clients
        }
    )

@router.get("/projects/{project_id}/update")
async def admin_project_update(
    project_id: str,
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página para actualizar el progreso de un proyecto
    """
    if not current_user.is_admin:
        return RedirectResponse(url="/dashboard")
    
    # Obtener el proyecto por ID
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    
    # Obtener las tareas del proyecto
    tasks = db.query(Task).filter(Task.project_id == project_id).all()
    
    # Obtener las actualizaciones del proyecto
    updates = db.query(Update).filter(Update.project_id == project_id).order_by(desc(Update.created_at)).all()
    
    return templates.TemplateResponse(
        "admin/project_update.html",
        {
            "request": request,
            "user": current_user,
            "project": project,
            "tasks": tasks,
            "updates": updates
        }
    )

@router.get("/users")
async def admin_users(
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página de administración de usuarios
    """
    if not current_user.is_admin:
        return RedirectResponse(url="/dashboard")
    
    # Obtener todos los usuarios
    users = db.query(User).all()
    
    return templates.TemplateResponse(
        "admin/users.html",
        {
            "request": request,
            "user": current_user,
            "users": users
        }
    )

@router.get("/settings")
async def admin_settings(
    request: Request, 
    current_user: User = Depends(get_current_user)
):
    """
    Página de configuración del sistema
    """
    if not current_user.is_admin:
        return RedirectResponse(url="/dashboard")
    
    return templates.TemplateResponse(
        "admin/settings.html",
        {
            "request": request,
            "user": current_user
        }
    )
