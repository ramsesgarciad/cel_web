from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class TaskBase(BaseModel):
    name: str
    status: str

class ProjectBase(BaseModel):
    name: str
    client: str
    description: str
    start_date: date
    end_date: date

class ProjectCreate(ProjectBase):
    progress: Optional[float] = 0
    tasks: Optional[List[TaskBase]] = []
    users: Optional[List[str]] = []

class UserInProject(BaseModel):
    id: str
    name: str
    email: str

    class Config:
        orm_mode = True

class Project(ProjectBase):
    id: str
    progress: float
    created_at: datetime
    updated_at: Optional[datetime] = None
    users: Optional[List[UserInProject]] = []

    class Config:
        orm_mode = True

class ProjectList(BaseModel):
    id: str
    name: str
    client: str
    description: str
    start_date: date
    end_date: date
    progress: float
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class ProjectProgress(BaseModel):
    progress: float
