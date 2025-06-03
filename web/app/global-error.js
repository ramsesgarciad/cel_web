'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error global en la aplicación:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
          <p className="text-gray-600 mb-6">
            Ha ocurrido un error inesperado en la aplicación. Por favor, intenta de nuevo.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Intentar nuevamente
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
