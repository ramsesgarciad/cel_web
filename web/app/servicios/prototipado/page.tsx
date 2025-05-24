import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Layers, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function PrototipadoPage() {
  return (
    <div>
      <PageHeader
        title="Prototipado Electrónico"
        description="Desarrollamos prototipos funcionales para evaluar y perfeccionar tus diseños antes de la producción en masa."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Prototipado Rápido y Eficiente</h2>
              <p className="text-lg mb-6">
                En Caribbean Embedded Labs entendemos la importancia de validar tus ideas rápidamente. Nuestro servicio
                de prototipado electrónico te permite materializar tus conceptos en dispositivos funcionales en el menor
                tiempo posible.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Diseño con Herramientas Avanzadas</h3>
                    <p className="text-muted-foreground">
                      Utilizamos software de diseño profesional como Altium Designer, Eagle y LtSpice para garantizar
                      resultados óptimos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Fabricación de PCB Prototipo</h3>
                    <p className="text-muted-foreground">
                      Producimos PCBs prototipo con bajos tiempos de entrega, permitiéndote iterar rápidamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Validación y Testing</h3>
                    <p className="text-muted-foreground">
                      Realizamos pruebas exhaustivas para verificar el funcionamiento correcto de tu prototipo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contacto">
                  <Button className="bg-primary text-primary-foreground hover:bg-blue-light">
                    Solicitar presupuesto
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg">
                <img
                  src="/pre1.png"
                  alt="Prototipado electrónico"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <Layers className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Beneficios del Prototipado</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              El prototipado es una fase crucial en el desarrollo de productos electrónicos, ofreciendo numerosas
              ventajas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Validación de Concepto</h3>
              <p className="text-muted-foreground">
                Permite comprobar si tu idea funciona como se espera antes de invertir en producción a gran escala.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Detección Temprana de Problemas</h3>
              <p className="text-muted-foreground">
                Identifica y resuelve problemas de diseño en etapas iniciales, ahorrando tiempo y recursos.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Iteración Rápida</h3>
              <p className="text-muted-foreground">
                Permite realizar mejoras incrementales basadas en pruebas reales, optimizando el diseño final.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Nuestro Proceso de Prototipado</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Seguimos un proceso estructurado para convertir tus ideas en prototipos funcionales de manera eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Conceptualización</h3>
              <p className="text-muted-foreground">
                Definimos los requisitos y especificaciones del prototipo en colaboración contigo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Diseño</h3>
              <p className="text-muted-foreground">
                Desarrollamos el esquemático y el layout del PCB, seleccionando los componentes adecuados.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Fabricación</h3>
              <p className="text-muted-foreground">
                Producimos el PCB y realizamos el montaje de componentes con precisión.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Validación</h3>
              <p className="text-muted-foreground">
                Realizamos pruebas exhaustivas para verificar el funcionamiento y rendimiento del prototipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-video rounded-lg overflow-hidden bg-white/10 border shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Equipo de prototipado"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Tecnologías de Prototipado</h2>
              <p className="text-lg mb-6">
                Utilizamos diversas tecnologías y herramientas para crear prototipos que se ajusten a tus necesidades
                específicas.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Impresión 3D</h3>
                    <p className="text-white/80">
                      Creamos carcasas y estructuras personalizadas para tus prototipos electrónicos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Plataformas de Desarrollo</h3>
                    <p className="text-white/80">
                      Utilizamos Arduino, Raspberry Pi, STM32 y otras plataformas para prototipado rápido.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Fabricación PCB Rápida</h3>
                    <p className="text-white/80">
                      Colaboramos con fabricantes que ofrecen tiempos de entrega reducidos para iteraciones rápidas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contacto">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Solicitar presupuesto
                    <ChevronRight className="ml-2 h-4 w-4" />
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

