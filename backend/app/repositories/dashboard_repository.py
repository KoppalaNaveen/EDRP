from sqlalchemy.orm import Session

from app.models.user import User
from app.models.role import Role
from app.models.team import Team
from app.models.decision import Decision
from app.models.review import Review
from app.models.replay import Replay


class DashboardRepository:

    @staticmethod
    def get_dashboard(db: Session, user_id: int):

        import hashlib

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if not user:
            return None

        role = (
            db.query(Role)
            .filter(Role.id == user.role_id)
            .first()
        )

        team = (
            db.query(Team)
            .filter(Team.id == user.team_id)
            .first()
        )

        role_name = role.role_name if role else "User"

        # Apply Hash for User Details if not Administrator
        if role_name == "Administrator" or role_name == "Admin":
            display_user = user.full_name
        else:
            # Mask or hash user details
            display_user = hashlib.sha256(user.full_name.encode()).hexdigest()[:12]

        if role_name == "Administrator" or role_name == "Admin":
            total_decisions = db.query(Decision).count()
            pending_reviews = db.query(Review).filter(Review.status == "Pending").count()
            total_replays = db.query(Replay).count()
            recent_decisions = db.query(Decision).order_by(Decision.id.desc()).limit(5).all()
            recent_reviews = db.query(Review).order_by(Review.id.desc()).limit(5).all()
            recent_replays = db.query(Replay).order_by(Replay.id.desc()).limit(5).all()

        elif role_name == "Manager":
            # Manager sees decisions from their team members
            team_users = [u.id for u in db.query(User).filter(User.team_id == user.team_id).all()]
            total_decisions = db.query(Decision).filter(Decision.created_by.in_(team_users)).count()
            pending_reviews = db.query(Review).filter(Review.reviewer_id == user_id, Review.status == "Pending").count()
            total_replays = db.query(Replay).filter(Replay.performed_by.in_(team_users)).count()
            recent_decisions = db.query(Decision).filter(Decision.created_by.in_(team_users)).order_by(Decision.id.desc()).limit(5).all()
            recent_reviews = db.query(Review).filter(Review.reviewer_id == user_id).order_by(Review.id.desc()).limit(5).all()
            recent_replays = db.query(Replay).filter(Replay.performed_by.in_(team_users)).order_by(Replay.id.desc()).limit(5).all()

        else: # Employee / Reviewer
            total_decisions = db.query(Decision).filter(Decision.created_by == user_id).count()
            pending_reviews = db.query(Review).filter(Review.reviewer_id == user_id, Review.status == "Pending").count()
            total_replays = db.query(Replay).filter(Replay.performed_by == user_id).count()
            recent_decisions = db.query(Decision).filter(Decision.created_by == user_id).order_by(Decision.id.desc()).limit(5).all()
            recent_reviews = db.query(Review).filter(Review.reviewer_id == user_id).order_by(Review.id.desc()).limit(5).all()
            recent_replays = db.query(Replay).filter(Replay.performed_by == user_id).order_by(Replay.id.desc()).limit(5).all()

        return {
            "user": display_user,
            "role": role_name,
            "team": team.team_name if team else "",

            "total_decisions": total_decisions,
            "pending_reviews": pending_reviews,
            "total_replays": total_replays,

            "recent_decisions": recent_decisions,
            "recent_reviews": recent_reviews,
            "recent_replays": recent_replays,
        }