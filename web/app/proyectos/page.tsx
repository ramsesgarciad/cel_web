import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function ProyectosPage() {
  return (
    <div>
      <PageHeader
        title="Nuestros Proyectos"
        description="Conoce algunos de los proyectos que hemos desarrollado para nuestros clientes en diferentes industrias."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sistema de monitorización industrial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Monitorización Industrial</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Desarrollo de un sistema completo de monitorización para una planta industrial, incluyendo sensores,
                  comunicación inalámbrica y dashboard de control.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Industria 4.0</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Monitorización</span>
                </div>
                <Link href="/proyectos/monitorizacion-industrial">
                  <Button variant="outline" className="w-full">
                    Ver detalles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Dispositivo médico portátil"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Dispositivo Médico Portátil</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Diseño y desarrollo de un dispositivo médico portátil para monitorización de signos vitales, con
                  conectividad Bluetooth y bajo consumo energético.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Salud</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Bluetooth</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Bajo Consumo</span>
                </div>
                <Link href="/proyectos/dispositivo-medico">
                  <Button variant="outline" className="w-full">
                    Ver detalles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sistema de riego inteligente"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Riego Inteligente</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Desarrollo de un sistema de riego inteligente para agricultura, con sensores de humedad, control
                  remoto y optimización del consumo de agua.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Agricultura</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">LoRa</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Sostenibilidad</span>
                </div>
                <Link href="/proyectos/riego-inteligente">
                  <Button variant="outline" className="w-full">
                    Ver detalles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sistema de control domótico"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Control Domótico</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Diseño e implementación de un sistema de control domótico para viviendas, con gestión de iluminación,
                  climatización y seguridad mediante aplicación móvil.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Domótica</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">WiFi</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">App Móvil</span>
                </div>
                <Link href="/proyectos/control-domotico">
                  <Button variant="outline" className="w-full">
                    Ver detalles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sistema de gestión energética"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Gestión Energética</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Desarrollo de un sistema para monitorización y optimización del consumo energético en edificios
                  comerciales, con integración de energías renovables.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Energía</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Sostenibilidad</span>
                </div>
                <Link href="/proyectos/gestion-energetica">
                  <Button variant="outline" className="w-full">
                    Ver detalles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Dispositivo de seguimiento de activos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Dispositivo de Seguimiento de Activos</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Diseño de un dispositivo para seguimiento y localización de activos en tiempo real, con conectividad
                  GPS/GSM y autonomía de varios meses.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">GPS</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">GSM</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Bajo Consumo</span>
                </div>
                <Link href="/proyectos/seguimiento-activos">
                  <Button variant="outline" className="w-full">
                    Ver detalles
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Sectores donde hemos trabajado</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nuestra experiencia abarca diversos sectores, adaptando nuestras soluciones a las necesidades específicas
              de cada industria.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M2 22h20"></path>
                  <path d="M20 22V6L12 2 4 6v16"></path>
                  <path d="M12 2v20"></path>
                  <path d="M12 13H4"></path>
                  <path d="M12 13h8"></path>
                  <path d="M4 6h16"></path>
                  <path d="M15 13v9"></path>
                  <path d="M9 13v9"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-marine">Industria</h3>
              <p className="text-muted-foreground">Automatización y monitorización de procesos industriales.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M19 9H9a2 2 0 0 0-2 2v.5"></path>
                  <path d="M5 15h10"></path>
                  <path d="M19 5v16"></path>
                  <path d="M5 11.5V5"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-marine">Salud</h3>
              <p className="text-muted-foreground">Dispositivos médicos y sistemas de monitorización de pacientes.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
                  <path d="M12 11v6"></path>
                  <path d="M8 11v6"></path>
                  <path d="M16 11v6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-marine">Agricultura</h3>
              <p className="text-muted-foreground">Sistemas de riego inteligente y monitorización de cultivos.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-blue-marine">Domótica</h3>
              <p className="text-muted-foreground">Sistemas de control inteligente para hogares y edificios.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-marine text-white rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Tienes un proyecto en mente?</h2>
                <p className="text-lg mb-6">
                  Contáctanos y descubre cómo podemos ayudarte a convertir tu idea en realidad. Nuestro equipo de
                  expertos está listo para asesorarte.
                </p>
                <Link href="/contacto">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Solicitar presupuesto
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Equipo de Caribbean Embedded Labs"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

