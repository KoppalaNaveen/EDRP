from app.database.connection import engine
from sqlalchemy import text

def add_category_id():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE decisions ADD COLUMN content_hash VARCHAR(64)"))
            conn.commit()
            print("Added content_hash to decisions table.")
            print("Added category_id to decisions table.")
        except Exception as e:
            print("Error adding category_id:", e)

if __name__ == "__main__":
    add_category_id()
