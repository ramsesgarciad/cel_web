"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si el usuario está autenticado y es administrador
    const checkAuth = () => {
      try {
        // Verificar si hay un token de autenticación
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No hay sesión activa");
        }

        // Verificar si hay información del usuario
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          throw new Error("No hay información del usuario");
        }

        // Verificar si el usuario es administrador
        const user = JSON.parse(userStr);
        if (user.role !== "admin") {
          throw new Error("No tienes permisos de administrador");
        }

        // Usuario autenticado y con permisos de administrador
        setIsAuthorized(true);
      } catch (error) {
        console.error("Error de autenticación:", error);
        toast({
          title: "Acceso denegado",
          description: error.message || "Debes iniciar sesión como administrador",
          variant: "destructive",
        });
        
        // Redirigir al login
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, toast]);

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Mostrar el contenido solo si el usuario está autorizado
  return isAuthorized ? <>{children}</> : null;
}
