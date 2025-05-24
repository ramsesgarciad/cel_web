'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Componente para mostrar un modelo básico mientras se carga el STL
function PlaceholderModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1e90ff" />
    </mesh>
  )
}

// Componente principal del visor
export default function SimpleSTLViewer({ modelUrl }: { modelUrl: string }) {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Ocultar el indicador de carga después de un tiempo
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative h-[400px] w-full">
      {/* Pantalla de carga */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 bg-opacity-50 z-10">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-blue-600 font-medium">Cargando modelo 3D...</p>
          </div>
        </div>
      )}
      
      {/* Canvas de Three.js */}
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        
        {/* Mostrar un modelo básico por ahora */}
        <PlaceholderModel />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <p className="text-sm">Modelo 3D: {modelUrl.split('/').pop()}</p>
        </div>
        <p className="text-xs mt-1 opacity-80">Usa el ratón para rotar, zoom y mover el modelo</p>
      </div>
    </div>
  )
}
