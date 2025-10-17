/**
 * Navbar.tsx - Main navigation component for the AJA Consulting Services website
 * 
 * This component provides:
 * - Responsive navigation with desktop and mobile layouts
 * - Dynamic active state highlighting based on current route
 * - Theme switching capability
 * - Smooth navigation with automatic scroll-to-top
 * - Service path grouping for better UX
 */

import React from 'react';
import { Menu as MenuIcon, X, Home, Briefcase, Users, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeSwitch } from '@/components/ui/theme-switch-button';
import { Menu, MenuItem } from '@/components/ui/navbar-menu';

/**
 * Navbar Component
 * 
 * A responsive navigation bar that adapts to different screen sizes.
 * Features include:
 * - Desktop navigation with centered tubelight effect
 * - Mobile navigation with hamburger menu
 * - Active route highlighting
 * - Theme switching integration
 * - Logo placement and navigation links
 */
const Navbar = () => {
  // State for mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // State for hover menu active item
  const [active, setActive] = React.useState<string | null>(null);
  // Current location for route-based highlighting
  const location = useLocation();

  // Effect to scroll to top instantly when location changes
  // This provides better UX by ensuring users start at the top of new pages
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Navigation items with icons and routes
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'Resume', url: '/resume', icon: Users },
    { name: 'Contact', url: '/contact', icon: Mail }
  ];

  /**
   * Get current active path for navigation highlighting
   */
  const getCurrentPath = () => {
    return location.pathname;
  };

  /**
   * Handle navigation with scroll to top
   * Closes mobile menu and lets useEffect handle scrolling
   */
  const handleNavigation = (url) => {
    setIsMenuOpen(false); // Close mobile menu
    // The useEffect above will handle scrolling to top
  };

  return (
    <>
      {/* Main Navbar - Hidden on mobile devices */}
      <nav className="hidden md:block relative z-40 mt-4">
        {/* Desktop Navigation Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            {/* Desktop Navigation - Centered with Hover Menu and Theme Switch */}
            <div className="flex items-center">
              <Menu setActive={setActive}>
                <Link to="/">
                  <MenuItem setActive={setActive} active={active} item="Home">
                  </MenuItem>
                </Link>

                <Link to="/projects">
                  <MenuItem setActive={setActive} active={active} item="Projects">
                  </MenuItem>
                </Link>

                <Link to="/resume">
                  <MenuItem setActive={setActive} active={active} item="Resume">
                  </MenuItem>
                </Link>

                <Link to="/contact">
                  <MenuItem setActive={setActive} active={active} item="Contact">
                  </MenuItem>
                </Link>

                {/* Theme Switch integrated in menu capsule */}
                <div className="flex items-center ml-2">
                  <ThemeSwitch />
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Hidden on desktop */}
      <nav className="md:hidden relative z-40">
        {/* Mobile Header with Menu Button */}
        <div className="flex items-center justify-end px-4 h-16">
          {/* Theme Switch and Menu Button - Right Side */}
          <div className="flex items-center space-x-2">
            {/* Theme Switch Component */}
            <div className="relative">
              <ThemeSwitch />
            </div>
            
            {/* Mobile menu button with toggle functionality */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-800/50 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu - Conditionally rendered */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 relative z-30`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Render navigation items with icons and active states */}
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = getCurrentPath() === item.url;
              
              return (
                <Link 
                  key={item.name}
                  to={item.url} 
                  className={`flex items-center px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' 
                      : 'text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                  onClick={() => handleNavigation(item.url)}
                >
                  <IconComponent size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;