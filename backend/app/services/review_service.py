from sqlalchemy.orm import Session

from app.schemas.review import ReviewCreate
from app.repositories.review_repository import ReviewRepository


class ReviewService:

    @staticmethod
    def create_review(
        db: Session,
        review: ReviewCreate
    ):
        return ReviewRepository.create_review(
            db,
            review
        )

    @staticmethod
    def get_all_reviews(db: Session):
        return ReviewRepository.get_all_reviews(db)

    @staticmethod
    def get_reviews_by_decision(
        db: Session,
        decision_id: int
    ):
        return ReviewRepository.get_reviews_by_decision(
            db,
            decision_id
        )