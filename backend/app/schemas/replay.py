from pydantic import BaseModel


class ReplayCreate(BaseModel):
    decision_id: int
    action: str
    performed_by: int


class ReplayResponse(BaseModel):
    id: int
    decision_id: int
    action: str
    performed_by: int

    model_config = {
        "from_attributes": True
    }