import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transformación Digital con IoT en Equipos Antiguos | Caribbean Embedded Labs",
  description: "Caso de estudio sobre la implementación de soluciones IoT en equipos industriales antiguos sin conexión a internet.",
};

export default function TransformacionDigitalIoTPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/proyectos">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proyectos
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Transformación Digital con IoT en Equipos Antiguos: Un Reto Superable</h1>
        
        <div className="aspect-video relative mb-8 overflow-hidden rounded-lg">
          <img
            src="/reclouser_itc_iec101.png"
            alt="Transformación Digital con IoT en Equipos Antiguos"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">El Desafío</h2>
            <p className="text-muted-foreground mb-6">
              En la implementación de soluciones IoT para equipos antiguos sin conexión a internet, uno de los mayores retos es asegurar que estas soluciones sean robustas y eficientes en entornos hostiles. La teoría en el laboratorio puede ser muy distinta a lo que se enfrenta en campo real.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Nuestra Solución</h2>
            <p className="text-muted-foreground mb-6">
              Trabajamos en un proyecto donde teníamos que leer datos de un equipo industrial utilizando el protocolo RS485 IEC101. Inicialmente, optamos por un MAX485 genérico, que funcionaba bien en ambiente de pruebas, pero al llevarlo al entorno real, falló debido a las altas exigencias del lugar y el desgaste de componentes.
            </p>
            <p className="text-muted-foreground mb-6">
              La solución llegó al investigar y emplear el ISO1500DBQR, un transceptor con protecciones para ambientes de alta tensión, que ha demostrado ser la opción adecuada para garantizar la estabilidad en condiciones adversas.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
            <p className="text-muted-foreground mb-6">
              Logramos implementar con éxito una solución IoT en equipos industriales antiguos, permitiendo:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Monitorización en tiempo real de equipos previamente aislados</li>
              <li>Integración con sistemas modernos de análisis de datos</li>
              <li>Operación continua en entornos industriales hostiles</li>
              <li>Extensión de la vida útil de equipamiento costoso</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Lección Clave</h2>
            <p className="text-muted-foreground mb-6">
              No solo se trata de hacer que funcione, sino de asegurarse de que sea lo suficientemente robusto para enfrentarse al mundo real. Implementar IoT en equipos antiguos es posible, pero el enfoque debe ser hacia la resiliencia y durabilidad del hardware en el entorno en que va a operar.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Industria:</span>
                  <p className="font-medium">Industrial</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tecnologías:</span>
                  <p className="font-medium">RS485, IEC101, IoT</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Hardware:</span>
                  <p className="font-medium">ISO1500DBQR, Microcontroladores</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Duración:</span>
                  <p className="font-medium">4 meses</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">RS485</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IEC101</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT Industrial</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Microcontroladores</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Cloud</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">¿Tienes un proyecto similar?</h2>
          <p className="text-muted-foreground mb-6">
            En Caribbean Embedded Labs tenemos experiencia en la transformación digital de equipos industriales antiguos. 
            Contáctanos para discutir cómo podemos ayudarte a implementar soluciones IoT robustas y eficientes para tus equipos existentes.
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
