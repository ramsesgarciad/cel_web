import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.routers import auth as auth_api, projects, tasks, updates, documents, users, models
from app.routers.web import admin, dashboard, auth as auth_web
from app.core.config import settings
from app.core.middleware import LoggingMiddleware
from app.core.template_middleware import AuthMiddleware
from app.db.database import SessionLocal
from app.db.init_db import init_db

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Caribbean Embedded Labs API",
    description="API for managing projects, tasks, users, and more",
    version="1.0.0",
)

# Configuramos CORS en FastAPI para permitir solicitudes desde el frontend
def setup_cors_middleware(app: FastAPI) -> None:
    origins = [
        "http://161.97.172.97:8000",      # El origen de tu panel de admin que causa el error
        "https://caribbeanembeddedlabs.com",  # El frontend de producción principal
        "https://www.caribbeanembeddedlabs.com", # A menudo se usa la variante www
        # Puedes añadir otros orígenes para desarrollo local si los necesitas, por ejemplo:
        # "http://localhost",
        # "http://localhost:3000", # Si usas un servidor de desarrollo de frontend en este puerto
        # "http://localhost:8000", # Si a veces accedes al admin localmente por este puerto
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True, # Necesario para cookies/autenticación
        allow_methods=["*"],    # Permite todos los métodos comunes
        allow_headers=["*"],    # Permite todos los encabezados comunes
        expose_headers=["Content-Disposition"], # Exponer solo headers específicos si es necesario, o ajustar
    )
    logger.info(f"CORS middleware configurado para permitir los siguientes orígenes: {origins}")

# Aplicamos la configuración de CORS
setup_cors_middleware(app)

# Agregar middlewares
app.add_middleware(LoggingMiddleware)
app.add_middleware(AuthMiddleware)

# Incluir routers API
app.include_router(auth_api.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(tasks.router, prefix="/api/projects", tags=["Tasks"])
app.include_router(updates.router, prefix="/api/projects", tags=["Updates"])
app.include_router(documents.router, prefix="/api/projects", tags=["Documents"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(models.router, prefix="/api/models", tags=["Models"])
# Incluir routers Web (Jinja2)
app.include_router(admin.router)
app.include_router(dashboard.router)
app.include_router(auth_web.router)

# Inicializar la base de datos al inicio
@app.on_event("startup")
async def startup_db_client():
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

# Montar archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configurar plantillas Jinja2
templates = Jinja2Templates(directory="templates")

# Ruta raíz que redirige a la página principal o al dashboard
@app.get("/", tags=["Root"])
async def root():
    # Redirigir a la página del dashboard para usuarios autenticados
    # o a la documentación de la API para desarrolladores
    return RedirectResponse(url="/dashboard")

@app.get("/api/health", tags=["Health"])
async def health_check():
    return JSONResponse(
        status_code=200,
        content={
            "status": "healthy"
        }
    )

logger.info("Starting FastAPI server")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
