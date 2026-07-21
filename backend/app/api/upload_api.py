from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.attachment import Attachment
from app.schemas.decision import AttachmentResponse
import os
import shutil
from typing import Optional

router = APIRouter(
    prefix="/upload",
    tags=["Uploads"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=AttachmentResponse)
async def upload_file(
    file: UploadFile = File(...), 
    user_id: int = Form(1), 
    decision_id: Optional[int] = Form(None),
    db: Session = Depends(get_db)
):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    file_size = os.path.getsize(file_path)
    
    attachment = Attachment(
        filename=file.filename,
        file_path=file_path,
        file_size=file_size,
        uploaded_by=user_id,
        decision_id=decision_id
    )
    db.add(attachment)
    db.commit()
    db.refresh(attachment)
    return attachment

