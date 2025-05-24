import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChevronRight,
  Thermometer,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Check
} from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ProductosPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-marine">Soluciones de Monitoreo Industrial</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Dispositivos de alta precisión diseñados para la industria 4.0, con integración a nuestros sistemas de telemetría y análisis de datos.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Monitor de Variables */}
            <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 flex flex-col">
              <div className="relative">
                <div className="aspect-square bg-white flex items-center justify-center p-6 overflow-hidden border rounded-lg">
                  <img 
                    src="/CEL-MV100.png" 
                    alt="Monitor de Variables CEL-MV100" 
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                </div>
                <Badge className="absolute top-3 right-3 bg-primary text-white">Nuevo</Badge>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl md:text-2xl">CEL-MV100</CardTitle>
                    <CardDescription className="text-base mt-1">Monitor de Variables Industrial</CardDescription>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Thermometer className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Sistema avanzado de monitoreo para variables industriales con conectividad remota y
                  compatibilidad con múltiples tipos de sensores.
                </p>
                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Compatible con sensores analógicos (0-10V, 4-20mA)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Comunicación Modbus RTU/TCP para equipos industriales</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Visualización remota vía sistema de telemetría CEL</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Almacenamiento de datos en la nube y generación de alertas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Batería de respaldo y conectividad WiFi/4G opcional</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start border-t pt-6 mt-auto">
                <div className="flex gap-4 w-full">
                  <Link href="/contacto" className="flex-1">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Solicitar cotización
                    </Button>
                  </Link>
                  <Link href="/productos/monitor-variables" className="flex-shrink-0">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            {/* Contador de Pulsos */}
            <Card className="overflow-hidden border-2 hover:border-primary transition-all duration-300 flex flex-col">
              <div className="relative">
                <div className="aspect-square bg-white flex items-center justify-center p-6 overflow-hidden border rounded-lg">
                  <img 
                    src="/CEL-CP200.png" 
                    alt="Contador de Pulsos CEL-CP200" 
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                </div>
                <Badge className="absolute top-3 right-3 bg-green-600 text-white">Bestseller</Badge>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl md:text-2xl">CEL-CP200</CardTitle>
                    <CardDescription className="text-base mt-1">Contador de Pulsos para KPI</CardDescription>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-full">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Dispositivo para monitoreo de producción en tiempo real que se integra con nuestro sistema de KPI
                  para análisis avanzado y reportes automáticos.
                </p>
                <div className="space-y-3 mt-6">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>8 entradas digitales para conteo de pulsos de alta velocidad</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Cálculo automático de OEE, eficiencia y disponibilidad</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Tablero de KPIs en tiempo real con alertas configurables</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Generación de reportes diarios, semanales y mensuales</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Integración con sistemas ERP/MES vía API REST</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start border-t pt-6 mt-auto">
                <div className="flex gap-4 w-full">
                  <Link href="/contacto" className="flex-1">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Solicitar cotización
                    </Button>
                  </Link>
                  <Link href="/productos/contador-pulsos" className="flex-shrink-0">
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-marine text-center">
              ¿Por qué elegir nuestros dispositivos de monitoreo?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-blue-marine flex items-center gap-2">
                  <div className="bg-blue-50 p-1.5 rounded-full">
                    <ExternalLink className="h-5 w-5 text-primary" />
                  </div>
                  Conectividad sin límites
                </h3>
                <p className="text-muted-foreground">
                  Nuestros dispositivos se conectan a prácticamente cualquier sensor o máquina industrial, 
                  permitiéndote centralizar toda la información de tu planta en un solo sistema.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-3 text-blue-marine flex items-center gap-2">
                  <div className="bg-blue-50 p-1.5 rounded-full">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  Análisis avanzado
                </h3>
                <p className="text-muted-foreground">
                  No solo recopilamos datos, sino que los transformamos en información accionable 
                  mediante nuestros algoritmos de análisis predictivo y dashboards personalizables.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/contacto">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Solicita una demostración
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
