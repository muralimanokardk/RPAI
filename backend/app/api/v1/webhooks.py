import json
import logging
from fastapi import APIRouter, Request, HTTPException, Header, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.razorpay_client import razorpay_wrapper
from app.models.models import Subscription, User

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Webhooks"])

@router.post("/webhooks/razorpay")
async def razorpay_webhook(
    request: Request,
    x_razorpay_signature: str = Header(None),
    db: Session = Depends(get_db)
):
    body_bytes = await request.body()
    body_str = body_bytes.decode('utf-8')

    if x_razorpay_signature and not razorpay_wrapper.verify_webhook_signature(body_str, x_razorpay_signature):
        raise HTTPException(status_code=400, detail="Invalid Razorpay webhook signature")

    try:
        event_data = json.loads(body_str)
        event_type = event_data.get("event")
        payload = event_data.get("payload", {})
        
        logger.info(f"Received Razorpay webhook event: {event_type}")

        if event_type in ["payment.captured", "subscription.charged"]:
            sub_entity = payload.get("subscription", {}).get("entity", {})
            sub_id = sub_entity.get("id")
            email = payload.get("payment", {}).get("entity", {}).get("email")

            if sub_id or email:
                user = db.query(User).filter(User.email == email).first() if email else None
                sub = db.query(Subscription).filter(Subscription.razorpay_subscription_id == sub_id).first()
                if not sub and user:
                    sub = db.query(Subscription).filter(Subscription.user_id == user.id).first()

                if sub:
                    sub.status = "active"
                    sub.generations_used = 0 # Reset count for new billing period
                    sub.generations_included = 9999 # Unlimited / high tier
                    db.commit()

        elif event_type == "subscription.cancelled":
            sub_entity = payload.get("subscription", {}).get("entity", {})
            sub_id = sub_entity.get("id")
            if sub_id:
                sub = db.query(Subscription).filter(Subscription.razorpay_subscription_id == sub_id).first()
                if sub:
                    sub.status = "cancelled"
                    db.commit()

        return {"status": "success"}

    except Exception as e:
        logger.error(f"Error processing Razorpay webhook: {e}")
        return {"status": "ignored"}
