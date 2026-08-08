from sqlalchemy import Column, Integer, String
from app.database.database import Base

class SuspiciousKeyword(Base):
    __tablename__ = "suspicious_keywords"

    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String(100), unique=True, nullable=False)
