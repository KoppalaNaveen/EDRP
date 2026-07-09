from sqlalchemy.orm import Session

from app.repositories.dashboard_repository import DashboardRepository


class DashboardService:

    @staticmethod
    def get_dashboard(db: Session, user_id: int):
        return DashboardRepository.get_dashboard(db, user_id)