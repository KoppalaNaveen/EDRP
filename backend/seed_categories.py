import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.connection import SessionLocal
from app.models.category import Category

def seed():
    db = SessionLocal()
    categories = ["Finance", "Technology", "Operations", "HR"]
    for i, name in enumerate(categories, start=1):
        c = db.query(Category).filter(Category.id == i).first()
        if not c:
            db.add(Category(id=i, name=name))
    db.commit()
    print("Categories seeded")

if __name__ == "__main__":
    seed()
