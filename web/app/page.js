'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  
  // Usar useEffect para manejar la hidratación
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Renderizar un componente simple mientras esperamos la hidratación
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <header className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Página Principal</h1>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bienvenido a Caribbean Embedded Labs</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Soluciones electrónicas personalizadas para tus proyectos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Servicios</CardTitle>
              <CardDescription>Explora nuestros servicios</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Ofrecemos diseño de PCBs, programación de microcontroladores, prototipado electrónico y más.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/servicios" className="w-full">
                <Button className="w-full">Ver Servicios</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Proyectos</CardTitle>
              <CardDescription>Conoce nuestros proyectos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Descubre los proyectos en los que hemos trabajado y cómo hemos ayudado a nuestros clientes.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/proyectos" className="w-full">
                <Button className="w-full">Ver Proyectos</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacto</CardTitle>
              <CardDescription>Ponte en contacto con nosotros</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                ¿Tienes un proyecto en mente? Contáctanos y te ayudaremos a hacerlo realidad.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/contacto" className="w-full">
                <Button className="w-full">Contactar</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
