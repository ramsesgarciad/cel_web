from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
import uuid
from app.db.database import get_db
from app.core.deps import get_current_user
from app.core.config import settings
from app.models.document import Document
from app.models.project import Project
from app.models.user import User
from app.schemas.document import Document as DocumentSchema, DocumentCreate

router = APIRouter()

# Ensure upload directory exists
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "documents"), exist_ok=True)

@router.get("/{project_id}/documents", response_model=List[DocumentSchema])
async def read_documents(
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
    
    documents = db.query(Document).filter(Document.project_id == project_id).all()
    return documents

@router.post("/{project_id}/documents", response_model=DocumentSchema, status_code=status.HTTP_201_CREATED)
async def create_document(
    project_id: str,
    file: UploadFile = File(...),
    name: str = Form(...),
    type: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Validate document type
    valid_types = ["technical", "fiscal", "report", "other"]
    if type not in valid_types:
        raise HTTPException(status_code=400, detail=f"Invalid document type. Must be one of: {', '.join(valid_types)}")
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_location = os.path.join(settings.UPLOAD_DIR, "documents", unique_filename)
    
    # Save file
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Get file size
    file_size = os.path.getsize(file_location)
    size_str = f"{file_size / 1024 / 1024:.1f} MB" if file_size > 1024 * 1024 else f"{file_size / 1024:.1f} KB"
    
    # Create document record
    db_document = Document(
        name=name,
        filename=unique_filename,
        type=type,
        url=f"/uploads/documents/{unique_filename}",
        size=size_str,
        project_id=project_id
    )
    
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@router.delete("/{project_id}/documents/{document_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    project_id: str,
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    document = db.query(Document).filter(Document.id == document_id, Document.project_id == project_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Delete file
    file_path = os.path.join(settings.UPLOAD_DIR, "documents", document.filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Delete record
    db.delete(document)
    db.commit()
    return None
