'use client'

import dynamic from 'next/dynamic'

// Importar dinámicamente el componente del visor STL simplificado
const SimpleSTLViewer = dynamic(
  () => import('./SimpleSTLViewer'),
  { ssr: false }
)

// Componente cliente que envuelve el visor 3D para archivos STL
export default function SimpleSTLViewerClient({ modelUrl }: { modelUrl: string }) {
  return <SimpleSTLViewer modelUrl={modelUrl} />
}
