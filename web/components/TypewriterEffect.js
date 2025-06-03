'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function TypewriterEffect({ 
  text, 
  speed = 50, 
  className = '',
  onComplete = () => {},
  startDelay = 0 
}) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(0)
      }, startDelay)
      return () => clearTimeout(delayTimer)
    }
  }, [startDelay])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && text.length > 0) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-5 bg-current ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  )
}

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  className = '',
  suffix = '',
  prefix = '' 
}) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    const startTime = Date.now()
    const difference = to - from

    const updateCount = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      
      // Easing function (ease out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      const currentCount = Math.floor(from + (difference * easeOut))
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [from, to, duration])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}

export function GradientText({ 
  children, 
  className = '',
  gradient = 'from-blue-600 to-purple-600' 
}) {
  return (
    <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  )
}

export function FloatingElements({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulseEffect({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export function SlideInText({ 
  children, 
  direction = 'left', 
  delay = 0, 
  className = '' 
}) {
  const directions = {
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 }
  }

  return (
    <motion.div
      className={className}
      initial={directions[direction]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      {children}
    </motion.div>
  )
}
