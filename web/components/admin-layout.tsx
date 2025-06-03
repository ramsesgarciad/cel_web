"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  FileText,
  Users,
  Settings,
  Menu,
  LogOut,
  User,
  Bell,
  ChevronDown,
  Home,
  CuboidIcon as Cube,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import AdminAuthCheck from "@/components/admin-auth-check"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // Importar dinámicamente para evitar problemas de referencia circular
    import('@/lib/api').then(({ authApi }) => {
      authApi.logout();
      // No es necesario hacer router.push ya que authApi.logout() ya redirige
    });
  }

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: FileText, label: "Proyectos", path: "/admin/projects" },
    { icon: Users, label: "Usuarios", path: "/admin/users" },
    { icon: Cube, label: "Modelos 3D", path: "/admin/models" },
    { icon: Settings, label: "Configuración", path: "/admin/settings" },
  ]

  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4 hidden md:flex md:flex-col">
          <div className="mb-8 mt-2">
            <Link href="/" className="text-xl font-semibold text-white hover:text-gray-300 flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
                <span className="text-primary-foreground font-bold">P</span>
              </div>
              <span>Panel Admin</span>
            </Link>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-2 rounded-md transition-colors
                      ${
                        isActive(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </aside>

        {/* Main content area (including header) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shrink-0">
            {/* Botón para menú móvil (opcional, si quieres re-implementarlo) */}
            {/* <Sheet> ... </Sheet> */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Este es el logo que se muestra en el header cuando el sidebar está oculto en móvil */}
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">P</span>
                </div>
              </Link>
            </div>
            <div className="flex-1">
              {/* Puedes poner un breadcrumb o título de página aquí si quieres */}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="hidden md:inline-block">Admin</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </AdminAuthCheck>
  )
}
