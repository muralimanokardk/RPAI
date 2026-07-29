from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any, Dict
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class UserResponse(UserBase):
    id: str
    auth_provider: str
    plan_tier: str
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class OnboardingChoice(BaseModel):
    persona: str  # student or professional

class StudentVerificationResponse(BaseModel):
    id: str
    user_id: str
    id_card_url: str
    ocr_extracted_json: Optional[Dict[str, Any]]
    status: str
    confidence_score: float
    reviewer_notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class SubscriptionResponse(BaseModel):
    id: str
    plan: str
    status: str
    generations_used: int
    generations_included: int
    current_period_end: Optional[datetime]

    class Config:
        from_attributes = True

class CreateRazorpayOrderRequest(BaseModel):
    plan_tier: str  # student or standard

class PaperCreate(BaseModel):
    topic: str
    input_mode: str = "text"  # text, voice, scan
    target_format: str = "IEEE"
    journal_template: str = "IEEE"  # IEEE, Springer, Elsevier
    citation_style: str = "IEEE"

class CitationResponse(BaseModel):
    id: str
    doi: Optional[str]
    title: str
    authors: Optional[str]
    year: Optional[int]
    source_api: str
    verified_bool: bool

    class Config:
        from_attributes = True

class ReportResponse(BaseModel):
    id: str
    report_type: str
    provider: str
    score: float
    raw_report_json: Optional[Dict[str, Any]]

    class Config:
        from_attributes = True

class DocumentResponse(BaseModel):
    id: str
    document_type: str
    file_format: str
    file_url: str

    class Config:
        from_attributes = True

class PaperResponse(BaseModel):
    id: str
    topic: str
    input_mode: str
    target_format: str
    journal_template: str
    citation_style: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class PaperDetailResponse(PaperResponse):
    structured_content_json: Optional[Dict[str, Any]]
    citations: List[CitationResponse] = []
    reports: List[ReportResponse] = []
    documents: List[DocumentResponse] = []
