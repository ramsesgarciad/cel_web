'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import ProgressCircle from '@/components/ProgressCircle';
import { projectsApi } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  FileText,
  Check,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  FileType,
  File3d,
  Clipboard
} from 'lucide-react';

export default function DashboardPage() {
  // Todos los hooks deben ir al principio
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [model3d, setModel3d] = useState(null);
  const [responsable, setResponsable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingProject, setLoadingProject] = useState(false);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  // Tareas de ejemplo para el proyecto de demostración
  const demoTasks = [
    { id: 1, name: 'Definición de requerimientos', status: 'completed', progress: 100, start_date: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() - 20 * 24 * 60 * 60 * 1000) },
    { id: 2, name: 'Diseño inicial del PCB', status: 'completed', progress: 100, start_date: new Date(new Date().getTime() - 20 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000) },
    { id: 3, name: 'Revisión del diseño', status: 'completed', progress: 100, start_date: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000) },
    { id: 4, name: 'Selección de componentes', status: 'in_progress', progress: 60, start_date: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000) },
    { id: 5, name: 'Desarrollo de firmware', status: 'pending', progress: 0, start_date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000) },
    { id: 6, name: 'Fabricación de PCB', status: 'pending', progress: 0, start_date: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() + 25 * 24 * 60 * 60 * 1000) },
    { id: 7, name: 'Ensamblaje y soldadura', status: 'pending', progress: 0, start_date: new Date(new Date().getTime() + 25 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() + 35 * 24 * 60 * 60 * 1000) },
    { id: 8, name: 'Pruebas iniciales', status: 'pending', progress: 0, start_date: new Date(new Date().getTime() + 35 * 24 * 60 * 60 * 1000), end_date: new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000) },
  ];

  // Actualizaciones de ejemplo
  const demoUpdates = [
    { id: 1, content: 'Se ha completado la definición de requerimientos del proyecto.', date: new Date(new Date().getTime() - 20 * 24 * 60 * 60 * 1000), completed: true },
    { id: 2, content: 'Diseño inicial del PCB completado. Se adjuntan los esquemáticos preliminares.', date: new Date(new Date().getTime() - 15 * 24 * 60 * 60 * 1000), completed: true },
    { id: 3, content: 'Revisión técnica del diseño completada. Se han identificado mejoras menores que serán implementadas.', date: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000), completed: true }
  ];

  // Documentos de ejemplo
  const demoDocuments = [
    { id: 1, name: 'Especificaciones Técnicas V1.2.pdf', url: '#', type: 'pdf', size: '1.2MB' },
    { id: 2, name: 'Manual de Usuario Preliminar.pdf', url: '#', type: 'pdf', size: '850KB' },
    { id: 3, name: 'Diagrama de Flujo del Sistema.png', url: '#', type: 'image', size: '300KB' },
  ];

  // Modelo 3D de ejemplo
  const demoModel3d = {
    url: 'https://sketchfab.com/models/YOUR_MODEL_ID/embed?autostart=1&ui_theme=dark',
    name: 'Vista Previa del Encapsulado'
  };

  // Responsable de ejemplo
  const demoResponsable = {
    name: 'Ing. Laura Méndez',
    email: 'laura.mendez@example.com'
  };

  // Datos de ejemplo para el cliente de demostración
  const demoProject = {
    id: '1',
    name: 'QZT024 - Sistema de Monitoreo Ambiental',
    client: 'Cliente Demo',
    description: 'Desarrollo de un sistema de monitoreo ambiental con sensores de temperatura, humedad y calidad del aire. Incluye diseño de PCB, firmware y conectividad IoT.',
    start_date: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end_date: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    progress: 35,
    status: 'En progreso',
    tasks: demoTasks,
    updates: demoUpdates,
    documents: demoDocuments,
    model3d: demoModel3d,
    responsable: demoResponsable
  };

  // Función para cargar los detalles de un proyecto específico
  const loadProjectDetails = async (projectId) => {
    if (!projectId) return;
    
    try {
      setLoadingProject(true);
      setError('');
      
      // Para proyectos demo, buscar en la lista de proyectos demo
      if (user.email === 'client@example.com') {
        const selectedDemoProject = demoProjects.find(p => p.id.toString() === projectId.toString());
        if (selectedDemoProject) {
          setProject(selectedDemoProject);
          setTasks(selectedDemoProject.tasks || demoTasks);
          setUpdates(selectedDemoProject.updates || demoUpdates);
          setDocuments(selectedDemoProject.documents || demoDocuments);
          setModel3d(selectedDemoProject.model3d || demoModel3d);
          setResponsable(selectedDemoProject.responsable || demoResponsable);
          setLoadingProject(false);
          return;
        }
      }
      
      // Para proyectos reales, buscar en la lista que ya tenemos
      const selectedProject = projects.find(p => p.id.toString() === projectId.toString());
      if (!selectedProject) {
        setError('Proyecto no encontrado');
        setLoadingProject(false);
        return;
      }
      
      setProject(selectedProject);
      
      // Obtener tareas del proyecto
      try {
        const projectTasks = await projectsApi.tasks.getByProjectId(projectId);
        console.log('Tareas obtenidas del API:', projectTasks);
        setTasks(projectTasks || []);
      } catch (taskErr) {
        console.error('Error al obtener tareas:', taskErr);
        // Usar tareas del proyecto si existen
        setTasks(selectedProject.tasks || []);
      }
      
      // Obtener actualizaciones del proyecto
      try {
        const projectUpdates = await projectsApi.updates.getByProjectId(projectId);
        console.log('Actualizaciones obtenidas del API:', projectUpdates);
        setUpdates(projectUpdates || []);
      } catch (updateErr) {
        console.error('Error al obtener actualizaciones:', updateErr);
        // Usar actualizaciones del proyecto si existen
        setUpdates(selectedProject.updates || []);
      }
      
      // Obtener documentos del proyecto
      try {
        const projectDocs = await projectsApi.documents.getByProjectId(projectId);
        console.log('Documentos obtenidos del API:', projectDocs);
        setDocuments(projectDocs || []);
      } catch (docErr) {
        console.error('Error al obtener documentos:', docErr);
        // Usar documentos del proyecto si existen
        setDocuments(selectedProject.documents || []);
      }
      
      // Obtener información del responsable
      if (selectedProject.users && selectedProject.users.length > 0) {
        setResponsable(selectedProject.users[0]);
      } else {
        // Intentar obtener el responsable de otra manera si es necesario
        setResponsable(null);
      }
      
      // Si hay modelo 3D asociado
      if (selectedProject.model3d) {
        setModel3d(selectedProject.model3d);
      } else {
        setModel3d(null);
      }
      
      setLoadingProject(false);
    } catch (err) {
      console.error('Error al cargar datos del proyecto:', err);
      setError('No se pudo cargar la información del proyecto.');
      setLoadingProject(false);
    }
  };
  
  // Crear proyectos de demostración con proyectos reales de Caribbean Embedded Labs
  const demoProyecto1 = {
    ...demoProject,
    id: '1',
    name: 'Transformación Digital con IoT',
    description: 'Implementación de soluciones IoT en equipos industriales antiguos con transceptores ISO1500DBQR y protocolo RS485 IEC101.',
    progress: 90
  };
  
  const demoProyecto2 = {
    ...demoProject,
    id: '2',
    name: 'Sistema de Gestión de Turnos',
    description: 'Sistema con Raspberry Pi que permite selección de turnos, impresión de tickets y análisis estadístico de servicios.',
    progress: 85
  };
  
  const demoProyecto3 = {
    ...demoProject,
    id: '3',
    name: 'Sistema de Monitoreo KPI',
    description: 'Sistema que monitorea en tiempo real los pulsos de las máquinas para calcular KPIs críticos como OEE y eficiencia.',
    progress: 75
  };
  
  const demoProyecto4 = {
    ...demoProject,
    id: '4',
    name: 'Monitoreo Temperatura - Cuartos Fríos',
    description: 'Sistema con sensores IP68 conectados por RS485 para monitoreo de temperatura en cuartos fríos con alertas en tiempo real.',
    progress: 65
  };
  
  // Lista de proyectos demo usando los proyectos reales de la empresa
  const demoProjects = [demoProyecto1, demoProyecto2, demoProyecto3, demoProyecto4];

  useEffect(() => {
    if (!user) return;
    
    async function fetchProjects() {
      try {
        setLoading(true);
        setError('');
        
        // Si es usuario demo, usar datos demo
        if (user.email === 'client@example.com') {
          setProjects(demoProjects);
          setSelectedProjectId(demoProjects[0].id);
          setLoading(false);
          return;
        }
        
        // Usuario real: obtener proyectos del API
        const allProjects = await projectsApi.getAll();
        console.log('Proyectos obtenidos del API:', allProjects);
        
        if (!allProjects || allProjects.length === 0) {
          setLoading(false);
          return;
        }
        
        setProjects(allProjects);
        setSelectedProjectId(allProjects[0].id);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar los proyectos:', err);
        setError('No se pudieron cargar los proyectos.');
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, [user]);
  
  // Efecto para cargar los detalles cuando se selecciona un proyecto
  useEffect(() => {
    if (selectedProjectId) {
      loadProjectDetails(selectedProjectId);
    }
  }, [selectedProjectId]);

  if (!user) return null;

  // Función para obtener el color de estado
  function getStatusColor(status) {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Función para convertir el estado a texto en español
  function getStatusText(status) {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'in_progress':
        return 'En progreso';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  }

  // Función para alternar la visibilidad del panel lateral
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
