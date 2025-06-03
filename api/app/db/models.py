from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Text, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from datetime import datetime

Base = declarative_base()

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    phone = Column(String, nullable=True)
    company = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    preferences = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=func.now())
    last_login = Column(DateTime, nullable=True)

    # Relaciones
    projects = relationship("Project", back_populates="client")
    updates = relationship("Update", back_populates="created_by")
    documents = relationship("Document", back_populates="uploaded_by")

class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, index=True)
    description = Column(Text)
    requirements = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String)  # Planificación, En progreso, En pausa, Completado, Cancelado
    progress = Column(Float, default=0)  # Porcentaje de progreso (0-100)
    start_date = Column(DateTime)
    end_date = Column(DateTime, nullable=True)
    client_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relaciones
    client = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")
    updates = relationship("Update", back_populates="project", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="project", cascade="all, delete-orphan")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String)
    description = Column(Text, nullable=True)
    status = Column(String)  # Pendiente, En progreso, Completada
    due_date = Column(DateTime, nullable=True)
    project_id = Column(String, ForeignKey("projects.id"))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Relaciones
    project = relationship("Project", back_populates="tasks")

class Update(Base):
    __tablename__ = "updates"

    id = Column(String, primary_key=True, default=generate_uuid)
    content = Column(Text)
    project_id = Column(String, ForeignKey("projects.id"))
    created_by_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime, default=func.now())

    # Relaciones
    project = relationship("Project", back_populates="updates")
    created_by = relationship("User", back_populates="updates")

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String)
    description = Column(Text, nullable=True)
    file_url = Column(String)
    file_type = Column(String)
    file_size = Column(Integer)  # Tamaño en bytes
    project_id = Column(String, ForeignKey("projects.id"))
    uploaded_by_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime, default=func.now())

    # Relaciones
    project = relationship("Project", back_populates="documents")
    uploaded_by = relationship("User", back_populates="documents")

class Model(Base):
    __tablename__ = "models"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String)
    description = Column(Text, nullable=True)
    file_url = Column(String)
    file_type = Column(String)
    file_size = Column(Integer)  # Tamaño en bytes
    created_at = Column(DateTime, default=func.now())
