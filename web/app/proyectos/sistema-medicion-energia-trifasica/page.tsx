import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema de Medición de Energía Trifásica | Caribbean Embedded Labs",
  description: "Dispositivo avanzado para medición de energía en sistemas trifásicos con interfaz táctil, conectividad de red y capacidad de ejecución de scripts en MicroPython.",
};

export default function SistemaMedicionEnergiaTrifasicaPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/proyectos">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proyectos
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Sistema Avanzado de Medición de Energía Trifásica</h1>
        
        <div className="aspect-video relative mb-8 overflow-hidden rounded-lg">
          <img
            src="/medidor_pfc.png"
            alt="Sistema de Medición de Energía Trifásica"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">El Desafío</h2>
            <p className="text-muted-foreground mb-6">
              Las industrias modernas requieren sistemas de medición de energía precisos, flexibles y con capacidades avanzadas de conectividad 
              y programación. Desarrollar un dispositivo que combine medición trifásica con capacidad de ejecución de scripts personalizados, 
              conectividad de red y expansibilidad, manteniendo un alto nivel de usabilidad, representaba un reto técnico significativo.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Nuestra Solución</h2>
            <p className="text-muted-foreground mb-6">
              Desarrollamos un sistema integral para la medición de energía en sistemas trifásicos de 4 hilos que incorpora:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Interfaz táctil a color de 4 pulgadas para configuración local y visualización de datos</li>
              <li>Aplicación web para monitorización y configuración remota</li>
              <li>Capacidad de ejecución de scripts en MicroPython para personalización de funcionalidades</li>
              <li>Módulos de expansión para relés (hasta 12 salidas configurables)</li>
              <li>Conectividad Ethernet y RS485 para integración con sistemas industriales</li>
              <li>Registro avanzado de eventos (SOE) con timestamp preciso</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Características Técnicas</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Medición de Energía:</strong> Sistema trifásico de 4 hilos, voltaje máximo de 480V (con protección adicional del 15%), relación de transformadores de corriente configurada para 5A en el secundario</li>
              <li><strong>Procesamiento:</strong> ESP32-S3 con 16MB de flash, con soporte para actualizaciones OTA</li>
              <li><strong>Memoria:</strong> 128MB de flash integrada y EEPROM 2MB para configuraciones</li>
              <li><strong>Almacenamiento de Datos:</strong> Capacidad para almacenar hasta 30 días de datos históricos con lecturas cada minuto</li>
              <li><strong>Interfaz:</strong> Pantalla táctil full color de 4 pulgadas (480x480) y 4 botones físicos</li>
              <li><strong>Comunicación:</strong> Ethernet, RS485, WiFi, MQTT</li>
              <li><strong>Carcasa:</strong> Diseño para panel de 96mm x 96mm con acabado profesional</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Programabilidad y Flexibilidad</h2>
            <p className="text-muted-foreground mb-6">
              Una característica diferenciadora de nuestro sistema es su capacidad de ejecución de código personalizado:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Motor de ejecución basado en MicroPython</li>
              <li>Posibilidad de cargar scripts desde la webapp para su ejecución directa en el dispositivo</li>
              <li>Integración de funciones programadas en C/C++ con sintaxis Python</li>
              <li>Facilidad para adaptar el comportamiento del sistema a necesidades específicas</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Monitoreo y Conectividad</h2>
            <p className="text-muted-foreground mb-6">
              El sistema ofrece capacidades avanzadas de monitoreo y conectividad:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Visualización de datos en intervalos configurables (1 min, 5 min, 15 min, 30 min, 1h y 24h)</li>
              <li>Integración con la plataforma ThinBoards para monitoreo remoto</li>
              <li>Registro detallado de eventos con información de operación, valor y timestamp</li>
              <li>Comunicación industrial a través de RS485</li>
              <li>Conectividad WiFi y MQTT para sistemas IoT modernos</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Diseño Mecánico</h2>
            <p className="text-muted-foreground mb-6">
              El diseño físico del dispositivo fue cuidadosamente desarrollado para cumplir con los estándares industriales:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Case personalizado para panel de 96mm x 96mm</li>
              <li>Fabricación mediante impresión 3D en resina de alta calidad</li>
              <li>Acabado en arena (sandblasting) para terminaciones profesionales y duraderas</li>
              <li>Diseño optimizado para entornos industriales</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
            <p className="text-muted-foreground mb-6">
              Este proyecto ha permitido:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Crear un sistema de medición de energía altamente preciso y versátil</li>
              <li>Proporcionar capacidades avanzadas de programación y personalización</li>
              <li>Facilitar la integración con sistemas de monitoreo industrial</li>
              <li>Desarrollar un producto con potencial comercial significativo</li>
              <li>Establecer una plataforma base para futuros desarrollos en el campo de la medición industrial</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Industria:</span>
                  <p className="font-medium">Energía, Industrial</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tecnologías:</span>
                  <p className="font-medium">ESP32, MicroPython, RS485, MQTT</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Hardware:</span>
                  <p className="font-medium">PCB personalizado, Pantalla táctil, Relés</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Duración:</span>
                  <p className="font-medium">8 meses</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Especificaciones</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Voltaje:</span>
                  <p className="font-medium">AC 3x220/480V ±0.5%F.S</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Corriente:</span>
                  <p className="font-medium">AC 3x5A ±0.5%F.S</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Frecuencia:</span>
                  <p className="font-medium">50-60 Hz</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Display:</span>
                  <p className="font-medium">4" táctil, 480x480</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">ESP32</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">MicroPython</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Trifásico</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">MQTT</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">RS485</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">¿Necesitas un sistema de medición personalizado?</h2>
          <p className="text-muted-foreground mb-6">
            En Caribbean Embedded Labs desarrollamos soluciones de medición a medida para necesidades industriales específicas. 
            Contáctanos para discutir cómo podemos ayudarte a implementar sistemas de medición precisos, flexibles y conectados.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/contacto">Contactar ahora</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/servicios">Ver nuestros servicios</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
