import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default function UsersAdmin() {
  // Datos de ejemplo para usuarios
  const users = [
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Cliente", projects: 2 },
    { id: 2, name: "María García", email: "maria@example.com", role: "Administrador", projects: 5 },
    { id: 3, name: "Carlos Rodríguez", email: "carlos@example.com", role: "Cliente", projects: 1 },
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administración de Usuarios</h1>
          <Link href="/admin/users/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>Gestiona los usuarios y sus accesos a proyectos.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input placeholder="Buscar usuarios..." className="max-w-sm" />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Proyectos</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Administrador" ? "default" : "outline"}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.projects}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

