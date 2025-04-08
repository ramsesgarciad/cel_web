from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str
    projects: Optional[List[str]] = []

class UserUpdate(UserBase):
    password: Optional[str] = None
    projects: Optional[List[str]] = []

class ProjectInUser(BaseModel):
    id: str
    name: str

    class Config:
        from_attributes = True

class User(UserBase):
    id: str
    projects: Optional[List[ProjectInUser]] = []

    class Config:
        from_attributes = True

class UserInDB(User):
    hashed_password: str

class UserList(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    projects: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User
