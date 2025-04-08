"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Grid } from "@react-three/drei"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Button } from "@/components/ui/button"
import { Upload, ZoomIn, ZoomOut, RotateCcw, Maximize } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Componente para mostrar un modelo 3D
function Model({ url, format, position = [0, 0, 0], scale = 1 }) {
  const { camera } = useThree()
  const [stlGeometry, setStlGeometry] = useState(null)
  const [gltfScene, setGltfScene] = useState(null)

  useEffect(() => {
    // Ajustar la posición de la cámara
    camera.position.set(5, 5, 5)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useEffect(() => {
    if (format === "stl" && url) {
      const loader = new STLLoader()
      loader.load(
        url,
        (geometry) => {
          setGeometry(geometry)
        },
        undefined,
        (error) => {
          console.error("An error happened loading the STL file", error)
        },
      )
    }
  }, [url, format])

  useEffect(() => {
    if ((format === "gltf" || format === "glb") && url) {
      const loader = new GLTFLoader()
      loader.load(
        url,
        (gltf) => {
          setGltfScene(gltf.scene)
        },
        undefined,
        (error) => {
          console.error("An error happened loading the GLTF/GLB file", error)
        },
      )
    }
  }, [url, format])

  const setGeometry = (geometry) => {
    setStlGeometry(geometry)
  }

  // Cargar el modelo según el formato
  if (format === "stl" && stlGeometry) {
    return (
      <mesh position={position} scale={[scale, scale, scale]}>
        <primitive object={stlGeometry} attach="geometry" />
        <meshStandardMaterial color="#44a455" />
      </mesh>
    )
  } else if ((format === "gltf" || format === "glb") && gltfScene) {
    return <primitive object={gltfScene} position={position} scale={[scale, scale, scale]} />
  }

  return null
}

// Componente principal del visor
export function StepViewer({ readOnly = false, modelUrl = null, modelFormat = null }) {
  const [model, setModel] = useState(modelUrl)
  const [format, setFormat] = useState(modelFormat)
  const [error, setError] = useState("")
  const [scale, setScale] = useState(1)
  const fileInputRef = useRef(null)

  // Actualizar el modelo si cambian las props
  useEffect(() => {
    if (modelUrl) {
      setModel(modelUrl)
      setFormat(modelFormat)
    }
  }, [modelUrl, modelFormat])

  // Función para manejar la carga de archivos (solo disponible en modo admin)
  const handleFileUpload = (e) => {
    if (readOnly) return

    const file = e.target.files[0]
    if (!file) return

    setError("")

    const fileName = file.name.toLowerCase()

    // Verificar el formato del archivo
    if (fileName.endsWith(".step") || fileName.endsWith(".stp")) {
      // Para archivos STEP, mostramos un mensaje de que se está convirtiendo
      // En un entorno real, aquí se haría la conversión a STL o GLTF
      setError("Los archivos STEP requieren conversión. Por ahora, se mostrará un modelo de ejemplo.")

      // Simulamos la carga de un modelo de ejemplo (en un caso real, sería el resultado de la conversión)
      setModel("/assets/example-model.stl")
      setFormat("stl")
    } else if (fileName.endsWith(".stl")) {
      // Para STL, podemos cargar directamente
      const url = URL.createObjectURL(file)
      setModel(url)
      setFormat("stl")
    } else if (fileName.endsWith(".gltf") || fileName.endsWith(".glb")) {
      // Para GLTF/GLB, podemos cargar directamente
      const url = URL.createObjectURL(file)
      setModel(url)
      setFormat(fileName.endsWith(".gltf") ? "gltf" : "glb")
    } else {
      setError("Formato de archivo no soportado. Por favor, sube un archivo STEP, STL, GLTF o GLB.")
    }
  }

  // Función para abrir el selector de archivos
  const handleUploadClick = () => {
    if (readOnly) return
    fileInputRef.current?.click()
  }

  // Función para resetear el visor
  const handleReset = () => {
    if (readOnly && modelUrl) {
      // En modo solo lectura, volvemos al modelo original
      setModel(modelUrl)
      setFormat(modelFormat)
    } else if (!readOnly) {
      // En modo edición, limpiamos todo
      setModel(null)
      setFormat(null)
      setError("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
    setScale(1)
  }

  // Funciones para zoom
  const handleZoomIn = () => setScale((prev) => Math.min(prev * 1.2, 5))
  const handleZoomOut = () => setScale((prev) => Math.max(prev * 0.8, 0.1))

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vista 3D</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          {!readOnly && (
            <Button variant="outline" size="icon" onClick={handleUploadClick}>
              <Upload className="h-4 w-4" />
            </Button>
          )}
          {!readOnly && (
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".step,.stp,.stl,.gltf,.glb"
              onChange={handleFileUpload}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="w-full h-[300px] bg-muted/20 rounded-md overflow-hidden">
          {model ? (
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Model url={model} format={format} scale={scale} />
              </Suspense>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              <Grid infiniteGrid fadeDistance={30} fadeStrength={5} />
              <Environment preset="studio" />
            </Canvas>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Maximize className="h-12 w-12 text-muted-foreground mb-4" />
              {readOnly ? (
                <p className="text-muted-foreground text-sm">No hay modelo 3D disponible</p>
              ) : (
                <>
                  <p className="text-muted-foreground text-sm">
                    Carga un archivo STEP, STL, GLTF o GLB para visualizarlo
                  </p>
                  <Button variant="outline" className="mt-4" onClick={handleUploadClick}>
                    <Upload className="h-4 w-4 mr-2" />
                    Cargar Modelo 3D
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

