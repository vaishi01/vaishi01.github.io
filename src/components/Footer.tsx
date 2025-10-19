/**
 * Footer.tsx - Portfolio footer component
 * 
 * This component provides:
 * - Personal information and contact details
 * - Social media links
 * - Quick navigation links
 * - Responsive layout
 * - Dark/light theme support
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

/**
 * Footer Component
 * 
 * A clean portfolio footer with essential navigation and contact information
 */
const Footer = () => {
  /**
   * Handle home page navigation with scroll behavior
   */
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (window.location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <footer className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black dark:text-white">Vaishnavi Jaligama</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Computer Science senior at UCSC passionate about AI, LLMs, and backend engineering. Currently seeking <strong>full-time opportunities</strong> in software engineering and AI research.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3 pt-2">
              <a 
                href="mailto:vaishnavi.jaligama@gmail.com" 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vaishnavi-jaligama/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/vaishi01" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://drive.google.com/file/d/1je1tjq4AXjKwUVNb7M97KcbZAcPKUMYY/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                aria-label="Resume"
              >
                <FileText className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={handleHomeClick}
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300">
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-white">Get In Touch</h3>
            <div className="space-y-3">
              <a 
                href="mailto:vaishnavi.jaligama@gmail.com"
                className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="break-all">vaishnavi.jaligama@gmail.com</span>
              </a>
              <a 
                href="tel:+16612193884"
                className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <span>+1 (661) 219-3884</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/vaishnavi-jaligama/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                <Linkedin className="h-4 w-4 flex-shrink-0" />
                <span>linkedin.com/in/vaishnavi-jaligama</span>
              </a>
              <a 
                href="https://github.com/vaishi01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                <Github className="h-4 w-4 flex-shrink-0" />
                <span>github.com/vaishi01</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                <span>Santa Cruz, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-black/10 dark:border-white/10 pt-4 pb-0">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()} Vaishnavi Jaligama. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;