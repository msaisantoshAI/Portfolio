'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSelector from '@/components/ThemeSelector';

export default function Navigation() {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isAboutPage) {
      setActiveSection('about');
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'work', 'ai-exploration', 'what-i-bring', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAboutPage]);

  const navLinks = [
    { name: 'Home', href: '/#home', id: 'home' },
    { name: 'Work', href: '/#work', id: 'work' },
    { name: 'AI Exploration', href: '/#ai-exploration', id: 'ai-exploration' },
    { name: 'What I Bring', href: '/#what-i-bring', id: 'what-i-bring' },
    { name: 'About', href: '/about', id: 'about' },
  ];

  return (
    <>
      {/* Top Header Bar with Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-6 md:px-10 lg:px-12 pt-3.5 sm:pt-5 pointer-events-none transition-all duration-300 font-sans">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 pointer-events-auto">
          
          {/* Left: Brand Identity Pill */}
          <Link 
            href="/#home" 
            className="touch-target flex items-center gap-2.5 sm:gap-3 group bg-white/80 dark:bg-black/60 hover:bg-white/95 dark:hover:bg-black/80 backdrop-blur-2xl px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-black/10 dark:border-white/20 shadow-md transition-all duration-200 hover:scale-105 shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            aria-label="Sai Santosh Madhari Home"
          >
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-full border border-black/10 dark:border-white/30 shrink-0">
              <Image 
                src="/images/headshot.png" 
                alt="Sai Santosh Madhari profile" 
                fill 
                className="object-cover" 
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-1 whitespace-nowrap">
              Sai Santosh
            </span>
          </Link>

          {/* Center: Desktop Navigation Pills (Hidden on mobile) */}
          <nav 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center rounded-full px-3 py-1.5 bg-white/80 dark:bg-black/60 border border-black/10 dark:border-white/20 shadow-md backdrop-blur-2xl"
          >
            <div className="flex items-center gap-1.5">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`touch-target px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Controls: Theme Selector + Resume Button + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <ThemeSelector />
            
            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target hidden sm:inline-flex items-center px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Resume
            </a>

            {/* Mobile Hamburger Menu Toggle Button (lg:hidden) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-target lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white/95 dark:hover:bg-black/80 border border-black/10 dark:border-white/20 text-zinc-900 dark:text-white flex items-center justify-center backdrop-blur-2xl shadow-md transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <span className="text-base font-bold">✕</span>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Expanding Drawer / Glassmorphism Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-16 sm:top-20 left-4 right-4 z-50 rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 backdrop-blur-3xl border border-black/10 dark:border-white/20 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-sans"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3 mb-1">
                <span className="text-xs font-mono uppercase font-bold tracking-widest text-zinc-400">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  Close ✕
                </button>
              </div>

              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`touch-target px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-2 border-t border-black/5 dark:border-white/10 mt-1">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="touch-target w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md text-center"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
