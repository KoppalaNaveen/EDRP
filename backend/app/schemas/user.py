from pydantic import BaseModel, EmailStr, Field
from typing import Optional


# -----------------------------
# User Registration
# -----------------------------
class UserRegister(BaseModel):
    full_name: str = Field(..., min_length=3, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role_id: int
    team_id: int
    designation: Optional[str] = None
    phone: Optional[str] = None


# -----------------------------
# User Login
# -----------------------------
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# -----------------------------
# JWT Token Response
# -----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    role_name: Optional[str] = None

# -----------------------------
# User Response
# -----------------------------
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role_id: int
    team_id: int
    designation: Optional[str]
    phone: Optional[str]
    is_active: bool

    model_config = {
        "from_attributes": True
    }