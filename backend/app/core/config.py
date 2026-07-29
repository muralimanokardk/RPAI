import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "ResearchPrepAI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "researchprepai-secret-key-production-change-me-32bytes")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/researchprep")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    
    # Razorpay (Test mode)
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID", "rzp_test_samplekey123")
    RAZORPAY_KEY_SECRET: str = os.getenv("RAZORPAY_KEY_SECRET", "rzp_test_samplesecret123")
    RAZORPAY_WEBHOOK_SECRET: str = os.getenv("RAZORPAY_WEBHOOK_SECRET", "whsec_sample123")
    
    # Storage
    STORAGE_DIR: str = os.getenv("STORAGE_DIR", "./uploads")
    S3_ENDPOINT_URL: Optional[str] = os.getenv("S3_ENDPOINT_URL", None)
    S3_BUCKET_NAME: str = os.getenv("S3_BUCKET_NAME", "researchprepai-storage")
    
    # External APIs
    CROSSREF_API_URL: str = "https://api.crossref.org/works"
    SEMANTIC_SCHOLAR_API_URL: str = "https://api.semanticscholar.org/graph/v1/paper/search"
    
    # Pricing defaults
    STUDENT_PLAN_PRICE: int = 7500 # $75.00 in cents or sub units
    STANDARD_PLAN_PRICE: int = 15000 # $150.00
    STUDENT_FREE_GENERATIONS: int = 3
    STANDARD_FREE_GENERATIONS: int = 2

    class Config:
        case_sensitive = True

settings = Settings()
