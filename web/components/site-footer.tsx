import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-blue-marine py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">CEL</span>
              </div>
              <span className="font-bold">Caribbean Embedded Labs</span>
            </div>
            <p className="text-sm text-white/80">
              Expertos en diseño de PCBs y electrónica a medida con soluciones personalizadas para transformar tus ideas
              en productos de calidad.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios/diseno-pcbs" className="text-white/80 hover:text-white">
                  Diseño de PCBs
                </Link>
              </li>
              <li>
                <Link href="/servicios/microcontroladores" className="text-white/80 hover:text-white">
                  Programación de Microcontroladores
                </Link>
              </li>
              <li>
                <Link href="/servicios/prototipado" className="text-white/80 hover:text-white">
                  Prototipado Electrónico
                </Link>
              </li>
              <li>
                <Link href="/servicios/iot" className="text-white/80 hover:text-white">
                  Diseño de productos IoT
                </Link>
              </li>
              <li>
                <Link href="/servicios/fabricacion" className="text-white/80 hover:text-white">
                  Validación y Fabricación
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre-nosotros" className="text-white/80 hover:text-white">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="text-white/80 hover:text-white">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/80 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/terminos" className="text-white/80 hover:text-white">
                  Términos de servicio
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="text-white/80 hover:text-white">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/legal/aviso-legal" className="text-white/80 hover:text-white">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="text-white/80 hover:text-white">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} Caribbean Embedded Labs. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

