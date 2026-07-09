from sqlalchemy.orm import Session
from app.models.decision import Decision
from app.schemas.decision import DecisionCreate, DecisionUpdate

from app.core.security import generate_data_hash

class DecisionRepository:

    @staticmethod
    def create_decision(db: Session, decision: DecisionCreate):
        content_hash = generate_data_hash(decision.title, decision.description, decision.category_id, decision.created_by)
        new_decision = Decision(
            title=decision.title,
            description=decision.description,
            created_by=decision.created_by,
            category_id=decision.category_id,
            status="Pending",
            content_hash=content_hash
        )
        db.add(new_decision)
        db.commit()
        db.refresh(new_decision)
        return new_decision

    @staticmethod
    def get_all_decisions(db: Session):
        return db.query(Decision).all()

    @staticmethod
    def get_decision_by_id(db: Session, decision_id: int):
        return db.query(Decision).filter(Decision.id == decision_id).first()

    @staticmethod
    def update_decision(db: Session, decision_id: int, decision: DecisionUpdate):
        db_decision = DecisionRepository.get_decision_by_id(db, decision_id)
        if db_decision:
            update_data = decision.model_dump(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_decision, key, value)
            
            # Update hash
            db_decision.content_hash = generate_data_hash(
                db_decision.title, db_decision.description, db_decision.category_id, db_decision.created_by
            )
            
            db.commit()
            db.refresh(db_decision)
        return db_decision

    @staticmethod
    def update_status(db: Session, decision_id: int, status: str):
        db_decision = DecisionRepository.get_decision_by_id(db, decision_id)
        if db_decision:
            db_decision.status = status
            db.commit()
            db.refresh(db_decision)
        return db_decision

    @staticmethod
    def delete_decision(db: Session, decision_id: int):
        db_decision = DecisionRepository.get_decision_by_id(db, decision_id)
        if db_decision:
            db.delete(db_decision)
            db.commit()
            return True
        return False

    @staticmethod
    def verify_decision_integrity(db: Session, decision_id: int) -> bool:
        db_decision = DecisionRepository.get_decision_by_id(db, decision_id)
        if not db_decision:
            return False
            
        calculated_hash = generate_data_hash(
            db_decision.title, db_decision.description, db_decision.category_id, db_decision.created_by
        )
        return db_decision.content_hash == calculated_hash