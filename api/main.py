import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse, RedirectResponse

from app.routers import auth, projects, tasks, updates, documents, users, models
from app.core.config import settings
from app.core.middleware import LoggingMiddleware
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

def setup_cors_middleware(app: FastAPI) -> None:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3002", "http://127.0.0.1:3002"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

setup_cors_middleware(app)

# Agregar middleware de logging
app.add_middleware(LoggingMiddleware)

# Incluir routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(tasks.router, prefix="/api/projects", tags=["Tasks"])
app.include_router(updates.router, prefix="/api/projects", tags=["Updates"])
app.include_router(documents.router, prefix="/api/projects", tags=["Documents"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(models.router, prefix="/api/models", tags=["Models"])

# Inicializar la base de datos al inicio
@app.on_event("startup")
async def startup_db_client():
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

@app.get("/", tags=["Root"])
async def root():
    return RedirectResponse(url="/docs")

@app.get("/api/health", tags=["Health"])
async def health_check():
    return JSONResponse(
        status_code=200,
        content={
            "status": "healthy",
            "version": settings.VERSION,
            "environment": settings.ENVIRONMENT
        }
    )

logger.info("Starting FastAPI server")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
