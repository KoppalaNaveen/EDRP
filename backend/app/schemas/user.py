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
    employee_id: Optional[str] = None
    designation: Optional[str] = None
    phone: Optional[str] = None
    verification_code: str = Field(..., min_length=6, max_length=6)

# -----------------------------
# Code Verification
# -----------------------------
class SendCodeRequest(BaseModel):
    email: EmailStr
    purpose: str = Field(..., pattern="^(register|reset_password)$")
    is_resend: bool = False

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6)
    purpose: str = Field(..., pattern="^(register|reset_password)$")

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6)
    new_password: str = Field(..., min_length=6)

# -----------------------------
# User Login
# -----------------------------
class UserLogin(BaseModel):
    employee_id: str
    password: str


# -----------------------------
# JWT Token Response
# -----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int
    role_name: Optional[str] = None
    full_name: Optional[str] = None

# -----------------------------
# User Response
# -----------------------------
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    employee_id: Optional[str]
    role_id: int
    team_id: int
    designation: Optional[str]
    phone: Optional[str]
    is_active: bool

    model_config = {
        "from_attributes": True
    }