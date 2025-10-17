'use client'
import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

interface ThemeSwitchProps {
  className?: string
}

export function ThemeSwitch({ className = '' }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle theme
  const toggleTheme = React.useCallback(() => {
    console.log('Theme toggle clicked - current theme:', theme)
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  // Always show the button, even when not mounted
  // Use a default theme state to prevent flickering
  const currentTheme = mounted ? theme : 'light'
  const isLight = currentTheme === 'light'

  return (
    <button
      onClick={toggleTheme}
      className={`relative flex h-9 w-9 items-center justify-center text-foreground hover:opacity-80 transition-all duration-200 ${className}`}
      aria-label="Toggle theme"
      disabled={!mounted}
    >
      <Sun
        className={`absolute h-5 w-5 text-black dark:text-amber-400 transition-all duration-200 ease-out ${
          isLight 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-75 translate-y-3 opacity-0'
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out ${
          !isLight 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-75 translate-y-3 opacity-0'
        }`}
      />
    </button>
  )
}