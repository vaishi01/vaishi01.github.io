// components/ui/card-with-noise-pattern.tsx
import { cn } from '@/lib/utils'
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface NoisePatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  overlayClassName?: string
  delay?: number
}

export function NoisePatternCard({ 
  children, 
  className,
  patternClassName,
  overlayClassName,
  delay = 0
}: NoisePatternCardProps) {
  const [showWave, setShowWave] = useState(false)

  useEffect(() => {
    // Start wave effect after card entrance animation completes
    const timer = setTimeout(() => {
      setShowWave(true)
    }, 800 + delay * 100) // 800ms entrance + stagger delay

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="relative">
      {/* Wave effect container - positioned outside the card */}
      {showWave && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 2.5, opacity: [0, 0.5, 0] }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            times: [0, 0.2, 1]
          }}
        >
          <div className="w-full h-full border-2 border-zinc-900/30 dark:border-white/40 rounded-md" />
        </motion.div>
      )}
      
      {/* Additional wave rings for more dramatic effect */}
      {showWave && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 3.2, opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 2, 
            ease: "easeOut",
            delay: 0.3,
            times: [0, 0.15, 1]
          }}
        >
          <div className="w-full h-full border border-zinc-800/20 dark:border-white/25 rounded-md" />
        </motion.div>
      )}

      {/* Third wave ring for even more visibility in dark mode */}
      {showWave && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 4, opacity: [0, 0.2, 0] }}
          transition={{ 
            duration: 2.5, 
            ease: "easeOut",
            delay: 0.6,
            times: [0, 0.1, 1]
          }}
        >
          <div className="w-full h-full border border-zinc-700/15 dark:border-white/15 rounded-md" />
        </motion.div>
      )}

      {/* Main card */}
      <motion.div
        className={cn(
          "border w-full rounded-md overflow-hidden relative z-10",
          "bg-zinc-950",
          "border-zinc-900",
          className
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: delay * 0.1
        }}
      >
        <div className={cn(
          "w-full h-full bg-repeat bg-[length:500px_500px]",
          "bg-noise-pattern",
          patternClassName
        )}>
          <div className={cn(
            "bg-zinc-950/30",
            overlayClassName
          )}>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function NoisePatternCardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("text-left p-4 md:p-6", className)} 
      {...props} 
    />
  )
}