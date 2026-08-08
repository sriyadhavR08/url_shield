from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional

class URLScanRequest(BaseModel):
    url: str

class ScanResponse(BaseModel):
    id: int
    user_id: int
    url: str
    https_status: bool
    url_length: int
    ip_detected: bool
    suspicious_keywords: Optional[str] = None
    shortener_detected: bool
    risk_score: float
    status: str
    scanned_at: datetime

    class Config:
        from_attributes = True
