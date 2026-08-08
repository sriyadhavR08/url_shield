from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.database import get_db
from app.models.user import User
from app.models.scan import Scan
from app.auth.jwt import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("")
def get_dashboard_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Total scans by this user
    total_scans = db.query(Scan).filter(Scan.user_id == current_user.id).count()
    
    # Scans by status
    safe_scans = db.query(Scan).filter(Scan.user_id == current_user.id, Scan.status == "Safe").count()
    medium_scans = db.query(Scan).filter(Scan.user_id == current_user.id, Scan.status == "Medium Risk").count()
    dangerous_scans = db.query(Scan).filter(Scan.user_id == current_user.id, Scan.status == "Dangerous").count()
    
    # Recent scans (last 5)
    recent_scans = db.query(Scan).filter(Scan.user_id == current_user.id).order_by(Scan.scanned_at.desc()).limit(5).all()

    return {
        "stats": {
            "total": total_scans,
            "safe": safe_scans,
            "medium": medium_scans,
            "dangerous": dangerous_scans
        },
        "recent_scans": recent_scans
    }
