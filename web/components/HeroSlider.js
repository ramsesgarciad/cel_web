'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    title: "CEL-MV100",
    subtitle: "Monitor de Variables Industrial",
    description: "Dispositivo para monitoreo de variables como temperatura, humedad y sensores analógicos (0-10V, 4-20mA) o Modbus",
    image: "/CEL-MV100.png",
    bgColor: "from-blue-600 via-blue-700 to-indigo-800",
    textColor: "text-white",
    ctaLink: "/productos",
    ctaText: "Ver Productos"
  },
  {
    id: 2,
    title: "CEL-CP200",
    subtitle: "Contador de Pulsos para KPI",
    description: "Dispositivo para monitoreo de producción en tiempo real que se integra con sistema de KPI para análisis y reportes",
    image: "/CEL-CP200.png",
    bgColor: "from-emerald-600 via-teal-700 to-cyan-800",
    textColor: "text-white",
    ctaLink: "/productos",
    ctaText: "Ver Productos"
  },
  {
    id: 3,
    title: "Sistema de Monitoreo KPI",
    subtitle: "Proyectos de Producción Industrial",
    description: "Sistema que monitorea en tiempo real los pulsos de las máquinas para calcular KPIs críticos como OEE y eficiencia",
    image: "/sistema_de_turnos.png",
    bgColor: "from-orange-600 via-red-600 to-rose-700",
    textColor: "text-white",
    ctaLink: "/proyectos",
    ctaText: "Ver Proyectos"
  },
  {
    id: 4,
    title: "Transformación Digital IoT",
    subtitle: "Innovación en Equipos Industriales",
    description: "Implementamos soluciones IoT en equipos industriales antiguos utilizando transceptores especializados para entornos hostiles",
    image: "/reclouser_itc_iec101.png",
    bgColor: "from-purple-600 via-violet-700 to-fuchsia-800",
    textColor: "text-white",
    ctaLink: "/proyectos",
    ctaText: "Ver Proyectos"
  },
  {
    id: 5,
    title: "Monitoreo de Cuartos Fríos",
    subtitle: "Sistemas de Control de Temperatura",
    description: "Sensores IP68 conectados por RS485 para monitorear temperatura en múltiples puntos con alertas en tiempo real",
    image: "/cuarto_frio.png",
    bgColor: "from-slate-700 via-gray-800 to-zinc-900",
    textColor: "text-white",
    ctaLink: "/proyectos/monitoreo-cuartos-frios",
    ctaText: "Ver Proyecto"
  }
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.9
  })
}

const slideTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.7
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000) // Aumentado a 6 segundos para mejor experiencia

    return () => clearInterval(interval)
  }, [currentSlide, isPlaying])

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor}`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex items-center h-full">
            {/* Left Side - Content */}
            <div className="flex-1 px-8 lg:px-16">
              <div className="max-w-2xl">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className={`text-lg md:text-xl font-medium mb-4 ${slides[currentSlide].textColor} opacity-90`}
                >
                  {slides[currentSlide].subtitle}
                </motion.h2>

                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${slides[currentSlide].textColor}`}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className={`text-lg md:text-xl mb-8 ${slides[currentSlide].textColor} opacity-90 leading-relaxed`}
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href={slides[currentSlide].ctaLink}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      {slides[currentSlide].ctaText}
                    </motion.button>
                  </Link>
                  <Link href="/contacto">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                    >
                      Contactar
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:flex flex-1 items-center justify-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl transform rotate-6"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-auto max-w-md object-contain drop-shadow-2xl"
                    onError={(e) => {
                      e.target.src = "/placeholder.jpg"
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Image - Bottom */}
          <div className="lg:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-32 h-32 object-contain drop-shadow-lg"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center">
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} />
        </motion.button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center">
        <motion.button
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          aria-label="Siguiente slide"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-4 right-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
          aria-label={isPlaying ? "Pausar slideshow" : "Reproducir slideshow"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: isPlaying ? 6 : 0, 
            ease: "linear",
            repeat: isPlaying ? Infinity : 0,
            repeatType: "restart"
          }}
          key={`${currentSlide}-${isPlaying}`}
        />
      </div>
    </div>
  )
}
