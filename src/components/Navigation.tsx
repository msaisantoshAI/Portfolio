'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSelector from '@/components/ThemeSelector';
import WeatherHUD from '@/components/WeatherHUD';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled past the hero section
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator highlighting
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

  // Determine whether the full menu should be visible
  const isExpanded = !isScrolled || isHovered;

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP FLOATING DYNAMIC NAVIGATION                                       */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 md:px-12 pt-3 sm:pt-4 pointer-events-none transition-all duration-300 font-sans">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between pointer-events-auto">
          
          {/* Main Morphing Navigation Bar */}
          <motion.div
            layout
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={false}
            animate={{
              width: isExpanded ? '100%' : 'auto',
              borderRadius: '9999px',
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 30,
            }}
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? 'bg-[#080d1a]/95 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl px-2 py-1.5'
                : 'w-full'
            }`}
          >
            {/* 1. Left: Brand Identity / Compact Shrunk Pill */}
            <a 
              href="#home" 
              className={`touch-target flex items-center gap-2.5 sm:gap-3 group px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                !isScrolled 
                  ? 'bg-[#0a0f1d]/90 backdrop-blur-2xl border border-white/25 shadow-lg hover:scale-105 shrink-0' 
                  : 'hover:bg-white/10 shrink-0'
              }`}
              aria-label="Sai Santosh Madhari Home"
            >
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-full border border-white/30 shrink-0">
                <Image 
                  src="/images/headshot.png" 
                  alt="Sai Santosh Madhari profile" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <span className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors pr-1 whitespace-nowrap">
                Sai Santosh
              </span>

              {/* Shrunk indicator chevron (shows when scrolled and collapsed) */}
              {isScrolled && !isHovered && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs text-blue-400 font-mono font-normal pl-1 flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>Menu &darr;</span>
                </motion.span>
              )}
            </a>

            {/* 2. Center: Navigation Links (Expanded on Top OR on Hover) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.nav 
                  aria-label="Main Navigation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`hidden lg:flex items-center rounded-full px-3 py-1.5 ${
                    !isScrolled 
                      ? 'bg-[#0a0f1d]/90 border border-white/25 shadow-lg backdrop-blur-2xl' 
                      : 'bg-transparent'
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
                              : 'text-zinc-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>

            {/* 3. Right: Weather HUD, Theme Selector & Resume (Expanded on Top OR on Hover) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 sm:gap-3 shrink-0"
                >
                  <WeatherHUD />
                  <ThemeSelector />
                  
                  {/* Quick Resume CTA Button */}
                  <a
                    href="https://drive.google.com/file/d/1U4gJbS_oX45u5L9iU2tWqK1zU_VzR_Yd/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-target hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 border border-blue-500/30 shadow-md transition-all hover:scale-105"
                  >
                    <span>Resume</span>
                    <span>↗</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

        </div>
      </header>

      {/* Mobile Sticky Bottom Floating Navigation */}
      <nav 
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-3 py-2 rounded-full bg-[#0a0f1d]/95 backdrop-blur-2xl border border-white/25 shadow-2xl flex items-center gap-1.5 max-w-[94vw] overflow-x-auto scrollbar-hide"
      >
        {navLinks.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`touch-target px-3 py-1.5 text-[11px] font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.name}
            </a>
          );
        })}
      </nav>
    </>
  );
}
