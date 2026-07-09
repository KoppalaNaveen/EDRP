from sqlalchemy.orm import Session

from app.models.review import Review
from app.schemas.review import ReviewCreate


class ReviewRepository:

    @staticmethod
    def create_review(
        db: Session,
        review: ReviewCreate
    ):

        new_review = Review(
            decision_id=review.decision_id,
            reviewer_id=review.reviewer_id,
            status=review.status,
            comments=review.comments
        )

        db.add(new_review)
        db.commit()
        db.refresh(new_review)

        return new_review

    @staticmethod
    def get_all_reviews(db: Session):
        return db.query(Review).all()

    @staticmethod
    def get_reviews_by_decision(
        db: Session,
        decision_id: int
    ):
        return db.query(Review).filter(
            Review.decision_id == decision_id
        ).all()