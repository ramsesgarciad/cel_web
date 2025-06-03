'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

export function ParallaxSection({ children, offset = 50, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      style={{ y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MorphingCard({ children, className = '' }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  )
}

export function TextReveal({ children, className = '', delay = 0 }) {
  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function NumberCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0 
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ textContent: from }}
        animate={{ textContent: to }}
        transition={{
          duration,
          ease: "easeOut",
        }}
        onUpdate={(latest) => {
          if (latest.textContent !== undefined) {
            const current = parseFloat(latest.textContent)
            latest.textContent = prefix + current.toFixed(decimals) + suffix
          }
        }}
      />
    </motion.span>
  )
}

export function MagneticButton({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

export function ScrollProgress({ className = '' }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 ${className}`}
      style={{ scaleX }}
    />
  )
}

export function BlurFadeIn({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        filter: 'blur(10px)',
        y: 20 
      }}
      animate={{ 
        opacity: 1, 
        filter: 'blur(0px)',
        y: 0 
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

export function GlitchText({ children, className = '' }) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
    >
      <motion.span
        variants={{
          hover: {
            x: [0, -2, 2, 0],
            transition: { duration: 0.3, repeat: 2 }
          }
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-red-500 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.7, 0],
            x: [-2, 2, -2],
            transition: { duration: 0.3, repeat: 2 }
          }
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-blue-500 opacity-0"
        variants={{
          hover: {
            opacity: [0, 0.7, 0],
            x: [2, -2, 2],
            transition: { duration: 0.3, repeat: 2, delay: 0.1 }
          }
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  )
}

export function WaveText({ children, className = '' }) {
  const text = typeof children === 'string' ? children : ''
  const letters = text.split('')

  return (
    <motion.div className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function FlipCard({ front, back, className = '' }) {
  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 w-full h-full backface-hidden">
        {front}
      </div>
      <div 
        className="absolute inset-0 w-full h-full backface-hidden"
        style={{ transform: "rotateY(180deg)" }}
      >
        {back}
      </div>
    </motion.div>
  )
}
