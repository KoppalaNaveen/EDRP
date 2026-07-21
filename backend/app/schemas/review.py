from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ReviewCreate(BaseModel):
    decision_id: int
    reviewer_id: int
    status: str
    comments: Optional[str] = None


class ReviewResponse(BaseModel):
    id: int
    decision_id: int
    reviewer_id: int
    reviewer_name: Optional[str] = None
    reviewer_initials: Optional[str] = None
    status: str
    comments: Optional[str]
    reviewed_at: datetime

    model_config = {
        "from_attributes": True
    }