from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
import logging

from app.db.database import get_db
from app.core.security import create_access_token, verify_password, get_password_hash
from app.core.config import settings
from app.models.user import User
from app.schemas.user import Token, User as UserSchema

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/login", response_model=Token)
async def login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Log request details for debugging
    logger.info(f"Login attempt for user: {form_data.username}")
    
    try:
        user = db.query(User).filter(User.email == form_data.username).first()
        if not user or not verify_password(form_data.password, user.hashed_password):
            logger.warning(f"Invalid credentials for user: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject=user.id, expires_delta=access_token_expires
        )
        
        logger.info(f"Successful login for user: {form_data.username}")
        
        # Convert SQLAlchemy model to dictionary for serialization
        user_data = {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "projects": []
        }
        
        # Return token and user info
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_data
        }
    except Exception as e:
        logger.error(f"Error during login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login error: {str(e)}",
        )

@router.post("/admin/login", response_model=Token)
async def admin_login(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Log request details for debugging
    logger.info(f"Admin login attempt for user: {form_data.username}")
    
    try:
        user = db.query(User).filter(User.email == form_data.username).first()
        if not user:
            logger.warning(f"User not found: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        if not verify_password(form_data.password, user.hashed_password):
            logger.warning(f"Invalid password for user: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        if user.role != "admin":
            logger.warning(f"Non-admin user attempting admin login: {form_data.username}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not an administrator",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            subject=user.id, expires_delta=access_token_expires
        )
        
        logger.info(f"Successful admin login for user: {form_data.username}")
        
        # Convert SQLAlchemy model to dictionary for serialization
        user_data = {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "projects": []
        }
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user_data
        }
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        logger.error(f"Error during admin login: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Login error: {str(e)}",
        )
