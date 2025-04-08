from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Model3D(Base):
    __tablename__ = "models3d"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)  # pcb, case, component, assembly, other
    description = Column(Text)
    url = Column(String)
    format = Column(String)
    size = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Foreign keys
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    
    # Relationships
    project = relationship("Project")
