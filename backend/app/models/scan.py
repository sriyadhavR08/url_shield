from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.database import Base

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    url = Column(String(2048), nullable=False)
    https_status = Column(Boolean, default=False)
    url_length = Column(Integer, nullable=False)
    ip_detected = Column(Boolean, default=False)
    suspicious_keywords = Column(String(500), nullable=True)
    shortener_detected = Column(Boolean, default=False)
    risk_score = Column(Float, nullable=False)
    status = Column(String(50), nullable=False)
    scanned_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="scans")
