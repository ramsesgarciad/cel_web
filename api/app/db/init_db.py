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
        name="Sistema de Control Industrial",
        client="Industrias XYZ",
        description="Desarrollo de un sistema de control industrial para automatizar procesos de manufactura",
        start_date=now - timedelta(days=60),
        end_date=now + timedelta(days=120),
        progress=65
    )
    project1.users.append(admin_user)
    project1.users.append(regular_user)
    db.add(project1)
    
    # Project 2: Monitoreo Remoto de Equipos
    project2 = Project(
        name="Monitoreo Remoto de Equipos",
        client="Empresa ABC",
        description="Sistema de monitoreo remoto para equipos industriales con alertas en tiempo real",
        start_date=now - timedelta(days=30),
        end_date=now + timedelta(days=90),
        progress=25
    )
    project2.users.append(admin_user)
    db.add(project2)
    
    # Proyecto Demo para clientes (QZT024)
    project_demo = Project(
        name="QZT024 - Sistema de Monitoreo Ambiental",
        client="Cliente Demo",
        description="Desarrollo de un sistema de monitoreo ambiental con sensores de temperatura, humedad y calidad del aire. Incluye diseño de PCB, firmware y conectividad IoT.",
        start_date=now - timedelta(days=30),
        end_date=now + timedelta(days=60),
        progress=35  # Progreso del 35% como se muestra en la imagen
    )
    # Asignar al usuario cliente para que pueda verlo en su dashboard
    project_demo.users.append(client_user)
    db.add(project_demo)
    
    # Project 4: Sistema de Seguridad Inteligente
    project4 = Project(
        name="Sistema de Seguridad Inteligente",
        client="Seguridad Total",
        description="Sistema de seguridad con reconocimiento facial y detección de intrusos",
        start_date=now - timedelta(days=90),
        end_date=now - timedelta(days=10),
        progress=100
    )
    project4.users.append(admin_user)
    db.add(project4)
    
    # Add tasks to projects
    # Project 1 tasks
    tasks1 = [
        Task(
            name="Análisis de requisitos",
            status="completed",
            start_date=now - timedelta(days=60),
            end_date=now - timedelta(days=50),
            duration="10 días",
            percent_done=100,
            project_id=project1.id
        ),
        Task(
            name="Diseño de arquitectura",
            status="completed",
            start_date=now - timedelta(days=50),
            end_date=now - timedelta(days=40),
            duration="10 días",
            percent_done=100,
            project_id=project1.id
        ),
        Task(
            name="Implementación de controladores",
            status="completed",
            start_date=now - timedelta(days=40),
            end_date=now - timedelta(days=20),
            duration="20 días",
            percent_done=100,
            project_id=project1.id
        ),
        Task(
            name="Desarrollo de interfaz",
            status="in_progress",
            start_date=now - timedelta(days=20),
            end_date=now + timedelta(days=10),
            duration="30 días",
            percent_done=60,
            project_id=project1.id
        ),
        Task(
            name="Pruebas de integración",
            status="pending",
            start_date=now + timedelta(days=10),
            end_date=now + timedelta(days=30),
            duration="20 días",
            percent_done=0,
            project_id=project1.id
        )
    ]
    
    # Project 2 tasks
    tasks2 = [
        Task(
            name="Configuración de sensores",
            status="completed",
            start_date=now - timedelta(days=30),
            end_date=now - timedelta(days=20),
            duration="10 días",
            percent_done=100,
            project_id=project2.id
        ),
        Task(
            name="Desarrollo de API",
            status="in_progress",
            start_date=now - timedelta(days=20),
            end_date=now + timedelta(days=10),
            duration="30 días",
            percent_done=40,
            project_id=project2.id
        ),
        Task(
            name="Sistema de alertas",
            status="pending",
            start_date=now + timedelta(days=10),
            end_date=now + timedelta(days=30),
            duration="20 días",
            percent_done=0,
            project_id=project2.id
        )
    ]
    
    # Tareas para el proyecto demo (QZT024) - Coinciden con la imagen del dashboard
    tasks_demo = [
        Task(
            name="Definición de requerimientos",
            status="completed",
            start_date=now - timedelta(days=30),
            end_date=now - timedelta(days=20),
            duration="10 días",
            percent_done=100,
            color="#3b82f6",
            project_id=project_demo.id
        ),
        Task(
            name="Diseño inicial del PCB",
            status="completed",
            start_date=now - timedelta(days=20),
            end_date=now - timedelta(days=10),
            duration="10 días",
            percent_done=100,
            color="#ef4444",
            project_id=project_demo.id
        ),
        Task(
            name="Revisión del diseño",
            status="completed",
            start_date=now - timedelta(days=10),
            end_date=now - timedelta(days=5),
            duration="5 días",
            percent_done=100,
            color="#f97316",
            project_id=project_demo.id
        ),
        Task(
            name="Selección de componentes",
            status="in_progress",
            start_date=now - timedelta(days=5),
            end_date=now + timedelta(days=5),
            duration="10 días",
            percent_done=60,
            color="#f97316",
            project_id=project_demo.id
        ),
        Task(
            name="Desarrollo de firmware",
            status="pending",
            start_date=now + timedelta(days=5),
            end_date=now + timedelta(days=15),
            duration="10 días",
            percent_done=0,
            color="#eab308",
            project_id=project_demo.id
        ),
        Task(
            name="Fabricación de PCB",
            status="pending",
            start_date=now + timedelta(days=15),
            end_date=now + timedelta(days=25),
            duration="10 días",
            percent_done=0,
            color="#22c55e",
            project_id=project_demo.id
        ),
        Task(
            name="Ensamblaje y soldadura",
            status="pending",
            start_date=now + timedelta(days=25),
            end_date=now + timedelta(days=35),
            duration="10 días",
            percent_done=0,
            color="#a855f7",
            project_id=project_demo.id
        ),
        Task(
            name="Pruebas iniciales",
            status="pending",
            start_date=now + timedelta(days=35),
            end_date=now + timedelta(days=45),
            duration="10 días",
            percent_done=0,
            color="#a855f7",
            project_id=project_demo.id
        ),
        Task(
            name="Validación completa",
            status="pending",
            start_date=now + timedelta(days=45),
            end_date=now + timedelta(days=55),
            duration="10 días",
            percent_done=0,
            color="#a855f7",
            project_id=project_demo.id
        ),
        Task(
            name="Entrega final",
            status="pending",
            start_date=now + timedelta(days=55),
            end_date=now + timedelta(days=60),
            duration="5 días",
            percent_done=0,
            color="#a855f7",
            project_id=project_demo.id
        )
    ]
    
    # Actualizaciones para el proyecto demo
    updates_demo = [
        Update(
            content="Se ha completado la definición de requerimientos del proyecto.",
            date=now - timedelta(days=20),
            completed=True,
            created_at=now - timedelta(days=20),
            project_id=project_demo.id
        ),
        Update(
            content="Diseño inicial del PCB completado. Se adjuntan los esquemáticos preliminares.",
            date=now - timedelta(days=15),
            completed=True,
            created_at=now - timedelta(days=15),
            project_id=project_demo.id
        ),
        Update(
            content="Revisión técnica del diseño completada. Se han identificado mejoras menores que serán implementadas.",
            date=now - timedelta(days=10),
            completed=True,
            created_at=now - timedelta(days=10),
            project_id=project_demo.id
        ),
        Update(
            content="Se ha iniciado la selección de componentes. Algunos componentes críticos ya han sido adquiridos.",
            date=now - timedelta(days=5),
            completed=False,
            created_at=now - timedelta(days=5),
            project_id=project_demo.id
        )
    ]
    
    # Documentos para el proyecto demo
    documents_demo = [
        Document(
            name="Especificaciones del Producto.pdf",
            filename="especificaciones_producto.pdf",
            type="technical",
            url="/uploads/documents/especificaciones_producto.pdf",
            size="2.5 MB",
            project_id=project_demo.id
        ),
        Document(
            name="Esquemático del Circuito.pdf",
            filename="esquematico_circuito.pdf",
            type="technical",
            url="/uploads/documents/esquematico_circuito.pdf",
            size="1.8 MB",
            project_id=project_demo.id
        ),
        Document(
            name="Manual de Usuario.pdf",
            filename="manual_usuario.pdf",
            type="report",
            url="/uploads/documents/manual_usuario.pdf",
            size="3.2 MB",
            project_id=project_demo.id
        ),
        Document(
            name="Análisis Térmico.pdf",
            filename="analisis_termico.pdf",
            type="technical",
            url="/uploads/documents/analisis_termico.pdf",
            size="4.1 MB",
            project_id=project_demo.id
        ),
        Document(
            name="Especificación del Firmware.pdf",
            filename="especificacion_firmware.pdf",
            type="technical",
            url="/uploads/documents/especificacion_firmware.pdf",
            size="1.5 MB",
            project_id=project_demo.id
        ),
        Document(
            name="Guía de Actualización.pdf",
            filename="guia_actualizacion.pdf",
            type="report",
            url="/uploads/documents/guia_actualizacion.pdf",
            size="1.2 MB",
            project_id=project_demo.id
        ),
        Document(
            name="Changelog v1.2.3.pdf",
            filename="changelog_v123.pdf",
            type="report",
            url="/uploads/documents/changelog_v123.pdf",
            size="0.8 MB",
            project_id=project_demo.id
        ),
        Document(
            name="Diagrama de Conexiones.pdf",
            filename="diagrama_conexiones.pdf",
            type="technical",
            url="/uploads/documents/diagrama_conexiones.pdf",
            size="1.7 MB",
            project_id=project_demo.id
        )
    ]
    
    # Modelo 3D para el proyecto demo
    model3d_demo = Model3D(
        name="PCB Sistema de Monitoreo Ambiental",
        type="pcb",
        description="Modelo 3D del PCB para el sistema de monitoreo ambiental",
        url="/uploads/models/pcb_monitoreo_ambiental.stl",
        format="stl",
        size="2.3 MB",
        project_id=project_demo.id
    )
    
    # Add all tasks, updates, documents and models
    for task in tasks1 + tasks2 + tasks_demo:
        db.add(task)
        
    for update in updates_demo:
        db.add(update)
        
    for document in documents_demo:
        db.add(document)
        
    db.add(model3d_demo)
    
    # Commit changes
    db.commit()
    logger.info("Created example projects with tasks")
