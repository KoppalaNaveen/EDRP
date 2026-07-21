from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.base import Base

class DecisionVersion(Base):
    __tablename__ = "decision_versions"

    id = Column(Integer, primary_key=True, index=True)
    decision_id = Column(Integer, ForeignKey("decisions.id", ondelete="CASCADE"), nullable=False, index=True)
    version_number = Column(Integer, nullable=False)
    
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    
    status = Column(String(50), default="Pending")
    priority_level = Column(String(50), nullable=True)
    department = Column(String(100), nullable=True)
    decision_date = Column(DateTime, nullable=True)
    tags = Column(String(200), nullable=True)
    
    changed_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    change_reason = Column(String(500), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())