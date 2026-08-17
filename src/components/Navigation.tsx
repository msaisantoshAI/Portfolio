'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSelector from '@/components/ThemeSelector';
import WeatherHUD from '@/components/WeatherHUD';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'work', 'ai-exploration', 'drawings', 'talks', 'contact'];
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
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'AI Exploration', href: '#ai-exploration', id: 'ai-exploration' },
    { name: 'Artworks', href: '#drawings', id: 'drawings' },
    { name: 'Talks', href: '#talks', id: 'talks' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const resumeUrl = "https://drive.google.com/file/d/1U4gJbS_oX45u5L9iU2tWqK1zU_VzR_Yd/view?usp=sharing";

  return (
    <>
      {/* Top Header Bar with Adaptive Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-10 lg:px-12 pt-3 sm:pt-4 pointer-events-none transition-all duration-300 font-sans">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 pointer-events-auto">
          
          {/* Left: Brand Identity (Glassmorphism Pill) */}
          <a 
            href="#home" 
            className={`touch-target flex items-center gap-2.5 sm:gap-3 group px-3.5 sm:px-4 py-2 rounded-full border transition-all duration-300 shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md ${
              isScrolled 
                ? 'bg-white/80 dark:bg-[#080d1a]/85 backdrop-blur-2xl border-black/10 dark:border-white/20' 
                : 'bg-white/60 dark:bg-black/35 backdrop-blur-xl border-black/5 dark:border-white/15'
            }`}
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
          </a>

          {/* Center: Desktop Navigation Pills (Adaptive Glassmorphism) */}
          <nav 
            aria-label="Main Navigation"
            className={`hidden lg:flex items-center rounded-full px-3 py-1.5 border shadow-md transition-all duration-300 ${
              isScrolled 
                ? 'bg-white/85 dark:bg-[#080d1a]/85 backdrop-blur-2xl border-black/10 dark:border-white/20' 
                : 'bg-white/65 dark:bg-black/35 backdrop-blur-xl border-black/5 dark:border-white/15'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`touch-target px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Right: Actions, Theme Selector & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <ThemeSelector />
            
            {/* Desktop Resume Button (Clean 'Resume' text without arrow) */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 shadow-md transition-all hover:scale-105 active:scale-95"
            >
              Resume
            </a>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="touch-target lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 dark:bg-[#080d1a]/85 backdrop-blur-2xl border border-black/10 dark:border-white/20 text-zinc-900 dark:text-white shadow-md transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Floating Worldwide Weather & Location HUD (Unblocked, Always Visible) */}
      <WeatherHUD />

      {/* Mobile Glassmorphism Dropdown Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 right-4 left-4 z-40 lg:hidden rounded-3xl bg-white/95 dark:bg-[#090e1c]/95 border border-black/10 dark:border-white/20 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl space-y-4"
          >
            <div className="flex flex-col gap-1 border-b border-black/5 dark:border-white/10 pb-3">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`touch-target px-4 py-2.5 rounded-2xl text-sm font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-zinc-800 dark:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <span>&bull;</span>}
                  </a>
                );
              })}
            </div>

            {/* Mobile Resume Link */}
            <div className="pt-1 flex items-center justify-between">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl text-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-colors"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
