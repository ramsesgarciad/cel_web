from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Model3DBase(BaseModel):
    name: str
    type: str  # pcb, case, component, assembly, other
    description: str

class Model3DCreate(Model3DBase):
    project_id: Optional[str] = None

class Model3D(Model3DBase):
    id: str
    url: str
    format: str
    size: str
    project_id: Optional[str] = None
    project_name: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True

class Model3DAssign(BaseModel):
    project_id: str
