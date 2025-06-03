'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error en la aplicación:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
      <p className="text-gray-600 mb-6">
        Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="default"
        >
          Intentar nuevamente
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
