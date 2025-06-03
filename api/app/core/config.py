from typing import List
import os
from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    # API settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Project Management API"
    
    # Security settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-for-jwt")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # CORS settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",  # NextJS frontend
        "http://127.0.0.1:3000",  # NextJS frontend alternative URL
        "http://localhost:8000",  # FastAPI backend
        "http://localhost:3001",  # NextJS frontend (puerto alternativo)
        "http://127.0.0.1:3001",  # NextJS frontend (puerto alternativo)
        "https://caribbeanembeddedlabs.com",  # Dominio de producción
        "https://www.caribbeanembeddedlabs.com",  # Dominio de producción con www
        "*",  # Allow all origins (for development only)
    ]
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")
    
    # File storage settings
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./uploads")
    MAX_UPLOAD_SIZE: int = 50 * 1024 * 1024  # 50 MB

settings = Settings()
