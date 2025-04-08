import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Cpu, CircuitBoardIcon as Circuit, Zap, Layers, CheckCircle, Workflow, Wifi } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function IndustriasPage() {
  return (
    <div>
      <PageHeader
        title="Industrias"
        description="Nuestras soluciones electrónicas se adaptan a las necesidades específicas de diversas industrias."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Soluciones Adaptadas a Cada Sector</h2>
              <p className="text-lg mb-6">
                En Caribbean Embedded Labs entendemos que cada industria tiene necesidades específicas. Por eso,
                desarrollamos soluciones electrónicas personalizadas que se adaptan perfectamente a los requerimientos
                de cada sector.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Experiencia Multisectorial</h3>
                    <p className="text-muted-foreground">
                      Contamos con amplia experiencia en diversos sectores, lo que nos permite entender las
                      particularidades de cada industria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Soluciones a Medida</h3>
                    <p className="text-muted-foreground">
                      Desarrollamos productos electrónicos adaptados a las necesidades específicas de cada sector.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Cumplimiento Normativo</h3>
                    <p className="text-muted-foreground">
                      Garantizamos que nuestros productos cumplan con las normativas y estándares específicos de cada
                      industria.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Soluciones industriales"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <Workflow className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industrias donde aplicamos nuestra experiencia</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Nuestras soluciones electrónicas se adaptan a las necesidades específicas de diversas industrias.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Workflow className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Industria 4.0</h3>
                  <p className="text-white/80 mb-4">
                    Automatización avanzada y digitalización industrial para mejorar la eficiencia.
                  </p>
                  <Link href="/industrias/industria-4-0">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Automoción</h3>
                  <p className="text-white/80 mb-4">
                    Fabricación de vehículos y tecnología de transporte con altos estándares de calidad.
                  </p>
                  <Link href="/industrias/automocion">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Wifi className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">IoT</h3>
                  <p className="text-white/80 mb-4">
                    Conexión de dispositivos y recopilación de datos en tiempo real para diversas aplicaciones.
                  </p>
                  <Link href="/industrias/iot">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Circuit className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Aeroespacial</h3>
                  <p className="text-white/80 mb-4">
                    Industria de vuelo y exploración espacial con los más altos estándares de fiabilidad.
                  </p>
                  <Link href="/industrias/aeroespacial">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Domótica</h3>
                  <p className="text-white/80 mb-4">
                    Control inteligente del hogar para ahorro energético y mayor comodidad.
                  </p>
                  <Link href="/industrias/domotica">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Industria de la Salud</h3>
                  <p className="text-white/80 mb-4">
                    Monitorización de pacientes y suministro de medicamentos con alta precisión.
                  </p>
                  <Link href="/industrias/salud">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Cpu className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Industria Agrícola</h3>
                  <p className="text-white/80 mb-4">
                    Anticipación de condiciones climáticas y mejora de la productividad de las cosechas.
                  </p>
                  <Link href="/industrias/agricola">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Workflow className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Energía y Servicios</h3>
                  <p className="text-white/80 mb-4">
                    Distribución inteligente de energía y supervisión en tiempo real de recursos.
                  </p>
                  <Link href="/industrias/energia">
                    <Button variant="secondary" size="sm">
                      Más información
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Casos de Éxito por Industria</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Conoce algunos de nuestros proyectos más destacados en diferentes sectores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Caso de éxito industria"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Monitorización para Planta Industrial</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Implementamos un sistema completo de monitorización para una planta industrial, permitiendo la
                  detección temprana de fallos y la optimización de procesos.
                </p>
                <Link href="/proyectos/monitorizacion-industrial">
                  <Button variant="outline" className="w-full">
                    Ver caso de éxito
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Caso de éxito salud"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Dispositivo Médico para Monitorización de Pacientes</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Desarrollamos un dispositivo médico portátil para la monitorización continua de signos vitales,
                  mejorando la atención a pacientes con enfermedades crónicas.
                </p>
                <Link href="/proyectos/dispositivo-medico">
                  <Button variant="outline" className="w-full">
                    Ver caso de éxito
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
          <div className="bg-blue-marine text-white rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Necesitas una solución para tu industria?</h2>
                <p className="text-lg mb-6">
                  Contáctanos y descubre cómo podemos ayudarte a desarrollar soluciones electrónicas adaptadas a las
                  necesidades específicas de tu sector.
                </p>
                <Link href="/contacto">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Solicitar asesoramiento
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

