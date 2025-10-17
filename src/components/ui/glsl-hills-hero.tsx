'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { GLSLHills } from './glsl-hills'

// A utility function for class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

export const GLSLHillsHero = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.3,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div className={cn(
      "relative h-[50vh] w-full overflow-hidden",
      isDarkMode ? "bg-black" : "bg-white"
    )}>
      {/* GLSL Hills Background */}
      <div className="absolute inset-0">
        <GLSLHills 
          width="100%" 
          height="100%" 
          cameraZ={125} 
          planeSize={256} 
          speed={0.5}
          isDarkMode={isDarkMode}
        />
      </div>
      
      {/* Gradient Overlay for better text visibility */}
      <div className={cn(
        "absolute inset-0 z-[2]",
        isDarkMode 
          ? "bg-gradient-to-b from-black/40 via-black/20 to-black/60" 
          : "bg-gradient-to-b from-white/40 via-white/20 to-white/60"
      )} />
      
      {/* Hero Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-6 max-w-4xl">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm",
              isDarkMode 
                ? "bg-blue-500/10 border border-blue-500/20" 
                : "bg-blue-100/80 border border-blue-300/50"
            )}
          >
            <Sparkles className={cn("h-4 w-4", isDarkMode ? "text-blue-400" : "text-blue-600")} />
            <span className={cn("text-sm font-medium", isDarkMode ? "text-blue-300" : "text-blue-800")}>
              Innovation in Action
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            <span className={cn(
              "block text-4xl md:text-5xl lg:text-6xl font-light italic",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              Designs That Speak
            </span>
            <span className={cn(
              "block text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
              isDarkMode ? "text-white" : "text-gray-900"
            )}>
              Louder Than Words
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "max-w-2xl mx-auto text-sm md:text-base mt-6 mb-8 leading-relaxed",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            We craft stunning visuals and user-friendly experiences that
            <br className="hidden md:block" />
            help your brand stand out and connect with your audience.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <button 
              onClick={() => {
                const projectsGrid = document.querySelector('.grid')
                projectsGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={cn(
                "px-6 py-3 md:px-8 md:py-4 font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105 backdrop-blur-sm",
                isDarkMode 
                  ? "bg-white/90 text-black hover:bg-white" 
                  : "bg-black/90 text-white hover:bg-black"
              )}
            >
              View Projects
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

