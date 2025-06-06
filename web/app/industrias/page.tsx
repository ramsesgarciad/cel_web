import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Cpu, CircuitBoardIcon as Circuit, Zap, Layers, CheckCircle, Workflow, Wifi, MapPin } from "lucide-react"
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
                  src="/fabrica_insustrial.png"
                  alt="Fábrica industrial con soluciones automatizadas"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Workflow className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Industria 4.0</h3>
                  <p className="text-white/80 mb-4">
                    Automatización avanzada y digitalización industrial para mejorar la eficiencia y productividad.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 hover:bg-white/20 transition-colors border-white/20 text-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Rastreo y Localización GPS</h3>
                  <p className="text-white/80 mb-4">
                    Monitoreo de activos y seguimiento en tiempo real con tecnología GPS de alta precisión.
                  </p>
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
                    Control inteligente del hogar para ahorro energético y mayor comodidad en espacios residenciales.
                  </p>
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
                    Anticipación de condiciones climáticas y mejora de la productividad de cultivos mediante sensores.
                  </p>
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
                    Distribución inteligente de energía y supervisión en tiempo real de recursos hídricos y eléctricos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16">
            <div className="rounded-lg overflow-hidden shadow-lg border">
              <img 
                src="/fabrica_de_agua.png" 
                alt="Planta de tratamiento de agua con sistemas automatizados" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-blue-marine text-white rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Buscas una solución para tu industria?</h2>
                <p className="mb-6">
                  Nuestro equipo de expertos está listo para ayudarte a desarrollar la solución perfecta para tu
                  sector. Contáctanos hoy mismo para una consulta personalizada.
                </p>
                <Link href="/contacto">
                  <Button variant="secondary" size="lg">
                    Contáctanos
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  <Circuit className="w-full h-full text-secondary/20 absolute" />
                  <Zap className="w-1/2 h-1/2 text-secondary absolute top-1/4 left-1/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
