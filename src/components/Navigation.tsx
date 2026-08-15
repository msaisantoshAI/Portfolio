'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeSelector from '@/components/ThemeSelector';
import WeatherHUD from '@/components/WeatherHUD';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'fun', 'talks', 'contact'];
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
    { name: 'Process', href: '#fun', id: 'fun' },
    { name: 'Talks', href: '#talks', id: 'talks' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      {/* Top Header Bar (Clean, uncrowded spacing) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-3 sm:px-6 md:px-8 pt-3 sm:pt-4 pointer-events-none transition-all duration-300 font-sans">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 pointer-events-auto">
          
          {/* Left: Brand Identity */}
          <a 
            href="#home" 
            className="touch-target flex items-center gap-2 group bg-[#0a0f1d]/85 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20 shadow-sm transition-transform duration-200 hover:scale-105 shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Sai Santosh Madhari Home"
          >
            <div className="relative h-6 w-6 sm:h-7 sm:w-7 overflow-hidden rounded-full border border-white/20 shrink-0">
              <Image 
                src="/images/headshot.png" 
                alt="Sai Santosh Madhari profile" 
                fill 
                className="object-cover" 
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors pr-1 whitespace-nowrap">
              Sai Santosh
            </span>
          </a>

          {/* Center: Desktop Navigation Pills (Visible on lg+ screens) */}
          <nav 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center rounded-full px-2 py-1 bg-[#0a0f1d]/85 border border-white/20 shadow-md backdrop-blur-xl"
          >
            <div className="flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap ${
                      isActive ? 'text-white font-semibold' : 'text-zinc-300 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activePillNavUnifiedCleanDark"
                        className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    {item.name}
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Right: Dark Mode Resume CTA + Dark Mode LinkedIn Icon + Theme Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Resume Button */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="View Resume PDF (opens in new tab)" 
              className="touch-target hidden sm:inline-flex items-center px-4 py-1.5 rounded-full bg-[#0a0f1d] hover:bg-[#15203d] text-white font-semibold text-xs sm:text-sm border border-white/20 hover:border-white/40 shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Resume
            </a>

            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/saisantoshmadhari0711/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn Profile (opens in new tab)" 
              className="touch-target inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0a0f1d] hover:bg-[#15203d] border border-white/20 hover:border-white/40 text-white hover:text-blue-400 hover:scale-105 active:scale-95 transition-all shadow-md backdrop-blur-md shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true">
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
              </svg>
            </a>

            {/* Compact Theme Mode Dropdown */}
            <div className="flex items-center shrink-0">
              <ThemeSelector />
            </div>
          </div>

        </div>
      </header>

      {/* Floating Bottom Pill Navbar (Mobile & Tablet < lg) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex justify-center lg:hidden px-4 max-w-full">
        <nav 
          aria-label="Mobile Navigation"
          className="flex items-center rounded-full bg-[#0a0f1d]/90 border border-white/20 px-2.5 py-1.5 shadow-2xl backdrop-blur-2xl font-sans"
        >
          <div className="flex items-center gap-0.5">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`touch-target relative px-2.5 py-1 text-[11px] font-medium transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-300'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePillNavMobileUnifiedCleanDark"
                      className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Floating Real-Time Location, Weather & Clock Chip (Bottom Right) */}
      <WeatherHUD />
    </>
  );
}
