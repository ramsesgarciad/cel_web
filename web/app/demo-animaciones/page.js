'use client'

import { ScrollAnimation, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'
import { AnimatedButton, AnimatedCard, AnimatedImage, AnimatedIcon, AnimatedLink } from '@/components/HoverAnimations'
import { TypewriterEffect, AnimatedCounter, GradientText, FloatingElements, PulseEffect, SlideInText } from '@/components/TypewriterEffect'
import { FloatingParticles, GeometricShapes, WaveBackground, GlowingOrb, AnimatedGrid, InteractiveBackground } from '@/components/ParticleEffects'
import { ParallaxSection, MorphingCard, TextReveal, MagneticButton, ScrollProgress, BlurFadeIn, GlitchText, WaveText, FlipCard } from '@/components/AdvancedAnimations'
import { LoadingSpinner, SkeletonLoader } from '@/components/LoadingSpinner'
import { Circuit, Zap, Cpu, Wifi, Database, Shield } from 'lucide-react'

export default function DemoAnimaciones() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <ScrollProgress />
      <FloatingParticles count={15} />
      <GeometricShapes />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <InteractiveBackground className="absolute inset-0">
          <div className="container mx-auto px-4 text-center relative z-10">
            <BlurFadeIn className="mb-8">
              <h1 className="text-6xl font-bold mb-4">
                <GradientText gradient="from-blue-600 via-purple-600 to-blue-800">
                  Demostración de
                </GradientText>
              </h1>
              <TypewriterEffect 
                text="Animaciones Modernas"
                className="text-5xl font-bold text-blue-marine"
                speed={100}
              />
            </BlurFadeIn>
            
            <SlideInText direction="up" delay={2} className="text-xl text-muted-foreground mb-8">
              Explora todas las animaciones y transiciones implementadas
            </SlideInText>
            
            <div className="flex gap-4 justify-center">
              <MagneticButton>
                <AnimatedButton className="bg-primary text-white px-8 py-3 text-lg">
                  Explorar Demos
                </AnimatedButton>
              </MagneticButton>
              <AnimatedButton variant="outline" className="px-8 py-3 text-lg">
                Ver Código
              </AnimatedButton>
            </div>
          </div>
        </InteractiveBackground>
        
        <GlowingOrb size={200} color="blue" className="top-20 right-20" />
        <GlowingOrb size={150} color="purple" className="bottom-20 left-20" />
      </section>

      {/* Contadores Animados */}
      <ParallaxSection className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <TextReveal className="text-4xl font-bold text-center mb-16">
            Estadísticas Impresionantes
          </TextReveal>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StaggerItem>
              <div className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm hover-lift">
                <AnimatedCounter from={0} to={150} suffix="+" className="text-4xl font-bold text-blue-600" />
                <p className="text-muted-foreground mt-2">Proyectos Completados</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm hover-lift">
                <AnimatedCounter from={0} to={98} suffix="%" className="text-4xl font-bold text-green-600" />
                <p className="text-muted-foreground mt-2">Satisfacción del Cliente</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm hover-lift">
                <AnimatedCounter from={0} to={24} suffix="/7" className="text-4xl font-bold text-purple-600" />
                <p className="text-muted-foreground mt-2">Soporte Técnico</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm hover-lift">
                <AnimatedCounter from={0} to={5} className="text-4xl font-bold text-orange-600" />
                <p className="text-muted-foreground mt-2">Años de Experiencia</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </ParallaxSection>

      {/* Tarjetas con Efectos */}
      <section className="py-20 relative">
        <AnimatedGrid />
        <div className="container mx-auto px-4">
          <ScrollAnimation variant="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <GlitchText>Efectos de Tarjetas</GlitchText>
            </h2>
            <p className="text-xl text-muted-foreground">
              Diferentes animaciones para tarjetas y elementos
            </p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MorphingCard className="bg-white p-6 rounded-lg shadow-lg">
              <FloatingElements>
                <AnimatedIcon className="text-blue-600 mb-4">
                  <Circuit size={48} />
                </AnimatedIcon>
              </FloatingElements>
              <h3 className="text-xl font-bold mb-2">Diseño PCB</h3>
              <p className="text-muted-foreground">
                Diseño profesional de circuitos impresos con tecnología avanzada
              </p>
            </MorphingCard>
            
            <AnimatedCard className="bg-gradient-to-br from-purple-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
              <PulseEffect>
                <Zap size={48} className="mb-4" />
              </PulseEffect>
              <h3 className="text-xl font-bold mb-2">IoT Solutions</h3>
              <p className="opacity-90">
                Soluciones integrales para Internet de las Cosas
              </p>
            </AnimatedCard>
            
            <FlipCard
              className="h-48"
              front={
                <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
                  <Cpu size={48} className="text-green-600 mb-4" />
                  <h3 className="text-xl font-bold">Microcontroladores</h3>
                </div>
              }
              back={
                <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
                  <p className="text-center">
                    Programación y desarrollo de sistemas embebidos con microcontroladores ARM y AVR
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Efectos de Texto */}
      <ParallaxSection offset={100} className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <WaveText className="text-4xl font-bold mb-8">
            Efectos de Texto Dinámicos
          </WaveText>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SlideInText direction="left" className="text-2xl mb-4">
                Texto que se desliza desde la izquierda
              </SlideInText>
              <SlideInText direction="right" delay={0.5} className="text-2xl mb-4">
                Y desde la derecha con delay
              </SlideInText>
              <SlideInText direction="up" delay={1} className="text-2xl">
                También desde abajo hacia arriba
              </SlideInText>
            </div>
            
            <div className="space-y-6">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
                <LoadingSpinner size="lg" className="mb-4" />
                <p>Spinner de carga animado</p>
              </div>
              
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
                <SkeletonLoader lines={3} className="mb-4" />
                <p>Skeleton loader para contenido</p>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Botones y Enlaces Animados */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation variant="scaleIn" className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Botones y Enlaces Interactivos</h2>
            <p className="text-xl text-muted-foreground">
              Diferentes estilos de botones con animaciones
            </p>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Botones Básicos</h3>
              <AnimatedButton className="w-full bg-blue-600 text-white">
                Botón Primario
              </AnimatedButton>
              <AnimatedButton variant="outline" className="w-full">
                Botón Secundario
              </AnimatedButton>
              <AnimatedButton className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Botón Gradiente
              </AnimatedButton>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Enlaces Animados</h3>
              <AnimatedLink href="#" className="block text-blue-600">
                Enlace con subrayado animado
              </AnimatedLink>
              <AnimatedLink href="#" className="block text-purple-600">
                Otro enlace con efecto hover
              </AnimatedLink>
              <AnimatedLink href="#" className="block text-green-600">
                Enlace con transición suave
              </AnimatedLink>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Botones Magnéticos</h3>
              <MagneticButton className="w-full">
                <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                  Botón Magnético
                </div>
              </MagneticButton>
              <MagneticButton strength={0.5} className="w-full">
                <div className="bg-yellow-500 text-white p-3 rounded-lg text-center">
                  Efecto Fuerte
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer con Wave */}
      <footer className="relative bg-blue-marine text-white py-12">
        <WaveBackground />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation variant="fadeInUp">
            <h3 className="text-2xl font-bold mb-4">
              ¿Impresionado con las animaciones?
            </h3>
            <p className="text-blue-100 mb-8">
              Estas son solo algunas de las animaciones modernas implementadas en nuestro sitio
            </p>
            <AnimatedButton className="bg-white text-blue-marine hover:bg-blue-50">
              Volver al Inicio
            </AnimatedButton>
          </ScrollAnimation>
        </div>
      </footer>
    </div>
  )
}
