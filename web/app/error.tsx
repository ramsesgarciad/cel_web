'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Opcionalmente registrar el error en un servicio de análisis
    console.error('Error en la aplicación:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-red-700">Algo salió mal</h2>
        <p className="text-gray-600 mb-6">
          Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando para solucionarlo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            className="bg-blue-marine hover:bg-blue-marine/90"
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
    </div>
  )
}
