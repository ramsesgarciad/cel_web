import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Users, CheckCircle, Award, Briefcase } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function SobreNosotrosPage() {
  return (
    <div>
      <PageHeader 
        title="Sobre Caribbean Embedded Labs" 
        description="Somos un equipo de ingenieros apasionados por la electrónica y el desarrollo de soluciones tecnológicas innovadoras."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-marine">Nuestra Historia</h2>
              <p className="text-lg mb-6">
                Caribbean Embedded Labs nació de la pasión por la electrónica y los sistemas embebidos de un grupo de ingenieros dominicanos con amplia experiencia en el sector industrial. Desde nuestros inicios, nos hemos especializado en el diseño de hardware, firmware y soluciones IoT personalizadas para las necesidades específicas de cada cliente.
              </p>
              <p className="text-lg mb-6">
                Nuestra trayectoria comenzó con proyectos de monitoreo industrial y ha evolucionado hasta convertirnos en referentes en el diseño de PCBs, desarrollo de firmware y sistemas completos de telemetría para diversas industrias en la región del Caribe.
              </p>
              <p className="text-lg mb-6">
                Con más de 7 años de experiencia en el desarrollo de soluciones embebidas, hemos creado desde módems WiFi para recolección de datos mediante comunicación ModBus, hasta sistemas completos de monitoreo de KPIs en líneas de producción, permitiendo a nuestros clientes tomar decisiones basadas en datos en tiempo real.
              </p>
              <p className="text-lg mb-6">
                Nuestra experiencia abarca desde el diseño de hardware hasta la implementación de complejos protocolos de comunicación (Modbus, TCP, BLE), desarrollo de firmware especializado, y creación de servidores web embebidos para configuración y monitoreo. Cada solución es diseñada pensando en su escalabilidad y mantenimiento a largo plazo.
              </p>
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

      <section className="py-16 bg-blue-marine text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Estos son los principios que guían nuestro trabajo diario y nos permiten ofrecer soluciones de calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-marine-dark p-6 rounded-lg shadow-lg">
              <CheckCircle className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Excelencia Técnica</h3>
              <p>
                Nos esforzamos por mantener los más altos estándares de calidad en cada proyecto, utilizando las mejores prácticas y tecnologías disponibles.
              </p>
            </div>

            <div className="bg-blue-marine-dark p-6 rounded-lg shadow-lg">
              <Award className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Innovación Constante</h3>
              <p>
                Buscamos constantemente nuevas formas de resolver problemas y mejorar nuestros procesos, manteniéndonos al día con las últimas tendencias tecnológicas.
              </p>
            </div>

            <div className="bg-blue-marine-dark p-6 rounded-lg shadow-lg">
              <Briefcase className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Compromiso con el Cliente</h3>
              <p>
                Trabajamos estrechamente con nuestros clientes para entender sus necesidades y ofrecer soluciones personalizadas que superen sus expectativas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Nuestro Equipo</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Contamos con un equipo multidisciplinar de profesionales apasionados por la tecnología y la innovación.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                  alt="Ingeniero de Hardware Senior"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">Ramses García</h3>
                <p className="text-sm text-muted-foreground mb-2">Ingeniero de Hardware Senior</p>
                <p className="text-sm">
                  Especialista en diseño de PCBs, firmware y pruebas de sistemas embebidos. Experiencia en Design for Manufacturing.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
                  alt="Desarrollador de Firmware"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">Reynaldo Veloz</h3>
                <p className="text-sm text-muted-foreground mb-2">Desarrollador de Firmware</p>
                <p className="text-sm">
                  Experto en desarrollo de firmware para microcontroladores ESP32, STM32 y diseño de PCBs. Especialista en C/C++ y aplicaciones de machine learning para dispositivos embebidos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Ingeniero de Diseño Mecánico"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">Pankaj Choudhary</h3>
                <p className="text-sm text-muted-foreground mb-2">Ingeniero de Diseño Mecánico Senior</p>
                <p className="text-sm">
                  Especialista en diseño mecánico de enclosures para dispositivos electrónicos, análisis térmico y estructural, y optimización de productos para fabricación a escala industrial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-marine">Nuestras Capacidades</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Contamos con infraestructura híbrida que combina instalaciones físicas y laboratorios remotos para el diseño, desarrollo y validación de soluciones electrónicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg relative">
              <img
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Laboratorio de Diseño de Hardware"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-bold">Diseño de Hardware</h3>
                <p className="text-white/80 text-sm">Estaciones de trabajo con herramientas CAD avanzadas</p>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted/30 border shadow-lg relative">
              <img
                src="https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Área de Desarrollo y Testing"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-bold">Laboratorio de Testing</h3>
                <p className="text-white/80 text-sm">Equipamiento para validación de prototipos y pruebas de sistemas</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold mb-2 text-blue-marine">Diseño para Manufactura</h3>
              <p className="text-sm text-muted-foreground">
                Optimizamos cada diseño para su fabricación eficiente, considerando costos, disponibilidad de componentes y escalabilidad.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold mb-2 text-blue-marine">IoT & Conectividad</h3>
              <p className="text-sm text-muted-foreground">
                Expertos en desarrollo de soluciones IoT con conectividad WiFi, 4G, BLE y protocolos industriales como Modbus.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <h3 className="font-bold mb-2 text-blue-marine">Análisis de Datos</h3>
              <p className="text-sm text-muted-foreground">
                Transformamos datos operativos en información valiosa mediante dashboards personalizados y algoritmos de análisis.
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
                <h2 className="text-3xl font-bold mb-4">¿Tienes un proyecto en mente?</h2>
                <p className="text-lg mb-6">
                  Estamos listos para ayudarte a convertir tus ideas en realidad. Contáctanos hoy mismo para discutir tu proyecto.
                </p>
                <Link href="/contacto">
                  <Button className="bg-white text-blue-marine hover:bg-white/90">
                    Contactar ahora
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <img
                  src="/coding_fw.jpg"
                  alt="Colaboración en proyectos"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
