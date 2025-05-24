'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Componente que carga y muestra el modelo 3D
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)
  const { camera } = useThree()
  
  useEffect(() => {
    if (modelRef.current) {
      // Ajustar la cámara para enfocar el modelo
      const box = new THREE.Box3().setFromObject(modelRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      const maxDim = Math.max(size.x, size.y, size.z)
      
      // Verificar si la cámara es PerspectiveCamera antes de acceder a fov
      if (camera instanceof THREE.PerspectiveCamera) {
        const fov = camera.fov * (Math.PI / 180)
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
        cameraZ *= 1.5 // Dar un poco más de espacio
        camera.position.z = cameraZ
      } else {
        // Para otros tipos de cámara, usar un enfoque más simple
        camera.position.z = maxDim * 2
      }
      
      // Centrar el modelo
      const mesh = modelRef.current
      mesh.position.x = -center.x
      mesh.position.y = -center.y
      mesh.position.z = -center.z
    }
  }, [scene, camera])
  
  // Animación suave de rotación
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002
    }
  })
  
  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={1} 
    />
  )
}

// Componente principal del visor
export default function ModelViewer({ modelUrl }: { modelUrl: string }) {
  const [loading, setLoading] = useState(true)
  
  // Manejar la carga del modelo
  useEffect(() => {
    // Simular un tiempo de carga y luego ocultar el indicador
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    
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
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <React.Suspense fallback={null}>
          <Model url={modelUrl} />
          <Environment preset="city" />
        </React.Suspense>
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
