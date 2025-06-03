"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, PlusCircle } from "lucide-react"
import Link from "next/link"
import { getProject, updateProject } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Interfaz para el tipo de proyecto
interface Project {
  id: string;
  name: string;
  client: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  progress: number;
  status?: string;
  tasks?: any[];
  users?: any[];
}

// Interfaz para la tarea
interface TaskData {
  id?: string;
  name: string;
  status: string;
  start_date?: string;
  end_date?: string;
  percent_done?: number;
  resource?: string;
  is_critical_path?: boolean;
  color?: string;
}

export default function EditProject() {
  const router = useRouter()
  const pathParams = useParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<Project>({
    id: "",
    name: "",
    client: "",
    start_date: "",
    end_date: "",
    description: "",
    progress: 0,
    tasks: [],
    users: [],
  })
  const [newTask, setNewTask] = useState<TaskData>({
    name: "",
    status: "pending",
    start_date: "",
    end_date: "",
    percent_done: 0,
    resource: "",
    is_critical_path: false,
    color: "#3b82f6"
  })
  const [showTaskForm, setShowTaskForm] = useState(false)

  // Get the project ID from params
  const id = pathParams.id as string;

  useEffect(() => {
    if (!id) { 
      setIsLoading(false); 
      return;
    }

    const fetchProject = async () => {
      try {
        setIsLoading(true)
        console.log(`Obteniendo proyecto con ID: ${id}`)
        
        try {
          const data = await getProject(id)
          console.log("Datos del proyecto recibidos:", data)
          
          if (!data) {
            throw new Error("No se recibieron datos de la API")
          }
          
          // Asegurarse de que las tareas tengan el formato correcto
          const formattedTasks = Array.isArray(data.tasks) 
            ? data.tasks.map(task => ({
                id: task.id || undefined,
                name: task.name || "",
                status: task.status || "pending",
                start_date: task.start_date || "",
                end_date: task.end_date || "",
                percent_done: task.percent_done || 0,
                resource: task.resource || "",
                is_critical_path: task.is_critical_path || false,
                color: task.color || "#3b82f6"
              }))
            : [];
          
          console.log("Tareas formateadas:", formattedTasks);
          console.log("Estado del proyecto:", data.status);
          
          setFormData({
            id: data.id,
            name: data.name || "",
            client: data.client || "",
            start_date: data.start_date || "",
            end_date: data.end_date || "",
            description: data.description || "",
            progress: data.progress || 0,
            status: data.status || "Planificación",
            tasks: formattedTasks,
            users: data.users || [],
          })
          
          toast({
            title: "Proyecto cargado",
            description: "La información del proyecto se ha cargado correctamente",
          })
        } catch (apiError: any) {
          console.error("Error al obtener el proyecto:", apiError)
          toast({
            title: "Error",
            description: `No se pudo cargar el proyecto: ${apiError.message || "Error desconocido"}`,
            variant: "destructive",
          })
          // Redirigir a la lista de proyectos si no se puede cargar
          setTimeout(() => {
            router.push("/admin/projects")
          }, 2000)
        }
      } catch (error: any) {
        console.error("Error al cargar el proyecto:", error)
        toast({
          title: "Error",
          description: `No se pudo cargar el proyecto: ${error.message || "Error desconocido"}`,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject();
  }, [id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setFormData((prev) => ({
      ...prev,
      progress: isNaN(value) ? 0 : Math.min(100, Math.max(0, value)),
    }))
  }

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTaskStatusChange = (value: string) => {
    setNewTask((prev) => ({
      ...prev,
      status: value,
    }))
  }

  const handleTaskCheckboxChange = (name: string, checked: boolean) => {
    setNewTask((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleTaskNumberChange = (name: string, value: number) => {
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  // Función para calcular la duración entre dos fechas en días
  const calcularDuracion = (fechaInicio: string, fechaFin: string) => {
    try {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      
      // Calcular la diferencia en días
      const diferencia = Math.max(1, Math.round((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)));
      
      return `${diferencia} día${diferencia !== 1 ? 's' : ''}`;
    } catch (error) {
      console.error('Error al calcular duración:', error);
      return 'No definida';
    }
  }

  const addTask = () => {
    // Validar que todos los campos obligatorios estén completos
    if (!newTask.name) {
      toast({
        title: "Error",
        description: "El nombre de la tarea es obligatorio",
        variant: "destructive",
      })
      return
    }
    
    if (!newTask.start_date) {
      toast({
        title: "Error",
        description: "La fecha de inicio es obligatoria",
        variant: "destructive",
      })
      return
    }
    
    if (!newTask.end_date) {
      toast({
        title: "Error",
        description: "La fecha de finalización es obligatoria",
        variant: "destructive",
      })
      return
    }
    
    if (!newTask.resource) {
      toast({
        title: "Error",
        description: "El recurso asignado es obligatorio",
        variant: "destructive",
      })
      return
    }
    
    // Verificar que la fecha de finalización sea mayor o igual a la fecha de inicio
    const startDate = new Date(newTask.start_date)
    const endDate = new Date(newTask.end_date)
    
    if (endDate < startDate) {
      toast({
        title: "Error",
        description: "La fecha de finalización debe ser mayor o igual a la fecha de inicio",
        variant: "destructive",
      })
      return
    }
    
    // Si todas las validaciones pasan, agregar la tarea
    setFormData((prev) => ({
      ...prev,
      tasks: [...(prev.tasks || []), newTask],
    }))
    
    // Mostrar mensaje de éxito
    toast({
      title: "Tarea agregada",
      description: `La tarea "${newTask.name}" ha sido agregada correctamente`,
    })
    
    // Reiniciar el formulario
    setNewTask({
      name: "",
      status: "pending",
      start_date: "",
      end_date: "",
      percent_done: 0,
      resource: "",
      is_critical_path: false,
      color: "#3b82f6"
    })
    setShowTaskForm(false)
  }

  const removeTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit_INVOKED");
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validar que todos los campos obligatorios del proyecto estén completos
      if (!formData.name || !formData.client || !formData.description) {
        setIsLoading(false);
        toast({
          title: "Error en proyecto",
          description: "Los campos nombre, cliente y descripción son obligatorios.",
          variant: "destructive",
        });
        return;
      }

      // Validar que todas las tareas tengan los campos obligatorios completos
      const tareasIncompletas = formData.tasks?.filter(task => {
        return !task.name || !task.start_date || !task.end_date || !task.resource;
      });
      
      if (tareasIncompletas && tareasIncompletas.length > 0) {
        setIsLoading(false);
        toast({
          title: "Error en tareas",
          description: `Hay ${tareasIncompletas.length} tarea(s) con campos obligatorios incompletos. Por favor complete todos los campos.`,
          variant: "destructive",
        });
        return;
      }
      
      // Validar fechas de las tareas
      const tareasConFechasInvalidas = formData.tasks?.filter(task => {
        if (!task.start_date || !task.end_date) return false;
        const startDate = new Date(task.start_date);
        const endDate = new Date(task.end_date);
        return endDate < startDate;
      });
      
      if (tareasConFechasInvalidas && tareasConFechasInvalidas.length > 0) {
        setIsLoading(false);
        toast({
          title: "Error en fechas",
          description: `Hay ${tareasConFechasInvalidas.length} tarea(s) donde la fecha de finalización es anterior a la fecha de inicio.`,
          variant: "destructive",
        });
        return;
      }
      
      // Preparar los datos del proyecto para el envío
      // Asegurarse de que las fechas están en formato ISO (YYYY-MM-DD)
      const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      };

      // Calcular el estado del proyecto basado en el progreso
      const calculateStatus = (progress) => {
        if (progress >= 100) return "Completado";
        if (progress > 0) return "En progreso";
        return "Planificación";
      };

      const projectData = {
        ...formData,
        // Asegurar formato correcto para fechas del proyecto
        start_date: formatDate(formData.start_date) || new Date().toISOString().split('T')[0],
        end_date: formatDate(formData.end_date) || new Date().toISOString().split('T')[0],
        // Asegurarse de que la descripción no sea null o undefined
        description: formData.description || "",
        // Calcular y establecer el estado basado en el progreso
        status: calculateStatus(formData.progress),
        // Asegurarse de que las tareas tengan el formato correcto con todos los campos
        tasks: formData.tasks?.map(task => ({
          id: task.id, // Incluir ID si existe (para tareas existentes)
          name: task.name,
          status: task.status,
          start_date: formatDate(task.start_date),
          end_date: formatDate(task.end_date),
          percent_done: task.percent_done !== undefined ? Number(task.percent_done) : 0,
          resource: task.resource || "",
          is_critical_path: task.is_critical_path === true,
          color: task.color || "#3b82f6"
        })) || []
      };
      
      // Log de depuración detallado
      console.log("Actualizando proyecto - JSON completo:", JSON.stringify(projectData))
      console.log("Campos requeridos:", {
        name: projectData.name,
        client: projectData.client,
        description: projectData.description,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        tasks: projectData.tasks?.length || 0
      })
      
      // Log de depuración detallado
      console.log("Actualizando proyecto - JSON completo:", JSON.stringify(projectData))
      console.log("Campos requeridos:", {
        name: projectData.name,
        client: projectData.client,
        description: projectData.description,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        tasks: projectData.tasks?.length || 0
      })
      
      const response = await updateProject(id, projectData)
      console.log("Proyecto actualizado:", response)
      
      toast({
        title: "Proyecto actualizado",
        description: "El proyecto ha sido actualizado correctamente",
      })
      
      // Redirigir a la lista de proyectos
      setTimeout(() => {
        router.push("/admin/projects")
      }, 1000)
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error)
      // Si el error tiene una respuesta del servidor, mostrarla
      let errorMessage = "No se pudo actualizar el proyecto.";
      if (error.response && error.response.data && error.response.data.detail) {
        errorMessage = typeof error.response.data.detail === 'string' ? error.response.data.detail : JSON.stringify(error.response.data.detail);
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Error de Actualización",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link href="/admin/projects" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Editar Proyecto</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Editar Proyecto</CardTitle>
              <CardDescription>Actualiza la información del proyecto.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Proyecto *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ingresa el nombre del proyecto"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente *</Label>
                    <Input
                      id="client"
                      name="client"
                      placeholder="Nombre del cliente"
                      value={formData.client}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_date">Fecha de Inicio</Label>
                    <Input
                      id="start_date"
                      name="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">Fecha de Finalización</Label>
                    <Input
                      id="end_date"
                      name="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="progress">Progreso ({formData.progress}%)</Label>
                  <Input
                    id="progress"
                    name="progress"
                    type="range"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleProgressChange}
                    className="w-full"
                  />
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${formData.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <div className="p-2 border rounded-md bg-muted/50">
                    <span className="font-medium">{formData.status || 'Planificación'}</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      El estado se actualiza automáticamente según el progreso del proyecto.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe el proyecto"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Tareas</Label>
                    <div className="flex space-x-2">
                      <Button type="button" variant="outline" onClick={() => {
                        // Mostrar modal o expandir formulario para agregar tarea
                        setShowTaskForm(!showTaskForm);
                      }}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {showTaskForm ? 'Cancelar' : 'Nueva Tarea'}
                      </Button>
                    </div>
                  </div>

                  {showTaskForm && (
                    <div className="border rounded-md p-4 mt-4 bg-muted/20">
                      <h3 className="font-medium mb-3">Nueva Tarea</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="task-name" className="flex items-center">
                              Nombre de la Tarea <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="task-name"
                              name="name"
                              placeholder="Nombre de la tarea"
                              value={newTask.name}
                              onChange={handleTaskChange}
                              required
                              className="border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-status" className="flex items-center">
                              Estado <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Select 
                              value={newTask.status} 
                              onValueChange={handleTaskStatusChange}
                              required
                            >
                              <SelectTrigger id="task-status" className="border-primary">
                                <SelectValue placeholder="Estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pendiente</SelectItem>
                                <SelectItem value="in_progress">En Progreso</SelectItem>
                                <SelectItem value="completed">Completada</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="task-start-date" className="flex items-center">
                              Fecha de Inicio <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="task-start-date"
                              name="start_date"
                              type="date"
                              value={newTask.start_date}
                              onChange={handleTaskChange}
                              required
                              className="border-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-end-date" className="flex items-center">
                              Fecha de Finalización <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="task-end-date"
                              name="end_date"
                              type="date"
                              value={newTask.end_date}
                              onChange={handleTaskChange}
                              required
                              className="border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="task-percent-done" className="flex items-center">
                              Porcentaje Completado ({newTask.percent_done}%) <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="task-percent-done"
                              name="percent_done"
                              type="range"
                              min="0"
                              max="100"
                              value={newTask.percent_done}
                              onChange={(e) => handleTaskNumberChange('percent_done', parseInt(e.target.value))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-resource" className="flex items-center">
                              Recurso Asignado <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="task-resource"
                              name="resource"
                              placeholder="Persona o recurso asignado"
                              value={newTask.resource}
                              onChange={handleTaskChange}
                              required
                              className="border-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="task-critical-path"
                              checked={newTask.is_critical_path}
                              onCheckedChange={(checked) => 
                                handleTaskCheckboxChange('is_critical_path', checked === true)}
                            />
                            <Label htmlFor="task-critical-path">Ruta Crítica</Label>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="task-color" className="flex items-center">
                              Color <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="task-color"
                              name="color"
                              type="color"
                              value={newTask.color}
                              onChange={handleTaskChange}
                              required
                              className="border-primary"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                          <Button type="button" variant="outline" onClick={() => setShowTaskForm(false)}>
                            Cancelar
                          </Button>
                          <Button type="button" onClick={addTask}>
                            Guardar Tarea
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.tasks && formData.tasks.length > 0 ? (
                    <div className="border rounded-md p-4">
                      <ul className="space-y-4">
                        {formData.tasks.map((task, index) => (
                          <li key={index} className="border rounded-md p-3 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <div className="w-full">
                                <div className="flex items-center justify-between w-full">
                                  <div className="font-medium text-base flex items-center">
                                    {task.color && (
                                      <div 
                                        className="w-3 h-3 rounded-full mr-2" 
                                        style={{ backgroundColor: task.color }}
                                      ></div>
                                    )}
                                    {task.name}
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTask(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    Eliminar
                                  </Button>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mt-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    task.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                    task.status === "in_progress" ? "bg-blue-100 text-blue-800" :
                                    "bg-green-100 text-green-800"
                                  }`}>
                                    {task.status === "pending" && "Pendiente"}
                                    {task.status === "in_progress" && "En Progreso"}
                                    {task.status === "completed" && "Completada"}
                                  </span>
                                  
                                  {task.is_critical_path && (
                                    <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                                      Ruta Crítica
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 space-y-2">
                              {/* Barra de progreso para percent_done */}
                              <div>
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                  <span>Progreso:</span>
                                  <span>{task.percent_done || 0}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${task.percent_done || 0}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {/* Fechas y detalles en un grid */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm border-t pt-2 mt-2">
                                <div>
                                  <span className="text-muted-foreground font-medium">Inicio:</span> {task.start_date || 'No definido'}
                                </div>
                                
                                <div>
                                  <span className="text-muted-foreground font-medium">Fin:</span> {task.end_date || 'No definido'}
                                </div>
                                
                                <div>
                                  <span className="text-muted-foreground font-medium">Recurso:</span> {task.resource || 'No asignado'}
                                </div>
                                
                                <div>
                                  <span className="text-muted-foreground font-medium">Duración:</span> {task.start_date && task.end_date ? 
                                    calcularDuracion(task.start_date, task.end_date) : 'No definida'}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No hay tareas añadidas
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href="/admin/projects">
                  <Button variant="outline" type="button">Cancelar</Button>
                </Link>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Actualizando...
                    </>
                  ) : (
                    <>Guardar Cambios</>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
