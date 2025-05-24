'use client'

import dynamic from 'next/dynamic'

// Importar dinámicamente el componente del visor STL
const STLViewer = dynamic(
  () => import('./STLViewer'),
  { ssr: false }
)

// Componente cliente que envuelve el visor 3D para archivos STL
export default function STLViewerClient({ modelUrl }: { modelUrl: string }) {
  return <STLViewer modelUrl={modelUrl} />
}
