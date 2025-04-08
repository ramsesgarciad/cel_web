import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChevronRight,
  Cpu,
  CircuitBoardIcon as Circuit,
  Zap,
  Layers,
  CheckCircle,
  Workflow,
  Wifi,
  Users,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-marine">Diseño Electrónico a Medida</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expertos en el diseño de PCBs y diseño electrónico. Ofrecemos soluciones electrónicas personalizadas
                para transformar tus ideas en productos de calidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contacto">
                  <Button size="lg" className="px-8 bg-primary text-primary-foreground hover:bg-blue-light">
                    Hablar con un experto
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Acceder al panel
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted/30 border shadow-lg">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Diseño de PCB"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                  <Cpu className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Servicio Integral</h2>
            <p className="text-xl max-w-3xl mx-auto">
              En Caribbean Embedded Labs cubrimos todas las etapas del diseño de PCBs, desde la concepción hasta la
              producción en masa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card id="pcb-design" className="bg-white text-blue-marine">
              <CardHeader>
                <Circuit className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Diseño de PCBs</CardTitle>
                <CardDescription>
                  Desarrollamos circuitos impresos que desempeñen su funcionalidad de manera óptima.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
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
              </CardContent>
            </Card>

            <Card id="microcontrollers" className="bg-white text-blue-marine">
              <CardHeader>
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Programación de Microcontroladores</CardTitle>
                <CardDescription>Desarrollo de firmware a medida para asegurar un rendimiento óptimo.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
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
              </CardContent>
            </Card>

            <Card id="prototyping" className="bg-white text-blue-marine">
              <CardHeader>
                <Layers className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Prototipado Electrónico</CardTitle>
                <CardDescription>
                  Desarrollamos prototipos funcionales para evaluar y perfeccionar tus diseños.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="manufacturing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Validación y Fabricación</h2>
              <p className="text-lg mb-6">
                Nos encargamos del testing de tu PCB. Analizamos y debuggeamos el circuito electrónico y el firmware
                hasta cumplir todas las especificaciones y alcanzar un desempeño óptimo.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Validación Hardware</h3>
                    <p className="text-muted-foreground">
                      Verificación de funcionalidad y fiabilidad del circuito impreso.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Validación Software</h3>
                    <p className="text-muted-foreground">Tests para comprobar la fiabilidad y robustez del firmware.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Fabricación de Circuitos Impresos</h3>
                    <p className="text-muted-foreground">
                      Desde pocas unidades para prototipos hasta miles para producción en masa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Ensamblaje de Circuitos Electrónicos</h3>
                    <p className="text-muted-foreground">
                      Soldadura de todo tipo de componentes, desde orificio pasante hasta SMD.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contacto">
                  <Button className="bg-primary text-primary-foreground hover:bg-blue-light">
                    Concertar una reunión
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-background border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Validación de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Fabricación de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Testing de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Ensamblaje de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IoT Section */}
      <section id="iot" className="py-20 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="aspect-video rounded-lg overflow-hidden bg-white/10 border shadow-lg">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Dispositivo IoT"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground p-4 rounded-lg shadow-lg">
                  <Wifi className="w-12 h-12" />
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Diseño de productos IoT</h2>
              <p className="text-lg mb-6">
                El Internet de las Cosas (IoT) está redefiniendo la conectividad entre todos los dispositivos del mundo,
                permitiendo la recopilación de datos en tiempo real y mejorando la eficiencia de todos los sectores
                económicos.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Wifi className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Conectividad Avanzada</h3>
                    <p className="text-white/80">
                      2G/3G/4G/5G, WiFi, Bluetooth, LoRa, Zigbee y PLC para todo tipo de aplicaciones.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Bajo Consumo</h3>
                    <p className="text-white/80">
                      Diseños de bajo y ultra bajo consumo, ideales para dispositivos alimentados por batería.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Workflow className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Conectividad Cloud</h3>
                    <p className="text-white/80">
                      Implementación de protocolos MQTT y HTTP para conexión con la nube y acceso a datos en tiempo
                      real.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contacto">
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Hablar con nuestros expertos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Proyectos Realizados</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conoce algunos de los proyectos que hemos desarrollado para nuestros clientes en diferentes industrias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sistema de monitorización industrial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Monitorización Industrial</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Desarrollo de un sistema completo de monitorización para una planta industrial, incluyendo sensores,
                  comunicación inalámbrica y dashboard de control.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Industria 4.0</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Monitorización</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Dispositivo médico portátil"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Dispositivo Médico Portátil</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Diseño y desarrollo de un dispositivo médico portátil para monitorización de signos vitales, con
                  conectividad Bluetooth y bajo consumo energético.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Salud</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Bluetooth</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Bajo Consumo</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="Sistema de riego inteligente"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Riego Inteligente</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Desarrollo de un sistema de riego inteligente para agricultura, con sensores de humedad, control
                  remoto y optimización del consumo de agua.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Agricultura</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">LoRa</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Sostenibilidad</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-primary text-primary-foreground hover:bg-blue-light">
              Ver más proyectos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-20 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
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
                  <p className="text-white/80">
                    Automatización avanzada y digitalización industrial para mejorar la eficiencia.
                  </p>
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
                  <p className="text-white/80">
                    Fabricación de vehículos y tecnología de transporte con altos estándares de calidad.
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
                  <p className="text-white/80">
                    Conexión de dispositivos y recopilación de datos en tiempo real para diversas aplicaciones.
                  </p>
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
                  <p className="text-white/80">
                    Industria de vuelo y exploración espacial con los más altos estándares de fiabilidad.
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
                  <p className="text-white/80">
                    Control inteligente del hogar para ahorro energético y mayor comodidad.
                  </p>
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
                  <p className="text-white/80">
                    Monitorización de pacientes y suministro de medicamentos con alta precisión.
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
                  <p className="text-white/80">
                    Anticipación de condiciones climáticas y mejora de la productividad de las cosechas.
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
                  <p className="text-white/80">
                    Distribución inteligente de energía y supervisión en tiempo real de recursos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Sobre Caribbean Embedded Labs</h2>
              <p className="text-lg mb-6">
                Somos un equipo de ingenieros apasionados por la electrónica y el desarrollo de soluciones tecnológicas
                innovadoras. Nuestra misión es ayudar a empresas y emprendedores a transformar sus ideas en productos
                electrónicos de alta calidad.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Experiencia</h3>
                    <p className="text-muted-foreground">
                      Más de 10 años de experiencia en el diseño y desarrollo de soluciones electrónicas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Equipo</h3>
                    <p className="text-muted-foreground">
                      Ingenieros especializados en electrónica, firmware, IoT y fabricación.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-marine">Compromiso</h3>
                    <p className="text-muted-foreground">
                      Nos comprometemos con la calidad y la satisfacción de nuestros clientes en cada proyecto.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Equipo de Caribbean Embedded Labs"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <Users className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Últimas Publicaciones</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Mantente al día con las últimas tendencias y novedades en el mundo de la electrónica y el IoT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white text-blue-marine">
              <div className="aspect-video">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Tendencias en IoT"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <div className="text-xs text-muted-foreground mb-2">12 Abril, 2025</div>
                <h3 className="text-lg font-bold mb-2">Tendencias en IoT para 2025</h3>
                <p className="text-muted-foreground mb-4">
                  Descubre las tendencias más importantes en el Internet de las Cosas para este año y cómo pueden
                  impactar en tu negocio.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline flex items-center">
                  Leer más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white text-blue-marine">
              <div className="aspect-video">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Diseño de PCBs"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <div className="text-xs text-muted-foreground mb-2">28 Marzo, 2025</div>
                <h3 className="text-lg font-bold mb-2">Mejores prácticas en el diseño de PCBs</h3>
                <p className="text-muted-foreground mb-4">
                  Aprende las mejores prácticas para diseñar PCBs eficientes, fiables y con un buen rendimiento
                  electromagnético.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline flex items-center">
                  Leer más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white text-blue-marine">
              <div className="aspect-video">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Microcontroladores"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="pt-4">
                <div className="text-xs text-muted-foreground mb-2">15 Marzo, 2025</div>
                <h3 className="text-lg font-bold mb-2">Comparativa de microcontroladores para IoT</h3>
                <p className="text-muted-foreground mb-4">
                  Analizamos los microcontroladores más populares para proyectos IoT y te ayudamos a elegir el más
                  adecuado.
                </p>
                <Link href="#" className="text-primary font-medium hover:underline flex items-center">
                  Leer más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Ver todas las publicaciones
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-blue-marine">
                Cuéntanos tu idea. Nosotros hacemos el resto.
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Si tienes un proyecto entre manos y no sabes cómo desarrollarlo, nosotros te ayudamos.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nombre
                      </label>
                      <input id="name" type="text" className="w-full p-2 border rounded-md" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border rounded-md"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Empresa
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="project" className="text-sm font-medium">
                      Tipo de Proyecto
                    </label>
                    <select id="project" className="w-full p-2 border rounded-md">
                      <option value="">Selecciona una opción</option>
                      <option value="pcb">Diseño de PCB</option>
                      <option value="firmware">Programación de Microcontroladores</option>
                      <option value="prototype">Prototipado Electrónico</option>
                      <option value="iot">Desarrollo IoT</option>
                      <option value="manufacturing">Fabricación</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      placeholder="Cuéntanos sobre tu proyecto o idea"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-blue-light">
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}

