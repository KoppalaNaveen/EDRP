from pydantic import BaseModel
from typing import Optional


# ==============================
# Create Role
# ==============================

class RoleCreate(BaseModel):
    role_name: str
    description: Optional[str] = None


# ==============================
# Update Role
# ==============================

class RoleUpdate(BaseModel):
    role_name: Optional[str] = None
    description: Optional[str] = None


# ==============================
# Response
# ==============================

class RoleResponse(BaseModel):
    id: int
    role_name: str
    description: Optional[str]

    class Config:
        from_attributes = True