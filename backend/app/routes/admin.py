from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.models.user import User
from app.models.scan import Scan
from app.schemas.user import UserResponse
from app.schemas.scan import ScanResponse
from app.auth.jwt import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/users", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    users = db.query(User).all()
    return users

@router.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}

@router.get("/all-scans", response_model=List[ScanResponse])
def get_all_scans(db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    scans = db.query(Scan).order_by(Scan.scanned_at.desc()).all()
    return scans

@router.delete("/all-scans/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_scan_admin(id: int, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)):
    scan = db.query(Scan).filter(Scan.id == id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    db.delete(scan)
    db.commit()
    return {"message": "Scan deleted"}
