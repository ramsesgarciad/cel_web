from sqlalchemy import Column, Integer, String, DateTime, Date, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base
from app.models.user import user_project

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    client = Column(String, index=True)
    description = Column(Text)
    start_date = Column(Date)
    end_date = Column(Date)
    progress = Column(Float, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    users = relationship("User", secondary=user_project, back_populates="projects")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")
    updates = relationship("Update", back_populates="project", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="project", cascade="all, delete-orphan")
