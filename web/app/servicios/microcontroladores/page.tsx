import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Cpu, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function MicrocontroladoresPage() {
  return (
    <div>
      <PageHeader
        title="Programación de Microcontroladores"
        description="Desarrollo de firmware a medida para asegurar un rendimiento óptimo en tus dispositivos electrónicos."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg">
                  <img
                    src="/coding_fw.jpg"
                    alt="Programación de microcontroladores"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                  <Cpu className="w-12 h-12" />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Firmware a Medida</h2>
              <p className="text-lg mb-6">
                En Caribbean Embedded Labs desarrollamos firmware personalizado para microcontroladores, adaptado a las
                necesidades específicas de tu proyecto. Nuestro equipo tiene experiencia con diversas arquitecturas y
                fabricantes.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Firmware para Periféricos</h3>
                    <p className="text-muted-foreground">
                      Desarrollo de drivers para sensores, actuadores y otros periféricos para una comunicación
                      eficiente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Protocolos de Comunicación</h3>
                    <p className="text-muted-foreground">
                      Implementación de protocolos SPI, I2C, CAN, Ethernet, UART y otros para conectividad robusta.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Interfaces de Usuario</h3>
                    <p className="text-muted-foreground">
                      Desarrollo de interfaces intuitivas para una mejor experiencia de usuario en dispositivos
                      embebidos.
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
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Microcontroladores con los que Trabajamos</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tenemos experiencia con una amplia gama de microcontroladores para adaptarnos a las necesidades
              específicas de cada proyecto.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Card className="flex flex-col items-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">ARM Cortex</h3>
              <p className="text-muted-foreground">
                STM32, NXP, Texas Instruments y otros basados en arquitectura ARM.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">AVR</h3>
              <p className="text-muted-foreground">
                ATmega, ATtiny y toda la familia de microcontroladores de Microchip/Atmel.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">PIC</h3>
              <p className="text-muted-foreground">
                Amplia experiencia con la familia de microcontroladores PIC de Microchip.
              </p>
            </Card>

            <Card className="flex flex-col items-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">ESP32/ESP8266</h3>
              <p className="text-muted-foreground">
                Soluciones con conectividad WiFi y Bluetooth para aplicaciones IoT.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Optimización de Firmware</h2>
              <p className="text-lg mb-6">
                No solo desarrollamos firmware funcional, sino que también nos enfocamos en optimizarlo para obtener el
                mejor rendimiento posible.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Bajo Consumo</h3>
                    <p className="text-muted-foreground">
                      Optimizamos el firmware para minimizar el consumo de energía, ideal para dispositivos alimentados
                      por batería.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Tiempo Real</h3>
                    <p className="text-muted-foreground">
                      Implementamos sistemas operativos en tiempo real (RTOS) para aplicaciones que requieren respuesta
                      determinista.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Seguridad</h3>
                    <p className="text-muted-foreground">
                      Incorporamos medidas de seguridad para proteger tus dispositivos contra accesos no autorizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-background border">
                <img
                  src="/fw_0.png"
                  alt="Programación de microcontroladores"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/fw_1.png"
                  alt="Depuración de firmware"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border">
                <img
                  src="/fw_2.png"
                  alt="Desarrollo de drivers"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/fw_3.png"
                  alt="Testing de firmware"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Proceso de Desarrollo de Firmware</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Seguimos una metodología estructurada para garantizar un firmware robusto y eficiente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Análisis de Requisitos</h3>
              <p className="text-white/80">
                Definimos detalladamente las funcionalidades y restricciones del firmware.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Diseño y Arquitectura</h3>
              <p className="text-white/80">
                Diseñamos la estructura del firmware y seleccionamos los algoritmos adecuados.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Implementación</h3>
              <p className="text-white/80">
                Desarrollamos el código siguiendo buenas prácticas y estándares de programación.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Pruebas y Validación</h3>
              <p className="text-white/80">
                Realizamos pruebas exhaustivas para garantizar la fiabilidad y robustez del firmware.
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

