"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeSwitch } from "@/components/ui/theme-switch-button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface TubelightNavBarProps {
  items: NavItem[]
  className?: string
  currentPath?: string
  showThemeSwitch?: boolean
}

export function TubelightNavBar({ items, className, currentPath, showThemeSwitch = true }: TubelightNavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  // Update active tab based on currentPath prop
  useEffect(() => {
    if (currentPath) {
      const activeItem = items.find(item => item.url === currentPath)
      if (activeItem) {
        setActiveTab(activeItem.name)
      }
    }
  }, [currentPath, items])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mt-8",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
        
        {/* Theme Switch Button */}
        {showThemeSwitch && (
          <div className="flex items-center justify-center px-2">
            <ThemeSwitch className="[&_svg]:text-foreground/80 [&_svg]:dark:text-foreground/80" />
          </div>
        )}
      </div>
    </div>
  )
}

// NavBar component for backward compatibility
export function NavBar({ items, className }: Omit<TubelightNavBarProps, 'currentPath'>) {
  return <TubelightNavBar items={items} className={className} />
}
