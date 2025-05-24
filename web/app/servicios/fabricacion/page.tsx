import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function FabricacionPage() {
  return (
    <div>
      <PageHeader
        title="Validación y Fabricación"
        description="Nos encargamos del testing y la fabricación de tus circuitos electrónicos con los más altos estándares de calidad."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Validación Exhaustiva</h2>
              <p className="text-lg mb-6">
                En Caribbean Embedded Labs nos encargamos del testing de tu PCB. Analizamos y debuggeamos el circuito
                electrónico y el firmware hasta cumplir todas las especificaciones y alcanzar un desempeño óptimo.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Validación Hardware</h3>
                    <p className="text-muted-foreground">
                      Verificación de funcionalidad y fiabilidad del circuito impreso mediante pruebas eléctricas y
                      térmicas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Validación Software</h3>
                    <p className="text-muted-foreground">
                      Tests para comprobar la fiabilidad y robustez del firmware en diferentes condiciones de operación.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Pruebas de Compatibilidad</h3>
                    <p className="text-muted-foreground">
                      Verificación de la compatibilidad electromagnética (EMC) y cumplimiento de normativas.
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

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-background border">
                <img
                  src="/hv1.jpg"
                  alt="Validación de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/hv2.jpg"
                  alt="Fabricación de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border">
                <img
                  src="/hv3.jpg"
                  alt="Testing de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/hv4.jpg"
                  alt="Ensamblaje de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Fabricación de Circuitos Impresos</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ofrecemos servicios de fabricación de PCBs desde pequeñas series para prototipos hasta producción en masa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Fabricación de Prototipos</h3>
              <p className="text-muted-foreground mb-4">
                Producción rápida de PCBs para validación de diseño y pruebas iniciales.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Tiempos de entrega reducidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Opciones de acabado según necesidades</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Control de calidad riguroso</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Producción en Serie</h3>
              <p className="text-muted-foreground mb-4">Fabricación de PCBs en volumen para producción a escala.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Optimización de costes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Procesos de fabricación estandarizados</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Ensamblaje de Componentes</h3>
              <p className="text-muted-foreground mb-4">
                Montaje de componentes electrónicos en PCBs con precisión y calidad.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Montaje de componentes SMD</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Soldadura de componentes de orificio pasante</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Inspección óptica automatizada</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Nuestro Proceso de Fabricación</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Seguimos un proceso estructurado para garantizar la calidad en cada etapa de la fabricación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Preparación</h3>
              <p className="text-muted-foreground">
                Verificación de archivos de fabricación y preparación de materiales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Fabricación PCB</h3>
              <p className="text-muted-foreground">
                Producción de la placa de circuito impreso según especificaciones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Montaje</h3>
              <p className="text-muted-foreground">Colocación y soldadura de componentes electrónicos.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Inspección</h3>
              <p className="text-muted-foreground">Control de calidad mediante inspección visual y automatizada.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                5
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Pruebas</h3>
              <p className="text-muted-foreground">Verificación funcional y pruebas de rendimiento.</p>
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
                  src="/qc_pcb.jpg"
                  alt="Control de calidad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Control de Calidad</h2>
              <p className="text-lg mb-6">
                Implementamos rigurosos procesos de control de calidad para garantizar que cada producto cumpla con los
                más altos estándares.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Inspección Óptica Automatizada (AOI)</h3>
                    <p className="text-white/80">
                      Detección de defectos de soldadura, componentes faltantes o mal colocados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Pruebas Funcionales</h3>
                    <p className="text-white/80">
                      Verificación del funcionamiento correcto de cada circuito según especificaciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Pruebas de Estrés</h3>
                    <p className="text-white/80">
                      Sometemos los productos a condiciones extremas para garantizar su fiabilidad a largo plazo.
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

