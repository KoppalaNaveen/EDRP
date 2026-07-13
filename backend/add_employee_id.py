import sys
import os

# Add the backend folder to sys.path so we can import app modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.database.connection import engine
from sqlalchemy import text

def add_column():
    with engine.connect() as conn:
        try:
            conn.execute(text("SELECT employee_id FROM users LIMIT 1"))
            print("Column 'employee_id' already exists.")
            return
        except Exception:
            conn.rollback() # Rollback the aborted transaction!
            
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE users ADD COLUMN employee_id VARCHAR(50)"))
            conn.commit()
            print("Successfully added 'employee_id' column to 'users' table.")
        except Exception as e:
            print(f"Failed to add column: {e}")

if __name__ == "__main__":
    add_column()
