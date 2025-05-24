import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Cpu, CircuitBoardIcon as Circuit, Layers, CheckCircle, Workflow, Wifi } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function ServiciosPage() {
  return (
    <div>
      <PageHeader
        title="Nuestros Servicios"
        description="En Caribbean Embedded Labs ofrecemos soluciones electrónicas integrales, desde el diseño hasta la fabricación."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="flex flex-col">
              <CardHeader>
                <Circuit className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Diseño de PCBs</CardTitle>
                <CardDescription>
                  Desarrollamos circuitos impresos que desempeñen su funcionalidad de manera óptima.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>PCBs Flexibles para aplicaciones que requieren adaptabilidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Circuitos Impresos Multicapa para mayor complejidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>PCBs con componentes SMD para aplicaciones compactas</span>
                  </li>
                </ul>
                <Link href="/servicios/diseno-pcbs">
                  <Button className="w-full">
                    Más información
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Programación de Microcontroladores</CardTitle>
                <CardDescription>Desarrollo de firmware a medida para asegurar un rendimiento óptimo.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Firmware para periféricos y comunicación con el entorno</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Programación de protocolos SPI, I2C, CAN, Ethernet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Interfaces intuitivas para una mejor experiencia de usuario</span>
                  </li>
                </ul>
                <Link href="/servicios/microcontroladores">
                  <Button className="w-full">
                    Más información
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <Layers className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Prototipado Electrónico</CardTitle>
                <CardDescription>
                  Desarrollamos prototipos funcionales para evaluar y perfeccionar tus diseños.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Diseño con herramientas avanzadas (Altium Designer, LtSpice)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Fabricación de PCB prototipo con bajos tiempos de entrega</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Validación y testing exhaustivo del circuito electrónico</span>
                  </li>
                </ul>
                <Link href="/servicios/prototipado">
                  <Button className="w-full">
                    Más información
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <Wifi className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Diseño de productos IoT</CardTitle>
                <CardDescription>
                  Conectamos dispositivos a internet para recopilar datos y mejorar la eficiencia.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Conectividad avanzada: WiFi, Bluetooth, LoRa, Zigbee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Diseños de bajo y ultra bajo consumo para dispositivos con batería</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Implementación de protocolos MQTT y HTTP para conexión cloud</span>
                  </li>
                </ul>
                <Link href="/servicios/iot">
                  <Button className="w-full">
                    Más información
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Validación y Fabricación</CardTitle>
                <CardDescription>
                  Nos encargamos del testing y la fabricación de tus circuitos electrónicos.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Validación hardware y software de circuitos electrónicos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Fabricación de PCBs desde prototipos hasta producción en masa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Ensamblaje de componentes SMD y de orificio pasante</span>
                  </li>
                </ul>
                <Link href="/servicios/fabricacion">
                  <Button className="w-full">
                    Más información
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <Workflow className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Consultoría Técnica</CardTitle>
                <CardDescription>Asesoramiento experto para tus proyectos electrónicos y de IoT.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Evaluación de viabilidad técnica de proyectos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Optimización de diseños existentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Resolución de problemas en circuitos electrónicos</span>
                  </li>
                </ul>
                <Link href="/contacto">
                  <Button className="w-full">
                    Solicitar consultoría
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
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Nuestro Proceso de Trabajo</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Seguimos una metodología estructurada para garantizar resultados de calidad en todos nuestros proyectos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Análisis y Diseño</h3>
              <p className="text-muted-foreground">
                Analizamos tus requisitos y diseñamos una solución a medida que cumpla con tus necesidades.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Prototipado</h3>
              <p className="text-muted-foreground">
                Desarrollamos un prototipo funcional para validar el diseño y realizar ajustes si es necesario.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Validación</h3>
              <p className="text-muted-foreground">
                Realizamos pruebas exhaustivas para garantizar que el producto cumple con todas las especificaciones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border relative">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Producción</h3>
              <p className="text-muted-foreground">
                Fabricamos el producto final con los más altos estándares de calidad y te acompañamos en todo el
                proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-marine text-white rounded-lg p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">¿Listo para empezar tu proyecto?</h2>
                <p className="text-lg mb-6">
                  Contáctanos hoy mismo y descubre cómo podemos ayudarte a convertir tus ideas en realidad.
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
                  src="/hans-pcb.png height=300&width=500"
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

