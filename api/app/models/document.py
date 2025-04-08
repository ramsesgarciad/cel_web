from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    filename = Column(String)
    type = Column(String)  # technical, fiscal, report, other
    url = Column(String)
    size = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Foreign keys
    project_id = Column(Integer, ForeignKey("projects.id"))
    
    # Relationships
    project = relationship("Project", back_populates="documents")
