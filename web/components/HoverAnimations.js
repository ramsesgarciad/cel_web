'use client'

import { motion } from 'framer-motion'

const smoothTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25
}

// Botón con animación de hover moderna
export function AnimatedButton({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  ...props 
}) {
  const baseClasses = "relative overflow-hidden transition-all duration-300 transform-gpu"
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  }

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0
      }}
      transition={smoothTransition}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// Card con animación de hover
export function AnimatedCard({ 
  children, 
  className = '', 
  onClick,
  hoverable = true 
}) {
  return (
    <motion.div
      className={`rounded-xl overflow-hidden ${className}`}
      whileHover={hoverable ? { 
        scale: 1.03,
        y: -5,
        rotateY: 2,
        rotateX: 2
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={smoothTransition}
      style={{
        transformStyle: "preserve-3d"
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Imagen con efecto parallax y zoom
export function AnimatedImage({ 
  src, 
  alt, 
  className = '',
  containerClassName = '',
  zoomOnHover = true,
  ...props 
}) {
  return (
    <motion.div 
      className={`overflow-hidden rounded-lg ${containerClassName}`}
      whileHover={{ scale: 1.05 }}
      transition={smoothTransition}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        whileHover={zoomOnHover ? { scale: 1.1 } : {}}
        transition={smoothTransition}
        {...props}
      />
    </motion.div>
  )
}

// Link con animación de subrayado
export function AnimatedLink({ 
  children, 
  href, 
  className = '',
  underlineColor = 'bg-blue-600',
  ...props 
}) {
  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={smoothTransition}
      {...props}
    >
      {children}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 ${underlineColor}`}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.a>
  )
}

// Icono con rotación y escala
export function AnimatedIcon({ 
  children, 
  className = '',
  rotateOnHover = false,
  scaleOnHover = true,
  ...props 
}) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{
        scale: scaleOnHover ? 1.1 : 1,
        rotate: rotateOnHover ? 360 : 0
      }}
      whileTap={{ scale: 0.9 }}
      transition={smoothTransition}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Contenedor con efecto de reveal
export function RevealContainer({ 
  children, 
  className = '',
  direction = 'up',
  ...props 
}) {
  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 }
  }

  return (
    <motion.div
      className={`rounded-lg ${className}`}
      initial={directions[direction]}
      whileInView={{ 
        x: 0, 
        y: 0, 
        opacity: 1 
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}
      transition={smoothTransition}
      {...props}
    >
      {children}
    </motion.div>
  )
}
