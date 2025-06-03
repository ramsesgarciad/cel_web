"use client"

import React, { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, PlusCircle, Trash, CalendarIcon, Check, Edit, Circle } from "lucide-react"
import { projectsApi, updateProject, tasksApi } from "@/lib/api"

// Interfaz para el tipo de proyecto
interface Update {
  id?: string;
  content: string;
  date: string;
  completed: boolean;
}

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
  updates?: Update[];
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

export default function UpdateProject({ params }: { params: { id: string } }) {
  const router = useRouter()
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
    updates: [],
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
  const [newUpdate, setNewUpdate] = useState<Update>({
    content: "",
    date: new Date().toISOString().split('T')[0],
    completed: false
  })

  // Unwrap params using React.use() as recommended by Next.js
  const { id } = use(params);
  
  useEffect(() => {
    // Use the unwrapped id directly
    
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        console.log(`Obteniendo proyecto con ID: ${id}`)
        
        const data = await projectsApi.getById(id)
        
        if (data.error) {
          console.error("Error al obtener el proyecto:", data.error)
          toast({
            title: "Error",
            description: `No se pudo cargar el proyecto: ${data.message || "Error desconocido"}`,
            variant: "destructive",
          })
          return
        }
        
        console.log("Proyecto cargado:", data)
        
        // Formatear las fechas para el input type="date"
        const formatDate = (dateString: string | undefined) => {
          if (!dateString) return ""
          const date = new Date(dateString)
          return date.toISOString().split('T')[0]
        }
        
        setFormData({
          ...data,
          start_date: formatDate(data.start_date),
          end_date: formatDate(data.end_date),
          tasks: data.tasks || [],
        })
      } catch (error) {
        console.error("Error al cargar el proyecto:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar el proyecto. Por favor, inténtelo de nuevo.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProject()
    // Now we can use id directly in the dependency array
  }, [id, toast])
  
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
      progress: value,
    }))
  }
  
  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Asegurarnos de que nunca se establezca un valor null
    const safeValue = value === null ? "" : value;
    
    setNewTask(prev => ({
      ...prev,
      [name]: safeValue
    }));
  }
  
  const handleTaskNumberChange = (field: string, value: number) => {
    setNewTask((prev) => ({
      ...prev,
      [field]: value,
    }))
  }
  
  const handleTaskCheckboxChange = (field: string, checked: boolean) => {
    setNewTask((prev) => ({
      ...prev,
      [field]: checked,
    }))
  }
  
  const handleTaskStatusChange = (value: string) => {
    // Asegurarnos de que nunca se establezca un valor null
    const safeValue = value === null ? "pending" : value;
    
    setNewTask(prev => ({
      ...prev,
      status: safeValue
    }));
  }
  
  const calculateDuration = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "No definida";
    
    try {
      const inicio = new Date(startDate);
      const fin = new Date(endDate);
      
      // Calcular la diferencia en días
      const diferencia = Math.max(1, Math.round((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)));
      
      return `${diferencia} día${diferencia !== 1 ? 's' : ''}`;
    } catch (error) {
      console.error('Error al calcular duración:', error);
      return 'No definida';
    }
  }

  const addTask = async () => {
    console.log('[DEBUG] Intentando añadir tarea:', JSON.stringify(newTask));
    
    // Validar campos obligatorios
    if (!newTask.name || newTask.name.trim() === "") {
      toast({
        title: "Error",
        description: "El nombre de la tarea es obligatorio",
        variant: "destructive",
      });
      return;
    }

    if (!newTask.start_date) {
      toast({
        title: "Error",
        description: "La fecha de inicio es obligatoria",
        variant: "destructive",
      });
      return;
    }

    if (!newTask.end_date) {
      toast({
        title: "Error",
        description: "La fecha de fin es obligatoria",
        variant: "destructive",
      });
      return;
    }

    const startDate = new Date(newTask.start_date);
    const endDate = new Date(newTask.end_date);
    if (endDate < startDate) {
      toast({
        title: "Error",
        description: "La fecha de fin no puede ser anterior a la fecha de inicio",
        variant: "destructive",
      });
      return;
    }

    if (!newTask.resource || newTask.resource.trim() === "") {
      toast({
        title: "Error",
        description: "El recurso asignado es obligatorio",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: newTask.name.trim(),
      status: newTask.status,
      start_date: newTask.start_date,
      end_date: newTask.end_date,
      percent_done: newTask.percent_done || 0,
      resource: newTask.resource.trim(),
      is_critical_path: Boolean(newTask.is_critical_path),
      color: newTask.color || "#3b82f6",
    };

    try {
      const createdTask = await tasksApi.create(params.id, payload);
      setFormData(prev => ({ ...prev, tasks: [...(prev.tasks || []), createdTask] }));
      toast({
        title: "Tarea añadida",
        description: `La tarea "${createdTask.name}" ha sido añadida correctamente`
      });
      setNewTask({ name: "", status: "pending", start_date: "", end_date: "", percent_done: 0, resource: "", is_critical_path: false, color: "#3b82f6" });
      setShowTaskForm(false);
    } catch (error: any) {
      console.error("Error al crear tarea:", error);
      toast({
        title: "Error al crear tarea",
        description: error.message || "No se pudo crear la tarea.",
        variant: "destructive",
      });
    }
  }

  const updateTask = async (index: number, updatedTaskData: Partial<TaskData>) => {
    if (!formData.tasks) return;
    const task = formData.tasks[index];
    try {
      const updatedTask = await tasksApi.update(params.id, task.id!, updatedTaskData);
      setFormData(prev => ({ ...prev, tasks: prev.tasks!.map((t, i) => i === index ? updatedTask : t) }));
      toast({
        title: "Tarea actualizada",
        description: `La tarea "${updatedTask.name}" ha sido actualizada correctamente`
      });
    } catch (error: any) {
      console.error("Error al actualizar tarea:", error);
      toast({
        title: "Error al actualizar tarea",
        description: error.message || "No se pudo actualizar la tarea.",
        variant: "destructive",
      });
    }
  }

  const removeTask = async (index: number) => {
    if (!formData.tasks || index < 0 || index >= (formData.tasks?.length || 0)) {
      toast({
        title: "Error",
        description: "Índice de tarea inválido.",
        variant: "destructive",
      });
      return;
    }
    const taskToRemove = formData.tasks[index];
    try {
      await tasksApi.delete(params.id, taskToRemove.id!);
      setFormData(prev => ({ ...prev, tasks: prev.tasks!.filter((_, i) => i !== index) }));
      toast({
        title: "Tarea eliminada",
        description: `La tarea "${taskToRemove.name}" ha sido eliminada correctamente`
      });
    } catch (error: any) {
      console.error("Error al eliminar tarea:", error);
      toast({
        title: "Error al eliminar tarea",
        description: error.message || "No se pudo eliminar la tarea.",
        variant: "destructive",
      });
    }
  }

  const toggleTaskCompletion = async (index: number) => {
    if (!formData.tasks) return;
    const task = formData.tasks[index];
    const newStatus = task.status === "completed" ? "pending" : "completed";
    const newPercentDone = newStatus === "completed" ? 100 : 0;
    await updateTask(index, { status: newStatus, percent_done: newPercentDone });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('Submit!');
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validar que los campos obligatorios del proyecto estén completos
      if (!formData.name || !formData.client || !formData.description) {
        setIsLoading(false);
        toast({
          title: "Error en proyecto",
          description: "Los campos nombre, cliente y descripción son obligatorios.",
          variant: "destructive",
        });
        console.log('[VALIDATION FAIL] Project fields missing: name, client, or description.');
        return;
      }

      // Validar que todas las tareas tengan los campos obligatorios completos
      console.log('[DEBUG] Todas las tareas antes de validar:', formData.tasks?.length || 0);
      
      // Implementar validación más flexible
      const validateTasks = (tasks: any[]) => {
        const validTasks = [];
        const invalidTasks = [];

        tasks.forEach(task => {
          // Validaciones mínimas requeridas
          const isValid = task.name && 
                         task.name.trim() !== '' && 
                         task.start_date && 
                         task.end_date && 
                         task.resource && 
                         task.resource.trim() !== '';

          if (isValid) {
            validTasks.push({
              id: task.id || `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: task.name.trim(),
              status: task.status || "pending",
              start_date: task.start_date,
              end_date: task.end_date,
              percent_done: Number(task.percent_done || 0),
              resource: task.resource.trim(),
              is_critical_path: Boolean(task.is_critical_path),
              color: task.color || "#3b82f6"
            });
          } else {
            // Registrar qué campos faltan para depuración
            const camposFaltantes = [];
            if (!task.name || task.name.trim() === '') camposFaltantes.push('nombre');
            if (!task.start_date) camposFaltantes.push('fecha inicio');
            if (!task.end_date) camposFaltantes.push('fecha fin');
            if (!task.resource || task.resource.trim() === '') camposFaltantes.push('recurso');
            
            console.log(`[DEBUG] Tarea con campos faltantes: ${task.name || '[Sin nombre]'}, Campos: ${camposFaltantes.join(', ')}`);
            invalidTasks.push(task);
          }
        });

        return { validTasks, invalidTasks };
      };
      
      // Aplicar la validación
      const { validTasks: tareasValidas, invalidTasks: tareasIncompletas } = 
        validateTasks(formData.tasks || []);
      
      // Alertar al usuario si se encontraron tareas incompletas
      if (tareasIncompletas.length > 0) {
        console.log(`[INFO] Se encontraron ${tareasIncompletas.length} tarea(s) incompletas que serán excluidas del envío.`);
        toast({
          title: "Aviso",
          description: `Se encontraron ${tareasIncompletas.length} tarea(s) incompletas que serán excluidas del envío.`,
          variant: "default",
        });
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
      const formatDate = (dateString: string | undefined) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      };

      // Calcular el estado del proyecto basado en el progreso
      const calculateStatus = (progress: number) => {
        if (progress >= 100) return "Completado";
        if (progress > 0) return "En progreso";
        return "Planificación";
      };

      // Las tareas ya están validadas y formateadas por validateTasks
      // Solo necesitamos asegurar que las fechas estén en formato YYYY-MM-DD
      const formattedTasks = tareasValidas.map(task => {
        return {
          // Asegurar que el ID es string si existe
          id: task.id ? String(task.id) : undefined,
          name: String(task.name).trim(),
          status: String(task.status || "pending"),
          // Asegurar que las fechas están en formato YYYY-MM-DD
          start_date: new Date(task.start_date).toISOString().split('T')[0],
          end_date: new Date(task.end_date).toISOString().split('T')[0],
          // Asegurar que el porcentaje es un número
          percent_done: Number(task.percent_done || 0),
          // Asegurar que resource es un string
          resource: String(task.resource).trim(),
          // Asegurar que is_critical_path es boolean
          is_critical_path: Boolean(task.is_critical_path),
          // Asegurar que color es un string
          color: String(task.color || "#3b82f6")
        };
      });

      console.log('[DEBUG] Tareas válidas a enviar:', formattedTasks.length);
      if (formattedTasks.length > 0) {
        console.log('[DEBUG] Detalle de la primera tarea:', JSON.stringify(formattedTasks[0]));
      } else {
        console.log('[DEBUG] No hay tareas para enviar');
      }

      // Crear un objeto limpio con solo los campos necesarios para el proyecto
      const projectData = {
        id: String(formData.id), // Asegurar que el ID es string
        name: String(formData.name).trim(),
        client: String(formData.client).trim(),
        description: String(formData.description || "").trim(),
        tasks: formattedTasks,
        status: calculateStatus(formData.progress || 0),
        start_date: formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : "",
        end_date: formData.end_date ? new Date(formData.end_date).toISOString().split('T')[0] : "",
        progress: Number(formData.progress || 0),
        updates: formData.updates?.map(update => ({
          id: update.id,
          content: update.content,
          date: update.date,
          completed: Boolean(update.completed)
        })) || []
      };
      
      console.log("Campos requeridos:", {
        name: projectData.name,
        client: projectData.client,
        description: projectData.description,
        start_date: projectData.start_date,
        end_date: projectData.end_date,
        tasks: projectData.tasks?.length || 0
      });
      
      // Convertir el objeto a JSON y luego de vuelta a objeto para eliminar propiedades indefinidas
      const cleanProjectData = JSON.parse(JSON.stringify(projectData));
      console.log('[DEBUG] Datos limpios a enviar:', cleanProjectData);
      
      // Enviar los datos al backend
      console.log('[DEBUG] Enviando datos al backend...');
      const response = await updateProject(params.id, cleanProjectData);
      console.log('[DEBUG] Respuesta del backend:', response);

      setIsLoading(false);
      toast({
        title: "Proyecto actualizado",
        description: "El proyecto ha sido actualizado correctamente",
      });

      // Redirigir a la página de detalles del proyecto
      router.push(`/admin/projects/${params.id}`);
    } catch (error: any) {
      console.error("Error en la validación de datos:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message || "Ha ocurrido un error al procesar los datos",
        variant: "destructive",
      });
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
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="tasks">Tareas</TabsTrigger>
                  <TabsTrigger value="updates">Actualizaciones</TabsTrigger>
                  <TabsTrigger value="documents">Documentos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="mt-4">
                <div className="space-y-4">
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

                </div>
                </TabsContent>

                <TabsContent value="tasks" className="mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Tareas del Proyecto</Label>
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
                        {formData.tasks?.map((task, index) => (
                          <li key={`task-${task.id || index}-${index}`} className="p-3 border rounded-md relative bg-background">
                            <div className="absolute top-2 right-2 flex gap-1">
                              {/* Botón para editar */}
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                  // Cargar datos de la tarea en el formulario para editar
                                  console.log('[DEBUG] Editando tarea con ID:', task.id, 'en índice:', index);
                                  
                                  // Asegurarnos de que todos los campos estén definidos y no sean null
                                  setNewTask({
                                    id: task.id, // Mantener el ID para identificar que es una edición
                                    name: task.name || '',
                                    status: task.status || 'pending',
                                    start_date: task.start_date || '',
                                    end_date: task.end_date || '',
                                    percent_done: task.percent_done || 0,
                                    resource: task.resource || '',
                                    is_critical_path: Boolean(task.is_critical_path),
                                    color: task.color || '#3b82f6'
                                  });
                                  
                                  // Mostrar el formulario de edición
                                  setShowTaskForm(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              
                              {/* Botón para eliminar */}
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon"
                                className="h-6 w-6 text-destructive hover:text-destructive/80"
                                onClick={() => removeTask(index)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* Toggle completion */}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 left-2"
                              onClick={() => toggleTaskCompletion(index)}
                            >
                              {task.status === "completed" ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Circle className="h-4 w-4" />
                              )}
                            </Button>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8 mr-16 mt-2">
                              <div>
                                <p className="font-semibold flex items-center gap-2">
                                  <span 
                                    className="block w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: task.color || "#3b82f6" }}
                                  ></span>
                                  {task.name}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Estado: <span className="font-medium">
                                    {task.status === "pending" ? "Pendiente" : 
                                     task.status === "in_progress" ? "En Progreso" : 
                                     "Completada"}
                                  </span>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Recurso: <span className="font-medium">{task.resource}</span>
                                </p>
                                {task.is_critical_path && (
                                  <p className="text-sm font-medium text-destructive mt-1">
                                    Ruta crítica
                                  </p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Inicio: <span className="font-medium">{task.start_date}</span>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Fin: <span className="font-medium">{task.end_date}</span>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Duración: <span className="font-medium">{calculateDuration(task.start_date, task.end_date)}</span>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Progreso: <span className="font-medium">{task.percent_done || 0}%</span>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-center p-6 border rounded-md bg-muted/20">
                      <p className="text-muted-foreground">No hay tareas definidas para este proyecto.</p>
                      <p className="text-sm mt-1">Haga clic en "Nueva Tarea" para agregar una.</p>
                    </div>
                  )}
                </div>
                </TabsContent>

                <TabsContent value="updates" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Actualizaciones del Proyecto</Label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          // Agregar nueva actualización
                          setFormData(prev => ({
                            ...prev,
                            updates: [
                              ...(prev.updates || []),
                              newUpdate
                            ]
                          }));
                          
                          // Reiniciar el formulario
                          setNewUpdate({
                            content: "",
                            date: new Date().toISOString().split('T')[0],
                            completed: false
                          });
                          
                          toast({
                            title: "Actualización agregada",
                            description: "La actualización ha sido agregada correctamente"
                          });
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Agregar Actualización
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="update-content">Descripción</Label>
                        <Textarea
                          id="update-content"
                          placeholder="Describa el avance o actualización"
                          value={newUpdate.content}
                          onChange={(e) => setNewUpdate({...newUpdate, content: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 gap-2">
                          <div>
                            <Label htmlFor="update-date">Fecha</Label>
                            <div className="flex mt-1">
                              <Input
                                id="update-date"
                                type="date"
                                value={newUpdate.date}
                                onChange={(e) => setNewUpdate({...newUpdate, date: e.target.value})}
                                className="w-full"
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Checkbox 
                              id="update-completed"
                              checked={newUpdate.completed}
                              onCheckedChange={(checked) => 
                                setNewUpdate({...newUpdate, completed: checked === true})}
                            />
                            <Label htmlFor="update-completed">Marcar como completado</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {formData.updates && formData.updates.length > 0 ? (
                      <div className="border rounded-md p-4 mt-4">
                        <ul className="space-y-4">
                          {formData.updates.map((update, index) => (
                            <li key={index} className="p-3 border rounded-md relative bg-background">
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon"
                                className="absolute top-2 right-2 h-6 w-6 text-destructive hover:text-destructive/80"
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    updates: prev.updates?.filter((_, i) => i !== index) || []
                                  }));
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                              <div className="grid grid-cols-1 gap-3">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{update.date}</span>
                                    {update.completed && (
                                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        <Check className="h-3 w-3 mr-1" />
                                        Completado
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-2">{update.content}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center p-6 border rounded-md bg-muted/20">
                        <p className="text-muted-foreground">No hay actualizaciones registradas para este proyecto.</p>
                        <p className="text-sm mt-1">Utilice el formulario para agregar actualizaciones o hitos importantes.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <div className="text-center p-6 border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Funcionalidad de documentos en desarrollo.</p>
                    <p className="text-sm mt-1">Próximamente podrá subir y gestionar documentos del proyecto.</p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/admin/projects")}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Guardando...
                    </>
                  ) : (
                    "Guardar Cambios"
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
