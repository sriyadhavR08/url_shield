from dotenv import load_dotenv
load_dotenv('backend/.env')

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.database.database import Base, engine, SessionLocal
from app.models.scan import Scan
from app.services.url_scanner import URLScanner

scanner = URLScanner(db_keywords=[])
result = scanner.analyze("http://free-login-update.com")
print("Analysis Result:", result)

# Check the database for scans
db = SessionLocal()
scans = db.query(Scan).order_by(Scan.id.desc()).limit(5).all()

for s in scans:
    print(f"ID: {s.id}, URL: {s.url}, Status: {s.status}, Keywords: {s.suspicious_keywords}")
