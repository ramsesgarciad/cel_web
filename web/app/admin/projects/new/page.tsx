"use client"

import { useState, useEffect } from "react"
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
import { createProject, usersApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Interfaz para el tipo de proyecto
interface ProjectFormData {
  name: string;
  client: string;
  start_date: string;
  end_date: string;
  description: string;
  progress?: number;
  tasks?: any[];
  users?: string[];
}

// Interfaz para la tarea
interface TaskData {
  name: string;
  status: string;
}

// Interface for User data fetched from API
interface UserOption {
  id: string;
  name: string;
  email: string;
}

export default function NewProject() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
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
  const [availableUsers, setAvailableUsers] = useState<UserOption[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await usersApi.getAll()
        if (Array.isArray(usersData)) {
          setAvailableUsers(usersData.map(user => ({ id: String(user.id), name: user.name, email: user.email })))
        }
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los usuarios.",
          variant: "destructive",
        })
      }
    }
    fetchUsers()
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUserSelectChange = (userId: string) => {
    if (userId === "__NONE__") {
      setSelectedUserId(undefined)
      setFormData((prev) => ({
        ...prev,
        users: [],
      }))
    } else {
      setSelectedUserId(userId)
      setFormData((prev) => ({
        ...prev,
        users: [userId],
      }))
    }
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
      console.log("Enviando datos del proyecto:", formData)
      
      // Asegurarse de que los datos tienen el formato correcto
      const projectData = {
        ...formData,
        progress: 0, // Iniciar con 0% de progreso
      }
      
      const response = await createProject(projectData)
      console.log("Proyecto creado:", response)
      
      toast({
        title: "Proyecto creado",
        description: "El proyecto ha sido creado correctamente",
      })
      
      // Redirigir a la lista de proyectos
      setTimeout(() => {
        router.push("/admin/projects")
      }, 1000)
    } catch (error: any) {
      console.error("Error al crear el proyecto:", error)
      
      toast({
        title: "Error",
        description: `No se pudo crear el proyecto: ${error.message || "Error desconocido"}`,
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
          <h1 className="text-2xl font-bold">Nuevo Proyecto</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crear Proyecto</CardTitle>
            <CardDescription>Completa la información para crear un nuevo proyecto.</CardDescription>
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

              <div className="space-y-2">
                <Label htmlFor="user">Asignar Usuario (Opcional)</Label>
                <Select value={selectedUserId || "__NONE__"} onValueChange={handleUserSelectChange}>
                  <SelectTrigger id="user">
                    <SelectValue placeholder="Selecciona un usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__NONE__"><em>Ninguno</em></SelectItem>
                    {availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    Creando...
                  </>
                ) : (
                  <>Crear Proyecto</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AdminLayout>
  )
}
