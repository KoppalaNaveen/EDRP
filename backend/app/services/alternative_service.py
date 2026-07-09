from sqlalchemy.orm import Session
from app.models.alternative import Alternative
from app.schemas.alternative import AlternativeCreate, AlternativeUpdate

from app.core.security import generate_data_hash

class AlternativeService:
    @staticmethod
    def get_by_decision(db: Session, decision_id: int):
        return db.query(Alternative).filter(Alternative.decision_id == decision_id).all()

    @staticmethod
    def get_by_id(db: Session, alternative_id: int):
        return db.query(Alternative).filter(Alternative.id == alternative_id).first()

    @staticmethod
    def create(db: Session, alternative: AlternativeCreate):
        db_alt = Alternative(**alternative.model_dump())
        db_alt.content_hash = generate_data_hash(
            db_alt.decision_id, db_alt.title, db_alt.description, db_alt.pros, db_alt.cons, db_alt.cost, db_alt.feasibility_score, db_alt.risk_level
        )
        db.add(db_alt)
        db.commit()
        db.refresh(db_alt)
        return db_alt

    @staticmethod
    def update(db: Session, alternative_id: int, alternative: AlternativeUpdate):
        db_alt = AlternativeService.get_by_id(db, alternative_id)
        if not db_alt:
            return None
        
        update_data = alternative.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_alt, key, value)
            
        db_alt.content_hash = generate_data_hash(
            db_alt.decision_id, db_alt.title, db_alt.description, db_alt.pros, db_alt.cons, db_alt.cost, db_alt.feasibility_score, db_alt.risk_level
        )
            
        db.commit()
        db.refresh(db_alt)
        return db_alt

    @staticmethod
    def delete(db: Session, alternative_id: int):
        db_alt = AlternativeService.get_by_id(db, alternative_id)
        if db_alt:
            db.delete(db_alt)
            db.commit()
            return True
        return False

    @staticmethod
    def verify_integrity(db: Session, alternative_id: int) -> bool:
        db_alt = AlternativeService.get_by_id(db, alternative_id)
        if not db_alt:
            return False
            
        calculated_hash = generate_data_hash(
            db_alt.decision_id, db_alt.title, db_alt.description, db_alt.pros, db_alt.cons, db_alt.cost, db_alt.feasibility_score, db_alt.risk_level
        )
        return db_alt.content_hash == calculated_hash
