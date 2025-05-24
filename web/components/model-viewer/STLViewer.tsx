'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
// @ts-ignore - STLLoader no tiene declaraciones de tipos en algunos entornos
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

// Componente que carga y muestra el modelo STL
function STLModel({ url }: { url: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)
  const { camera } = useThree()
  
  // Cargar el archivo STL
  useEffect(() => {
    const loader = new STLLoader()
    loader.load(
      url,
      (loadedGeometry: THREE.BufferGeometry) => {
        setGeometry(loadedGeometry)
      },
      (xhr: { loaded: number; total: number }) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error: any) => {
        console.error('Error al cargar el archivo STL', error)
      }
    )
  }, [url])
  
  useEffect(() => {
    if (meshRef.current && geometry) {
      // Centrar el modelo
      geometry.computeBoundingBox()
      const boundingBox = geometry.boundingBox
      
      if (boundingBox) {
        const center = new THREE.Vector3()
        boundingBox.getCenter(center)
        meshRef.current.position.set(-center.x, -center.y, -center.z)
        
        // Ajustar la cámara para enfocar el modelo
        const size = new THREE.Vector3()
        boundingBox.getSize(size)
        
        const maxDim = Math.max(size.x, size.y, size.z)
        if (camera instanceof THREE.PerspectiveCamera) {
          const fov = camera.fov * (Math.PI / 180)
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))
          cameraZ *= 1.5 // Dar un poco más de espacio
          camera.position.z = cameraZ
          camera.updateProjectionMatrix()
        }
      }
    }
  }, [geometry, camera])
  
  // Animación suave de rotación
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })
  
  if (!geometry) return null
  
  return (
    <mesh ref={meshRef}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial 
        color="#1e90ff" 
        roughness={0.5} 
        metalness={0.5} 
      />
    </mesh>
  )
}

// Componente principal del visor
export default function STLViewer({ modelUrl }: { modelUrl: string }) {
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
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <React.Suspense fallback={null}>
          <STLModel url={modelUrl} />
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
