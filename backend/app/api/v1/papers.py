from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.api.v1.auth import get_current_user
from app.models.models import User, Paper, Subscription, Citation, Report, Document, StudentVerification
from app.schemas.schemas import PaperCreate, PaperResponse, PaperDetailResponse
from app.tasks.tasks import generate_paper_task
from app.services.ocr_service import ocr_service

router = APIRouter(prefix="/papers", tags=["Papers"])

@router.post("/", response_model=PaperResponse)
def create_paper(
    paper_in: PaperCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Server-side quota gating (never trust frontend)
    sub = db.query(Subscription).filter(Subscription.user_id == current_user.id).first()
    if not sub:
        raise HTTPException(status_code=400, detail="No active subscription found")
    
    # Enforce Student ID upload verification gating for student tier
    if current_user.plan_tier == "student":
        verification = db.query(StudentVerification).filter(StudentVerification.user_id == current_user.id).first()
        if not verification:
            raise HTTPException(
                status_code=403,
                detail="Student ID verification required. Please upload your student ID card in Onboarding before generating papers."
            )

    if sub.status != "active" or sub.generations_used >= sub.generations_included:
        raise HTTPException(
            status_code=403,
            detail="Generation quota reached for current cycle. Please upgrade your plan."
        )

    paper = Paper(
        user_id=current_user.id,
        topic=paper_in.topic,
        input_mode=paper_in.input_mode,
        target_format=paper_in.target_format,
        journal_template=paper_in.journal_template,
        citation_style=paper_in.citation_style,
        status="queued"
    )

    db.add(paper)
    db.commit()
    db.refresh(paper)

    # Dispatch Celery async generation task
    try:
        generate_paper_task.delay(paper.id)
    except Exception as e:
        # Fallback to direct synchronous execution if Celery worker is offline during local test
        from app.tasks.tasks import generate_paper_task as direct_task
        direct_task(paper.id)

    return PaperResponse.model_validate(paper)

@router.get("/", response_model=List[PaperResponse])
def list_papers(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    papers = db.query(Paper).filter(Paper.user_id == current_user.id).order_by(Paper.created_at.desc()).all()
    return [PaperResponse.model_validate(p) for p in papers]

@router.get("/{paper_id}", response_model=PaperDetailResponse)
def get_paper(paper_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    paper = db.query(Paper).filter(Paper.id == paper_id, Paper.user_id == current_user.id).first()
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return PaperDetailResponse.model_validate(paper)

@router.post("/ocr-title")
async def ocr_title(file: UploadFile = File(...)):
    contents = await file.read()
    extracted_text = ocr_service.process_scanned_title(contents)
    return {"extracted_text": extracted_text}
