from fastapi import FastAPI

from app.database.base import Base
from app.database.connection import engine

# Import all models
from app import models

# Import Routers
from app.api.user_api import router as user_router
from app.api.role_api import router as role_router
from app.api.team_api import router as team_router
from app.api import decision_api
from app.api import alternative_api
from app.api import review_api
from app.api.replay_api import router as replay_router
from app.api.dashboard_api import router as dashboard_router
from app.api.profile_api import router as profile_router
from app.api.role_api import router as role_router



# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Expert Decision Replay Platform",
    version="1.0.0",
    description="A centralized platform for managing organizational decisions."
)

# Register API Routers
app.include_router(role_router)
app.include_router(team_router)
app.include_router(user_router)
app.include_router(decision_api.router)
app.include_router(alternative_api.router)
app.include_router(review_api.router)
app.include_router(replay_router)
app.include_router(dashboard_router)
app.include_router(profile_router)
app.include_router(role_router)

@app.get("/")
def home():
    return {
        "message": "Expert Decision Replay Platform API is Running"
    }