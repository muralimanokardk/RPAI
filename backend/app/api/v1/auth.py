import uuid
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.security import verify_password, get_password_hash, create_access_token, verify_token
from app.models.models import User, Subscription
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, Token, ForgotPasswordRequest, ResetPasswordRequest
from app.core.config import settings

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", response_model=Token)
def signup(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        hashed_password=hashed_pwd,
        name=user_in.name,
        plan_tier="standard",
        auth_provider="email"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Initialize default free subscription
    sub = Subscription(
        user_id=user.id,
        plan="standard_plan",
        status="active",
        generations_used=0,
        generations_included=settings.STANDARD_FREE_GENERATIONS
    )
    db.add(sub)
    db.commit()

    access_token = create_access_token(user.id)
    return Token(access_token=access_token, token_type="bearer", user=UserResponse.model_validate(user))

@router.post("/login", response_model=Token)
def login(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not user.hashed_password:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    if not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(user.id)
    return Token(access_token=access_token, token_type="bearer", user=UserResponse.model_validate(user))

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        # Don't leak user existence
        return {"message": "If account exists, reset instructions have been dispatched."}
    
    reset_token = uuid.uuid4().hex
    user.password_reset_token = reset_token
    user.reset_token_expires = datetime.utcnow() + timedelta(hours=1)
    db.commit()

    return {
        "message": "Password reset token generated",
        "reset_token": reset_token # Demo token returned for testing flow
    }

@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.password_reset_token == req.token,
        User.reset_token_expires > datetime.utcnow()
    ).first()
    
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token")
    
    user.hashed_password = get_password_hash(req.new_password)
    user.password_reset_token = None
    user.reset_token_expires = None
    db.commit()

    return {"message": "Password updated successfully"}

def get_current_user(token: str = Depends(verify_token), db: Session = Depends(get_db)) -> User:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user = db.query(User).filter(User.id == token).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return UserResponse.model_validate(current_user)
