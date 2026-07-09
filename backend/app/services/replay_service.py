from sqlalchemy.orm import Session

from app.repositories.replay_repository import ReplayRepository
from app.schemas.replay import ReplayCreate


class ReplayService:

    @staticmethod
    def create_replay(
        db: Session,
        replay: ReplayCreate
    ):
        return ReplayRepository.create_replay(
            db,
            replay
        )

    @staticmethod
    def get_all_replays(db: Session):
        return ReplayRepository.get_all_replays(db)

    @staticmethod
    def get_by_decision(
        db: Session,
        decision_id: int
    ):
        return ReplayRepository.get_by_decision(
            db,
            decision_id
        )