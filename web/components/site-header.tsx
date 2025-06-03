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
import { AnimatedButton, AnimatedIcon } from "@/components/HoverAnimations"

export function SiteHeader() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:bg-primary/90">
              <span className="text-primary-foreground font-bold">CEL</span>
            </div>
            <span className="font-bold text-xl transition-colors duration-300 group-hover:text-primary">Caribbean Embedded Labs</span>
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
            <AnimatedIcon>
              <Home className="h-4 w-4" />
            </AnimatedIcon>
            <span>Inicio</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
              <AnimatedIcon>
                <Circuit className="h-4 w-4" />
              </AnimatedIcon>
              <span>Servicios</span>
              <AnimatedIcon rotateOnHover={true}>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </AnimatedIcon>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="animate-fade-in-up">
              <DropdownMenuItem asChild>
                <Link href="/servicios" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Todos los servicios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/diseno-pcbs" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Diseño de PCBs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/microcontroladores" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Programación de Microcontroladores
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/prototipado" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Prototipado Electrónico
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/iot" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Diseño de productos IoT
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/fabricacion" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Validación y Fabricación
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios/diseno-mecanico" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Diseño Mecánico
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/proyectos" className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
            <AnimatedIcon>
              <Briefcase className="h-4 w-4" />
            </AnimatedIcon>
            <span>Proyectos</span>
          </Link>

          <Link href="/productos" className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
            <AnimatedIcon>
              <Circuit className="h-4 w-4" />
            </AnimatedIcon>
            <span>Productos</span>
          </Link>

          <Link href="/industrias" className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
            <AnimatedIcon>
              <Workflow className="h-4 w-4" />
            </AnimatedIcon>
            <span>Industrias</span>
          </Link>

          <Link href="/sobre-nosotros" className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
            <AnimatedIcon>
              <Users className="h-4 w-4" />
            </AnimatedIcon>
            <span>Nosotros</span>
          </Link>

          <Link href="/blog" className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
            <AnimatedIcon>
              <FileText className="h-4 w-4" />
            </AnimatedIcon>
            <span>Blog</span>
          </Link>

          <Link href="/contacto" className="text-sm font-medium hover:text-primary flex items-center gap-1 transition-all duration-300 hover:scale-105 hover:bg-primary/5 px-3 py-2 rounded-lg">
            <AnimatedIcon>
              <Phone className="h-4 w-4" />
            </AnimatedIcon>
            <span>Contacto</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <AnimatedButton variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300">
              Iniciar Sesión
            </AnimatedButton>
          </Link>
          <Link href="/contacto">
            <AnimatedButton className="bg-primary text-primary-foreground hover:bg-blue-light transition-all duration-300">
              Contactar
            </AnimatedButton>
          </Link>

          {/* Mobile menu button */}
          <DropdownMenu>
            <DropdownMenuTrigger className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-all duration-300">
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
            <DropdownMenuContent align="end" className="w-[200px] animate-fade-in-up">
              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Inicio
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/servicios" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Servicios
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/proyectos" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Proyectos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/productos" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Productos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/industrias" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Industrias
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/sobre-nosotros" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Nosotros
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contacto" className="cursor-pointer transition-colors duration-200 hover:bg-primary/10">
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
