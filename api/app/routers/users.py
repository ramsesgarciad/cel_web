import logging
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List
from fastapi.responses import JSONResponse

from app.db.database import get_db
from app.core.deps import get_current_user, get_current_admin_user
from app.core.security import get_password_hash
from app.models.user import User
from app.models.project import Project
from app.schemas.user import User as UserSchema, UserCreate, UserUpdate, UserList

logger = logging.getLogger(__name__)

router = APIRouter()

# Función auxiliar para agregar encabezados CORS a las respuestas
def add_cors_headers(response, request=None):
    # Lista de orígenes permitidos (debe coincidir con la configuración en main.py)
    allowed_origins = [
        "http://161.97.172.97:8000",      # El origen del panel de admin
        "https://caribbeanembeddedlabs.com",  # Frontend de producción
        "https://www.caribbeanembeddedlabs.com",
    ]
    
    # Si tenemos el request, usar el origen de la solicitud si está en la lista permitida
    if request and request.headers.get("origin") in allowed_origins:
        response.headers["Access-Control-Allow-Origin"] = request.headers.get("origin")
    else:
        # Por defecto, permitir el origen del panel admin
        response.headers["Access-Control-Allow-Origin"] = "http://161.97.172.97:8000"
    
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

@router.get("/me", response_model=UserSchema)
async def read_users_me(
    current_user: User = Depends(get_current_user),
    request: Request = None
):
    # CORREGIDO: Convertir el objeto User a dict antes de JSONResponse
    user_dict = {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role if hasattr(current_user, 'role') else ("admin" if hasattr(current_user, 'is_admin') and current_user.is_admin else "client"),
        "projects": [str(p.id) for p in current_user.projects] if hasattr(current_user, 'projects') and current_user.projects else []
    }
    response = JSONResponse(content=user_dict)
    return add_cors_headers(response, request)

@router.get("", response_model=List[UserList])
@router.get("/", response_model=List[UserList])
async def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
    request: Request = None,
):
    logger.info(f"Attempting to read users. Skip: {skip}, Limit: {limit}. Admin user: {current_user.email if current_user else 'No current_user'}")
    try:
        users_query = db.query(User)
        logger.debug("Successfully created users query object.")
        
        users = users_query.offset(skip).limit(limit).all()
        logger.info(f"Successfully fetched {len(users)} users from DB.")
        
        # Convertir los usuarios a diccionarios para la respuesta JSON
        user_list = []
        for user in users:
            user_dict = {
                "id": str(user.id),  # Convertir explícitamente a string
                "name": user.name,
                "email": user.email,
                "role": user.role if hasattr(user, 'role') else ("admin" if hasattr(user, 'is_admin') and user.is_admin else "client"),
                "projects_count": user.projects_count if hasattr(user, 'projects_count') else len(user.projects) if hasattr(user, 'projects') else 0
            }
            user_list.append(user_dict)
            logger.debug(f"User processed: {user_dict['id']}, {user_dict['email']}")
        
        # Crear una respuesta JSON con los encabezados CORS
        response = JSONResponse(content=user_list)
        return add_cors_headers(response, request)
    except Exception as e:
        logger.error(f"Error in read_users endpoint: {str(e)}", exc_info=True)
        response = JSONResponse(
            status_code=500,
            content={"detail": "Internal server error while reading users."}
        )
        return add_cors_headers(response, request)

@router.get("/{user_id}", response_model=None)
async def read_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
    request: Request = None,
):
    logger.info(f"Attempting to read user with ID: {user_id}. Admin user: {current_user.email if current_user else 'No current_user'}")
    try:
        db_user = db.query(User).filter(User.id == int(user_id)).first()
        if db_user is None:
            logger.warning(f"User with ID {user_id} not found.")
            response = JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"detail": "User not found"}
            )
            return add_cors_headers(response, request)
        
        logger.info(f"Successfully fetched user {db_user.email} (ID: {db_user.id}) from DB.")
        
        # Convertir el usuario a un diccionario para la respuesta JSON
        user_dict = {
            "id": str(db_user.id),  # Convertir explícitamente a string
            "name": db_user.name,
            "email": db_user.email,
            "role": db_user.role if hasattr(db_user, 'role') else ("admin" if hasattr(db_user, 'is_admin') and db_user.is_admin else "client"),
            "projects": [
                {"id": str(p.id), "name": p.name} for p in db_user.projects
            ] if hasattr(db_user, 'projects') and db_user.projects else []
        }
        
        # Crear una respuesta JSON con los encabezados CORS
        response = JSONResponse(content=user_dict)
        return add_cors_headers(response, request)
    except ValueError:
        logger.error(f"Invalid user ID format: {user_id}", exc_info=True)
        response = JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": "Invalid user ID format"}
        )
        return add_cors_headers(response, request)
    except Exception as e:
        logger.error(f"Error in read_user endpoint for ID {user_id}: {str(e)}", exc_info=True)
        response = JSONResponse(
            status_code=500,
            content={"detail": "Internal server error while reading user."}
        )
        return add_cors_headers(response, request)

