from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.database.connection import get_db
from app.schemas.user import (
    UserRegister,
    UserResponse,
    UserLogin,
    Token,
    SendCodeRequest,
    VerifyCodeRequest,
    ResetPasswordRequest
)
from app.services.user_service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


from typing import List

# -------------------------------
# Register User
# -------------------------------
@router.get(
    "/",
    response_model=List[UserResponse],
    status_code=200
)
def get_all_users(db: Session = Depends(get_db)):
    return UserService.get_all_users(db)
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201
)
def register_user(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    return UserService.register_user(db, user)


# -------------------------------
# Login User
# -------------------------------
@router.post(
    "/login",
    response_model=Token
)
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    return UserService.login_user(db, user)


class SuccessResponse(BaseModel):
    message: str

# -------------------------------
# Send Verification Code
# -------------------------------
@router.post(
    "/send-verification-code",
    response_model=SuccessResponse
)
def send_verification_code(
    request: SendCodeRequest,
    db: Session = Depends(get_db)
):
    return UserService.send_verification_code(db, request.email, request.purpose, request.is_resend)


# -------------------------------
# Check Verification Code
# -------------------------------
@router.post(
    "/check-verification-code",
    response_model=SuccessResponse
)
def check_verification_code(
    request: VerifyCodeRequest,
    db: Session = Depends(get_db)
):
    return UserService.check_code(db, request.email, request.code, request.purpose)


# -------------------------------
# Reset Password
# -------------------------------
@router.post(
    "/reset-password",
    response_model=SuccessResponse
)
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db)
):
    return UserService.reset_password(db, request.email, request.code, request.new_password)