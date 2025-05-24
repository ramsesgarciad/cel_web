import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, CircuitBoardIcon as Circuit, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function DisenoPCBsPage() {
  return (
    <div>
      <PageHeader
        title="Diseño de PCBs"
        description="Desarrollamos circuitos impresos que desempeñen su funcionalidad de manera óptima, adaptados a tus necesidades específicas."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Diseño Profesional de PCBs</h2>
              <p className="text-lg mb-6">
                En Caribbean Embedded Labs nos especializamos en el diseño de PCBs (Printed Circuit Boards) de alta
                calidad para todo tipo de aplicaciones. Nuestro equipo de ingenieros cuenta con amplia experiencia en el
                diseño de circuitos impresos, desde simples placas de una capa hasta complejos diseños multicapa con
                componentes SMD.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">PCBs Flexibles</h3>
                    <p className="text-muted-foreground">
                      Ideales para aplicaciones donde se requiere adaptabilidad y espacio reducido, como dispositivos
                      wearables o equipos médicos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Circuitos Impresos Multicapa</h3>
                    <p className="text-muted-foreground">
                      Diseñamos PCBs de múltiples capas para circuitos complejos, optimizando el espacio y mejorando el
                      rendimiento electromagnético.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">PCBs con componentes SMD</h3>
                    <p className="text-muted-foreground">
                      Utilizamos tecnología de montaje superficial para crear diseños compactos y de alto rendimiento.
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
                  src="/professional-sch-en.gif?height=400&width=600"
                  alt="Diseño de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <Circuit className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Nuestro Proceso de Diseño de PCBs</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Seguimos un proceso estructurado para garantizar que cada PCB cumpla con los más altos estándares de
              calidad y funcionalidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Esquemático</h3>
              <p className="text-muted-foreground">
                Diseñamos el esquema eléctrico completo, seleccionando los componentes adecuados para tu aplicación.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Layout</h3>
              <p className="text-muted-foreground">
                Realizamos el diseño físico de la PCB, optimizando la disposición de componentes y rutas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Verificación</h3>
              <p className="text-muted-foreground">
                Comprobamos el diseño mediante simulaciones y verificaciones DRC/ERC para garantizar su correcto
                funcionamiento.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Fabricación</h3>
              <p className="text-muted-foreground">
                Generamos los archivos de fabricación y coordinamos la producción con fabricantes de confianza.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/pcb_single.png"
                  alt="PCB de una capa"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">PCBs de Una Capa</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Soluciones económicas para circuitos sencillos. Ideales para prototipos y producción de bajo volumen.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/pcb_double.png"
                  alt="PCB de doble capa"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">PCBs de Doble Capa</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Mayor densidad de componentes y mejor rendimiento. La opción más común para la mayoría de
                  aplicaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/pcb_multi.png"
                  alt="PCB multicapa"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">PCBs Multicapa</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground">
                  Para circuitos complejos que requieren alta densidad de componentes y control de impedancia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos para el diseño de tus PCBs?</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Nuestro enfoque en la calidad y la atención al detalle nos distingue en el diseño de circuitos impresos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Experiencia</h3>
              <p className="text-white/80">
                Más de 10 años diseñando PCBs para diversas industrias, desde dispositivos médicos hasta equipos
                industriales.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Herramientas Avanzadas</h3>
              <p className="text-white/80">
                Utilizamos software de diseño de última generación como Altium Designer, Eagle y KiCad para garantizar
                resultados óptimos.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Atención Personalizada</h3>
              <p className="text-white/80">
                Trabajamos estrechamente contigo para entender tus necesidades y ofrecerte la mejor solución para tu
                proyecto.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contacto">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Solicitar presupuesto
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

