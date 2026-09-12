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
            className="touch-target flex items-center gap-2.5 sm:gap-3 group bg-white/90 dark:bg-[#28282B]/90 hover:bg-white dark:hover:bg-[#333338] backdrop-blur-2xl px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-black/10 dark:border-white/15 shadow-xs transition-all duration-200 hover:scale-105 shrink-0 cursor-pointer"
            aria-label="Sai Santosh Madhari Home"
          >
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-full border border-black/10 dark:border-white/30 shrink-0">
              <Image 
                src="/images/hero-portrait-color.png" 
                alt="Sai Santosh Madhari profile" 
                fill 
                className="object-cover object-top" 
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white tracking-tight pr-1 whitespace-nowrap">
              Sai Santosh
            </span>
          </Link>

          {/* Center: Desktop Navigation Pills (Hidden on mobile) */}
          <nav 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center rounded-full px-3 py-1.5 bg-white/90 dark:bg-[#28282B]/90 border border-black/10 dark:border-white/15 shadow-xs backdrop-blur-2xl"
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
                        ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xs font-bold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Controls: Say Hello + LinkedIn + Theme Selector + Resume */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Say Hello Button */}
            <a
              href="mailto:msaisantosh99@gmail.com"
              className="touch-target inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-xs transition-all hover:scale-105 active:scale-95"
              aria-label="Email Sai Santosh"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
              </svg>
              <span>Say Hello</span>
            </a>

            {/* LinkedIn Icon Button */}
            <a
              href="https://www.linkedin.com/in/sai-santosh-madhari/"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target hidden sm:flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-[#28282B]/90 hover:bg-white dark:hover:bg-[#333338] border border-black/10 dark:border-white/15 text-zinc-950 dark:text-white backdrop-blur-2xl shadow-xs transition-all hover:scale-105 active:scale-95"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
              </svg>
            </a>

            <ThemeSelector />
            
            {/* Resume Button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target hidden md:inline-flex items-center px-3.5 py-2 rounded-full text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-all hover:scale-105 active:scale-95 border border-black/5 dark:border-white/10"
            >
              Resume
            </a>

            {/* Mobile Hamburger Menu Toggle Button (lg:hidden) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-target lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-[#28282B]/90 hover:bg-white dark:hover:bg-[#333338] border border-black/10 dark:border-white/15 text-zinc-950 dark:text-white flex items-center justify-center backdrop-blur-2xl shadow-xs transition-all cursor-pointer"
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
            className="lg:hidden fixed top-16 sm:top-20 left-4 right-4 z-50 rounded-3xl bg-white/95 dark:bg-[#28282B]/98 backdrop-blur-3xl border border-black/10 dark:border-white/15 p-5 shadow-lg font-sans"
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
                        ? 'bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-sm'
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
                  className="touch-target w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 shadow-md text-center"
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
