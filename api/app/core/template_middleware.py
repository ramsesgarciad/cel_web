from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response, RedirectResponse
from fastapi import status
from jose import JWTError, jwt
import logging
from app.core.auth import SECRET_KEY, ALGORITHM
from app.db.database import SessionLocal
from app.db.models import User

logger = logging.getLogger(__name__)

class AuthMiddleware(BaseHTTPMiddleware):
    """
    Middleware para verificar la autenticación en las rutas web que requieren autenticación.
    Redirige al login si el usuario no está autenticado.
    """
    
    async def dispatch(self, request: Request, call_next):
        # Rutas que no requieren autenticación
        public_paths = [
            "/auth/login", 
            "/auth/register", 
            "/auth/forgot-password",
            "/static",
            "/api",
            "/docs",
            "/redoc",
            "/openapi.json"
        ]
        
        # Verificar si la ruta es pública
        path = request.url.path
        if any(path.startswith(public_path) for public_path in public_paths):
            return await call_next(request)
        
        # Verificar token de autenticación
        token = self._get_token_from_cookie_or_header(request)
        if not token:
            # Si la ruta es de administración o dashboard, redirigir al login
            if path.startswith("/admin") or path.startswith("/dashboard"):
                return RedirectResponse(url="/auth/login", status_code=status.HTTP_303_SEE_OTHER)
            
            # Para otras rutas, continuar con la solicitud
            return await call_next(request)
        
        # Verificar si el token es válido
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            email = payload.get("sub")
            is_admin = payload.get("admin", False)
            
            # Verificar si el usuario existe en la base de datos
            db = SessionLocal()
            try:
                user = db.query(User).filter(User.email == email).first()
                if not user or not user.is_active:
                    # Si el usuario no existe o no está activo, redirigir al login
                    return RedirectResponse(url="/auth/login", status_code=status.HTTP_303_SEE_OTHER)
                
                # Verificar permisos de administrador para rutas de administración
                if path.startswith("/admin") and not user.is_admin:
                    return RedirectResponse(url="/dashboard", status_code=status.HTTP_303_SEE_OTHER)
                
            finally:
                db.close()
                
        except JWTError:
            # Si el token no es válido, redirigir al login
            if path.startswith("/admin") or path.startswith("/dashboard"):
                return RedirectResponse(url="/auth/login", status_code=status.HTTP_303_SEE_OTHER)
        
        # Continuar con la solicitud
        return await call_next(request)
    
    def _get_token_from_cookie_or_header(self, request: Request):
        """Obtiene el token de autenticación de la cookie o del header."""
        # Verificar en cookies
        if "access_token" in request.cookies:
            token = request.cookies.get("access_token")
            if token and token.startswith("Bearer "):
                return token.replace("Bearer ", "")
        
        # Verificar en headers
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            return auth_header.replace("Bearer ", "")
        
        return None
