from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class TaskBase(BaseModel):
    name: str
    status: str
    start_date: date
    end_date: date
    resource: Optional[str] = None
    is_critical_path: bool = False
    color: str = "#3b82f6"

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: str
    duration: str
    percent_done: float
    start_percentage: float
    duration_percentage: float
    project_id: str

    class Config:
        orm_mode = True
