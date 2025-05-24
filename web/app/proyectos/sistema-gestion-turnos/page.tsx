import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema de Gestión de Turnos | Caribbean Embedded Labs",
  description: "Sistema basado en Raspberry Pi para la gestión de turnos con capacidad multiusuario, asignación de prioridades y análisis estadístico.",
};

export default function SistemaGestionTurnosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/proyectos">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proyectos
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Sistema de Gestión de Turnos con Raspberry Pi</h1>
        
        <div className="aspect-video relative mb-8 overflow-hidden rounded-lg">
          <img
            src="/sistema_de_turnos.png"
            alt="Sistema de Gestión de Turnos con Raspberry Pi"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">El Desafío</h2>
            <p className="text-muted-foreground mb-6">
              Muchas organizaciones enfrentan el reto de administrar eficientemente la atención al cliente, evitar largas esperas y recopilar datos que permitan optimizar el servicio. Los sistemas tradicionales suelen ser costosos y poco flexibles para adaptarse a necesidades específicas.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Nuestra Solución</h2>
            <p className="text-muted-foreground mb-6">
              Desarrollamos un sistema de gestión de turnos basado en Raspberry Pi que permite seleccionar el tipo de turno e imprimir tickets. El sistema ofrece las siguientes características:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Interfaz táctil intuitiva para selección de servicios</li>
              <li>Impresión de tickets con códigos QR para seguimiento</li>
              <li>Capacidad multiusuario para ser utilizado por varios trabajadores simultáneamente</li>
              <li>Asignación de prioridades a diferentes tipos de turnos</li>
              <li>Captura de datos de los clientes para análisis posterior</li>
              <li>Módulo de estadísticas para analizar servicios más solicitados y tiempos de respuesta</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Arquitectura del Sistema</h2>
            <p className="text-muted-foreground mb-6">
              El sistema se compone de:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Kiosco con pantalla táctil e impresora térmica basado en Raspberry Pi</li>
              <li>Pantallas de visualización para los clientes en espera</li>
              <li>Estaciones de trabajo para los empleados que atienden los turnos</li>
              <li>Servidor central para la gestión de datos y generación de estadísticas</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
            <p className="text-muted-foreground mb-6">
              La implementación del sistema ha permitido:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Reducción del 40% en los tiempos de espera</li>
              <li>Identificación de los servicios más demandados y ajuste de personal en consecuencia</li>
              <li>Mejora en la satisfacción del cliente según encuestas posteriores</li>
              <li>Optimización de recursos humanos basada en datos reales de operación</li>
              <li>Sistema escalable que ha crecido con las necesidades del cliente</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Industria:</span>
                  <p className="font-medium">Atención al Cliente</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tecnologías:</span>
                  <p className="font-medium">Raspberry Pi, Python, React, Node.js</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Hardware:</span>
                  <p className="font-medium">Raspberry Pi, Pantallas Táctiles, Impresoras Térmicas</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Duración:</span>
                  <p className="font-medium">3 meses</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Raspberry Pi</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Python</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">React</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Node.js</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">SQL</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Análisis de Datos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">¿Necesitas un sistema de gestión de turnos?</h2>
          <p className="text-muted-foreground mb-6">
            En Caribbean Embedded Labs podemos ayudarte a desarrollar un sistema de gestión de turnos personalizado para tu negocio, con todas las características que necesitas y adaptado a tu presupuesto.
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
