from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.schemas.alternative import AlternativeCreate, AlternativeUpdate, AlternativeResponse
from app.services.alternative_service import AlternativeService

router = APIRouter(
    prefix="/alternatives",
    tags=["Alternatives"]
)

@router.post("/", response_model=AlternativeResponse)
def create_alternative(alternative: AlternativeCreate, db: Session = Depends(get_db)):
    return AlternativeService.create(db, alternative)

@router.get("/decision/{decision_id}", response_model=List[AlternativeResponse])
def get_decision_alternatives(decision_id: int, db: Session = Depends(get_db)):
    return AlternativeService.get_by_decision(db, decision_id)

@router.get("/{id}", response_model=AlternativeResponse)
def get_alternative(id: int, db: Session = Depends(get_db)):
    alt = AlternativeService.get_by_id(db, id)
    if not alt:
        raise HTTPException(status_code=404, detail="Alternative not found")
    return alt

@router.put("/{id}", response_model=AlternativeResponse)
def update_alternative(id: int, alternative: AlternativeUpdate, db: Session = Depends(get_db)):
    alt = AlternativeService.update(db, id, alternative)
    if not alt:
        raise HTTPException(status_code=404, detail="Alternative not found")
    return alt

@router.delete("/{id}")
def delete_alternative(id: int, db: Session = Depends(get_db)):
    success = AlternativeService.delete(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Alternative not found")
    return {"message": "Alternative deleted successfully"}
