"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  tasks?: any[];
  users?: any[];
}

// Interfaz para la tarea
interface TaskData {
  name: string;
  status: string;
}

export default function EditProject({ params }: { params: { id: string } }) {
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
  })
  const [newTask, setNewTask] = useState<TaskData>({
    name: "",
    status: "pending",
  })

  const id = React.use(params).id;

  useEffect(() => {
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
          
          setFormData({
            id: data.id,
            name: data.name || "",
            client: data.client || "",
            start_date: data.start_date || "",
            end_date: data.end_date || "",
            description: data.description || "",
            progress: data.progress || 0,
            tasks: data.tasks || [],
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

    if (id) {
      fetchProject()
    }
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

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const addTask = () => {
    if (!newTask.name) return
    setFormData((prev) => ({
      ...prev,
      tasks: [...(prev.tasks || []), newTask],
    }))
    setNewTask({
      name: "",
      status: "pending",
    })
  }

  const removeTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Actualizando proyecto:", formData)
      
      const response = await updateProject(id, formData)
      console.log("Proyecto actualizado:", response)
      
      toast({
        title: "Proyecto actualizado",
        description: "El proyecto ha sido actualizado correctamente",
      })
      
      // Redirigir a la lista de proyectos
      setTimeout(() => {
        router.push("/admin/projects")
      }, 1000)
    } catch (error: any) {
      console.error("Error al actualizar el proyecto:", error)
      
      toast({
        title: "Error",
        description: `No se pudo actualizar el proyecto: ${error.message || "Error desconocido"}`,
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
                      <Input
                        placeholder="Nombre de la tarea"
                        value={newTask.name}
                        name="name"
                        onChange={handleTaskChange}
                        className="w-48 md:w-64"
                      />
                      <Select value={newTask.status} onValueChange={handleTaskStatusChange}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="in_progress">En Progreso</SelectItem>
                          <SelectItem value="completed">Completada</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="button" variant="outline" onClick={addTask}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Añadir
                      </Button>
                    </div>
                  </div>

                  {formData.tasks && formData.tasks.length > 0 ? (
                    <div className="border rounded-md p-4">
                      <ul className="space-y-2">
                        {formData.tasks.map((task, index) => (
                          <li key={index} className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{task.name}</span>
                              <span className="ml-2 text-sm text-muted-foreground">
                                {task.status === "pending" && "Pendiente"}
                                {task.status === "in_progress" && "En Progreso"}
                                {task.status === "completed" && "Completada"}
                              </span>
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
