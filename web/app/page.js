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
  MapPin,
} from "lucide-react"
import { SiteFooter } from "@/components/site-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/hans-pcb.png?height=800&width=800')] bg-repeat"></div>
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
                    src="/hans-pcb.png?height=500&width=500"
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
                  src="/soldadura.jpg?height=300&width=300"
                  alt="Validación de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/pcb-4667605_1280.jpg?height=300&width=300"
                  alt="Fabricación de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border">
                <img
                  src="/pcb_3d.png?height=300&width=300"
                  alt="Testing de PCB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden bg-background border mt-8">
                <img
                  src="/pcb-2655767_1280.jpg?height=300&width=300"
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
                    src="/dispositivos_iot.png?height=400&width=600"
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
                  src="/reclouser_itc_iec101.png"
                  alt="Transformación Digital con IoT en Equipos Antiguos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Transformación Digital con IoT</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Implementación de soluciones IoT en equipos industriales antiguos sin conexión a internet, utilizando transceptores especializados como el ISO1500DBQR para entornos hostiles.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">RS485</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IEC101</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT Industrial</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/sistema_de_turnos.png"
                  alt="Sistema de Gestión de Turnos con Raspberry Pi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Gestión de Turnos</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Sistema basado en Raspberry Pi que permite seleccionar tipos de turnos e imprimir tickets, con capacidad multiusuario, asignación de prioridades y análisis estadístico.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Raspberry Pi</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Atención al Cliente</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Análisis de Datos</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="/fabrica.png"
                  alt="Sistema de Monitoreo de KPI de Producción"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">Sistema de Monitoreo de KPI</h3>
                </div>
              </div>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  Sistema que monitorea en tiempo real los pulsos de las máquinas para calcular KPIs críticos como OEE, tiempo de producción efectivo, eficiencia y productos rechazados.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">OEE</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Tiempo Real</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Industria 4.0</span>
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
              <div className="rounded-lg overflow-hidden bg-muted/30 border shadow-lg p-2">
                <img
                  src="/cel_lab.png"
                  alt="Equipo de Caribbean Embedded Labs"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <Users className="w-12 h-12" />
              </div>
            </div>
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

