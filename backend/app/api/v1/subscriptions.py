from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.api.v1.auth import get_current_user
from app.models.models import User, Subscription
from app.schemas.schemas import SubscriptionResponse, CreateRazorpayOrderRequest
from app.core.razorpay_client import razorpay_wrapper
from app.core.config import settings

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])

@router.get("/me", response_model=SubscriptionResponse)
def get_subscription(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    sub = db.query(Subscription).filter(Subscription.user_id == current_user.id).first()
    if not sub:
        # Create default if missing
        sub = Subscription(
            user_id=current_user.id,
            plan="standard_plan",
            status="active",
            generations_used=0,
            generations_included=settings.STANDARD_FREE_GENERATIONS
        )
        db.add(sub)
        db.commit()
        db.refresh(sub)
    return SubscriptionResponse.model_validate(sub)

@router.post("/create-order")
def create_order(req: CreateRazorpayOrderRequest, current_user: User = Depends(get_current_user)):
    plan_id = "plan_student_75" if req.plan_tier == "student" else "plan_standard_150"
    amount = settings.STUDENT_PLAN_PRICE if req.plan_tier == "student" else settings.STANDARD_PLAN_PRICE
    
    razorpay_sub = razorpay_wrapper.create_subscription(plan_id=plan_id)

    return {
        "subscription_id": razorpay_sub.get("id"),
        "key_id": settings.RAZORPAY_KEY_ID,
        "amount": amount,
        "currency": "USD",
        "name": "ResearchPrepAI Subscription",
        "description": f"{req.plan_tier.capitalize()} Tier (3 Months Unlimited/High Cap)"
    }
