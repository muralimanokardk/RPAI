from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.v1.auth import get_current_user
from app.models.models import User, StudentVerification, Subscription
from app.schemas.schemas import OnboardingChoice, StudentVerificationResponse, UserResponse
from app.services.ocr_service import ocr_service
from app.core.storage import storage_service
from app.core.config import settings

router = APIRouter(prefix="/onboarding", tags=["Onboarding"])

@router.post("/persona", response_model=UserResponse)
def set_persona(choice: OnboardingChoice, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if choice.persona not in ["student", "professional"]:
        raise HTTPException(status_code=400, detail="Persona must be 'student' or 'professional'")
    
    current_user.plan_tier = "student" if choice.persona == "student" else "standard"
    db.commit()

    # Update subscription free allowance
    sub = db.query(Subscription).filter(Subscription.user_id == current_user.id).first()
    if sub:
        sub.generations_included = settings.STUDENT_FREE_GENERATIONS if choice.persona == "student" else settings.STANDARD_FREE_GENERATIONS
        sub.plan = "student_plan" if choice.persona == "student" else "standard_plan"
        db.commit()

    return UserResponse.model_validate(current_user)

@router.post("/verify-student-id", response_model=StudentVerificationResponse)
async def verify_student_id(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contents = await file.read()
    file_url = storage_service.save_file(contents, file.filename, subfolder="student_ids")

    # Run OCR processing
    ocr_result = ocr_service.process_student_id_card(contents, file.filename)

    verification = StudentVerification(
        user_id=current_user.id,
        id_card_url=file_url,
        ocr_extracted_json=ocr_result["extracted_data"],
        status=ocr_result["status"],
        confidence_score=ocr_result["confidence_score"],
        reviewer_notes=ocr_result["reviewer_notes"]
    )

    db.add(verification)
    
    if ocr_result["status"] == "approved":
        current_user.plan_tier = "student"
        current_user.is_verified = True
        sub = db.query(Subscription).filter(Subscription.user_id == current_user.id).first()
        if sub:
            sub.generations_included = settings.STUDENT_FREE_GENERATIONS
    
    db.commit()
    db.refresh(verification)

    return StudentVerificationResponse.model_validate(verification)