@router.post("", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def create_user(
    user_in: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
    request: Request = None
):
    logger.info(f"Attempting to create user: {user_in.email}. Admin user: {current_user.email if current_user else 'No current_user'}")
    try:
        existing_user = db.query(User).filter(User.email == user_in.email).first()
        if existing_user:
            logger.warning(f"User with email {user_in.email} already exists.")
            # CORREGIDO: Usar raise HTTPException en lugar de JSONResponse para preservar el manejo de errores
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The user with this email already exists in the system"
            )
        
        logger.debug(f"User {user_in.email} does not exist. Proceeding with creation.")
        hashed_password = get_password_hash(user_in.password)
        logger.debug(f"Password hashed for {user_in.email}.")
        
        # Verificar qué campos tiene el modelo User
        if hasattr(User, 'role'):
            db_user_data = {
                "name": user_in.name,
                "email": user_in.email,
                "hashed_password": hashed_password,
                "role": user_in.role
            }
        else:
            # Si no tiene role, usar is_admin
            is_admin = user_in.role == "admin" if hasattr(user_in, 'role') else False
            db_user_data = {
                "name": user_in.name,
                "email": user_in.email,
                "hashed_password": hashed_password,
                "is_admin": is_admin
            }
            
        db_user = User(**db_user_data)
        logger.debug(f"User object created for {user_in.email} with data: {db_user_data}")

        # Add projects if provided
        if hasattr(user_in, 'projects') and user_in.projects:  # CORREGIDO: Verificar que el atributo existe
            logger.info(f"Assigning projects to {user_in.email}: {user_in.projects}")
            projects_to_assign = db.query(Project).filter(Project.id.in_(user_in.projects)).all()
            db_user.projects = projects_to_assign # Assigns the actual Project objects
            logger.info(f"Assigned {len(projects_to_assign)} projects to {user_in.email}.")
        else:
            logger.debug(f"No projects to assign for {user_in.email} based on input.")
            
        db.add(db_user)
        logger.debug(f"User {user_in.email} added to session.")
        db.commit()
        logger.info(f"Committed user {user_in.email} to DB.")
        db.refresh(db_user)
        logger.info(f"Refreshed user {user_in.email} from DB. ID: {db_user.id}")
        
        # Convertir el usuario a un diccionario para la respuesta JSON
        user_dict = {
            "id": str(db_user.id),  # Convertir explícitamente a string
            "name": db_user.name,
            "email": db_user.email,
            "role": db_user.role if hasattr(db_user, 'role') else ("admin" if hasattr(db_user, 'is_admin') and db_user.is_admin else "client"),
            "projects": [str(p.id) for p in db_user.projects] if hasattr(db_user, 'projects') and db_user.projects else []
        }
        
        # CORREGIDO: Usar return directo con el dict, FastAPI se encarga de la serialización
        return user_dict
        
    except HTTPException: # Re-raise HTTPExceptions to preserve status code and detail
        raise
    except Exception as e:
        logger.error(f"Error in create_user endpoint for {user_in.email}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Internal server error while creating user."
        )

@router.put("/{user_id}", response_model=UserSchema)
@router.put("/{user_id}/", response_model=UserSchema)
async def update_user(
    user_id: str,
    user_in: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
    request: Request = None
):
    try:
        # CORREGIDO: Convertir user_id a int para la consulta
        user = db.query(User).filter(User.id == int(user_id)).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        update_data = user_in.dict(exclude_unset=True)
        
        if "password" in update_data and update_data["password"]:
            update_data["hashed_password"] = get_password_hash(update_data["password"])
            del update_data["password"]
            
        # Manejar el campo role si existe
        if "role" in update_data and hasattr(user, 'is_admin') and not hasattr(user, 'role'):
            # Convertir role a is_admin
            update_data["is_admin"] = update_data["role"] == "admin"
            del update_data["role"]
            
        for field, value in update_data.items():
            if hasattr(user, field):
                setattr(user, field, value)
                
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Convertir el usuario a un diccionario para la respuesta JSON
        user_dict = {
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "role": user.role if hasattr(user, 'role') else ("admin" if hasattr(user, 'is_admin') and user.is_admin else "client"),
            "projects": [str(p.id) for p in user.projects] if hasattr(user, 'projects') and user.projects else []
        }
        
        return user_dict
        
    except HTTPException:
        raise
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    except Exception as e:
        logger.error(f"Error updating user {user_id}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error updating user: {str(e)}"
        )

@router.delete("/{user_id}", response_model=dict)
@router.delete("/{user_id}/", response_model=dict)
async def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
    request: Request = None
):
    try:
        # CORREGIDO: Convertir user_id a int para la consulta
        user = db.query(User).filter(User.id == int(user_id)).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
            
        db.delete(user)
        db.commit()
        
        return {"detail": "User deleted successfully"}
        
    except HTTPException:
        raise
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format"
        )
    except Exception as e:
        logger.error(f"Error deleting user {user_id}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting user: {str(e)}"
        )

# NUEVO: Endpoint OPTIONS para manejar preflight requests
@router.options("")
@router.options("/")
async def options_users(request: Request = None):
    response = JSONResponse(content={})
    return add_cors_headers(response, request)

@router.options("/{user_id}")
@router.options("/{user_id}/")
async def options_user_by_id(user_id: str, request: Request = None):
    response = JSONResponse(content={})
    return add_cors_headers(response, request)