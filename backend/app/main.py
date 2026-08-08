from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import engine, Base
from app.routes import auth, scanner, dashboard, admin
from app.models.user import User
from app.utils.hashing import get_password_hash
from sqlalchemy.orm import Session

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="URLShield API",
    description="Backend API for URLShield Website Safety Checker",
    version="1.0.0"
)

import os

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite default frontend port
    "http://localhost:3000",  # CRA default frontend port
]

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(scanner.router)
app.include_router(dashboard.router)
app.include_router(admin.router)

@app.on_event("startup")
def create_initial_admin():
    db = Session(bind=engine)
    admin = db.query(User).filter(User.email == "admin@urlshield.com").first()
    if not admin:
        admin_user = User(
            full_name="System Administrator",
            email="admin@urlshield.com",
            password=get_password_hash("admin123"),
            role="admin"
        )
        db.add(admin_user)
        db.commit()
    db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to the URLShield API. Visit /docs for API documentation."}
