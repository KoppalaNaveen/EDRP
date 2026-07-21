from sqlalchemy.orm import Session
from fastapi import HTTPException, status
import random
import time
import hashlib

from app.schemas.user import UserRegister, UserLogin
from app.repositories.user_repository import UserRepository
from app.core.security import hash_password, verify_password
from app.core.auth import create_access_token
from app.models.user import VerificationCode, User
from app.services.email_service import send_otp_email, send_id_email

class UserService:

    @staticmethod
    def register_user(db: Session, user: UserRegister):
        # 1. Verify the code
        UserService._verify_code(db, user.email, user.verification_code, "register")
        
        # 2. Hash the email
        hashed_email = hashlib.sha256(user.email.lower().encode('utf-8')).hexdigest()

        # 3. Check if email already exists
        existing_user = UserRepository.get_user_by_email(db, hashed_email)

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # 4. Save plaintext email for sending ID later
        plaintext_email = user.email

        # 5. Update the user object with the hashed email before saving
        user.email = hashed_email

        # 6. Generate Employee ID if not provided by frontend
        if user.employee_id and user.employee_id.strip():
            new_employee_id = user.employee_id.strip()
        else:
            role_prefixes = {1: "AD", 2: "MN", 3: "EMP", 4: "RW"}
            prefix = role_prefixes.get(user.role_id, "USR")
            new_employee_id = f"{prefix}{random.randint(1000, 9999)}"
        
        user.employee_id = new_employee_id

        # 7. Hash password
        hashed_password = hash_password(user.password)

        # 8. Save user
        created_user = UserRepository.create_user(
            db,
            user,
            hashed_password
        )

        # 9. Send Email with ID
        send_id_email(plaintext_email, new_employee_id)

        return created_user

    @staticmethod
    def get_all_users(db: Session):
        return UserRepository.get_all_users(db)

    @staticmethod
    def login_user(db: Session, user: UserLogin):

        # Check employee_id
        db_user = UserRepository.get_user_by_employee_id(db, user.employee_id)

        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid employee ID or password"
            )

        # Verify password
        if not verify_password(user.password, db_user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid employee ID or password"
            )

        # Generate JWT Token
        access_token = create_access_token(
            {
                "sub": db_user.employee_id
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user_id": db_user.id,
            "role_name": db_user.role.role_name if db_user.role else "User",
            "full_name": db_user.full_name
        }

    @staticmethod
    def send_verification_code(db: Session, email: str, purpose: str, is_resend: bool = False):
        # Check if email is already registered based on purpose
        hashed_email = hashlib.sha256(email.lower().encode('utf-8')).hexdigest()
        existing_user = UserRepository.get_user_by_email(db, hashed_email)
        
        if purpose == "register" and existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        elif purpose == "reset_password" and not existing_user:
            raise HTTPException(status_code=404, detail="Email not registered")
            
        # Generate 6-digit code
        code = str(random.randint(100000, 999999))
        
        # Set expiry: 5 minutes if resend, else 10 minutes
        expiry_seconds = 300 if is_resend else 600
        expires_at = int(time.time()) + expiry_seconds

        # Delete previous codes for this email and purpose
        db.query(VerificationCode).filter(
            VerificationCode.email == email.lower(),
            VerificationCode.purpose == purpose
        ).delete()
        
        # Save new code
        vc = VerificationCode(
            email=email.lower(),
            code=code,
            expires_at=expires_at,
            purpose=purpose
        )
        db.add(vc)
        db.commit()

        # Send email
        success = send_otp_email(email, code)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to send verification email")
            
        return {"message": "Verification code sent successfully"}
        
    @staticmethod
    def check_code(db: Session, email: str, code: str, purpose: str):
        vc = db.query(VerificationCode).filter(
            VerificationCode.email == email.lower(),
            VerificationCode.code == code,
            VerificationCode.purpose == purpose
        ).first()
        
        if not vc:
            raise HTTPException(status_code=400, detail="Invalid verification code")
            
        if vc.expires_at < int(time.time()):
            db.delete(vc)
            db.commit()
            raise HTTPException(status_code=400, detail="Verification code expired")
            
        return {"message": "Code is valid"}

    @staticmethod
    def _verify_code(db: Session, email: str, code: str, purpose: str):
        vc = db.query(VerificationCode).filter(
            VerificationCode.email == email.lower(),
            VerificationCode.code == code,
            VerificationCode.purpose == purpose
        ).first()
        
        if not vc:
            raise HTTPException(status_code=400, detail="Invalid verification code")
            
        if vc.expires_at < int(time.time()):
            db.delete(vc)
            db.commit()
            raise HTTPException(status_code=400, detail="Verification code expired")
            
        # Delete code after successful verification
        db.delete(vc)
        db.commit()
        return True

    @staticmethod
    def reset_password(db: Session, email: str, code: str, new_password: str):
        # Verify code first
        UserService._verify_code(db, email, code, "reset_password")
        
        # Find user
        hashed_email = hashlib.sha256(email.lower().encode('utf-8')).hexdigest()
        user = UserRepository.get_user_by_email(db, hashed_email)
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        # Update password
        user.password = hash_password(new_password)
        db.commit()
        
        return {"message": "Password reset successfully"}