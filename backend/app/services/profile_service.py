from sqlalchemy.orm import Session

from app.repositories.profile_repository import ProfileRepository


class ProfileService:

    @staticmethod
    def get_profile(db: Session, user_id: int):

        data = ProfileRepository.get_profile(db, user_id)

        if not data:
            return None

        user, role, team = data

        return {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "designation": user.designation,
            "role": role.role_name,
            "team": team.team_name
        }

    @staticmethod
    def update_profile(db: Session, user_id: int, profile):

        user = ProfileRepository.update_profile(
            db=db,
            user_id=user_id,
            full_name=profile.full_name,
            phone=profile.phone,
            designation=profile.designation
        )

        if not user:
            return None

        return {
            "message": "Profile Updated Successfully"
        }