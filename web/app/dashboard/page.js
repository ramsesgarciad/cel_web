'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import ProgressCircle from '@/components/ProgressCircle';
import { projectsApi, tasksApi, updatesApi, documentsApi } from '@/lib/api';
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
      
      // Para proyectos reales, obtener detalles del proyecto directamente de la API
      try {
        // Obtener detalles del proyecto
        const projectDetails = await projectsApi.getById(projectId);
        console.log('Detalles del proyecto obtenidos:', projectDetails);
        
        if (!projectDetails) {
          setError('No se encontró información del proyecto');
          setLoadingProject(false);
          return;
        }
        
        setProject(projectDetails);
        
        // Obtener tareas del proyecto
        try {
          const projectTasks = await tasksApi.getByProjectId(projectId);
          console.log('Tareas obtenidas del API:', projectTasks);
          
          // Formatear las tareas para que coincidan con la estructura esperada
          const formattedTasks = Array.isArray(projectTasks) ? projectTasks.map(task => ({
            ...task,
            // Asegurar que las fechas estén en formato Date
            start_date: task.start_date ? new Date(task.start_date) : new Date(),
            end_date: task.end_date ? new Date(task.end_date) : new Date(),
            // Asegurar que el progreso sea un número
            progress: typeof task.progress === 'number' ? task.progress : 0,
            // Asegurar que el estado tenga un valor válido
            status: task.status || 'pending'
          })) : [];
          
          setTasks(formattedTasks);
        } catch (taskErr) {
          console.error('Error al obtener tareas:', taskErr);
          setTasks([]);
        }
        
        // Obtener actualizaciones del proyecto
        try {
          const projectUpdates = await updatesApi.getByProjectId(projectId);
          console.log('Actualizaciones obtenidas del API:', projectUpdates);
          
          // Formatear las actualizaciones para que coincidan con la estructura esperada
          const formattedUpdates = Array.isArray(projectUpdates) ? projectUpdates.map(update => ({
            ...update,
            // Asegurar que la fecha esté en formato Date
            date: update.date ? new Date(update.date) : new Date(),
            // Asegurar que completed tenga un valor booleano
            completed: Boolean(update.completed)
          })) : [];
          
          setUpdates(formattedUpdates);
        } catch (updateErr) {
          console.error('Error al obtener actualizaciones:', updateErr);
          setUpdates([]);
        }
        
        // Obtener documentos del proyecto
        try {
          const projectDocs = await documentsApi.getByProjectId(projectId);
          console.log('Documentos obtenidos del API:', projectDocs);
          setDocuments(Array.isArray(projectDocs) ? projectDocs : []);
        } catch (docErr) {
          console.error('Error al obtener documentos:', docErr);
          setDocuments([]);
        }
        
        // Obtener información del responsable
        if (projectDetails.users && projectDetails.users.length > 0) {
          setResponsable(projectDetails.users[0]);
        } else {
          setResponsable(null);
        }
        
        // Si hay modelo 3D asociado
        if (projectDetails.model3d) {
          setModel3d(projectDetails.model3d);
        } else {
          setModel3d(null);
        }
        
      } catch (projectErr) {
        console.error('Error al obtener detalles del proyecto:', projectErr);
        setError('No se pudo cargar la información del proyecto.');
        setProject(null);
      }
      
      setLoadingProject(false);
    } catch (err) {
      console.error('Error general al cargar datos del proyecto:', err);
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
        try {
          const allProjects = await projectsApi.getAll();
          console.log('Proyectos obtenidos del API:', allProjects);
          
          if (!allProjects || !Array.isArray(allProjects) || allProjects.length === 0) {
            console.log('No se encontraron proyectos o el formato de respuesta es incorrecto');
            setLoading(false);
            return;
          }
          
          // Formatear los proyectos para asegurar que tengan la estructura correcta
          const formattedProjects = allProjects.map(project => ({
            ...project,
            // Asegurar que las fechas estén en formato correcto
            start_date: project.start_date ? new Date(project.start_date) : new Date(),
            end_date: project.end_date ? new Date(project.end_date) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            // Asegurar que el progreso sea un número
            progress: typeof project.progress === 'number' ? project.progress : 0,
            // Asegurar que el estado tenga un valor por defecto
            status: project.status || 'En progreso'
          }));
          
          console.log('Proyectos formateados:', formattedProjects);
          
          setProjects(formattedProjects);
          if (formattedProjects.length > 0) {
            setSelectedProjectId(formattedProjects[0].id);
          }
        } catch (apiErr) {
          console.error('Error al obtener proyectos de la API:', apiErr);
          setError('No se pudieron cargar los proyectos desde el servidor.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error general al cargar los proyectos:', err);
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
  
  // Función mejorada para el círculo de progreso
  function CustomProgressCircle({ percentage, size = 160, strokeWidth = 12, className = '' }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className={`relative w-full h-full ${className}`} style={{ width: size, height: size }}>
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Fondo del círculo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="#edf2f7"
            fill="transparent"
          />
          {/* Círculo de progreso */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={percentage >= 100 ? '#48bb78' : percentage > 60 ? '#4299e1' : '#ed8936'}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: percentage >= 100 ? '#48bb78' : percentage > 60 ? '#4299e1' : '#ed8936' }}>
            {percentage}%
          </span>
        </div>
      </div>
    );
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
  // Calculando las fechas para el gráfico Gantt
  const calculateDates = () => {
    if (!tasks || tasks.length === 0) return { minDate: new Date(), maxDate: new Date(), totalDays: 30 };
    
    const startDates = tasks.map(task => new Date(task.start_date));
    const endDates = tasks.map(task => new Date(task.end_date));
    
    const minDate = new Date(Math.min(...startDates));
    const maxDate = new Date(Math.max(...endDates));
    
    // Calcular el total de días para el ancho del gráfico
    const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;
    
    return { minDate, maxDate, totalDays };
  };
  
  const { minDate, maxDate, totalDays } = calculateDates();
  
  // Función para calcular la posición y ancho de cada tarea en el gráfico Gantt
  const calculateTaskPosition = (task) => {
    const taskStart = new Date(task.start_date);
    const taskEnd = new Date(task.end_date);
    
    const startOffset = Math.max(0, (taskStart - minDate) / (1000 * 60 * 60 * 24));
    const duration = Math.max(1, (taskEnd - taskStart) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: `${(startOffset / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`
    };
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full">
        {/* Encabezado */}
        <header className="bg-white shadow py-4 px-8 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <Image
              src="/h_caribean_embeded_labs.png"
              alt="Caribbean Embedded Labs Logo"
              width={160}
              height={40}
              className="object-contain"
            />
            <h1 className="text-xl font-semibold text-gray-800">Panel de Cliente</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.push('/profile')}
              className="text-gray-600 hover:text-gray-800"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <span>{user.name || user.email}</span>
              </div>
            </button>
            <button 
              onClick={logout}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Contenido principal con sidebar */}
        <div className="flex">
          {/* Sidebar con lista de proyectos */}
          <aside className={`bg-white shadow transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-14'} min-h-[calc(100vh-4rem)] flex flex-col`}>
            <div className="py-4 px-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className={`font-semibold text-gray-800 ${sidebarOpen ? 'block' : 'hidden'}`}>Mis Proyectos</h2>
              <button 
                onClick={toggleSidebar}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1">
              <ul className="py-2">
                {projects.map((proj) => (
                  <li key={proj.id} className="px-2 py-1">
                    <button
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedProjectId === proj.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          proj.progress >= 100 
                            ? 'bg-green-500' 
                            : proj.progress > 0 
                              ? 'bg-yellow-500' 
                              : 'bg-blue-500'
                        }`}></div>
                        {sidebarOpen ? (
                          <div className="w-full">
                            <p className="font-medium truncate" style={{ maxWidth: '230px' }}>{proj.name}</p>
                            <p className="text-xs text-gray-500 truncate" style={{ maxWidth: '230px' }}>
                              {proj.progress}% completado
                            </p>
                          </div>
                        ) : (
                          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
                            {proj.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Contenido principal */}
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">Cargando información...</div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 text-red-700">{error}</div>
            ) : !project ? (
              <div className="text-center py-12 text-gray-500">No se encontró ningún proyecto asignado.</div>
            ) : (
              <>
                {/* Mostrar indicador cuando se está cargando un proyecto específico */}
                {loadingProject && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                      <div className="mt-2 text-sm text-gray-600">Cargando proyecto...</div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                  {/* Progreso - reducido a 3 columnas */}
                  <section className="col-span-3 bg-white rounded shadow p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 self-start">Progreso del Proyecto</h2>
                    <div className="w-full max-w-[180px] h-[180px] flex justify-center">
                      <CustomProgressCircle percentage={project.progress} size={180} strokeWidth={15} className="mx-auto" />
                    </div>
                    <div className="mt-6 w-full space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Inicio:</span>
                        <span className="font-medium">{new Date(project.start_date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fin estimado:</span>
                        <span className="font-medium">{new Date(project.end_date).toLocaleDateString('es-ES')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estado:</span>
                        <span className="font-medium text-blue-600">{project.status}</span>
                      </div>
                    </div>
                  </section>

                  {/* Actualizaciones - 4 columnas */}
                  <section className="col-span-4 bg-white rounded shadow p-6 overflow-y-auto" style={{maxHeight: '400px'}}>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Actualizaciones Recientes</h2>
                    {updates && updates.length > 0 ? (
                      <div className="space-y-3">
                        {updates.map((update) => (
                          <div key={update.id} className="p-3 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start">
                                {update.completed ? (
                                  <Check size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                ) : (
                                  <AlertCircle size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                )}
                                <p className="text-sm text-gray-700">{update.content}</p>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 ml-2 flex-shrink-0">
                                <Clock size={12} className="mr-1" />
                                <span>{new Date(update.date).toLocaleDateString('es-ES')}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No hay actualizaciones recientes.</p>
                    )}
                  </section>

                  {/* Información del proyecto - 5 columnas */}
                  <section className="col-span-5 bg-white rounded shadow p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">{project.name}</h2>
                    <p className="text-gray-600 mb-6">{project.description}</p>
                    
                    {responsable && (
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-700 mb-2">Responsable del proyecto:</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            {responsable.name ? responsable.name.charAt(0).toUpperCase() : 'R'}
                          </div>
                          <div>
                            <p className="font-medium">{responsable.name}</p>
                            <p className="text-sm text-gray-500">{responsable.email}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Modelo 3D si está disponible */}
                    {model3d && (
                      <div className="mb-6">
                        <h3 className="text-md font-medium text-gray-700 mb-2">Vista previa 3D:</h3>
                        <iframe
                          title={model3d.name}
                          width="100%"
                          height="250"
                          src={model3d.url}
                          allowFullScreen
                          className="border-0 rounded"
                        ></iframe>
                      </div>
                    )}
                  </section>
                </div>

                {/* Tareas */}
                <section className="mt-6 bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Tareas del Proyecto</h2>
                  {tasks && tasks.length > 0 ? (
                    <div>
                      {/* Gantt Chart mejorado */}
                      <div className="mb-6 overflow-x-auto">
                        <div className="min-w-full" style={{ minWidth: '100%' }}>
                          <div className="flex mb-2">
                            <div className="w-1/4 font-medium text-gray-700 pl-2">Tarea</div>
                            <div className="w-3/4 relative">
                              <div className="h-6 flex">
                                {[...Array(totalDays > 60 ? 60 : totalDays).keys()].map((i) => {
                                  const date = new Date(minDate);
                                  date.setDate(date.getDate() + i);
                                  const isMonthStart = date.getDate() === 1 || i === 0;
                                  return (
                                    <div key={i} className="flex-1 text-xs text-center text-gray-500 border-r border-gray-200 relative">
                                      {isMonthStart && (
                                        <div className="absolute -top-4 left-0 right-0 text-xs font-medium text-blue-600">
                                          {date.toLocaleDateString('es-ES', { month: 'short' })}
                                        </div>
                                      )}
                                      {i % 2 === 0 && (
                                        <span>{date.getDate()}</span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {tasks.map((task) => (
                            <div key={task.id} className="flex py-2 border-t border-gray-100 hover:bg-gray-50">
                              <div className="w-1/4 pr-4">
                                <div className="flex items-start">
                                  <div className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${
                                    task.status === 'completed' 
                                      ? 'bg-green-500' 
                                      : task.status === 'in_progress' 
                                        ? 'bg-yellow-500' 
                                        : 'bg-blue-500'
                                  }`}></div>
                                  <div className="ml-2 truncate">
                                    <p className="font-medium text-gray-700 text-sm truncate">{task.name}</p>
                                    <div className="flex items-center gap-2">
                                      <p className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${getStatusColor(task.status)}`}>
                                        {getStatusText(task.status)}
                                      </p>
                                      <span className="text-xs text-gray-500">{task.progress}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-3/4 relative">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full h-1 bg-gray-100"></div>
                                </div>
                                <div 
                                  className={`absolute h-7 rounded ${
                                    task.status === 'completed' 
                                      ? 'bg-green-200 border border-green-400' 
                                      : task.status === 'in_progress' 
                                        ? 'bg-yellow-200 border border-yellow-400' 
                                        : 'bg-blue-200 border border-blue-400'
                                  }`}
                                  style={calculateTaskPosition(task)}
                                >
                                  <div className="h-full flex items-center justify-center px-2 overflow-hidden">
                                    <span className="text-xs whitespace-nowrap font-medium">{task.progress}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lista de tareas mejorada */}
                      <div>
                        <h3 className="font-medium text-gray-700 mb-4">Detalle de Tareas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {tasks.map((task) => (
                            <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start">
                                <div className="w-3/4">
                                  <p className="font-medium text-gray-800 mb-2">{task.name}</p>
                                  <div className="flex flex-wrap items-center gap-3 mt-1">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                                      {getStatusText(task.status)}
                                    </span>
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Calendar size={14} className="mr-1" />
                                      <span>{new Date(task.start_date).toLocaleDateString('es-ES')} - {new Date(task.end_date).toLocaleDateString('es-ES')}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center justify-center">
                                    <span className="text-lg font-bold" style={{ color: task.progress >= 100 ? '#48bb78' : task.progress > 60 ? '#4299e1' : '#ed8936' }}>
                                      {task.progress}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay tareas disponibles para este proyecto.</p>
                  )}
                </section>



                {/* Documentos */}
                <section className="mt-6 bg-white rounded shadow p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Documentos</h2>
                  {documents && documents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              {doc.type === 'pdf' ? (
                                <FileText className="text-red-500 mr-3 flex-shrink-0" size={24} />
                              ) : doc.type === 'image' ? (
                                <FileType className="text-purple-500 mr-3 flex-shrink-0" size={24} />
                              ) : doc.type === '3d' ? (
                                <File3d className="text-blue-500 mr-3 flex-shrink-0" size={24} />
                              ) : (
                                <Clipboard className="text-gray-500 mr-3 flex-shrink-0" size={24} />
                              )}
                              <div>
                                <p className="font-medium text-gray-800 truncate">{doc.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{doc.size}</p>
                              </div>
                            </div>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 ml-2 flex-shrink-0"
                            >
                              Ver
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay documentos disponibles para este proyecto.</p>
                  )}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
