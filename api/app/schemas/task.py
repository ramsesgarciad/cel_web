from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class TaskBase(BaseModel):
    name: str
    status: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    resource: Optional[str] = None
    is_critical_path: bool = False
    color: str = "#3b82f6"
    percent_done: Optional[float] = 0

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: str
    duration: Optional[str] = None
    start_percentage: Optional[float] = 0
    duration_percentage: Optional[float] = 0
    project_id: str

    class Config:
        orm_mode = True
