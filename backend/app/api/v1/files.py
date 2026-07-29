import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from app.core.storage import storage_service

router = APIRouter(prefix="/files", tags=["Files"])

@router.get("/{subfolder}/{filename}")
def serve_file(subfolder: str, filename: str):
    filepath = storage_service.get_file_path(subfolder, filename)
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="File not found")
    
    media_type = "application/octet-stream"
    if filename.endswith(".pdf"):
        media_type = "application/pdf"
    elif filename.endswith(".docx"):
        media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    elif filename.endswith(".png"):
        media_type = "image/png"
    elif filename.endswith(".jpg") or filename.endswith(".jpeg"):
        media_type = "image/jpeg"

    return FileResponse(filepath, media_type=media_type, filename=filename)
