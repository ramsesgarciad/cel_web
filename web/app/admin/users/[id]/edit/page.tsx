"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

const { users: usersApi } = api;

// Interfaz para el tipo de usuario
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  projects?: string[];
}

export default function EditUser({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: "client",
    projects: []
  })
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const id = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        console.log(`Obteniendo usuario con ID: ${id}`)
        
        try {
          const data = await usersApi.getById(id)
          console.log("Datos del usuario recibidos:", data)
          
          if (!data) {
            throw new Error("No se recibieron datos de la API")
          }
          
          setFormData({
            id: data.id,
            name: data.name || "",
            email: data.email || "",
            role: data.role || "client",
            projects: data.projects || []
          })
          
          toast({
            title: "Usuario cargado",
            description: "La información del usuario se ha cargado correctamente",
          })
        } catch (apiError: any) {
          console.error("Error al obtener el usuario:", apiError)
          toast({
            title: "Error",
            description: `No se pudo cargar el usuario: ${apiError.message || "Error desconocido"}`,
            variant: "destructive",
          })
          // Redirigir a la lista de usuarios si no se puede cargar
          setTimeout(() => {
            router.push("/admin/users")
          }, 2000)
        }
      } catch (error: any) {
        console.error("Error al cargar el usuario:", error)
        toast({
          title: "Error",
          description: `No se pudo cargar el usuario: ${error.message || "Error desconocido"}`,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchUser()
    }
  }, [id, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validar contraseñas si se está actualizando
    if (password && password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Crear objeto de actualización
    const updateData = {
      ...formData
    }

    // Solo incluir contraseña si se proporciona una nueva
    if (password) {
      updateData.password = password
    }

    try {
      console.log("Actualizando usuario:", updateData)
      
      const response = await usersApi.update(id, updateData)
      console.log("Usuario actualizado:", response)
      
      toast({
        title: "Usuario actualizado",
        description: "El usuario ha sido actualizado correctamente",
      })
      
      // Redirigir a la lista de usuarios
      setTimeout(() => {
        router.push("/admin/users")
      }, 1000)
    } catch (error: any) {
      console.error("Error al actualizar el usuario:", error)
      
      toast({
        title: "Error",
        description: `No se pudo actualizar el usuario: ${error.message || "Error desconocido"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/users" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la lista de usuarios
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Editar Usuario</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
              <CardDescription>Actualice los detalles del usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Nombre completo" 
                  disabled={isLoading} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="correo@ejemplo.com" 
                  disabled={isLoading} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={handleRoleChange} 
                  disabled={isLoading}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="viewer">Visualizador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Nueva contraseña (dejar en blanco para mantener la actual)</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Nueva contraseña" 
                  disabled={isLoading} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password"
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  placeholder="Confirmar nueva contraseña" 
                  disabled={isLoading} 
                />
              </div>

              {/* Aquí se podrían agregar campos para seleccionar proyectos en futuras versiones */}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/admin/users')}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AdminLayout>
  )
}
