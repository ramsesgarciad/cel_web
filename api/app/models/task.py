from sqlalchemy import Column, Integer, String, DateTime, Date, Boolean, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(String, default="pending")  # pending, in_progress, completed
    start_date = Column(Date)
    end_date = Column(Date)
    duration = Column(String)  # e.g., "14 días"
    percent_done = Column(Float, default=0)
    resource = Column(String, nullable=True)
    is_critical_path = Column(Boolean, default=False)
    start_percentage = Column(Float, default=0)
    duration_percentage = Column(Float, default=0)
    color = Column(String, default="#3b82f6")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Foreign keys
    project_id = Column(Integer, ForeignKey("projects.id"))
    
    # Relationships
    project = relationship("Project", back_populates="tasks")
