from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import logging

logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Request: {request.method} {request.url.path}")
        try:
            response = await call_next(request)
            logger.info(f"Response: {response.status_code}")
            return response
        except Exception as e:
            logger.error(f"Request error: {str(e)}")
            raise

def setup_cors_middleware(app: FastAPI) -> None:
    """
    Setup CORS middleware for the FastAPI application.
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allow all origins in development
        allow_credentials=True,
        allow_methods=["*"],  # Allow all methods
        allow_headers=["*"],  # Allow all headers
        expose_headers=["*"],  # Expose all headers
    )
    
    # Add logging middleware
    app.add_middleware(LoggingMiddleware)
    
    logger.info("CORS middleware configured with allow_origins=['*']")
