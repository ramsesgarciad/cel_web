'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginError({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error en la página de login:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-2xl font-bold mb-4">Error en el inicio de sesión</h2>
      <p className="text-gray-600 mb-6">
        Ha ocurrido un error al intentar cargar la página de inicio de sesión. Por favor, intenta de nuevo.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="default"
        >
          Intentar nuevamente
        </Button>
        <Button
          asChild
          variant="outline"
        >
          <Link href="/">
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}
