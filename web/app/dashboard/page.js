'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { projectsApi } from '@/lib/api';
import Image from 'next/image';
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
  Clipboard,
  LucideIcon
} from 'lucide-react';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user && !loading) {
      router.push('/login');
      return;
    }

    // Fetch projects
    const fetchProjects = async () => {
      try {
        const data = await projectsApi.getAll();
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user, router, loading]);

  if (!user) {
    return null; // Will redirect in useEffect
  }

  // Seleccionamos el primer proyecto para mostrar en el dashboard detallado (en un sistema real probablemente usarías un ID de proyecto de la URL)
  const selectedProject = projects.length > 0 ? projects[0] : null;
  
  const mockTasks = [
    { id: 1, name: 'Definición de requerimientos', status: 'completed', progress: 100 },
    { id: 2, name: 'Diseño inicial del PCB', status: 'completed', progress: 100 },
    { id: 3, name: 'Revisión del diseño', status: 'completed', progress: 100 },
    { id: 4, name: 'Selección de componentes', status: 'inProgress', progress: 60 },
    { id: 5, name: 'Desarrollo de firmware', status: 'pending', progress: 0 },
    { id: 6, name: 'Fabricación de PCB', status: 'pending', progress: 0 },
    { id: 7, name: 'Ensamblaje y soldadura', status: 'pending', progress: 0 },
    { id: 8, name: 'Pruebas iniciales', status: 'pending', progress: 0 },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'inProgress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-300" />;
      default:
        return null;
    }
  };

  // Calcular el progreso total basado en las tareas
  const overallProgress = selectedProject ? selectedProject.progress : 
    mockTasks.reduce((acc, task) => acc + task.progress, 0) / mockTasks.length;

  // Función para generar el svg del círculo de progreso
  const generateProgressCircle = (percentage) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg className="w-full h-full" viewBox="0 0 160 160">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
          />
          <circle
            className="text-blue-700"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="80"
            cy="80"
            transform="rotate(-90 80 80)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-blue-700">{Math.round(percentage)}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow border-t-4 border-red-600">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-semibold text-gray-900">Progreso de Desarrollo del Proyecto: </h1>
            <span className="font-bold text-red-600">{selectedProject?.name || 'QZT024'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Cliente: <span className="font-medium">{user?.name}</span>
            </span>
            <button
              onClick={logout}
              className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>
      
      <main className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando proyecto...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : !selectedProject && projects.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No se encontraron proyectos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Contacta con el administrador para obtener acceso a tus proyectos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4">
            {/* Indicador de Progreso - Más grande en la parte superior */}
            <div className="col-span-12 bg-white shadow rounded-lg p-4">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  {generateProgressCircle(35)}
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Fecha estimada de finalización: {selectedProject ? new Date(selectedProject.end_date).toLocaleDateString() : '10/11/2025'}
                  </p>
                </div>
                <div className="md:w-2/3 md:pl-6">
                  <h2 className="text-base font-semibold mb-3 border-b pb-2">Estado del Proyecto QZT024</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-2">Próximas actividades:</h3>
                      <ul className="space-y-2">
                        {mockTasks.filter(t => t.status !== 'completed').slice(0, 3).map(task => (
                          <li key={task.id} className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {getStatusIcon(task.status)}
                            </div>
                            <div className="ml-2">
                              <p className="text-xs text-gray-900">
                                {task.name}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium text-gray-700 mb-2">Actividades completadas:</h3>
                      <ul className="space-y-2">
                        {mockTasks.filter(t => t.status === 'completed').slice(0, 3).map(task => (
                          <li key={task.id} className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {getStatusIcon(task.status)}
                            </div>
                            <div className="ml-2">
                              <p className="text-xs text-gray-500 line-through">
                                {task.name}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cronograma de Gantt - Arriba después del progreso */}
            <div className="col-span-12 bg-white shadow rounded-lg p-4">
              <h2 className="text-base font-semibold mb-3 border-b pb-2">Cronograma de Gantt</h2>
              <div className="overflow-x-auto">
                <div className="min-w-max">
                  {/* Header del diagrama */}
                  <div className="flex border-b border-gray-200 text-xs text-gray-500 mb-1">
                    <div className="w-40 py-2 px-2 font-medium">Tarea</div>
                    <div className="flex-1 flex">
                      {['Feb 01', 'Mar 01', 'Abr 01', 'May 01', 'Jun 01', 'Jul 01', 'Ago 01', 'Sep 01', 'Oct 01', 'Nov 01', 'Dic 01', 'Ene 01'].map((month, idx) => (
                        <div key={month} className="w-12 text-center py-1 text-[10px]">{month}</div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Filas del diagrama */}
                  {mockTasks.map((task, idx) => (
                    <div key={task.id} className={`flex items-center ${idx % 2 === 0 ? 'bg-gray-50' : ''} border-b border-gray-100`}>
                      <div className="w-40 py-1.5 px-2 text-xs">{task.name}</div>
                      <div className="flex-1 flex relative h-6">
                        {/* Barra de la tarea con colores según la imagen original */}
                        <div 
                          className={`absolute h-3 ${idx === 0 ? 'bg-blue-700' : 
                                                     idx === 1 ? 'bg-blue-600' : 
                                                     idx === 2 ? 'bg-orange-500' : 
                                                     idx === 3 ? 'bg-orange-400' : 
                                                     idx === 4 ? 'bg-yellow-500' : 
                                                     idx === 5 ? 'bg-green-600' : 
                                                     idx === 6 ? 'bg-purple-500' : 
                                                     'bg-purple-400'}`} 
                          style={{ 
                            left: `${idx * 7}%`, 
                            width: `${idx === 0 ? '24%' : idx === 1 ? '15%' : '20%'}`, 
                            top: '6px'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visor 3D - Columna izquierda */}
            <div className="col-span-12 md:col-span-6 bg-white shadow rounded-lg p-4">
              <h2 className="text-base font-semibold mb-3 border-b pb-2">Vista 3D</h2>
              <div className="flex justify-center items-center bg-gray-50 rounded-lg p-2 h-72">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex justify-center items-center">
                    <img 
                      src="https://raw.githubusercontent.com/ramsesgarciad/cel_web/main/pcb-3d.png" 
                      alt="Vista 3D del PCB" 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://cdn.pixabay.com/photo/2018/03/17/10/51/pcb-3233409_1280.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de documentación - Columna derecha, primera fila */}
            <div className="col-span-12 md:col-span-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Documentación Técnica */}
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-base font-semibold mb-3 border-b pb-2">Documentación Técnica</h2>
                <ul className="divide-y divide-gray-100">
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Especificaciones del Producto</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Esquemático del Circuito</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Manual de Usuario</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Análisis Térmico</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                </ul>
              </div>

              {/* Documentación del Firmware */}
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-base font-semibold mb-3 border-b pb-2">Documentación del Firmware</h2>
                <ul className="divide-y divide-gray-100">
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Especificación del Firmware</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Guía de Actualización</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Changelog v1.2.3</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                  <li className="py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-900">Diagrama de Conexiones</span>
                    </div>
                    <a href="#" className="text-blue-600 text-xs hover:underline">Descargar</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
