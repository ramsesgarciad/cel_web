"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, BarChart, Search, RefreshCw } from "lucide-react"
import Link from "next/link"
import { deleteProject, projectsApi } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

// Definir la interfaz para el tipo de proyecto
interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  end_date?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Los datos de ejemplo ahora se definen dentro del componente ProjectsAdmin

export default function ProjectsAdmin() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  // No usaremos datos de ejemplo, mostraremos un error cuando la API falle

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log("Obteniendo proyectos desde la API...")
      
      try {
        // Usar la función projectsApi.getAll() para obtener los proyectos
        // Esta función ya maneja la autenticación y los errores
        console.log("Llamando a projectsApi.getAll(0, 100)...")
        const data = await projectsApi.getAll(0, 100)
        console.log("Datos recibidos:", data)
        
        if (Array.isArray(data) && data.length > 0) {
          console.log("Datos reales recibidos:", data.length, "proyectos")
          setProjects(data)
          toast({
            title: "Proyectos cargados",
            description: `Se han cargado ${data.length} proyectos de la base de datos`,
          })
        } else {
          console.warn("No se recibieron datos o el array está vacío")
          setProjects([])
          setError("No hay proyectos disponibles en la base de datos.")
          toast({
            title: "Sin proyectos",
            description: "No hay proyectos en la base de datos.",
            variant: "destructive"
          })
        }
      } catch (apiError: any) {
        console.error("Error al conectar con la API:", apiError)
        setProjects([])
        setError("Error al conectar con la API")
        toast({
          title: "Error de conexión",
          description: `No se pudo conectar con la API: ${apiError.message}`,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      console.error("Error general:", error)
      setError(error.message || "Error desconocido")
      setProjects(mockProjects)
      setUseMockData(true)
      toast({
        title: "Error",
        description: `Error: ${error.message || "Error desconocido"}. Usando datos temporales.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.")) {
      try {
        setIsLoading(true)
        console.log(`Eliminando proyecto con ID: ${id}`)
        
        try {
          // Intentar eliminar el proyecto a través de la API
          await deleteProject(id)
          toast({
            title: "Proyecto eliminado",
            description: "El proyecto ha sido eliminado correctamente",
          })
          // Recargar la lista de proyectos
          fetchProjects()
        } catch (deleteError) {
          console.error("Error al eliminar el proyecto:", deleteError)
          // Si falla la API, mostrar un mensaje de error
          toast({
            title: "Error al eliminar",
            description: "No se pudo eliminar el proyecto. Por favor, inténtalo de nuevo más tarde.",
            variant: "destructive"
          })
          setIsLoading(false)
        }
      } catch (error: any) {
        console.error("Error al eliminar el proyecto:", error)
        toast({
          title: "Error",
          description: `No se pudo eliminar el proyecto: ${error.message || "Error desconocido"}`,
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administración de Proyectos</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={fetchProjects} disabled={isLoading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Link href="/admin/projects/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Proyecto
              </Button>
            </Link>
          </div>
        </div>

        {false && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
            <p className="font-medium">⚠️ Modo de demostración</p>
            <p className="text-sm">Estás viendo datos de prueba porque no se pudo conectar con el backend. Las acciones realizadas no afectarán datos reales.</p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Proyectos</CardTitle>
            <CardDescription>Gestiona los proyectos y asígnalos a usuarios.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar proyectos..."
                className="pl-10 max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>Error al cargar los proyectos:</p>
                <p>{error}</p>
                <Button variant="outline" onClick={fetchProjects} className="mt-4">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Intentar nuevamente
                </Button>
              </div>
            ) : filteredProjects.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre del Proyecto</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Progreso</TableHead>
                    <TableHead>Fecha Finalización</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.id}</TableCell>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.client}</TableCell>
                      <TableCell>{project.progress}%</TableCell>
                      <TableCell>
                        {project.end_date 
                          ? new Date(project.end_date).toLocaleDateString("es-ES") 
                          : "No definida"}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/admin/projects/${project.id}/update`}>
                            <Button variant="outline" size="sm" title="Actualizar progreso">
                              <BarChart className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Button variant="outline" size="sm" title="Editar proyecto">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDeleteProject(project.id)}
                            title="Eliminar proyecto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? 
                  `No se encontraron proyectos que coincidan con "${searchTerm}"` : 
                  "No hay proyectos disponibles"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
