import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema de Monitoreo de KPI de Producción | Caribbean Embedded Labs",
  description: "Sistema de monitoreo en tiempo real que mide la velocidad de trabajo de las máquinas para calcular KPIs como OEE, eficiencia y más.",
};

export default function MonitoreoKPIProduccionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/proyectos">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a Proyectos
        </Button>
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Sistema de Monitoreo de KPI de Producción en Tiempo Real</h1>
        
        <div className="aspect-video relative mb-8 overflow-hidden rounded-lg">
          <img
            src="/fabrica.png"
            alt="Sistema de Monitoreo de KPI de Producción"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-3">
            <h2 className="text-2xl font-semibold mb-4">El Desafío</h2>
            <p className="text-muted-foreground mb-6">
              Las plantas de producción modernas necesitan datos precisos y en tiempo real para optimizar sus procesos y tomar decisiones informadas. Sin embargo, muchas empresas enfrentan dificultades para obtener estos datos de forma automática y confiable, especialmente cuando trabajan con diferentes tipos de maquinaria.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Nuestra Solución</h2>
            <p className="text-muted-foreground mb-6">
              Desarrollamos un sistema de monitoreo de KPI de producción en tiempo real que:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Cuenta los pulsos de las máquinas para obtener su velocidad de trabajo</li>
              <li>Calcula automáticamente los indicadores clave de rendimiento (KPIs) más importantes para la producción</li>
              <li>Proporciona visualización en tiempo real de métricas críticas como OEE (Eficiencia General de los Equipos)</li>
              <li>Registra tiempos de producción, eficiencia y cantidad de productos rechazados</li>
              <li>Permite el análisis histórico de tendencias y patrones</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Implementación Técnica</h2>
            <p className="text-muted-foreground mb-6">
              El sistema se compone de:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Dispositivos de captura de señales conectados a las máquinas para detectar pulsos de operación</li>
              <li>Unidades de procesamiento que convierten estos pulsos en datos significativos</li>
              <li>Sistema de comunicación que centraliza la información en tiempo real</li>
              <li>Plataforma de software para análisis, visualización y generación de reportes</li>
              <li>Integración con sistemas ERP y MES existentes</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">KPIs Monitoreados</h2>
            <p className="text-muted-foreground mb-6">
              El sistema permite monitorear diversos indicadores críticos:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>OEE (Overall Equipment Effectiveness):</strong> Medición integral de la disponibilidad, rendimiento y calidad</li>
              <li><strong>Tiempo de producción efectivo:</strong> Horas reales de operación productiva</li>
              <li><strong>Eficiencia por máquina y línea:</strong> Comparativa entre rendimiento real y teórico</li>
              <li><strong>Tasa de rechazo:</strong> Porcentaje de productos que no cumplen con los estándares de calidad</li>
              <li><strong>Tiempo medio entre fallos:</strong> Indicador de confiabilidad de los equipos</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
            <p className="text-muted-foreground mb-6">
              La implementación de este sistema ha permitido a nuestros clientes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Incrementar la eficiencia de producción en un 15-20%</li>
              <li>Reducir los tiempos de inactividad no planificados en más del 30%</li>
              <li>Mejorar la calidad del producto mediante la identificación temprana de desviaciones</li>
              <li>Optimizar los horarios de mantenimiento basados en datos reales de operación</li>
              <li>Facilitar la toma de decisiones con información precisa y en tiempo real</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Detalles del Proyecto</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Industria:</span>
                  <p className="font-medium">Manufactura</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tecnologías:</span>
                  <p className="font-medium">IoT, Cloud Computing, Análisis de Datos</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Hardware:</span>
                  <p className="font-medium">Sensores, Microcontroladores, Gateways IoT</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Duración:</span>
                  <p className="font-medium">6 meses</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">OEE</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Tiempo Real</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Industria 4.0</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">IoT</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Big Data</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Cloud</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">¿Buscas optimizar tu producción con datos en tiempo real?</h2>
          <p className="text-muted-foreground mb-6">
            En Caribbean Embedded Labs somos especialistas en el desarrollo de sistemas de monitoreo de KPI para entornos industriales. Contáctanos para diseñar una solución adaptada a las necesidades específicas de tu planta de producción.
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
