from sqlalchemy.orm import Session
from app.models.team import Team


class TeamRepository:

    @staticmethod
    def create_team(db: Session, team: Team):
        db.add(team)
        db.commit()
        db.refresh(team)
        return team

    @staticmethod
    def get_all_teams(db: Session):
        return db.query(Team).order_by(Team.id).all()

    @staticmethod
    def get_team_by_id(db: Session, team_id: int):
        return (
            db.query(Team)
            .filter(Team.id == team_id)
            .first()
        )

    @staticmethod
    def get_team_by_name(db: Session, team_name: str):
        return (
            db.query(Team)
            .filter(Team.team_name == team_name)
            .first()
        )

    @staticmethod
    def update_team(db: Session):
        db.commit()

    @staticmethod
    def delete_team(db: Session, team: Team):
        db.delete(team)
        db.commit()