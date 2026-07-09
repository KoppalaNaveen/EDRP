from sqlalchemy.orm import Session

from app.models.replay import Replay
from app.schemas.replay import ReplayCreate


class ReplayRepository:

    @staticmethod
    def create_replay(
        db: Session,
        replay: ReplayCreate
    ):
        new_replay = Replay(
            decision_id=replay.decision_id,
            action=replay.action,
            performed_by=replay.performed_by
        )

        db.add(new_replay)
        db.commit()
        db.refresh(new_replay)

        return new_replay

    @staticmethod
    def get_all_replays(db: Session):
        return db.query(Replay).all()

    @staticmethod
    def get_by_decision(
        db: Session,
        decision_id: int
    ):
        return db.query(Replay).filter(
            Replay.decision_id == decision_id
        ).all()