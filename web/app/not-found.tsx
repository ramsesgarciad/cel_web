import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold mb-4 text-blue-marine">404</h2>
        <h3 className="text-2xl font-bold mb-6">Página no encontrada</h3>
        <p className="text-lg text-muted-foreground mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-blue-light">
            <Link href="/">
              Volver al inicio
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contacto">
              Contactar soporte
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
