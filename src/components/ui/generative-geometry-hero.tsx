'use client'

import p5 from 'p5'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

// A utility function for class names
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ')

export const GenerativeGeometryHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    if (!containerRef.current) return

    const sketch = (p: p5) => {
      interface Square {
        x: number
        y: number
        width: number
        height: number
        color?: string
      }

      let squares: Square[] = []
      let canvasWidth: number
      let canvasHeight: number
      const white = '#F2F5F1'
      const colors = ['#D40920', '#1356A2', '#F7D842'] // Red, Blue, Yellow
      const darkColors = ['#EF4444', '#3B82F6', '#F59E0B'] // Brighter versions for dark mode

      p.setup = () => {
        const container = containerRef.current
        if (!container) return
        
        canvasWidth = container.clientWidth
        canvasHeight = container.clientHeight
        
        const canvas = p.createCanvas(canvasWidth, canvasHeight)
        canvas.parent(container)
        generateMondrian()
      }

      p.draw = () => {
        drawMondrian()
        p.noLoop()
      }

      const generateMondrian = () => {
        const width = canvasWidth
        const height = canvasHeight
        const stepX = width / 8
        const stepY = height / 5

        // Start with one big square
        squares = [{
          x: 0,
          y: 0,
          width: width,
          height: height
        }]

        // Split squares on grid lines
        for (let i = stepX; i < width; i += stepX) {
          splitSquaresWith({ x: i })
        }
        
        for (let i = stepY; i < height; i += stepY) {
          splitSquaresWith({ y: i })
        }

        // Add some random color to squares
        const numColored = p.floor(p.random(4, 7))
        const currentColors = isDarkMode ? darkColors : colors
        
        for (let i = 0; i < numColored; i++) {
          const randomSquare = squares[p.floor(p.random(squares.length))]
          randomSquare.color = currentColors[i % currentColors.length]
        }
      }

      const splitSquaresWith = (coordinates: { x?: number; y?: number }) => {
        const { x, y } = coordinates

        for (let i = squares.length - 1; i >= 0; i--) {
          const square = squares[i]

          if (x && x > square.x && x < square.x + square.width) {
            if (p.random() > 0.4) {
              squares.splice(i, 1)
              splitOnX(square, x)
            }
          }

          if (y && y > square.y && y < square.y + square.height) {
            if (p.random() > 0.4) {
              squares.splice(i, 1)
              splitOnY(square, y)
            }
          }
        }
      }

      const splitOnX = (square: Square, splitAt: number) => {
        const squareA: Square = {
          x: square.x,
          y: square.y,
          width: square.width - (square.width - splitAt + square.x),
          height: square.height
        }

        const squareB: Square = {
          x: splitAt,
          y: square.y,
          width: square.width - splitAt + square.x,
          height: square.height
        }

        squares.push(squareA)
        squares.push(squareB)
      }

      const splitOnY = (square: Square, splitAt: number) => {
        const squareA: Square = {
          x: square.x,
          y: square.y,
          width: square.width,
          height: square.height - (square.height - splitAt + square.y)
        }

        const squareB: Square = {
          x: square.x,
          y: splitAt,
          width: square.width,
          height: square.height - splitAt + square.y
        }

        squares.push(squareA)
        squares.push(squareB)
      }

      const drawMondrian = () => {
        // Background color based on theme
        const bgColor = isDarkMode ? '#000000' : '#FFFFFF'
        p.background(bgColor)
        
        // Line color based on theme
        const lineColor = isDarkMode ? '#FFFFFF' : '#000000'
        p.strokeWeight(6)
        p.stroke(lineColor)

        for (let i = 0; i < squares.length; i++) {
          const square = squares[i]

          // Fill color
          if (square.color) {
            p.fill(square.color)
          } else {
            p.fill(isDarkMode ? '#1a1a1a' : white)
          }

          // Draw rectangle
          p.rect(square.x, square.y, square.width, square.height)
        }
      }

      p.windowResized = () => {
        const container = containerRef.current
        if (!container) return
        
        canvasWidth = container.clientWidth
        canvasHeight = container.clientHeight
        
        p.resizeCanvas(canvasWidth, canvasHeight)
        squares = []
        generateMondrian()
        p.redraw()
      }

      p.mousePressed = () => {
        // Only regenerate if click is within canvas
        if (p.mouseX >= 0 && p.mouseX <= canvasWidth && p.mouseY >= 0 && p.mouseY <= canvasHeight) {
          squares = []
          generateMondrian()
          p.redraw()
        }
      }
    }

    const p5Instance = new p5(sketch, containerRef.current)

    return () => {
      p5Instance.remove()
    }
  }, [isDarkMode])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  }

  return (
    <div className="relative h-[50vh] w-full overflow-hidden">
      {/* P5.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0"></div>
      
      {/* Overlay HTML Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl mx-4">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6",
              isDarkMode 
                ? "bg-purple-500/20 border border-purple-500/30" 
                : "bg-purple-100 border border-purple-300"
            )}
          >
            <Zap className={cn("h-4 w-4", isDarkMode ? "text-purple-400" : "text-purple-600")} />
            <span className={cn("text-sm font-medium", isDarkMode ? "text-purple-300" : "text-purple-800")}>
              Innovation in Action
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4",
              isDarkMode ? "text-white" : "text-gray-900"
            )}
          >
            My Projects
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "text-base md:text-lg mb-8",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}
          >
            A showcase of my work in web development, consulting solutions, and innovative applications
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
                "px-6 py-3 font-semibold rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105",
                isDarkMode 
                  ? "bg-white text-black hover:bg-gray-200" 
                  : "bg-black text-white hover:bg-gray-800"
              )}
            >
              View Projects
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
          
          <motion.p
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "text-xs mt-6 opacity-60",
              isDarkMode ? "text-gray-400" : "text-gray-600"
            )}
          >
            Click anywhere to generate new art
          </motion.p>
        </div>
      </div>
    </div>
  )
}

