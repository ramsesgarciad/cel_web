import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Lista vacía: ninguna ruta requiere autenticación
const protectedRoutes = []

export function middleware(request: NextRequest) {
  // Permitir acceso a todas las rutas
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
