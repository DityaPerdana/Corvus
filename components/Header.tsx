"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicking on hash links for smooth scrolling
  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    // Only handle hash links on the current page
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        // Close mobile menu if open
        setIsMenuOpen(false);
        
        // Scroll to the element with smooth behavior
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div>
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ease-in-out ${
        isScrolled || isMenuOpen ? 'shadow-md' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10 animate-pulse">
              <svg 
                viewBox="0 0 24 24" 
                className="w-full h-full text-indigo-600 dark:text-indigo-400"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Corvus
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
          <Link 
              href="/#home" 
              className="bg -text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
              onClick={(e) => handleHashLinkClick(e, '/#home')}
            >
              Home
            </Link>
            <Link 
              href="/#testimonials" 
              className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors"
              onClick={(e) => handleHashLinkClick(e, '/#testimonials')}
            >
              Testimonials
            </Link>
            <Link 
              href="/#features" 
              className='text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              onClick={(e) => handleHashLinkClick(e, '/#features')}
            >
              Features
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 ease-in-out">
              Login
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`py-2 ${isActive('/') 
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                  : 'text-gray-700 dark:text-gray-300'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/#testimonials" 
                className="py-2 text-gray-700 dark:text-gray-300"
                onClick={(e) => handleHashLinkClick(e, '/#testimonials')}
              >
                Testimonials
              </Link>
              <Link 
                href="/pricing" 
                className={`py-2 ${isActive('/pricing') 
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
                  : 'text-gray-700 dark:text-gray-300'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
            </div>
          </div>
        )}
      </header>
      
      {/* Add spacer to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
    </div>
  )
}

export default Header