from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class UpdateBase(BaseModel):
    content: str
    completed: bool = False

class UpdateCreate(UpdateBase):
    pass

class Update(UpdateBase):
    id: str
    date: date
    created_at: datetime
    project_id: str

    class Config:
        orm_mode = True
