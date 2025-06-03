"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminLayout from '@/components/admin-layout'; 
import api from '@/lib/api'; 
const { users: usersApi } = api; 

export default function NewUser() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }

    if (!firstName || !email || !password || !role) {
        setError('Por favor, completa todos los campos obligatorios: Nombre, Email, Contraseña y Rol.');
        setIsLoading(false);
        return;
    }

    const userData = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      password,
      role,
      projects: [], 
    };

    try {
      const result = await usersApi.create(userData);
      if (result && !result.error) {
        setSuccess('Usuario creado exitosamente. Redirigiendo...');
        setTimeout(() => router.push('/admin/users'), 2000);
      } else {
        setError(result.message || 'Error al crear el usuario.');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    }
    setIsLoading(false);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crear Nuevo Usuario</h1>
        </div>

        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Información del Usuario</CardTitle>
              <CardDescription>Ingresa los detalles del nuevo usuario.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
              {success && <p className="text-green-500 bg-green-100 p-3 rounded-md">{success}</p>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input id="firstName" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input id="email" type="email" placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rol *</Label>
                <Select value={role} onValueChange={setRole} required>
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

              {/* Sección de Asignar Proyectos (funcionalidad futura) */}
              {/* <div className="space-y-2">
                <Label>Asignar Proyectos</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="project1" />
                    <Label htmlFor="project1" className="text-sm font-normal">
                      Proyecto Alpha
                    </Label>
                  </div>
                </div>
              </div> */}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/admin/users">
                <Button type="button" variant="outline" disabled={isLoading}>Cancelar</Button>
              </Link>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear Usuario'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
