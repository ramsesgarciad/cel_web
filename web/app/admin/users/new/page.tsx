import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function NewUser() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Crear Nuevo Usuario</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
          <CardDescription>Ingresa los detalles del nuevo usuario.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" placeholder="Nombre" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" placeholder="Apellido" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
                  <SelectItem value="viewer">Visualizador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Asignar Proyectos</Label>
              <div className="border rounded-md p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="project1" />
                  <Label htmlFor="project1" className="text-sm font-normal">
                    Proyecto Alpha
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="project2" />
                  <Label htmlFor="project2" className="text-sm font-normal">
                    Proyecto Beta
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="project3" />
                  <Label htmlFor="project3" className="text-sm font-normal">
                    Proyecto Gamma
                  </Label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/users">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button>Crear Usuario</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

