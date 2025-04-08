"use client"

import { useState, useRef, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, FileUp, Trash2, Eye, Download, Search } from "lucide-react"
import { StepViewer } from "@/components/step-viewer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getModels, getProjects, uploadModel, deleteModel, assignModelToProject } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function ModelsAdmin() {
  const { toast } = useToast()
  const [selectedModel, setSelectedModel] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewFormat, setPreviewFormat] = useState(null)
  const [models, setModels] = useState([])
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [modelFormData, setModelFormData] = useState({
    name: "",
    description: "",
    project_id: "",
    type: "",
  })
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [modelsData, projectsData] = await Promise.all([getModels(), getProjects()])
      setModels(modelsData)
      setProjects(projectsData)
    } catch (error) {
      console.error("Error al cargar datos:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handlePreview = (model) => {
    setSelectedModel(model)
    setPreviewUrl(model.url)
    setPreviewFormat(model.format)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const fileName = file.name.toLowerCase()

    // Crear una URL para el archivo seleccionado
    const url = URL.createObjectURL(file)

    // Determinar el formato
    let format = null
    if (fileName.endsWith(".step") || fileName.endsWith(".stp")) {
      format = "step"
    } else if (fileName.endsWith(".stl")) {
      format = "stl"
    } else if (fileName.endsWith(".gltf")) {
      format = "gltf"
    } else if (fileName.endsWith(".glb")) {
      format = "glb"
    }

    // Actualizar la vista previa
    setPreviewUrl(url)
    setPreviewFormat(format)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setModelFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setModelFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUploadModel = async () => {
    if (!fileInputRef.current?.files[0]) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un archivo",
        variant: "destructive",
      })
      return
    }

    if (!modelFormData.name || !modelFormData.type) {
      toast({
        title: "Error",
        description: "Por favor, completa los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", fileInputRef.current.files[0])
      formData.append("name", modelFormData.name)
      formData.append("description", modelFormData.description)
      formData.append("type", modelFormData.type)

      if (modelFormData.project_id) {
        formData.append("project_id", modelFormData.project_id)
      }

      await uploadModel(formData)

      toast({
        title: "Modelo subido",
        description: "El modelo ha sido subido correctamente",
      })

      // Limpiar el formulario
      setModelFormData({
        name: "",
        description: "",
        project_id: "",
        type: "",
      })
      setPreviewUrl(null)
      setPreviewFormat(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      // Recargar los modelos
      fetchData()
    } catch (error) {
      console.error("Error al subir el modelo:", error)
      toast({
        title: "Error",
        description: "No se pudo subir el modelo",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteModel = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este modelo? Esta acción no se puede deshacer.")) {
      try {
        await deleteModel(id)
        toast({
          title: "Modelo eliminado",
          description: "El modelo ha sido eliminado correctamente",
        })
        fetchData()

        if (selectedModel?.id === id) {
          setSelectedModel(null)
          setPreviewUrl(null)
          setPreviewFormat(null)
        }
      } catch (error) {
        console.error("Error al eliminar el modelo:", error)
        toast({
          title: "Error",
          description: "No se pudo eliminar el modelo",
          variant: "destructive",
        })
      }
    }
  }

  const handleAssignToProject = async () => {
    if (!selectedModel || !modelFormData.project_id) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un proyecto",
        variant: "destructive",
      })
      return
    }

    try {
      await assignModelToProject(selectedModel.id, modelFormData.project_id)
      toast({
        title: "Modelo asignado",
        description: "El modelo ha sido asignado al proyecto correctamente",
      })
      fetchData()
    } catch (error) {
      console.error("Error al asignar el modelo:", error)
      toast({
        title: "Error",
        description: "No se pudo asignar el modelo al proyecto",
        variant: "destructive",
      })
    }
  }

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (model.project_name && model.project_name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administración de Modelos 3D</h1>
          <Button onClick={handleFileUpload}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Modelo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".step,.stp,.stl,.gltf,.glb"
            onChange={handleFileChange}
          />
        </div>

        <Tabs defaultValue="models">
          <TabsList className="mb-4">
            <TabsTrigger value="models">Modelos</TabsTrigger>
            <TabsTrigger value="upload">Subir Modelo</TabsTrigger>
          </TabsList>

          <TabsContent value="models">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Modelos 3D</CardTitle>
                    <CardDescription>Gestiona los modelos 3D de tus proyectos.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Buscar modelos..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filtrar por tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos los tipos</SelectItem>
                          <SelectItem value="step">STEP</SelectItem>
                          <SelectItem value="stl">STL</SelectItem>
                          <SelectItem value="gltf">GLTF/GLB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    ) : filteredModels.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Tamaño</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Proyecto</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredModels.map((model) => (
                            <TableRow key={model.id}>
                              <TableCell>{model.name}</TableCell>
                              <TableCell>{model.type.toUpperCase()}</TableCell>
                              <TableCell>{model.size}</TableCell>
                              <TableCell>{new Date(model.created_at).toLocaleDateString("es-ES")}</TableCell>
                              <TableCell>{model.project_name || "—"}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm" onClick={() => handlePreview(model)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <a href={model.url} download target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                  </a>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500"
                                    onClick={() => handleDeleteModel(model.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">No se encontraron modelos</div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                {/* Vista previa del modelo seleccionado */}
                {(selectedModel || previewUrl) && (
                  <StepViewer
                    readOnly={false}
                    modelUrl={previewUrl || (selectedModel && selectedModel.url)}
                    modelFormat={previewFormat || (selectedModel && selectedModel.format)}
                  />
                )}

                {/* Información del modelo seleccionado */}
                {selectedModel && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Detalles del Modelo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Nombre:</span>
                          <span>{selectedModel.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Tipo:</span>
                          <span>{selectedModel.type.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Tamaño:</span>
                          <span>{selectedModel.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Proyecto:</span>
                          <span>{selectedModel.project_name || "No asignado"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Fecha:</span>
                          <span>{new Date(selectedModel.created_at).toLocaleDateString("es-ES")}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <div className="space-y-2">
                          <Label htmlFor="projectSelect">Asignar a Proyecto</Label>
                          <Select
                            value={modelFormData.project_id}
                            onValueChange={(value) => handleSelectChange("project_id", value)}
                          >
                            <SelectTrigger id="projectSelect">
                              <SelectValue placeholder="Seleccionar proyecto" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map((project) => (
                                <SelectItem key={project.id} value={project.id}>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full mt-2" onClick={handleAssignToProject}>
                          Asignar a Proyecto
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Subir Nuevo Modelo</CardTitle>
                    <CardDescription>Sube un nuevo modelo 3D para tus proyectos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="modelName">Nombre del Modelo</Label>
                      <Input
                        id="modelName"
                        name="name"
                        value={modelFormData.name}
                        onChange={handleInputChange}
                        placeholder="Ej: PCB Principal"
                        disabled={isUploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelDescription">Descripción</Label>
                      <Input
                        id="modelDescription"
                        name="description"
                        value={modelFormData.description}
                        onChange={handleInputChange}
                        placeholder="Descripción breve del modelo"
                        disabled={isUploading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectSelect">Proyecto</Label>
                      <Select
                        value={modelFormData.project_id}
                        onValueChange={(value) => handleSelectChange("project_id", value)}
                        disabled={isUploading}
                      >
                        <SelectTrigger id="projectSelect">
                          <SelectValue placeholder="Seleccionar proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Archivo 3D</Label>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                        <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-1">Arrastra y suelta archivos aquí o</p>
                        <Button variant="outline" size="sm" onClick={handleFileUpload} disabled={isUploading}>
                          Seleccionar Archivo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Formatos soportados: STEP, STP, STL, GLTF, GLB
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelType">Tipo de Modelo</Label>
                      <Select
                        value={modelFormData.type}
                        onValueChange={(value) => handleSelectChange("type", value)}
                        disabled={isUploading}
                      >
                        <SelectTrigger id="modelType">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pcb">PCB</SelectItem>
                          <SelectItem value="case">Carcasa</SelectItem>
                          <SelectItem value="component">Componente</SelectItem>
                          <SelectItem value="assembly">Ensamblaje</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full" onClick={handleUploadModel} disabled={isUploading}>
                      {isUploading ? "Subiendo..." : "Subir Modelo"}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div>
                {/* Vista previa del modelo a subir */}
                {previewUrl && <StepViewer readOnly={false} modelUrl={previewUrl} modelFormat={previewFormat} />}

                {!previewUrl && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Vista Previa</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                        <div className="text-center">
                          <FileUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground text-sm">
                            Selecciona un archivo para ver la vista previa
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

