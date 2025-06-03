from fastapi import APIRouter, Request, Depends, HTTPException, Form, Response
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from typing import Optional
from datetime import datetime, timedelta

from app.core.auth import create_access_token, get_password_hash, verify_password
from app.db.models import User
from app.db.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["Auth Web"])
templates = Jinja2Templates(directory="templates")

@router.get("/login")
async def login_page(request: Request, error: Optional[str] = None):
    """
    Página de inicio de sesión
    """
    return templates.TemplateResponse(
        "auth/login.html",
        {
            "request": request,
            "error": error
        }
    )

@router.post("/login")
async def login(
    request: Request,
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    remember: bool = Form(False),
    db: Session = Depends(get_db)
):
    """
    Procesar inicio de sesión
    """
    # Buscar usuario por email
    user = db.query(User).filter(User.email == username).first()
    
    # Verificar si el usuario existe y la contraseña es correcta
    if not user or not verify_password(password, user.hashed_password):
        return templates.TemplateResponse(
            "auth/login.html",
            {
                "request": request,
                "error": "Email o contraseña incorrectos"
            },
            status_code=401
        )
    
    # Crear token de acceso
    access_token_expires = timedelta(days=30 if remember else 1)
    access_token = create_access_token(
        data={"sub": user.email, "admin": user.is_admin},
        expires_delta=access_token_expires
    )
    
    # Redirigir según el rol del usuario
    redirect_url = "/admin" if user.is_admin else "/dashboard"
    response = RedirectResponse(url=redirect_url, status_code=303)
    
    # Establecer cookie con el token
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        max_age=30 * 24 * 60 * 60 if remember else 24 * 60 * 60,
        secure=False,
        samesite="lax"
    )
    
    return response

@router.get("/logout")
async def logout(response: Response):
    """
    Cerrar sesión
    """
    response = RedirectResponse(url="/auth/login")
    response.delete_cookie(key="access_token")
    return response

@router.get("/register")
async def register_page(request: Request):
    """
    Página de registro
    """
    return templates.TemplateResponse(
        "auth/register.html",
        {
            "request": request
        }
    )

@router.post("/register")
async def register(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    """
    Procesar registro de usuario
    """
    # Verificar si el email ya está registrado
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return templates.TemplateResponse(
            "auth/register.html",
            {
                "request": request,
                "error": "El email ya está registrado"
            },
            status_code=400
        )
    
    # Crear nuevo usuario
    hashed_password = get_password_hash(password)
    new_user = User(
        email=email,
        hashed_password=hashed_password,
        name=name,
        is_admin=False
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Crear token de acceso
    access_token = create_access_token(
        data={"sub": new_user.email, "admin": new_user.is_admin}
    )
    
    # Redirigir al dashboard
    response = RedirectResponse(url="/dashboard", status_code=303)
    
    # Establecer cookie con el token
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        max_age=24 * 60 * 60,
        secure=False,
        samesite="lax"
    )
    
    return response

@router.get("/forgot-password")
async def forgot_password_page(request: Request):
    """
    Página de recuperación de contraseña
    """
    return templates.TemplateResponse(
        "auth/forgot_password.html",
        {
            "request": request
        }
    )
