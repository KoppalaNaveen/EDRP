from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class AlternativeBase(BaseModel):
    title: str
    description: Optional[str] = None
    pros: Optional[str] = None
    cons: Optional[str] = None
    cost: Optional[Decimal] = None
    feasibility_score: Optional[int] = None
    risk_level: Optional[str] = None

class AlternativeCreate(AlternativeBase):
    decision_id: int

class AlternativeUpdate(AlternativeBase):
    pass

class AlternativeResponse(AlternativeBase):
    id: int
    decision_id: int
    
    model_config = {
        "from_attributes": True
    }
