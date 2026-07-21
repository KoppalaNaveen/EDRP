from sqlalchemy import Column, String, DateTime, Boolean
from app.database.base import Base
from datetime import datetime

class EmailVerification(Base):
    __tablename__ = "email_verifications"

    email = Column(String, primary_key=True, index=True)
    otp = Column(String, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
