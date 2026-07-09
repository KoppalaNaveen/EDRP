from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DecisionCreate(BaseModel):
    title: str
    description: str
    created_by: int
    category_id: Optional[int] = None

class DecisionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category_id: Optional[int] = None

class DecisionStatusUpdate(BaseModel):
    status: str

class DecisionResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    category_id: Optional[int] = None
    created_by: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }