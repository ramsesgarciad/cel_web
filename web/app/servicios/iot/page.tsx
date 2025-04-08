import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Wifi, Zap, Workflow, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function IoTPage() {
  return (
    <div>
      <PageHeader
        title="Diseño de Productos IoT"
        description="Conectamos dispositivos a internet para recopilar datos en tiempo real y mejorar la eficiencia en diversos sectores."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Dispositivo IoT"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                  <Wifi className="w-12 h-12" />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Soluciones IoT a Medida</h2>
              <p className="text-lg mb-6">
                El Internet de las Cosas (IoT) está redefiniendo la conectividad entre dispositivos, permitiendo la
                recopilación de datos en tiempo real y mejorando la eficiencia en todos los sectores económicos. En
                Caribbean Embedded Labs desarrollamos soluciones IoT personalizadas para tus necesidades específicas.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Conectividad Avanzada</h3>
                    <p className="text-muted-foreground">
                      Implementamos tecnologías como 2G/3G/4G/5G, WiFi, Bluetooth, LoRa, Zigbee y PLC para todo tipo de
                      aplicaciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Bajo Consumo</h3>
                    <p className="text-muted-foreground">
                      Diseñamos dispositivos de bajo y ultra bajo consumo, ideales para aplicaciones alimentadas por
                      batería.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Conectividad Cloud</h3>
                    <p className="text-muted-foreground">
                      Implementamos protocolos MQTT y HTTP para conexión con la nube y acceso a datos en tiempo real.
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
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Aplicaciones IoT</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Nuestras soluciones IoT se aplican en diversos sectores, mejorando procesos y generando valor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Workflow className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Industria 4.0</h3>
              <p className="text-muted-foreground mb-4">
                Monitorización de maquinaria, mantenimiento predictivo y optimización de procesos industriales.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sensores para monitorización de variables críticas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sistemas de alerta temprana</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Dashboards para visualización de datos</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Smart Energy</h3>
              <p className="text-muted-foreground mb-4">
                Gestión inteligente de la energía, monitorización de consumo y optimización de recursos.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Medidores inteligentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Control de cargas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Integración con energías renovables</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Wifi className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-marine">Smart Agriculture</h3>
              <p className="text-muted-foreground mb-4">
                Monitorización de cultivos, riego inteligente y optimización de recursos agrícolas.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sensores de humedad y temperatura</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Sistemas de riego automatizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Monitorización de variables ambientales</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Arquitectura IoT Completa</h2>
              <p className="text-lg mb-6">
                Desarrollamos soluciones IoT end-to-end, desde el hardware hasta la plataforma de visualización de
                datos.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Hardware IoT</h3>
                    <p className="text-muted-foreground">
                      Diseñamos y fabricamos dispositivos IoT personalizados con sensores, actuadores y conectividad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Firmware Optimizado</h3>
                    <p className="text-muted-foreground">
                      Desarrollamos firmware eficiente para maximizar la duración de la batería y optimizar la
                      conectividad.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Backend y Almacenamiento</h3>
                    <p className="text-muted-foreground">
                      Implementamos servidores y bases de datos para almacenar y procesar los datos recopilados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Dashboards y Aplicaciones</h3>
                    <p className="text-muted-foreground">
                      Creamos interfaces de usuario intuitivas para visualizar y analizar los datos en tiempo real.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Arquitectura IoT"
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
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos para tu proyecto IoT?</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Nuestra experiencia y enfoque integral nos distinguen en el desarrollo de soluciones IoT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Experiencia Integral</h3>
              <p className="text-white/80">
                Dominamos todas las capas de la arquitectura IoT, desde el hardware hasta la nube.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Soluciones Escalables</h3>
              <p className="text-white/80">
                Diseñamos pensando en el futuro, permitiendo que tu solución IoT crezca con tu negocio.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seguridad Integrada</h3>
              <p className="text-white/80">
                Implementamos medidas de seguridad en todas las capas para proteger tus datos y dispositivos.
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

