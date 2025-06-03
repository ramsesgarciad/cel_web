from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from typing import List, Optional
from datetime import datetime

from app.core.auth import get_current_user
from app.db.models import User, Project, Task, Update, Document
from app.db.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import desc

router = APIRouter(prefix="/dashboard", tags=["Client Dashboard"])
templates = Jinja2Templates(directory="templates")

@router.get("/")
async def dashboard_home(
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página principal del dashboard del cliente
    """
    # Obtener proyectos del usuario
    projects = db.query(Project).filter(Project.client_id == current_user.id).all()
    
    # Contar proyectos completados y en progreso
    completed_projects = sum(1 for p in projects if p.status == "Completado")
    in_progress_projects = sum(1 for p in projects if p.status == "En progreso")
    
    # Obtener actualizaciones recientes
    project_ids = [p.id for p in projects]
    updates = []
    if project_ids:
        updates = db.query(Update).filter(Update.project_id.in_(project_ids)).order_by(desc(Update.created_at)).limit(5).all()
    
    return templates.TemplateResponse(
        "dashboard/index.html",
        {
            "request": request,
            "user": current_user,
            "projects": projects,
            "completed_projects": completed_projects,
            "in_progress_projects": in_progress_projects,
            "updates": updates
        }
    )

@router.get("/projects")
async def dashboard_projects(
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página de proyectos del cliente
    """
    # Obtener proyectos del usuario
    projects = db.query(Project).filter(Project.client_id == current_user.id).order_by(desc(Project.created_at)).all()
    
    return templates.TemplateResponse(
        "dashboard/projects.html",
        {
            "request": request,
            "user": current_user,
            "projects": projects
        }
    )

@router.get("/projects/{project_id}")
async def dashboard_project_detail(
    project_id: str,
    request: Request, 
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Página de detalle de un proyecto
    """
    # Obtener el proyecto por ID
    project = db.query(Project).filter(Project.id == project_id, Project.client_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    
    # Obtener las tareas del proyecto
    tasks = db.query(Task).filter(Task.project_id == project_id).all()
    
    # Obtener las actualizaciones del proyecto
    updates = db.query(Update).filter(Update.project_id == project_id).order_by(desc(Update.created_at)).all()
    
    # Obtener los documentos del proyecto
    documents = db.query(Document).filter(Document.project_id == project_id).all()
    
    return templates.TemplateResponse(
        "dashboard/project_detail.html",
        {
            "request": request,
            "user": current_user,
            "project": project,
            "tasks": tasks,
            "updates": updates,
            "documents": documents
        }
    )

@router.get("/profile")
async def dashboard_profile(
    request: Request, 
    current_user: User = Depends(get_current_user)
):
    """
    Página de perfil del usuario
    """
    return templates.TemplateResponse(
        "dashboard/profile.html",
        {
            "request": request,
            "user": current_user
        }
    )

@router.get("/support")
async def dashboard_support(
    request: Request, 
    current_user: User = Depends(get_current_user)
):
    """
    Página de soporte
    """
    return templates.TemplateResponse(
        "dashboard/support.html",
        {
            "request": request,
            "user": current_user
        }
    )
