'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Registrar el error global en un servicio de análisis
    console.error('Error global en la aplicación:', error)
  }, [error])

  return (
    <html lang="es">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-50">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg shadow-md max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-red-700">Error crítico</h2>
            <p className="text-gray-600 mb-6">
              Ha ocurrido un error grave en la aplicación. Por favor, inténtelo de nuevo más tarde.
            </p>
            <Button
              onClick={reset}
              className="bg-blue-marine hover:bg-blue-marine/90"
            >
              Intentar nuevamente
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
