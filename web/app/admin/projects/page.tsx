"use client"

import { useEffect, useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Edit, Trash2, BarChart, Search, RefreshCw } from "lucide-react"
import Link from "next/link"
import { deleteProject } from "@/lib/api"
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

// Datos de prueba para cuando no se pueda conectar al backend
const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Sistema de Control Industrial para Planta Procesadora",
    client: "Caribbean Manufacturing Inc.",
    progress: 75,
    end_date: "2025-06-30",
    description: "Desarrollo de un sistema de control industrial para automatizar procesos de manufactura en la planta procesadora de alimentos, incluyendo monitoreo de temperatura, humedad y control de calidad."
  },
  {
    id: "p2",
    name: "Monitoreo Remoto de Equipos Médicos",
    client: "Hospital General del Caribe",
    progress: 30,
    end_date: "2025-08-15",
    description: "Sistema de monitoreo remoto para equipos médicos críticos con alertas en tiempo real y registro de datos para análisis posterior."
  },
  {
    id: "p3",
    name: "Plataforma IoT para Agricultura Sostenible",
    client: "AgroCaribeña S.A.",
    progress: 90,
    end_date: "2025-05-10",
    description: "Desarrollo de una plataforma IoT para monitoreo y control de cultivos en zonas rurales, incluyendo sensores de humedad del suelo, estaciones meteorológicas y sistemas de riego automatizado."
  },
  {
    id: "p4",
    name: "Sistema de Seguridad Inteligente para Hoteles",
    client: "Cadena Hotelera Tropical",
    progress: 45,
    end_date: "2025-07-20",
    description: "Sistema de seguridad con reconocimiento facial, control de acceso y monitoreo de áreas comunes para complejos hoteleros."
  },
  {
    id: "p5",
    name: "Red de Sensores para Monitoreo Ambiental",
    client: "Departamento de Medio Ambiente",
    progress: 60,
    end_date: "2025-09-05",
    description: "Implementación de una red de sensores para monitoreo de calidad del aire, nivel de ruido y otros parámetros ambientales en zonas urbanas."
  }
];

export default function ProjectsAdmin() {
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [useMockData, setUseMockData] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log("Obteniendo proyectos desde la API...")
      
      try {
        // Obtener el token de autenticación
        const token = localStorage.getItem('token')
        if (!token) {
          console.warn("No hay token de autenticación, la petición podría fallar")
        }
        
        // Hacer una petición directa al endpoint de proyectos
        const apiUrl = "http://127.0.0.1:8001/api/projects"
        console.log("Haciendo petición a:", apiUrl)
        
        const headers: HeadersInit = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
        
        // Añadir el token de autenticación si existe
        if (token) {
          headers['Authorization'] = `Bearer ${token}`
        }
        
        // Configuración simplificada para evitar problemas de CORS
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
        })
        
        console.log("Estado de la respuesta:", response.status, response.statusText)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error("Error texto:", errorText)
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log("Datos recibidos:", data)
        
        if (Array.isArray(data) && data.length > 0) {
          console.log("Datos reales recibidos:", data.length, "proyectos")
          setProjects(data)
          setUseMockData(false)
          toast({
            title: "Proyectos cargados",
            description: `Se han cargado ${data.length} proyectos de la base de datos`,
          })
        } else {
          console.warn("No se recibieron datos o el array está vacío, usando datos de prueba temporalmente")
          setProjects(mockProjects)
          setUseMockData(true)
          toast({
            title: "Usando datos temporales",
            description: "No hay proyectos en la base de datos. Mostrando datos de ejemplo temporalmente.",
          })
        }
      } catch (apiError: any) {
        console.error("Error al conectar con la API:", apiError)
        setProjects(mockProjects)
        setUseMockData(true)
        toast({
          title: "Error de conexión",
          description: `No se pudo conectar con la base de datos: ${apiError.message}. Usando datos temporales.`,
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
        
        if (useMockData) {
          // Si estamos usando datos de prueba, simulamos la eliminación
          setProjects(projects.filter(project => project.id !== id))
          toast({
            title: "Proyecto eliminado (simulado)",
            description: "El proyecto ha sido eliminado de los datos de prueba",
          })
          setIsLoading(false)
        } else {
          // Si estamos conectados al backend, usamos la API real
          await deleteProject(id)
          toast({
            title: "Proyecto eliminado",
            description: "El proyecto ha sido eliminado correctamente",
          })
          fetchProjects()
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

        {useMockData && (
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
            ) : error && !useMockData ? (
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
