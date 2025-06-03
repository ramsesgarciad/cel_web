'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { projectsApi } from '@/lib/api';

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prueba de Cambios</h1>
      
      <div className="mb-4 p-4 bg-blue-100 rounded">
        <h2 className="font-bold">Datos del Usuario:</h2>
        <pre className="whitespace-pre-wrap bg-white p-2 rounded mt-2">
          {user ? JSON.stringify(user, null, 2) : 'No hay usuario autenticado'}
        </pre>
      </div>

      {loading ? (
        <p>Cargando proyectos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">Proyectos ({projects.length}):</h2>
          {projects.length === 0 ? (
            <p>No se encontraron proyectos asignados a este usuario.</p>
          ) : (
            <ul className="space-y-4">
              {projects.map(project => (
                <li key={project.id} className="border p-4 rounded">
                  <h3 className="font-bold">{project.name}</h3>
                  <p><strong>ID:</strong> {project.id}</p>
                  <p><strong>Cliente:</strong> {project.client}</p>
                  <p><strong>Estado:</strong> {project.status || 'No definido'}</p>
                  <p><strong>Progreso:</strong> {project.progress || 0}%</p>
                  
                  <div className="mt-2">
                    <h4 className="font-semibold">Usuarios asignados:</h4>
                    {project.users && project.users.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {project.users.map((u, idx) => (
                          <li key={idx}>
                            {u.name || u.email} (ID: {u.id})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay usuarios asignados</p>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <h4 className="font-semibold">Tareas:</h4>
                    {project.tasks && project.tasks.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {project.tasks.map((task, idx) => (
                          <li key={idx}>
                            {task.name} - {task.status} 
                            {task.percent_done !== undefined && ` (${task.percent_done}%)`}
                            {task.is_critical_path && ' [Ruta Crítica]'}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No hay tareas</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
