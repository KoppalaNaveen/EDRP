from pydantic import BaseModel


class TeamBase(BaseModel):
    team_name: str
    description: str | None = None


class TeamCreate(TeamBase):
    pass


class TeamUpdate(TeamBase):
    pass


class TeamResponse(TeamBase):
    id: int

    class Config:
        from_attributes = True