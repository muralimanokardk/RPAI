import os
import uuid
from app.core.config import settings

os.makedirs(settings.STORAGE_DIR, exist_ok=True)

class StorageService:
    @staticmethod
    def save_file(file_bytes: bytes, filename: str, subfolder: str = "documents") -> str:
        folder_path = os.path.join(settings.STORAGE_DIR, subfolder)
        os.makedirs(folder_path, exist_ok=True)
        
        ext = filename.split(".")[-1] if "." in filename else "bin"
        unique_name = f"{uuid.uuid4().hex}.{ext}"
        filepath = os.path.join(folder_path, unique_name)
        
        with open(filepath, "wb") as f:
            f.write(file_bytes)
            
        # Return accessible file URL or relative path
        return f"/api/v1/files/{subfolder}/{unique_name}"

    @staticmethod
    def get_file_path(subfolder: str, filename: str) -> str:
        return os.path.join(settings.STORAGE_DIR, subfolder, filename)

storage_service = StorageService()
