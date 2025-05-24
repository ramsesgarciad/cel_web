"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo para el blog
const blogPosts = [
  {
    id: 1,
    title: "Innovaciones en sistemas de monitoreo industrial",
    excerpt: "Descubre las últimas tecnologías que están revolucionando la forma en que las empresas monitorean sus procesos industriales.",
    date: "10 Mayo 2025",
    category: "Tecnología",
    author: "Ramses García",
    authorRole: "Senior Hardware Engineer"
  },
  {
    id: 2,
    title: "Optimización de sensores para entornos extremos",
    excerpt: "Analizamos cómo los sensores modernos pueden funcionar de manera confiable en condiciones de temperatura y humedad extremas.",
    date: "25 Abril 2025",
    category: "Ingeniería",
    author: "Reynaldo Veloz",
    authorRole: "Firmware Developer"
  },
  {
    id: 3,
    title: "Diseño de enclosures para equipo electrónico industrial",
    excerpt: "Consideraciones clave para el diseño de enclosures que protejan equipos electrónicos en ambientes industriales.",
    date: "15 Abril 2025",
    category: "Diseño",
    author: "Pankaj Choudhary",
    authorRole: "Mechanical Design Engineer"
  },
  {
    id: 4,
    title: "El futuro del IoT en la industria manufacturera",
    excerpt: "Exploramos cómo el Internet de las Cosas está transformando los procesos de fabricación y mejorando la eficiencia operativa.",
    date: "2 Abril 2025",
    category: "IoT",
    author: "Ramses García",
    authorRole: "Senior Hardware Engineer"
  }
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  // Filtrar posts por categoría
  const filteredPosts = activeCategory === "Todos" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory)
  
  // Obtener categorías únicas
  const categories = ["Todos", ...Array.from(new Set(blogPosts.map(post => post.category)))]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog de CEL</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Artículos técnicos, noticias y actualizaciones sobre tecnología, ingeniería y electrónica industrial
        </p>
      </div>

      <Tabs defaultValue="Todos" className="w-full mb-12">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full bg-blue-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-blue-900/80 z-10" />
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Imagen del artículo</span>
                  </div>
                </div>
                
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">{post.author.charAt(0)}</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="gap-1">
                    Leer más <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">¿Interesado en nuestras soluciones?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Ofrecemos servicios y productos de alta calidad para la industria electrónica y automatización.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/productos">Ver nuestros productos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contacto">Contactar con nosotros</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
