from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.team import Team
from app.schemas.team import TeamCreate, TeamUpdate
from app.repositories.team_repository import TeamRepository


class TeamService:

    @staticmethod
    def create_team(db: Session, team: TeamCreate):

        existing = TeamRepository.get_team_by_name(
            db,
            team.team_name
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Team already exists"
            )

        new_team = Team(
            team_name=team.team_name,
            description=team.description
        )

        return TeamRepository.create_team(
            db,
            new_team
        )

    @staticmethod
    def get_all_teams(db: Session):

        return TeamRepository.get_all_teams(db)

    @staticmethod
    def get_team(db: Session, team_id: int):

        team = TeamRepository.get_team_by_id(
            db,
            team_id
        )

        if not team:
            raise HTTPException(
                status_code=404,
                detail="Team not found"
            )

        return team

    @staticmethod
    def update_team(
        db: Session,
        team_id: int,
        data: TeamUpdate
    ):

        team = TeamRepository.get_team_by_id(
            db,
            team_id
        )

        if not team:
            raise HTTPException(
                status_code=404,
                detail="Team not found"
            )

        team.team_name = data.team_name
        team.description = data.description

        TeamRepository.update_team(db)

        return team

    @staticmethod
    def delete_team(
        db: Session,
        team_id: int
    ):

        team = TeamRepository.get_team_by_id(
            db,
            team_id
        )

        if not team:
            raise HTTPException(
                status_code=404,
                detail="Team not found"
            )

        TeamRepository.delete_team(
            db,
            team
        )

        return {
            "message": "Team deleted successfully"
        }