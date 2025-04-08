from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
import uuid
from app.db.database import get_db
from app.core.deps import get_current_user
from app.core.config import settings
from app.models.model3d import Model3D
from app.models.project import Project
from app.models.user import User
from app.schemas.model3d import Model3D as Model3DSchema, Model3DCreate, Model3DAssign

router = APIRouter()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "models"), exist_ok=True)

@router.get("", response_model=List[Model3DSchema])
async def read_models(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    models = db.query(Model3D).offset(skip).limit(limit).all()
    return models

@router.get("/{model_id}", response_model=Model3DSchema)
async def read_model(
    model_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    model = db.query(Model3D).filter(Model3D.id == model_id).first()
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    return model

@router.post("", response_model=Model3DSchema, status_code=status.HTTP_201_CREATED)
async def create_model(
    file: UploadFile = File(...),
    name: str = Form(...),
    description: str = Form(...),
    type: str = Form(...),
    project_id: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Validate model type
    valid_types = ["pcb", "case", "component", "assembly", "other"]
    if type not in valid_types:
        raise HTTPException(status_code=400, detail=f"Invalid model type. Must be one of: {', '.join(valid_types)}")
    
    # Check project if provided
    project = None
    project_name = None
    if project_id:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")
        project_name = project.name
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_location = os.path.join(settings.UPLOAD_DIR, "models", unique_filename)
    
    # Save file
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Get file size
    file_size = os.path.getsize(file_location)
    size_str = f"{file_size / 1024 / 1024:.1f} MB" if file_size > 1024 * 1024 else f"{file_size / 1024:.1f} KB"
    
    # Create model record
    db_model = Model3D(
        name=name,
        type=type,
        description=description,
        url=f"/uploads/models/{unique_filename}",
        format=file_extension[1:],  # Remove the dot from extension
        size=size_str,
        project_id=project_id
    )
    
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model

@router.delete("/{model_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_model(
    model_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    model = db.query(Model3D).filter(Model3D.id == model_id).first()
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    
    # Delete file
    file_path = os.path.join(settings.UPLOAD_DIR, "models", os.path.basename(model.url))
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Delete record
    db.delete(model)
    db.commit()
    return None

@router.post("/{model_id}/assign", response_model=Model3DSchema)
async def assign_model_to_project(
    model_id: str,
    assignment: Model3DAssign,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    model = db.query(Model3D).filter(Model3D.id == model_id).first()
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")
    
    project = db.query(Project).filter(Project.id == assignment.project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    model.project_id = project.id
    db.add(model)
    db.commit()
    db.refresh(model)
    return model
