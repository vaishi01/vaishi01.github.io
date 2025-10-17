import { cn } from '@/lib/utils'
import { motion } from "framer-motion"

interface GridPatternCardProps {
  children: React.ReactNode
  className?: string
  patternClassName?: string
  gradientClassName?: string
}

export function GridPatternCard({ 
  children, 
  className,
  patternClassName,
  gradientClassName
}: GridPatternCardProps) {
  return (
    <div className="relative">
      {/* Ripple effects container - outside the card to avoid clipping */}
      <motion.div
        className="absolute inset-0 rounded-md border-2 border-blue-400/40 dark:border-blue-300/40 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.2, 1.4], 
          opacity: [0, 0.8, 0] 
        }}
        transition={{ 
          duration: 2, 
          delay: 0.8,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-md border-2 border-purple-400/30 dark:border-purple-300/30 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.3, 1.6], 
          opacity: [0, 0.6, 0] 
        }}
        transition={{ 
          duration: 2.5, 
          delay: 1.2,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-md border border-orange-400/20 dark:border-orange-300/20 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.4, 1.8], 
          opacity: [0, 0.4, 0] 
        }}
        transition={{ 
          duration: 3, 
          delay: 1.6,
          ease: "easeOut"
        }}
      />

      {/* Main card */}
      <motion.div
        className={cn(
          "border w-full rounded-md overflow-hidden relative z-10",
          "bg-white dark:bg-zinc-950",
          "border-zinc-200 dark:border-zinc-900",
          className
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={cn(
          "size-full bg-repeat bg-[length:50px_50px]",
          "bg-square-pattern-light dark:bg-square-pattern",
          patternClassName
        )}>
          <div className={cn(
            "size-full bg-gradient-to-tr",
            "from-white via-white/[0.85] to-white",
            "dark:from-zinc-950 dark:via-zinc-950/[.85] dark:to-zinc-950",
            gradientClassName
          )}>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function GridPatternCardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("text-left p-6", className)} 
      {...props} 
    />
  )
}