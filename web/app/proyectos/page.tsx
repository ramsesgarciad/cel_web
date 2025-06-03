import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import PageTransition from "@/components/PageTransition"
import AnimatedElement from "@/components/AnimatedElement"

export default function ProyectosPage() {
  return (
    <PageTransition>
      <div>
        <AnimatedElement delay={0.1}>
          <PageHeader
            title="Nuestros Proyectos"
            description="Conoce algunos de los proyectos que hemos desarrollado para nuestros clientes en diferentes industrias."
          />
        </AnimatedElement>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedElement delay={0.2} direction="up">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img
                      src="/reclouser_itc_iec101.png"
                      alt="Transformación Digital con IoT en Equipos Antiguos"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-bold text-lg">Transformación Digital con IoT en Equipos Antiguos</h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground mb-4">
                      Implementación de soluciones IoT en equipos industriales antiguos sin conexión a internet, superando retos 
                      de robustez en entornos hostiles mediante el uso de transceptores especializados como el ISO1500DBQR.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">RS485</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IEC101</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT Industrial</span>
                    </div>
                    <Link href="/proyectos/transformacion-digital-iot">
                      <Button variant="outline" className="w-full">
                        Ver detalles
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={0.3} direction="up">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img
                      src="/sistema_de_turnos.png"
                      alt="Sistema de Gestión de Turnos"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-bold text-lg">Sistema de Gestión de Turnos</h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground mb-4">
                      Sistema de gestión de turnos basado en Raspberry Pi que permite seleccionar el tipo de turno e imprimir tickets, 
                      con capacidad multiusuario, asignación de prioridades y análisis estadístico de servicios y tiempos de respuesta.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Raspberry Pi</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Atención al Cliente</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Análisis de Datos</span>
                    </div>
                    <Link href="/proyectos/sistema-gestion-turnos">
                      <Button variant="outline" className="w-full">
                        Ver detalles
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={0.4} direction="up">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img
                      src="/fabrica.png"
                      alt="Sistema de Monitoreo de KPI de Producción"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-bold text-lg">Sistema de Monitoreo de KPI de Producción</h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground mb-4">
                      Sistema de monitoreo en tiempo real que cuenta los pulsos de las máquinas para obtener su velocidad de trabajo 
                      y calcular KPIs como OEE, tiempo de producción, eficiencia y cantidad de productos rechazados.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">OEE</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Tiempo Real</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Industria 4.0</span>
                    </div>
                    <Link href="/proyectos/monitoreo-kpi-produccion">
                      <Button variant="outline" className="w-full">
                        Ver detalles
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={0.5} direction="up">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img
                      src="/cuarto_frio.png"
                      alt="Monitoreo de Temperatura y Humedad para Cuartos Fríos"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-bold text-lg">Monitoreo de Temperatura y Humedad para Cuartos Fríos</h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground mb-4">
                      Sistema de monitoreo con sensores IP68 conectados por RS485 que permite supervisar múltiples puntos de temperatura y humedad
                      en cuartos fríos con alertas en tiempo real cuando los valores salen del rango operativo.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IP68</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">RS485</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Alertas</span>
                    </div>
                    <Link href="/proyectos/monitoreo-cuartos-frios">
                      <Button variant="outline" className="w-full">
                        Ver detalles
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={0.6} direction="up">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img
                      src="/medidor_pfc.png"
                      alt="Sistema de Medición de Energía Trifásica"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h3 className="text-white font-bold text-lg">Sistema de Medición de Energía Trifásica</h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-muted-foreground mb-4">
                      Solución integral para medición de energía en sistemas trifásicos con interfaz táctil, conectividad de red, capacidad de ejecución de scripts en MicroPython y módulos de expansión para relés.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">ESP32</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">MicroPython</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT</span>
                    </div>
                    <Link href="/proyectos/sistema-medicion-energia-trifasica">
                      <Button variant="outline" className="w-full">
                        Ver detalles
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </section>

        <AnimatedElement delay={0.7}>
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <AnimatedElement delay={0.8} direction="up">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-blue-marine">Sectores donde hemos trabajado</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Nuestra experiencia abarca diversos sectores, adaptando nuestras soluciones a las necesidades específicas
                    de cada industria.
                  </p>
                </div>
              </AnimatedElement>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <AnimatedElement delay={0.9} direction="scale">
                  <div className="text-center hover:transform hover:scale-105 transition-transform duration-300">
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
                </AnimatedElement>

                <AnimatedElement delay={1.0} direction="scale">
                  <div className="text-center hover:transform hover:scale-105 transition-transform duration-300">
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
                </AnimatedElement>

                <AnimatedElement delay={1.1} direction="scale">
                  <div className="text-center hover:transform hover:scale-105 transition-transform duration-300">
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
                </AnimatedElement>

                <AnimatedElement delay={1.2} direction="scale">
                  <div className="text-center hover:transform hover:scale-105 transition-transform duration-300">
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
                </AnimatedElement>
              </div>
            </div>
          </section>
        </AnimatedElement>

        <AnimatedElement delay={1.3}>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="bg-blue-marine text-white rounded-lg p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <AnimatedElement delay={1.4} direction="left">
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
                  </AnimatedElement>
                  <AnimatedElement delay={1.5} direction="right">
                    <div className="hidden md:block">
                      <img
                        src="/placeholder.svg?height=300&width=500"
                        alt="Equipo de Caribbean Embedded Labs"
                        className="rounded-lg"
                      />
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </div>
          </section>
        </AnimatedElement>
      </div>
    </PageTransition>
  )
}
