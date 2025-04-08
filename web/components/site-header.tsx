import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CircuitBoardIcon as Circuit,
  Briefcase,
  Workflow,
  Users,
  FileText,
  Home,
  Phone,
  ChevronDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">CEL</span>
            </div>
            <span className="font-bold text-xl">Caribbean Embedded Labs</span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>Inicio</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
              <Circuit className="h-4 w-4" />
              <span>Servicios</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem asChild>
                <Link href="/servicios" className="cursor-pointer">
                  Todos los servicios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/diseno-pcbs" className="cursor-pointer">
                  Diseño de PCBs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/microcontroladores" className="cursor-pointer">
                  Programación de Microcontroladores
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/prototipado" className="cursor-pointer">
                  Prototipado Electrónico
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/iot" className="cursor-pointer">
                  Diseño de productos IoT
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/fabricacion" className="cursor-pointer">
                  Validación y Fabricación
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/proyectos" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            <span>Proyectos</span>
          </Link>

          <Link href="/industrias" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Workflow className="h-4 w-4" />
            <span>Industrias</span>
          </Link>

          <Link href="/sobre-nosotros" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Sobre Nosotros</span>
          </Link>

          <Link href="/blog" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Blog</span>
          </Link>

          <Link href="/contacto" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span>Contacto</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/contacto">
            <Button className="bg-primary text-primary-foreground hover:bg-blue-light">Contactar</Button>
          </Link>

          {/* Mobile menu button */}
          <DropdownMenu>
            <DropdownMenuTrigger className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer">
                  Inicio
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios" className="cursor-pointer">
                  Servicios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/proyectos" className="cursor-pointer">
                  Proyectos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/industrias" className="cursor-pointer">
                  Industrias
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sobre-nosotros" className="cursor-pointer">
                  Sobre Nosotros
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog" className="cursor-pointer">
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contacto" className="cursor-pointer">
                  Contacto
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

