from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.database import get_db
from app.models.user import User
from app.models.scan import Scan
from app.models.keyword import SuspiciousKeyword
from app.schemas.scan import URLScanRequest, ScanResponse
from app.auth.jwt import get_current_user
from app.services.url_scanner import URLScanner

router = APIRouter(prefix="/scan", tags=["Scanner"])

@router.post("", response_model=ScanResponse)
def perform_scan(request: URLScanRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Fetch keywords from DB
    keywords = db.query(SuspiciousKeyword).all()
    
    # Analyze URL
    scanner = URLScanner(db_keywords=keywords)
    result = scanner.analyze(request.url)
    details = result["details"]
    
    # Store in DB
    new_scan = Scan(
        user_id=current_user.id,
        url=request.url,
        https_status=details["https_status"],
        url_length=details["url_length"],
        ip_detected=details["ip_detected"],
        suspicious_keywords=",".join(details["suspicious_keywords_found"]) if details["suspicious_keywords_found"] else None,
        shortener_detected=details["shortener_detected"],
        risk_score=result["risk_score"],
        status=result["status"]
    )
    
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)
    
    return new_scan

@router.get("-history", response_model=List[ScanResponse])
def get_scan_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    scans = db.query(Scan).filter(Scan.user_id == current_user.id).order_by(Scan.scanned_at.desc()).all()
    return scans

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_scan(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    scan_query = db.query(Scan).filter(Scan.id == id, Scan.user_id == current_user.id)
    scan = scan_query.first()
    
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found or unauthorized")
        
    scan_query.delete(synchronize_session=False)
    db.commit()
    return {"message": "Scan deleted"}
