import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, CheckCircle, Settings, CopyCheck, Camera, Bot } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function DisenoMecanicoPage() {
  return (
    <div>
      <PageHeader 
        title="Diseño Mecánico" 
        description="Desarrollo de soluciones mecánicas precisas para optimizar el rendimiento, durabilidad y funcionalidad de productos electrónicos."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Excelencia en Diseño Mecánico</h2>
              <p className="text-lg mb-6">
                En Caribbean Embedded Labs, entendemos que el éxito de un producto electrónico no solo depende de su interior, sino también de su diseño mecánico. Nuestro equipo especializado en ingeniería mecánica trabaja en estrecha colaboración con los ingenieros electrónicos para desarrollar soluciones que optimicen cada aspecto del producto.
              </p>
              <p className="text-lg mb-6">
                Desde enclosures para dispositivos electrónicos hasta sistemas de refrigeración pasiva, cada componente mecánico es diseñado considerando factores como resistencia, disipación térmica, protección ambiental (IP rating), ergonomía y estética, asegurando productos robustos y funcionales.
              </p>
              <p className="text-lg mb-6">
                Utilizamos herramientas de diseño asistido por computadora (CAD) de última generación y realizamos análisis térmicos y estructurales para validar nuestros diseños antes de la fabricación, minimizando costos y tiempos de desarrollo.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-white border shadow-lg">
                <img
                  src="/solidwork_animation.gif"
                  alt="Animación SolidWorks de diseño mecánico"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <Settings className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-marine">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Nuestros Servicios de Diseño Mecánico</h2>
            <p className="text-xl max-w-3xl mx-auto text-white">
              Ofrecemos soluciones de ingeniería mecánica completas para todo tipo de dispositivos electrónicos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-blue-marine-dark border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                  <div className="p-2 bg-blue-light/20 rounded-full">
                    <Settings className="h-6 w-6 text-blue-light" />
                  </div>
                  <span>Diseño de Enclosures y Gabinetes</span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Enclosures para radar, displays y dispositivos IoT con certificación IP específica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Diseño de cabinas para equipos industriales y vehículos eléctricos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Soluciones en chapa metálica, aluminio fundido y materiales plásticos avanzados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Diseño especializado de juntas, botones y elementos de sellado para entornos hostiles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-blue-marine-dark border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                  <div className="p-2 bg-blue-light/20 rounded-full">
                    <CopyCheck className="h-6 w-6 text-blue-light" />
                  </div>
                  <span>Optimización Térmica y Estructural</span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Diseño y simulación térmica avanzada en ANSYS y COMSOL para inversores y drives de 20-75 kW</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Desarrollo de disipadores térmicos en aluminio mediante procesos de die-cast para inversores solares</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Análisis estructural y vibracional para validación de diseños en entornos industriales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-light flex-shrink-0 mt-0.5" />
                    <span className="text-white text-base">Optimización DFM/DFA para reducción de costos y mejora de procesos de fabricación</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Nuestro Proceso de Diseño</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Seguimos una metodología estructurada para garantizar resultados óptimos en cada proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-muted/30 p-6 rounded-lg border relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div>
              <h3 className="font-bold text-lg mt-2 mb-3 text-blue-marine">Conceptualización</h3>
              <p className="text-muted-foreground">
                Definimos los requisitos mecánicos y desarrollamos múltiples conceptos de diseño basados en especificaciones técnicas.
              </p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg border relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div>
              <h3 className="font-bold text-lg mt-2 mb-3 text-blue-marine">Diseño Detallado</h3>
              <p className="text-muted-foreground">
                Creamos modelos 3D precisos, seleccionamos materiales y generamos documentación técnica completa utilizando GD&T.
              </p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg border relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div>
              <h3 className="font-bold text-lg mt-2 mb-3 text-blue-marine">Análisis y Validación</h3>
              <p className="text-muted-foreground">
                Realizamos simulaciones térmicas, estructurales y de vibraciones para garantizar el rendimiento del diseño.
              </p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg border relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div>
              <h3 className="font-bold text-lg mt-2 mb-3 text-blue-marine">Prototipado y Pruebas</h3>
              <p className="text-muted-foreground">
                Desarrollamos prototipos funcionales y realizamos pruebas exhaustivas incluyendo IP rating y resistencia ambiental.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Modelado 3D Avanzado</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nuestros diseños mecánicos incluyen modelado 3D de alta precisión para optimización antes de la fabricación.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-lg overflow-hidden shadow-lg border bg-white">
              <div className="aspect-video relative">
                <img
                  src="/3d_model1.png"
                  alt="Modelo 3D de dispositivo electrónico"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Diseño Mecánico en CAD</h3>
                <p className="text-muted-foreground">
                  Modelado 3D preciso que permite visualizar cada componente y verificar dimensiones antes de la fabricación.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg border bg-white">
              <div className="aspect-video relative">
                <img
                  src="/3d_model2.png"
                  alt="Simulación térmica de dispositivo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2">Simulación Térmica y Estructural</h3>
                <p className="text-muted-foreground">
                  Análisis avanzado que permite optimizar el diseño para asegurar el correcto funcionamiento en condiciones reales.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-marine text-white rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Necesitas un diseño mecánico personalizado?</h2>
                <p className="text-lg mb-6">
                  Nuestro equipo está listo para ayudarte a desarrollar la solución mecánica ideal para tu producto electrónico.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Experiencia en productos IP rated</h3>
                      <p className="text-sm text-white/80">
                        Diseño de enclosures, juntas y sistemas de sellado para entornos hostiles con certificación IP
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Optimización térmica avanzada</h3>
                      <p className="text-sm text-white/80">
                        Simulaciones térmicas especializadas con ANSYS y COMSOL para inversores y sistemas de potencia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Diseño de cabinas industriales</h3>
                      <p className="text-sm text-white/80">
                        Diseño completo de cabinas para equipos industriales y vehículos eléctricos con pruebas de validación
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link href="/contacto">
                  <Button size="lg" className="px-8 bg-white text-blue-marine hover:bg-blue-50">
                    Solicitar consulta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
