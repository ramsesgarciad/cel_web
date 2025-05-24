import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitoreo de Temperatura y Humedad para Cuartos Fríos | Caribbean Embedded Labs",
  description: "Sistema de monitoreo con sensores IP68 conectados por RS485 que permite supervisar en tiempo real la temperatura y humedad en cuartos fríos con alertas automáticas.",
};

export default function MonitoreoCuartosFriosPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/proyectos">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proyectos
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Sistema de Monitoreo de Temperatura y Humedad para Cuartos Fríos</h1>
        
        <div className="aspect-video relative mb-8 overflow-hidden rounded-lg">
          <img
            src="/cuarto_frio.png"
            alt="Sistema de Monitoreo de Temperatura para Cuartos Fríos"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">El Desafío</h2>
            <p className="text-muted-foreground mb-6">
              Los cuartos fríos utilizados en la industria alimentaria, farmacéutica y de logística requieren un control estricto y constante de la temperatura y humedad. 
              Las variaciones fuera de los rangos establecidos pueden comprometer la integridad de los productos almacenados y resultar en pérdidas significativas. 
              El desafío consistía en desarrollar un sistema fiable que permitiera monitorear múltiples puntos dentro de cada cuarto frío, resistente a las condiciones 
              de alta humedad y bajas temperaturas.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Nuestra Solución</h2>
            <p className="text-muted-foreground mb-6">
              Desarrollamos un sistema de monitoreo que utiliza sensores IP68 (totalmente herméticos) conectados mediante protocolo RS485 para obtener lecturas precisas 
              de temperatura y humedad desde múltiples puntos dentro de cada cuarto frío. El sistema incluye:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Red de sensores IP68 distribuidos estratégicamente para obtener datos representativos del ambiente</li>
              <li>Comunicación RS485 para garantizar la integridad de los datos incluso en largas distancias</li>
              <li>Unidad central de procesamiento que recopila y analiza los datos en tiempo real</li>
              <li>Sistema de alertas configurables vía SMS, correo electrónico y aplicación móvil</li>
              <li>Interfaz web para visualización de datos históricos y generación de reportes</li>
              <li>Respaldo en la nube con acceso seguro desde cualquier lugar</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Características Técnicas</h2>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Sensores:</strong> Certificados IP68, resistentes a ambientes húmedos y temperaturas extremas (rango -40°C a +85°C)</li>
              <li><strong>Precisión:</strong> ±0.3°C para temperatura y ±2% para humedad relativa</li>
              <li><strong>Comunicación:</strong> RS485 con protocolo Modbus RTU para comunicación robusta en entornos industriales</li>
              <li><strong>Alimentación:</strong> Sistema de alimentación redundante con respaldo de batería para garantizar operación continua</li>
              <li><strong>Almacenamiento de datos:</strong> Local y en la nube, con hasta 10 años de datos históricos accesibles</li>
              <li><strong>Muestreo:</strong> Configurable desde lecturas cada 10 segundos hasta intervalos de 1 hora</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Sistema de Alertas</h2>
            <p className="text-muted-foreground mb-6">
              El sistema cuenta con un avanzado módulo de alertas que permite:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Definir rangos de operación seguros para cada cuarto frío</li>
              <li>Establecer diferentes niveles de alerta (advertencia, crítica, emergencia)</li>
              <li>Configurar destinatarios específicos para cada tipo de alerta</li>
              <li>Enviar notificaciones en tiempo real a través de múltiples canales</li>
              <li>Escalar automáticamente las alertas si no son atendidas en un tiempo determinado</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
            <p className="text-muted-foreground mb-6">
              La implementación de este sistema ha permitido a nuestros clientes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Reducir en un 95% las pérdidas de producto por fallos en los sistemas de refrigeración</li>
              <li>Cumplir con normativas estrictas de almacenamiento en industrias reguladas</li>
              <li>Optimizar el consumo energético de los sistemas de refrigeración</li>
              <li>Identificar patrones y tendencias para mantenimiento preventivo</li>
              <li>Centralizar el monitoreo de múltiples instalaciones en diferentes ubicaciones</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Industria:</span>
                  <p className="font-medium">Alimentaria, Farmacéutica, Logística</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tecnologías:</span>
                  <p className="font-medium">RS485, Modbus RTU, IoT, Cloud</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Hardware:</span>
                  <p className="font-medium">Sensores IP68, Microcontroladores, Gateways</p>
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
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IP68</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">RS485</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Modbus RTU</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Alertas</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Monitoreo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">¿Necesitas un sistema de monitoreo para tus cuartos fríos?</h2>
          <p className="text-muted-foreground mb-6">
            En Caribbean Embedded Labs somos especialistas en el desarrollo de soluciones de monitoreo para entornos críticos. 
            Contáctanos para diseñar un sistema adaptado a las necesidades específicas de tu instalación.
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
