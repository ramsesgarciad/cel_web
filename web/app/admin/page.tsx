"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir a la página de proyectos
    router.push("/admin/projects")
  }, [router])

  return (
    <AdminLayout>
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Redirigiendo a la sección de proyectos...</p>
      </div>
    </AdminLayout>
  )
}
