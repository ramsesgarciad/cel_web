"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("user")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login form submitted")

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log(`Intentando login con: ${email}, ${password}, tipo: ${userType}`)
      
      let response;
      if (userType === "admin") {
        // @ts-ignore
        response = await login(email, password, true);
      } else {
        response = await login(email, password);
      }
      
      console.log("Respuesta de login:", response)

      if (response && response.user && response.access_token) {
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido, ${response.user.name}`,
        })
        
        // Pequeño retraso para permitir que el toast se muestre
        setTimeout(() => {
          // Redirección basada en el rol del usuario
          if (response.user.role === 'admin') {
            window.location.href = '/admin';
          } else if (response.user.role === 'user') {
            window.location.href = '/dashboard';
          } else {
            window.location.href = '/proyectos';
          }
        }, 1000);
      } else {
        console.error("La respuesta de login no contiene los datos esperados (user/access_token)", response);
        toast({
          title: "Error inesperado",
          description: "La respuesta del servidor no fue la esperada.",
          variant: "destructive",
        })
        setIsLoading(false);
      }

    } catch (error: any) {
      console.error("Error de inicio de sesión:", error)
      
      let errorMessage = error.message || "Credenciales incorrectas. Por favor, inténtalo de nuevo."
      
      if (userType === "admin" && error.message?.includes("User is not an administrator")) {
        errorMessage = "Este usuario no tiene permisos de administrador."
      }
      
      toast({
        title: "Error de inicio de sesión",
        description: errorMessage,
        variant: "destructive",
      })
      setIsLoading(false);
    }
  }

  const handleUserTypeChange = (value: string) => {
    setUserType(value)
    
    switch (value) {
      case "admin":
        setEmail("admin@example.com")
        setPassword("admin123")
        break
      case "user":
        setEmail("user@example.com")
        setPassword("user123")
        break
      case "client":
        setEmail("client@example.com")
        setPassword("client123")
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xl font-bold">P</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Bienvenido</CardTitle>
          <CardDescription>Inicia sesión para acceder a tu panel de proyectos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuario</Label>
              <Select value={userType} onValueChange={handleUserTypeChange}>
                <SelectTrigger id="userType">
                  <SelectValue placeholder="Selecciona tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuario Regular</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setRememberMe(checked);
                  }
                }}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Recordarme
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta? Contacta con tu administrador.
          </div>
          <div className="text-center text-xs text-muted-foreground">
            <p>Usuarios de prueba:</p>
            <p>Admin: admin@example.com / admin123</p>
            <p>Usuario: user@example.com / user123</p>
            <p>Cliente: client@example.com / client123</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
