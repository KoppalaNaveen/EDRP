from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
)

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    role_id = Column(Integer, ForeignKey("roles.id"), nullable = False)

    role = relationship( "Role", back_populates="users")

    team_id = Column(Integer, ForeignKey("teams.id"))
    team = relationship("Team", back_populates="users")

    designation = Column(String(100))

    phone = Column(String(20))

    is_active = Column(Boolean, default=True)