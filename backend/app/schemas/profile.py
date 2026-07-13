from pydantic import BaseModel, EmailStr
from typing import Optional


class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    designation: Optional[str] = None
    role: str
    team: str

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    full_name: str
    phone: Optional[str] = None
    designation: Optional[str] = None