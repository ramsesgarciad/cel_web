import uvicorn
import os
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.db.init_db import init_db

def main():
    # Create uploads directory if it doesn't exist
    os.makedirs("./uploads", exist_ok=True)
    os.makedirs("./uploads/documents", exist_ok=True)
    os.makedirs("./uploads/models", exist_ok=True)
    
    # Initialize the database
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()
    
    # Run the FastAPI application
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
