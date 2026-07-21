from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.schemas.decision import (
    DecisionCreate,
    DecisionUpdate,
    DecisionStatusUpdate,
    DecisionResponse,
    DecisionFullCreate,
    DecisionFullResponse
)
from app.services.decision_service import DecisionService

router = APIRouter(
    prefix="/decisions",
    tags=["Decisions"]
)

@router.post("/", response_model=DecisionResponse, status_code=201)
def create_decision(decision: DecisionCreate, db: Session = Depends(get_db)):
    return DecisionService.create_decision(db, decision)

@router.post("/full", response_model=DecisionResponse, status_code=201)
def create_decision_full(decision: DecisionFullCreate, db: Session = Depends(get_db)):
    return DecisionService.create_decision_full(db, decision)

@router.get("/", response_model=List[DecisionResponse])
def get_all_decisions(db: Session = Depends(get_db)):
    return DecisionService.get_all_decisions(db)

@router.get("/{decision_id}", response_model=DecisionFullResponse)
def get_decision(decision_id: int, db: Session = Depends(get_db)):
    decision = DecisionService.get_decision_by_id(db, decision_id)
    if not decision:
        raise HTTPException(status_code=404, detail="Decision not found")
    return decision

@router.put("/{decision_id}", response_model=DecisionResponse)
def update_decision(decision_id: int, decision: DecisionUpdate, db: Session = Depends(get_db)):
    updated_decision = DecisionService.update_decision(db, decision_id, decision)
    if not updated_decision:
        raise HTTPException(status_code=404, detail="Decision not found")
    return updated_decision

@router.put("/{decision_id}/full", response_model=DecisionResponse)
def update_decision_full(decision_id: int, decision: DecisionFullCreate, db: Session = Depends(get_db)):
    updated_decision = DecisionService.update_decision_full(db, decision_id, decision)
    if not updated_decision:
        raise HTTPException(status_code=404, detail="Decision not found")
    return updated_decision

@router.patch("/{decision_id}/status", response_model=DecisionResponse)
def update_status(decision_id: int, status_update: DecisionStatusUpdate, db: Session = Depends(get_db)):
    updated_decision = DecisionService.update_status(db, decision_id, status_update)
    if not updated_decision:
        raise HTTPException(status_code=404, detail="Decision not found")
    return updated_decision

@router.delete("/{decision_id}")
def delete_decision(decision_id: int, db: Session = Depends(get_db)):
    success = DecisionService.delete_decision(db, decision_id)
    if not success:
        raise HTTPException(status_code=404, detail="Decision not found")
    return {"message": "Decision deleted successfully"}