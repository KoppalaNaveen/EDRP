from sqlalchemy.orm import Session
from app.models.decision import Decision
from app.models.alternative import Alternative
from app.models.review import Review
from app.schemas.decision import DecisionCreate, DecisionUpdate, DecisionFullCreate
from app.models.decision_version import DecisionVersion

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
        
        # Create first version
        new_version = DecisionVersion(
            decision_id=new_decision.id,
            version_number=1,
            title=new_decision.title,
            description=new_decision.description,
            category_id=new_decision.category_id,
            status=new_decision.status,
            changed_by=new_decision.created_by,
            change_reason="Initial Creation"
        )
        db.add(new_version)
        db.commit()
        
        return new_decision

    @staticmethod
    def create_decision_full(db: Session, full_decision: DecisionFullCreate):
        # We will wrap it all in one transaction
        content_hash = generate_data_hash(full_decision.title, full_decision.description, full_decision.category_id, full_decision.created_by)
        
        new_decision = Decision(
            title=full_decision.title,
            description=full_decision.description,
            created_by=full_decision.created_by,
            category_id=full_decision.category_id,
            priority_level=full_decision.priority_level,
            department=full_decision.department,
            decision_date=full_decision.decision_date,
            tags=full_decision.tags,
            status="Pending",
            content_hash=content_hash
        )
        db.add(new_decision)
        db.flush() # Flush to get new_decision.id
        
        for alt in full_decision.alternatives:
            new_alt = Alternative(
                decision_id=new_decision.id,
                title=alt.title,
                description=alt.description,
                pros=alt.pros,
                cons=alt.cons,
                cost=alt.cost,
                feasibility_score=alt.feasibility_score,
                risk_level=alt.risk_level
            )
            db.add(new_alt)
            
        for rev in full_decision.reviewers:
            new_rev = Review(
                decision_id=new_decision.id,
                reviewer_id=rev.reviewer_id,
                status="Pending",
                deadline=rev.deadline,
                approval_type=rev.approval_type
            )
            db.add(new_rev)
            
        if full_decision.temp_file_ids:
            from app.models.attachment import Attachment
            attachments = db.query(Attachment).filter(Attachment.id.in_(full_decision.temp_file_ids)).all()
            for att in attachments:
                att.decision_id = new_decision.id
                
        # Create first version
        new_version = DecisionVersion(
            decision_id=new_decision.id,
            version_number=1,
            title=new_decision.title,
            description=new_decision.description,
            category_id=new_decision.category_id,
            status=new_decision.status,
            priority_level=new_decision.priority_level,
            department=new_decision.department,
            decision_date=new_decision.decision_date,
            tags=new_decision.tags,
            changed_by=full_decision.created_by,
            change_reason=full_decision.change_reason or "Initial Creation"
        )
        db.add(new_version)
                
        db.commit()
        db.refresh(new_decision)
        return new_decision

    @staticmethod
    def update_decision_full(db: Session, decision_id: int, full_decision: DecisionFullCreate):
        db_decision = DecisionRepository.get_decision_by_id(db, decision_id)
        if not db_decision:
            return None
        
        # 1. Update basic fields
        db_decision.title = full_decision.title
        db_decision.description = full_decision.description
        db_decision.category_id = full_decision.category_id
        db_decision.priority_level = full_decision.priority_level
        db_decision.department = full_decision.department
        db_decision.decision_date = full_decision.decision_date
        db_decision.tags = full_decision.tags
        
        # If decision was rejected, move it back to Pending (resubmit)
        if db_decision.status == "Rejected":
            db_decision.status = "Pending"
            
        # Update content hash
        db_decision.content_hash = generate_data_hash(
            db_decision.title, db_decision.description, db_decision.category_id, db_decision.created_by
        )
        
        # 2. Clear and rebuild alternatives
        db.query(Alternative).filter(Alternative.decision_id == decision_id).delete()
        for alt in full_decision.alternatives:
            new_alt = Alternative(
                decision_id=decision_id,
                title=alt.title,
                description=alt.description,
                pros=alt.pros,
                cons=alt.cons,
                cost=alt.cost,
                feasibility_score=alt.feasibility_score,
                risk_level=alt.risk_level
            )
            db.add(new_alt)
            
        # 3. Clear and rebuild reviews
        db.query(Review).filter(Review.decision_id == decision_id).delete()
        for rev in full_decision.reviewers:
            new_rev = Review(
                decision_id=decision_id,
                reviewer_id=rev.reviewer_id,
                status="Pending",
                deadline=rev.deadline,
                approval_type=rev.approval_type
            )
            db.add(new_rev)
            
        # 4. Attach new documents
        if full_decision.temp_file_ids:
            from app.models.attachment import Attachment
            attachments = db.query(Attachment).filter(Attachment.id.in_(full_decision.temp_file_ids)).all()
            for att in attachments:
                att.decision_id = decision_id
                
        # 5. Create new version
        latest_version = db.query(DecisionVersion).filter(DecisionVersion.decision_id == decision_id).order_by(DecisionVersion.version_number.desc()).first()
        next_version_num = (latest_version.version_number + 1) if latest_version else 1
        
        new_version = DecisionVersion(
            decision_id=db_decision.id,
            version_number=next_version_num,
            title=db_decision.title,
            description=db_decision.description,
            category_id=db_decision.category_id,
            status=db_decision.status,
            priority_level=db_decision.priority_level,
            department=db_decision.department,
            decision_date=db_decision.decision_date,
            tags=db_decision.tags,
            changed_by=full_decision.created_by, # Assuming creator is the one updating it here
            change_reason=full_decision.change_reason or "System Update"
        )
        db.add(new_version)
                
        db.commit()
        db.refresh(db_decision)
        return db_decision

    @staticmethod
    def get_all_decisions(db: Session):
        from sqlalchemy.orm import joinedload
        return db.query(Decision).options(joinedload(Decision.creator), joinedload(Decision.category)).all()

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
            
            # Create new version
            latest_version = db.query(DecisionVersion).filter(DecisionVersion.decision_id == decision_id).order_by(DecisionVersion.version_number.desc()).first()
            next_version_num = (latest_version.version_number + 1) if latest_version else 1
            
            new_version = DecisionVersion(
                decision_id=db_decision.id,
                version_number=next_version_num,
                title=db_decision.title,
                description=db_decision.description,
                category_id=db_decision.category_id,
                status=db_decision.status,
                priority_level=db_decision.priority_level,
                department=db_decision.department,
                decision_date=db_decision.decision_date,
                tags=db_decision.tags,
                change_reason=getattr(decision, "change_reason", None) or "System Update"
            )
            db.add(new_version)
            
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