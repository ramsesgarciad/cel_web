from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.db.database import get_db
from app.core.deps import get_current_user, get_current_admin_user
from app.models.task import Task
from app.models.project import Project
from app.models.user import User
from app.schemas.task import Task as TaskSchema, TaskCreate

router = APIRouter()

@router.get("/{project_id}/tasks", response_model=List[TaskSchema])
async def read_tasks(
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
    
    tasks = db.query(Task).filter(Task.project_id == project_id).all()
    return tasks

@router.post("/{project_id}/tasks", response_model=TaskSchema, status_code=status.HTTP_201_CREATED)
async def create_task(
    project_id: str,
    task_in: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Calculate duration in days
    start_date = task_in.start_date
    end_date = task_in.end_date
    duration_days = (end_date - start_date).days
    
    db_task = Task(
        name=task_in.name,
        status=task_in.status,
        start_date=start_date,
        end_date=end_date,
        duration=f"{duration_days} días",
        percent_done=0 if task_in.status == "pending" else (50 if task_in.status == "in_progress" else 100),
        resource=task_in.resource,
        is_critical_path=task_in.is_critical_path,
        color=task_in.color,
        project_id=project_id
    )
    
    # Calculate start and duration percentages based on project timeline
    project_duration = (project.end_date - project.start_date).days
    if project_duration > 0:
        task_start_offset = (start_date - project.start_date).days
        db_task.start_percentage = (task_start_offset / project_duration) * 100
        db_task.duration_percentage = (duration_days / project_duration) * 100
    
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.put("/{project_id}/tasks/{task_id}", response_model=TaskSchema)
async def update_task(
    project_id: str,
    task_id: str,
    task_in: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Calculate duration in days
    start_date = task_in.start_date
    end_date = task_in.end_date
    duration_days = (end_date - start_date).days
    
    # Update task fields
    task.name = task_in.name
    task.status = task_in.status
    task.start_date = start_date
    task.end_date = end_date
    task.duration = f"{duration_days} días"
    task.percent_done = 0 if task_in.status == "pending" else (50 if task_in.status == "in_progress" else 100)
    task.resource = task_in.resource
    task.is_critical_path = task_in.is_critical_path
    task.color = task_in.color
    
    # Recalculate start and duration percentages
    project_duration = (project.end_date - project.start_date).days
    if project_duration > 0:
        task_start_offset = (start_date - project.start_date).days
        task.start_percentage = (task_start_offset / project_duration) * 100
        task.duration_percentage = (duration_days / project_duration) * 100
    
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{project_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    project_id: str,
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check if user has access to this project
    if current_user.role != "admin" and project not in current_user.projects:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    task = db.query(Task).filter(Task.id == task_id, Task.project_id == project_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return None
