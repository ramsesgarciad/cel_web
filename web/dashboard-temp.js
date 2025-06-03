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
  FileType,
  File3d,
  Clipboard
} from 'lucide-react';

export default function DashboardPage() {
  // Todos los hooks deben ir al principio
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [model3d, setModel3d] = useState(null);
  const [responsable, setResponsable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  // Actualizaciones de ejemplo para el proyecto de demostración
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

  useEffect(() => {
    if (!user) return;
    // Si es usuario demo, usar datos demo
    if (user.email === 'client@example.com') {
      setProject(demoProject);
      setTasks(demoProject.tasks);
      setUpdates(demoProject.updates);
      setDocuments(demoProject.documents);
      setModel3d(demoProject.model3d);
      setResponsable(demoProject.responsable);
      setLoading(false);
      return;
    }
    // Usuario real: obtener proyecto del API
    async function fetchData() {
      try {
        setLoading(true);
        // Obtener proyectos del usuario
        const allProjects = await projectsApi.getAll();
        console.log('Proyectos obtenidos del API:', allProjects);
        
        // Seleccionar el primer proyecto (o null si no hay ninguno)
        const myProject = allProjects && allProjects.length > 0 ? allProjects[0] : null;
        if (!myProject) {
          setLoading(false);
          return;
        }
        
        setProject(myProject);
        
        // Obtener tareas del proyecto
        try {
          const projectTasks = await projectsApi.tasks.getByProjectId(myProject.id);
          console.log('Tareas obtenidas del API:', projectTasks);
          setTasks(projectTasks || []);
        } catch (taskErr) {
          console.error('Error al obtener tareas:', taskErr);
          // Usar tareas del proyecto si existen
          setTasks(myProject.tasks || []);
        }
        
        // Obtener actualizaciones del proyecto
        try {
          const projectUpdates = await projectsApi.updates.getByProjectId(myProject.id);
          console.log('Actualizaciones obtenidas del API:', projectUpdates);
          setUpdates(projectUpdates || []);
        } catch (updateErr) {
          console.error('Error al obtener actualizaciones:', updateErr);
          // Usar actualizaciones del proyecto si existen
          setUpdates(myProject.updates || []);
        }
        
        // Obtener documentos del proyecto
        try {
          const projectDocs = await projectsApi.documents.getByProjectId(myProject.id);
          console.log('Documentos obtenidos del API:', projectDocs);
          setDocuments(projectDocs || []);
        } catch (docErr) {
          console.error('Error al obtener documentos:', docErr);
          // Usar documentos del proyecto si existen
          setDocuments(myProject.documents || []);
        }
        
        // Obtener información del responsable
        if (myProject.users && myProject.users.length > 0) {
          setResponsable(myProject.users[0]);
        } else {
          // Intentar obtener el responsable de otra manera si es necesario
          setResponsable(null);
        }
        
        // Si hay modelo 3D asociado
        if (myProject.model3d) {
          setModel3d(myProject.model3d);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar datos del proyecto:', err);
        setError('No se pudo cargar la información del proyecto.');
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-t-4 border-blue-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-lg font-bold text-blue-800 mb-1">{project?.name || 'Cargando proyecto...'}</h1>
            <div className="text-sm text-gray-600">Cliente: <span className="font-semibold">{project?.client || '-'}</span></div>
            <div className="text-xs text-gray-400">{project?.description}</div>
          </div>
          <div className="flex items-center mt-3 md:mt-0 space-x-4">
            {responsable && (
              <div className="text-xs text-right text-gray-600">
                Responsable:<br />
                <span className="font-semibold">{responsable.name}</span><br />
                <a href={`mailto:${responsable.email}`} className="text-blue-700 underline">{responsable.email}</a>
              </div>
            )}
            <button onClick={logout} className="ml-4 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-900 text-xs">Cerrar sesión</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Cargando información...</div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 text-red-700">{error}</div>
        ) : !project ? (
          <div className="text-center py-12 text-gray-500">No se encontró ningún proyecto asignado.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Progreso */}
              <section className="col-span-1 bg-white rounded shadow p-6 flex flex-col items-center">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Progreso</h2>
                <ProgressCircle percent={project.progress || 0} />
                <div className="mt-2 text-xs text-gray-500">Fecha estimada de finalización:</div>
                <div className="text-sm font-medium text-blue-700">{project.end_date ? new Date(project.end_date).toLocaleDateString() : '-'}</div>
              </section>

              {/* Últimas actualizaciones */}
              <section className="col-span-1 bg-white rounded shadow p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Últimas actualizaciones</h2>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {updates.length === 0 && <li className="text-xs text-gray-400">Sin actualizaciones recientes.</li>}
                  {updates.slice(0, 5).map(upd => (
                    <li key={upd.id} className="text-xs border-l-2 border-blue-500 pl-2 py-1">
                      <div className="font-medium">{upd.content}</div>
                      <div className="text-gray-400">{upd.date ? new Date(upd.date).toLocaleDateString() : ''}</div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Vista 3D del modelo */}
              <section className="col-span-1 bg-white rounded shadow p-6">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Vista 3D</h2>
                {model3d ? (
                  <div className="aspect-video relative w-full">
                    <iframe 
                      src={model3d.url} 
                      title={model3d.name || 'Modelo 3D'}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-gray-100 rounded w-full">
                    <div className="text-xs text-gray-400">No hay modelo 3D disponible</div>
                  </div>
                )}
              </section>
            </div>

            {/* Diagrama de Gantt */}
            <section className="mt-6 bg-white rounded shadow p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Diagrama de Gantt</h2>
              <div className="overflow-x-auto">
                <div className="min-w-full" style={{ minHeight: '200px' }}>
                  {tasks.length === 0 ? (
                    <div className="text-xs text-gray-400 text-center py-4">No hay tareas para mostrar en el diagrama de Gantt.</div>
                  ) : (
                    <div>
                      <div className="flex text-xs text-gray-500 mb-2">
                        <div className="w-1/4">Tarea</div>
                        <div className="w-3/4 flex">
                          <div className="flex-1 text-center">Jul</div>
                          <div className="flex-1 text-center">Ago</div>
                          <div className="flex-1 text-center">Sep</div>
                          <div className="flex-1 text-center">Oct</div>
                          <div className="flex-1 text-center">Nov</div>
                          <div className="flex-1 text-center">Dic</div>
                        </div>
                      </div>
                      
                      {tasks.map(task => {
                        // Cálculo simplificado para la posición de la barra
                        const startDate = new Date(task.start_date);
                        const endDate = new Date(task.end_date);
                        const now = new Date();
                        
                        // Fechas base para el cálculo (6 meses en total)
                        const startOfChart = new Date(now.getFullYear(), now.getMonth() - 2, 1); // 2 meses atrás
                        const endOfChart = new Date(now.getFullYear(), now.getMonth() + 4, 0);   // 4 meses adelante
                        
                        const totalDays = (endOfChart - startOfChart) / (1000 * 60 * 60 * 24);
                        const startOffset = Math.max(0, (startDate - startOfChart) / (1000 * 60 * 60 * 24)) / totalDays * 100;
                        const duration = Math.min(endDate, endOfChart) - Math.max(startDate, startOfChart);
                        const durationDays = duration / (1000 * 60 * 60 * 24);
                        const width = Math.max(0, durationDays / totalDays * 100);
                        
                        // Determinar color basado en el estado
                        let barColor = "bg-gray-300";
                        if (task.status === 'completed') barColor = "bg-green-500";
                        else if (task.status === 'in_progress') barColor = "bg-orange-500";
                        else if (task.status === 'pending') barColor = "bg-blue-400";
                        
                        return (
                          <div key={task.id} className="flex items-center text-xs mb-1 h-7">
                            <div className="w-1/4 truncate pr-2">{task.name}</div>
                            <div className="w-3/4 bg-gray-100 h-5 relative rounded-md">
                              <div 
                                className={`absolute h-5 ${barColor} rounded-md`} 
                                style={{ 
                                  left: `${startOffset}%`, 
                                  width: `${width}%`,
                                  minWidth: '10px'
                                }}>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Tareas principales */}
            <section className="mt-6 bg-white rounded shadow p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">Tareas principales</h2>
              {tasks.length === 0 ? (
                <div className="text-xs text-gray-400 text-center py-4">No hay tareas asignadas a este proyecto.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Tarea</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Estado</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Progreso</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Inicio</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Fin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {tasks.map(task => (
                        <tr key={task.id}>
                          <td className="px-3 py-2 text-xs">{task.name}</td>
                          <td className="px-3 py-2 text-xs">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                              {getStatusText(task.status)}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-xs">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full" 
                                style={{ width: `${task.progress || 0}%` }}>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 text-right">{task.progress || 0}%</div>
                          </td>
                          <td className="px-3 py-2 text-xs">{task.start_date ? new Date(task.start_date).toLocaleDateString() : '-'}</td>
                          <td className="px-3 py-2 text-xs">{task.end_date ? new Date(task.end_date).toLocaleDateString() : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Documentación técnica */}
            <section className="mt-6 bg-white rounded shadow p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Documentación técnica</h2>
              <ul className="space-y-2">
                {documents.length === 0 && <li className="text-xs text-gray-400">No hay documentos disponibles.</li>}
                {documents.map(doc => (
                  <li key={doc.id}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline text-xs">
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
