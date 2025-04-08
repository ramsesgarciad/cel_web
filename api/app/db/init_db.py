from sqlalchemy.orm import Session
from app.core.security import get_password_hash
from app.db.database import Base, engine
from app.models import User, Project, Task, Update, Document, Model3D
import logging
import uuid
from datetime import datetime, timedelta

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Check if we already have users
    user = db.query(User).first()
    if user:
        # Check if we already have projects
        project = db.query(Project).first()
        if project:
            logger.info("Database already initialized with projects, skipping")
            return
        else:
            logger.info("Users exist but no projects found, creating example projects")
            create_example_projects(db)
            return
    
    # Create admin user
    admin_user = User(
        name="Admin User",
        email="admin@example.com",
        hashed_password=get_password_hash("admin123"),
        role="admin"
    )
    db.add(admin_user)
    
    # Create regular user
    regular_user = User(
        name="Regular User",
        email="user@example.com",
        hashed_password=get_password_hash("user123"),
        role="user"
    )
    db.add(regular_user)
    
    # Create client user
    client_user = User(
        name="Client User",
        email="client@example.com",
        hashed_password=get_password_hash("client123"),
        role="client"
    )
    db.add(client_user)
    
    db.commit()
    logger.info("Database initialized with default users")
    
    # Create example projects
    create_example_projects(db)

def create_example_projects(db: Session) -> None:
    """Create example projects in the database"""
    
    # Get users
    admin_user = db.query(User).filter(User.email == "admin@example.com").first()
    regular_user = db.query(User).filter(User.email == "user@example.com").first()
    client_user = db.query(User).filter(User.email == "client@example.com").first()
    
    if not admin_user or not regular_user or not client_user:
        logger.error("Users not found, cannot create example projects")
        return
    
    # Current date for reference
    now = datetime.now()
    
    # Project 1: Sistema de Control Industrial
    project1 = Project(
        id=str(uuid.uuid4()),
        name="Sistema de Control Industrial",
        client="Industrias XYZ",
        description="Desarrollo de un sistema de control industrial para automatizar procesos de manufactura",
        start_date=now - timedelta(days=60),
        end_date=now + timedelta(days=120),
        progress=65,
        status="in-progress"
    )
    project1.users.append(admin_user)
    project1.users.append(regular_user)
    db.add(project1)
    
    # Project 2: Monitoreo Remoto de Equipos
    project2 = Project(
        id=str(uuid.uuid4()),
        name="Monitoreo Remoto de Equipos",
        client="Empresa ABC",
        description="Sistema de monitoreo remoto para equipos industriales con alertas en tiempo real",
        start_date=now - timedelta(days=30),
        end_date=now + timedelta(days=90),
        progress=25,
        status="in-progress"
    )
    project2.users.append(admin_user)
    db.add(project2)
    
    # Project 3: Plataforma IoT para Agricultura
    project3 = Project(
        id=str(uuid.uuid4()),
        name="Plataforma IoT para Agricultura",
        client="AgroTech S.A.",
        description="Desarrollo de una plataforma IoT para monitoreo y control de cultivos",
        start_date=now - timedelta(days=15),
        end_date=now + timedelta(days=180),
        progress=10,
        status="in-progress"
    )
    project3.users.append(admin_user)
    project3.users.append(regular_user)
    project3.users.append(client_user)
    db.add(project3)
    
    # Project 4: Sistema de Seguridad Inteligente
    project4 = Project(
        id=str(uuid.uuid4()),
        name="Sistema de Seguridad Inteligente",
        client="Seguridad Total",
        description="Sistema de seguridad con reconocimiento facial y detección de intrusos",
        start_date=now - timedelta(days=90),
        end_date=now - timedelta(days=10),
        progress=100,
        status="completed"
    )
    project4.users.append(admin_user)
    db.add(project4)
    
    # Add tasks to projects
    # Project 1 tasks
    tasks1 = [
        Task(
            name="Análisis de requisitos",
            description="Definir los requisitos del sistema con el cliente",
            completed=True,
            project_id=project1.id
        ),
        Task(
            name="Diseño de arquitectura",
            description="Diseñar la arquitectura del sistema de control",
            completed=True,
            project_id=project1.id
        ),
        Task(
            name="Implementación de controladores",
            description="Programar los controladores para los diferentes dispositivos",
            completed=True,
            project_id=project1.id
        ),
        Task(
            name="Desarrollo de interfaz",
            description="Crear la interfaz de usuario para el sistema",
            completed=False,
            project_id=project1.id
        ),
        Task(
            name="Pruebas de integración",
            description="Realizar pruebas de integración del sistema completo",
            completed=False,
            project_id=project1.id
        )
    ]
    
    # Project 2 tasks
    tasks2 = [
        Task(
            name="Configuración de sensores",
            description="Configurar los sensores para el monitoreo remoto",
            completed=True,
            project_id=project2.id
        ),
        Task(
            name="Desarrollo de API",
            description="Crear la API para la comunicación con los equipos",
            completed=False,
            project_id=project2.id
        ),
        Task(
            name="Sistema de alertas",
            description="Implementar el sistema de alertas en tiempo real",
            completed=False,
            project_id=project2.id
        )
    ]
    
    # Add all tasks
    for task in tasks1 + tasks2:
        db.add(task)
    
    # Commit changes
    db.commit()
    logger.info("Created example projects with tasks")
