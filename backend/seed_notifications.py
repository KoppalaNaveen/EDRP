from app.database.connection import SessionLocal
from app.models.user import User
from app.models.notification import Notification
from datetime import datetime, timezone
from app.database.base import Base
from app.database.connection import engine

Base.metadata.create_all(bind=engine)

db = SessionLocal()
user = db.query(User).first()
if user:
    db.add(Notification(user_id=user.id, message="Test Notification 1", notification_type="Review Request", is_read=False))
    db.add(Notification(user_id=user.id, message="Test Notification 2", notification_type="System Update", is_read=False))
    db.commit()
    print("Added sample notifications for user", user.id)
else:
    print("No user found")
db.close()
