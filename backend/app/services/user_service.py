from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.schemas.user import UserRegister, UserLogin
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password, verify_password
from app.core.auth import create_access_token


class UserService:

    @staticmethod
    def register_user(db: Session, user: UserRegister):

        # Check if email already exists
        existing_user = UserRepository.get_user_by_email(db, user.email)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Hash password
        hashed_password = hash_password(user.password)

        # Save user
        return UserRepository.create_user(
            db,
            user,
            hashed_password
        )

    @staticmethod
    def login_user(db: Session, user: UserLogin):

        # Check email
        db_user = UserRepository.get_user_by_email(db, user.email)

        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Verify password
        if not verify_password(user.password, db_user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Generate JWT Token
        access_token = create_access_token(
            {
                "sub": db_user.email
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": db_user.id,
            "role_name": db_user.role.role_name if db_user.role else "User"
        }