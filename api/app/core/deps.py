from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from pydantic import ValidationError
from typing import Generator, Optional
import logging

from app.db.database import get_db
from app.core.config import settings
from app.core.security import create_access_token
from app.models.user import User
from app.schemas.user import UserInDB

logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> User:
    logger.info(f"[AUTH] Token recibido: {token}")
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        logger.info(f"[AUTH] Payload decodificado: {payload}")
        user_id: str = payload.get("sub")
        if user_id is None:
            logger.warning("[AUTH] El payload no contiene 'sub'. Token inválido.")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except (JWTError, ValidationError) as e:
        logger.warning(f"[AUTH] Error decodificando token: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    logger.info(f"[AUTH] Usuario encontrado: {user.email if user else None}, activo: {getattr(user, 'is_active', None)}")
    if user is None:
        logger.warning(f"[AUTH] Usuario con id {user_id} no encontrado.")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    
    return user

def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    return current_user

def get_current_admin_user(current_user: User = Depends(get_current_user)) -> User:
    # Verificar si el usuario es admin, compatible con ambos modelos de User
    is_admin = False
    
    # Verificar si tiene atributo role
    if hasattr(current_user, 'role'):
        is_admin = current_user.role == "admin"
    # Verificar si tiene atributo is_admin
    elif hasattr(current_user, 'is_admin'):
        is_admin = current_user.is_admin
    logger.info(f"[AUTH] Usuario: {current_user.email}, is_admin: {is_admin}")
    
    if not is_admin:
        logger.warning(f"[AUTH] Usuario {current_user.email} no tiene permisos de admin.")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    return current_user
