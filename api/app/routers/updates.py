from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.core.deps import get_current_user
from app.models.update import Update
from app.models.project import Project
from app.models.user import User
from app.schemas.update import Update as UpdateSchema, UpdateCreate

router = APIRouter()

@router.get("/{project_id}/updates", response_model=List[UpdateSchema])
async def read_updates(
    project_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    updates = db.query(Update).filter(Update.project_id == project_id).all()
    return updates

@router.post("/{project_id}/updates", response_model=UpdateSchema, status_code=status.HTTP_201_CREATED)
async def create_update(
    project_id: str,
    update_in: UpdateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    db_update = Update(
        content=update_in.content,
        completed=update_in.completed,
        project_id=project_id
    )
    
    db.add(db_update)
    db.commit()
    db.refresh(db_update)
    return db_update
