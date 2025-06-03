'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { projectsApi } from '@/lib/api';
import Link from 'next/link';

export default function TestChanges() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    async function loadProjects() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        console.log('Cargando proyectos para prueba...');
        const allProjects = await projectsApi.getAll();
        console.log('Proyectos obtenidos:', allProjects);

        // Convertir el ID del usuario a string para comparación consistente
        const userId = user.id ? String(user.id) : null;
        const userEmail = user.email;
        
        console.log('Datos del usuario actual:', { id: userId, email: userEmail, role: user.role });
        
        // Filtrar proyectos para mostrar solo los asignados al usuario actual
        const userProjects = allProjects.filter(project => {
          // Verificar si el proyecto tiene usuarios asignados
          if (!project.users || !Array.isArray(project.users)) {
            // Si no tiene usuarios asignados y el usuario es cliente, no mostrar
            return user.role !== 'client';
          }
          
          // Para usuarios con rol 'client', mostrar solo sus proyectos asignados
          if (user.role === 'client') {
            // Verificar si el usuario actual (cliente) está entre los usuarios asignados al proyecto
            const isAssigned = project.users.some(projectUser => {
              // Convertir IDs a strings para comparación consistente
              const projectUserId = projectUser.id ? String(projectUser.id) : null;
              const projectUserEmail = projectUser.email;
              
              // Comparar por ID o email
              return (userId && projectUserId && userId === projectUserId) || 
                     (userEmail && projectUserEmail && userEmail === projectUserEmail);
            });
            
            console.log(`Proyecto ${project.id} (${project.name}) asignado al usuario: ${isAssigned}`);
            return isAssigned;
          }
          
          // Para usuarios con rol 'admin' o 'user', mostrar todos los proyectos
          return true;
        });
        
        console.log('Proyectos filtrados para el usuario:', userProjects);
        setProjects(userProjects);
      } catch (err) {
        console.error('Error al cargar proyectos:', err);
        setError('Error al cargar proyectos');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [user]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Prueba de Cambios</h1>
        <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Volver al Dashboard
        </Link>
      </div>
      
      <div className="mb-6 p-4 bg-blue-100 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Datos del Usuario:</h2>
        <pre className="whitespace-pre-wrap bg-white p-3 rounded mt-2 text-sm overflow-auto max-h-60">
          {user ? JSON.stringify(user, null, 2) : 'No hay usuario autenticado'}
        </pre>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Proyectos ({projects.length}):</h2>
          {projects.length === 0 ? (
            <div className="p-6 bg-yellow-50 rounded shadow text-center">
              <p className="text-lg">No se encontraron proyectos asignados a este usuario.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project.id} className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <div className="space-y-2 mb-4">
                    <p><span className="font-semibold">ID:</span> {project.id}</p>
                    <p><span className="font-semibold">Cliente:</span> {project.client}</p>
                    <p><span className="font-semibold">Estado:</span> {project.status || 'No definido'}</p>
                    <div>
                      <span className="font-semibold">Progreso:</span> {project.progress || 0}%
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div 
                          className="bg-blue-500 h-2.5 rounded-full" 
                          style={{ width: `${project.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold border-b pb-1 mb-2">Usuarios asignados:</h4>
                    {project.users && project.users.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {project.users.map((u, idx) => (
                          <li key={idx}>
                            {u.name || u.email} (ID: {u.id})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No hay usuarios asignados</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold border-b pb-1 mb-2">Tareas:</h4>
                    {project.tasks && project.tasks.length > 0 ? (
                      <ul className="space-y-2">
                        {project.tasks.map((task, idx) => (
                          <li key={idx} className="p-2 bg-gray-50 rounded">
                            <div className="font-medium">{task.name}</div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                task.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                task.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                                "bg-green-100 text-green-800"
                              }`}>
                                {task.status === "pending" && "Pendiente"}
                                {task.status === "in_progress" && "En Progreso"}
                                {task.status === "completed" && "Completada"}
                              </span>
                              
                              {task.percent_done !== undefined && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                                  {task.percent_done}% Completado
                                </span>
                              )}
                              
                              {task.is_critical_path && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-800">
                                  Ruta Crítica
                                </span>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs mt-2 text-gray-600">
                              {task.start_date && (
                                <div>
                                  <span className="font-medium">Inicio:</span> {task.start_date}
                                </div>
                              )}
                              
                              {task.end_date && (
                                <div>
                                  <span className="font-medium">Fin:</span> {task.end_date}
                                </div>
                              )}
                              
                              {task.resource && (
                                <div>
                                  <span className="font-medium">Recurso:</span> {task.resource}
                                </div>
                              )}
                              
                              {task.color && (
                                <div className="flex items-center">
                                  <span className="font-medium mr-1">Color:</span>
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: task.color }}></div>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No hay tareas</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
