from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.team import (
    TeamCreate,
    TeamUpdate,
    TeamResponse
)

from app.services.team_service import TeamService


router = APIRouter(
    prefix="/teams",
    tags=["Teams"]
)


@router.post(
    "/",
    response_model=TeamResponse,
    status_code=201
)
def create_team(
    team: TeamCreate,
    db: Session = Depends(get_db)
):
    return TeamService.create_team(db, team)


@router.get(
    "/",
    response_model=list[TeamResponse]
)
def get_all_teams(
    db: Session = Depends(get_db)
):
    return TeamService.get_all_teams(db)


@router.get(
    "/{team_id}",
    response_model=TeamResponse
)
def get_team(
    team_id: int,
    db: Session = Depends(get_db)
):
    return TeamService.get_team(db, team_id)


@router.put(
    "/{team_id}",
    response_model=TeamResponse
)
def update_team(
    team_id: int,
    team: TeamUpdate,
    db: Session = Depends(get_db)
):
    return TeamService.update_team(
        db,
        team_id,
        team
    )


@router.delete(
    "/{team_id}"
)
def delete_team(
    team_id: int,
    db: Session = Depends(get_db)
):
    return TeamService.delete_team(
        db,
        team_id
    )