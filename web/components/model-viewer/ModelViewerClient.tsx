'use client'

import dynamic from 'next/dynamic'

// Importar dinámicamente el componente del visor para evitar errores de SSR
const ModelViewer = dynamic(
  () => import('./ModelViewer'),
  { ssr: false }
)

// Componente cliente que envuelve el visor 3D
export default function ModelViewerClient({ modelUrl }: { modelUrl: string }) {
  return <ModelViewer modelUrl={modelUrl} />
}
