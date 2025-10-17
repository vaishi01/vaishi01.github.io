import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeSwitch } from './theme-switch-button';

interface NavLink {
  label: string;
  href: string;
}

interface MinimalistNavbarProps {
  logoText?: string;
  navLinks: NavLink[];
}

const NavLinkItem = ({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) => (
  <Link
    to={href}
    className={`text-sm font-medium tracking-widest transition-colors hover:text-foreground ${
      isActive ? 'text-foreground' : 'text-foreground/60'
    }`}
  >
    {children}
  </Link>
);

export const MinimalistNavbar = ({
  logoText = "Vaishnavi Jaligama.",
  navLinks,
}: MinimalistNavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Desktop & Mobile Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 md:h-20">
            {/* Logo - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mr-auto -ml-4 md:-ml-8"
            >
              <Link 
                to="/" 
                className="text-3xl md:text-4xl text-black dark:text-white"
                style={{ fontFamily: "'Allura', cursive", fontWeight: 400 }}
              >
                {logoText}
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <NavLinkItem 
                  key={link.label} 
                  href={link.href}
                  isActive={location.pathname === link.href}
                >
                  {link.label}
                </NavLinkItem>
              ))}
            </nav>

            {/* Theme Switch & Mobile Menu Button - Right Side */}
            <div className="flex items-center space-x-3 ml-auto">
              <ThemeSwitch />
              
              {/* Mobile menu button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col space-y-1.5"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <>
                    <span className="block h-0.5 w-6 bg-foreground"></span>
                    <span className="block h-0.5 w-6 bg-foreground"></span>
                    <span className="block h-0.5 w-5 bg-foreground"></span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-foreground/10 bg-white dark:bg-black"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium tracking-wider transition-colors rounded-md ${
                    location.pathname === link.href
                      ? 'text-foreground bg-foreground/10'
                      : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
};

