"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import AdminLayout from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, AlertCircle, Loader2 } from "lucide-react";
import api from '@/lib/api'; 
const { users: usersApi } = api; 

interface User {
  id: string; 
  name: string | null;
  email: string;
  role: string; 
  projects_count: number; 
  // Añade aquí otros campos que esperes de la API
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await usersApi.getAll(); // result can be User[] or { error: string, message: string }
        
        // Check for error property first (from fetchWithAuth)
        if (result && result.error) {
          setError(result.message || 'Error al obtener los usuarios.');
          setUsers([]); 
        } else if (Array.isArray(result)) { // If no error property, it should be an array of users
          setUsers(result);
        } else {
          // This case handles unexpected responses that are not errors from fetchWithAuth and not arrays
          setError('Respuesta inesperada del servidor al obtener usuarios.');
          setUsers([]);
        }
      } catch (err: any) { // Catch network errors or other exceptions from the try block
        setError(err.message || 'Ocurrió un error inesperado al cargar los usuarios.');
        setUsers([]);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (userId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      console.log(`Eliminar usuario con ID: ${userId}`);
    }
  };

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
              <Input 
                placeholder="Buscar usuarios por nombre o email..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {isLoading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">Cargando usuarios...</p>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center justify-center py-10 bg-red-50 p-4 rounded-md">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <p className="mt-2 text-red-700">Error: {error}</p>
                <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
                  Intentar de nuevo
                </Button>
              </div>
            )}

            {!isLoading && !error && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="w-[100px]">Proyectos</TableHead>
                    <TableHead className="w-[120px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium truncate" title={String(user.id)}>{String(user.id).substring(0,8)}...</TableCell>
                        <TableCell>{user.name || 'N/A'}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.role === "admin" ? "default" : user.role === "client" ? "secondary" : "outline"}
                          >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{user.projects_count}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" asChild>
                              <Link href={`/admin/users/${user.id}/edit`} title="Editar">
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon" className="text-red-500 hover:bg-red-100 hover:text-red-600" onClick={() => handleDelete(user.id)} title="Eliminar">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        No se encontraron usuarios{searchTerm && ' que coincidan con la búsqueda'}.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
