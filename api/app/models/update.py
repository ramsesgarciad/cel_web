from sqlalchemy import Column, Integer, String, DateTime, Date, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class Update(Base):
    __tablename__ = "updates"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    date = Column(Date, server_default=func.current_date())
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Foreign keys
    project_id = Column(Integer, ForeignKey("projects.id"))
    
    # Relationships
    project = relationship("Project", back_populates="updates")
