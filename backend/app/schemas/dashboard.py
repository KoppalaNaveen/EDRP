from pydantic import BaseModel
from typing import List


class RecentDecision(BaseModel):
    id: int
    title: str
    status: str

    class Config:
        from_attributes = True


class RecentReview(BaseModel):
    id: int
    decision_id: int
    status: str
    comments: str | None = None

    class Config:
        from_attributes = True


class RecentReplay(BaseModel):
    id: int
    decision_id: int
    action: str

    class Config:
        from_attributes = True


class DashboardResponse(BaseModel):
    user: str
    role: str
    team: str

    total_decisions: int
    pending_reviews: int
    total_replays: int

    recent_decisions: List[RecentDecision]
    recent_reviews: List[RecentReview]
    recent_replays: List[RecentReplay]

    class Config:
        from_attributes = True