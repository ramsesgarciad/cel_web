import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Configuración</h1>
        </div>

        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configuración General</CardTitle>
                <CardDescription>Configura los ajustes generales de la plataforma.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input id="companyName" defaultValue="Mi Empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <Input id="contactEmail" type="email" defaultValue="contacto@miempresa.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo de la Empresa</Label>
                  <Input id="logo" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Idioma Predeterminado</Label>
                  <select id="defaultLanguage" className="w-full p-2 border rounded-md">
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Guardar Cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Notificaciones</CardTitle>
                <CardDescription>Configura cómo y cuándo recibir notificaciones.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">
                      Notificaciones por Email
                    </Label>
                    <p className="text-sm text-muted-foreground">Recibe actualizaciones de proyectos por email</p>
                  </div>
                  <Switch id="emailNotifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="taskNotifications" className="font-medium">
                      Notificaciones de Tareas
                    </Label>
                    <p className="text-sm text-muted-foreground">Recibe notificaciones cuando se completen tareas</p>
                  </div>
                  <Switch id="taskNotifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports" className="font-medium">
                      Informes Semanales
                    </Label>
                    <p className="text-sm text-muted-foreground">Recibe un resumen semanal de los proyectos</p>
                  </div>
                  <Switch id="weeklyReports" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Guardar Cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Apariencia</CardTitle>
                <CardDescription>Personaliza la apariencia de la plataforma.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Color Principal</Label>
                  <div className="flex gap-2">
                    <Input id="primaryColor" type="color" defaultValue="#B22222" className="w-16 h-10" />
                    <Input defaultValue="#B22222" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Color Secundario</Label>
                  <div className="flex gap-2">
                    <Input id="secondaryColor" type="color" defaultValue="#1E40AF" className="w-16 h-10" />
                    <Input defaultValue="#1E40AF" className="flex-1" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode" className="font-medium">
                      Modo Oscuro
                    </Label>
                    <p className="text-sm text-muted-foreground">Activa el modo oscuro para la plataforma</p>
                  </div>
                  <Switch id="darkMode" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customCSS">CSS Personalizado</Label>
                  <Textarea id="customCSS" placeholder="Ingresa CSS personalizado aquí" className="font-mono" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Guardar Cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}

