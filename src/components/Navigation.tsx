'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Work', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/40 backdrop-blur-3xl border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shadow-sm group-hover:shadow-md transition-shadow">
            <Image 
              src="/images/headshot.png" 
              alt="Sai Santosh" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex flex-col justify-center">
             <span className="text-white font-semibold text-sm tracking-widest uppercase mb-0.5 group-hover:opacity-80 transition-opacity">
               Sai Santosh
             </span>
             <span className="text-white/50 text-xs font-light tracking-wide">
               Product Designer
             </span>
          </div>
        </Link>

        {/* Links & Utilities */}
        <div className="flex items-center">
          <nav aria-label="Main navigation" className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Resume Download Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 ml-6">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (opens in new tab)"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 transition-all duration-300 text-white text-sm font-semibold tracking-wide shadow-sm hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle for Mobile (Quick access) */}
          <div className="md:hidden flex items-center space-x-3 ml-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"} 
              className="text-white/70 hover:text-white p-2 z-[60]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white dark:bg-[#080808] border-l border-black/5 dark:border-white/10 z-[58] md:hidden shadow-2xl p-8 pt-24"
            >
              <nav className="flex flex-col space-y-8">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold tracking-tight text-white/90 hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="h-px w-full bg-black/5 dark:bg-white/10 my-4" />
                
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Resume</span>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
