"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DatePicker } from "@/components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { updateProject, getProject } from "@/lib/api"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Loader2, ArrowLeft, Save, PlusCircle, Upload } from "lucide-react"
import React from "react"

// Interfaz para el tipo de proyecto
interface Project {
  id: string
  name: string
  client: string
  start_date?: string
  end_date?: string
  description?: string
  progress: number
  status?: string
  tasks?: Task[]
  updates?: Update[]
}

// Interfaz para la tarea
interface Task {
  id: number
  name: string
  status: string
  completed?: boolean
}

// Interfaz para las actualizaciones
interface Update {
  id: number
  date: string
  content: string
}

export default function UpdateProject({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const id = React.use(params).id;
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newTask, setNewTask] = useState("")
  const [newUpdate, setNewUpdate] = useState("")
  
  const [project, setProject] = useState<Project>({
    id: "",
    name: "",
    client: "",
    description: "",
    progress: 0,
    start_date: "",
    end_date: "",
  })

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        console.log(`Obteniendo proyecto con ID: ${id}`)
        
        try {
          const data = await getProject(id)
          console.log("Datos del proyecto recibidos:", data)
          
          if (!data) {
            throw new Error("No se encontró el proyecto")
          }
          
          // Formatear las fechas si es necesario
          const formattedData = {
            ...data,
            start_date: data.start_date || "",
            end_date: data.end_date || "",
          }
          
          setProject(formattedData)
        } catch (apiError) {
          console.error("Error al obtener datos de la API:", apiError)
          
          // Mostrar toast de error de conexión
          toast({
            title: "Error de conexión",
            description: "No se pudo conectar con la API. Usando datos de prueba.",
            variant: "destructive",
          })
          
          // Usar datos de prueba si no se puede conectar con la API
          setProject({
            id: id,
            name: "Proyecto de Prueba",
            client: "Cliente de Prueba",
            start_date: "2024-01-15",
            end_date: "2024-06-30",
            description: "Este es un proyecto de prueba usado cuando no se puede conectar a la API.",
            progress: 50,
            status: "En progreso",
          })
        }
      } catch (error: any) {
        console.error("Error general:", error)
        toast({
          title: "Error",
          description: error.message || "Ocurrió un error al cargar el proyecto",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProject()
    }
  }, [id, toast])

  // Función para actualizar el progreso manualmente
  const handleProgressChange = (value: number[]) => {
    setProject(prev => ({
      ...prev,
      progress: value[0]
    }))
  }

  // Función para manejar cambios en el estado del proyecto
  const handleStatusChange = (value: string) => {
    setProject(prev => ({
      ...prev,
      status: value
    }))
  }

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProject(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Función para actualizar el estado de una tarea
  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = project.tasks?.map((task) => 
      task.id === taskId 
        ? { 
            ...task, 
            completed: !task.completed,
            status: !task.completed ? "completed" : "in-progress" 
          } 
        : task
    );
    
    setProject(prev => ({
      ...prev,
      tasks: updatedTasks
    }));
  }

  // Función para añadir una nueva tarea
  const addTask = () => {
    if (!newTask.trim()) return;
    
    const newTaskId = project.tasks ? Math.max(0, ...project.tasks.map(t => t.id)) + 1 : 1;
    
    setProject(prev => ({
      ...prev,
      tasks: [
        ...(prev.tasks || []),
        {
          id: newTaskId,
          name: newTask,
          status: "not-started",
          completed: false
        }
      ]
    }));
    
    setNewTask("");
  };

  // Función para añadir una nueva actualización
  const addUpdate = () => {
    if (!newUpdate.trim()) return;
    
    const newUpdateId = project.updates ? Math.max(0, ...project.updates.map(u => u.id)) + 1 : 1;
    
    setProject(prev => ({
      ...prev,
      updates: [
        ...(prev.updates || []),
        {
          id: newUpdateId,
          date: new Date().toISOString().split('T')[0],
          content: newUpdate
        }
      ]
    }));
    
    setNewUpdate("");
  };

  // Función para guardar los cambios
  const saveChanges = async () => {
    try {
      setIsSaving(true)
      console.log("Guardando cambios en el proyecto:", project)
      
      // Asegurarse de que todas las tareas tengan el campo status
      const updatedProject = {
        ...project,
        tasks: project.tasks?.map(task => ({
          ...task,
          status: task.status || (task.completed ? "completed" : "in-progress")
        }))
      };
      
      await updateProject(id, updatedProject)
      
      toast({
        title: "Cambios guardados",
        description: "Los cambios en el proyecto han sido guardados correctamente.",
        variant: "default",
      })
    } catch (error: any) {
      console.error("Error al guardar los cambios:", error)
      
      // Intentar extraer detalles del error para mostrar un mensaje más útil
      let errorMessage = "No se pudieron guardar los cambios en el proyecto.";
      
      if (error.message && error.message.includes('422')) {
        errorMessage = "Error de validación: Hay campos requeridos que faltan o son incorrectos.";
        
        // Si hay detalles específicos del error, mostrarlos
        if (error.details) {
          try {
            const details = JSON.parse(error.details);
            if (details.detail && Array.isArray(details.detail)) {
              const fieldErrors = details.detail.map((err: any) => 
                `Campo ${err.loc.join('.')} - ${err.msg}`
              ).join(', ');
              errorMessage += ` Detalles: ${fieldErrors}`;
            }
          } catch (e) {
            console.error("Error al parsear detalles del error:", e);
          }
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/projects">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            {isLoading ? "Cargando proyecto..." : `Actualizar Proyecto: ${project.name}`}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs defaultValue="progress" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="progress">Progreso</TabsTrigger>
              <TabsTrigger value="tasks">Tareas</TabsTrigger>
              <TabsTrigger value="updates">Actualizaciones</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
            </TabsList>

            {/* Pestaña de Progreso */}
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Actualizar Progreso del Proyecto</CardTitle>
                  <CardDescription>Actualiza el progreso general y la fecha estimada de finalización.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="progress">Progreso del Proyecto: {project.progress}%</Label>
                      <span className="text-sm text-muted-foreground">Basado en tareas completadas</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{project.progress}%</span>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#1e40af"
                            strokeWidth="10"
                            strokeDasharray="282.7"
                            strokeDashoffset={282.7 - (282.7 * project.progress) / 100}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <Slider
                          id="progress"
                          value={[project.progress]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={handleProgressChange}
                          className="py-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Fecha de Inicio</Label>
                      <DatePicker 
                        id="start_date" 
                        name="start_date"
                        value={project.start_date || ""} 
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_date">Fecha Estimada de Finalización</Label>
                      <DatePicker 
                        id="end_date" 
                        name="end_date"
                        value={project.end_date || ""} 
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Estado del Proyecto</Label>
                    <Select value={project.status} onValueChange={handleStatusChange}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">No iniciado</SelectItem>
                        <SelectItem value="in-progress">En progreso</SelectItem>
                        <SelectItem value="on-hold">En pausa</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Notas sobre el Progreso</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      placeholder="Añade notas sobre el progreso actual del proyecto" 
                      value={project.description || ""}
                      onChange={handleChange}
                      rows={4} 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto" onClick={saveChanges} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Pestaña de Tareas */}
            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Gestionar Tareas</CardTitle>
                  <CardDescription>Actualiza el estado de las tareas y añade nuevas tareas al proyecto.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {project.tasks && project.tasks.length > 0 ? (
                        project.tasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-2 p-2 border rounded-md hover:bg-muted/50">
                            <Checkbox
                              id={`task-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() => toggleTaskCompletion(task.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={`task-${task.id}`}
                                className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {task.name}
                              </Label>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          No hay tareas añadidas a este proyecto
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Input
                        placeholder="Añadir nueva tarea"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addTask}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto" onClick={saveChanges} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Pestaña de Actualizaciones */}
            <TabsContent value="updates">
              <Card>
                <CardHeader>
                  <CardTitle>Actualizaciones del Proyecto</CardTitle>
                  <CardDescription>Registra las actualizaciones y avances del proyecto.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {project.updates && project.updates.length > 0 ? (
                      project.updates.map((update) => (
                        <div key={update.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{format(new Date(update.date), "d 'de' MMMM 'de' yyyy", { locale: es })}</span>
                          </div>
                          <p className="text-sm">{update.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No hay actualizaciones registradas
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="newUpdate">Nueva Actualización</Label>
                    <Textarea
                      id="newUpdate"
                      placeholder="Describe los avances o cambios realizados en el proyecto"
                      value={newUpdate}
                      onChange={(e) => setNewUpdate(e.target.value)}
                      rows={4}
                    />
                    <Button type="button" onClick={addUpdate}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Añadir Actualización
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto" onClick={saveChanges} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Pestaña de Documentos */}
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos del Proyecto</CardTitle>
                  <CardDescription>Gestiona los documentos y archivos relacionados con el proyecto.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border border-dashed rounded-md p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Subir Documentos</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Arrastra y suelta archivos aquí o haz clic para seleccionar archivos
                    </p>
                    <Button variant="outline">Seleccionar Archivos</Button>
                  </div>

                  <div className="text-center py-4 text-muted-foreground">
                    No hay documentos subidos
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full md:w-auto" disabled>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  )
}
