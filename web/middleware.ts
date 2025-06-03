import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rutas protegidas que requieren autenticación
const protectedRoutes = ["/admin", "/dashboard", "/proyectos"]

// Rutas permitidas para clientes
const clientAllowedRoutes = ["/dashboard", "/login", "/logout"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Ignorar rutas de recursos estáticos y API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") // archivos como favicon.ico, etc.
  ) {
    return NextResponse.next()
  }
  
  // Obtener token de autenticación y datos del usuario
  const authToken = request.cookies.get("authToken")?.value
  const userDataCookie = request.cookies.get("userData")?.value
  
  // Verificar si hay datos de usuario y token
  if (authToken && userDataCookie) {
    try {
      // Parsear los datos del usuario
      const userData = JSON.parse(decodeURIComponent(userDataCookie))
      console.log("Middleware - Datos de usuario:", userData)
      
      // Verificar si el usuario es un cliente
      if (userData.role === "client") {
        // Si el cliente está intentando acceder a una ruta que no es el dashboard
        // y no es una ruta permitida para clientes
        if (pathname !== "/dashboard" && !clientAllowedRoutes.some(route => pathname.startsWith(route))) {
          console.log("Middleware - Redirigiendo cliente a dashboard desde:", pathname)
          // Redirigir al dashboard
          const url = new URL("/dashboard", request.url)
          return NextResponse.redirect(url)
        }
      }
    } catch (error) {
      console.error("Middleware - Error al verificar el rol del usuario:", error)
    }
  }
  
  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !authToken) {
    console.log("Middleware - Redirigiendo a login por falta de autenticación")
    const url = new URL("/login", request.url)
    return NextResponse.redirect(url)
  }
  
  // Permitir acceso a la ruta solicitada
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas de API)
     * 2. /_next (archivos de Next.js)
     * 3. /fonts (archivos estáticos)
     * 4. /favicon.ico (favicon)
     */
    "/((?!api|_next|fonts|favicon.ico).*)",
  ],
}
