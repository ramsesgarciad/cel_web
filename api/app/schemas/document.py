from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentBase(BaseModel):
    name: str
    type: str  # technical, fiscal, report, other

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: str
    filename: str
    url: str
    size: str
    created_at: datetime
    project_id: str

    class Config:
        orm_mode = True
