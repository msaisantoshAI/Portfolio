'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

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
      {/* Top Header Bar (Rock-solid spacing, zero overlapping) */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 pointer-events-auto">
          
          {/* Left: Brand Identity */}
          <a 
            href="#home" 
            className="touch-target flex items-center gap-2 group bg-black/75 dark:bg-black/80 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/15 shadow-sm transition-transform duration-200 hover:scale-105 shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
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

          {/* Center: Desktop Navigation Pills (Visible only on lg+ screens to prevent overlapping) */}
          <nav 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center rounded-full px-2 py-1 bg-black/70 dark:bg-[#0b0f1a]/85 border border-white/15 shadow-md backdrop-blur-xl"
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
                        layoutId="activePillNavUnifiedClean"
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

          {/* Right: Say Hello CTA & Theme Switcher (Zero clutter) */}
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="mailto:Saisantoshmadhari@gmail.com" 
              className="touch-target inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
              </svg>
              <span>Say Hello</span>
            </a>

            {/* Theme Toggle Utility */}
            <div className="flex items-center shrink-0">
              <ThemeToggle />
            </div>
          </div>

        </div>
      </header>

      {/* Floating Bottom Pill Navbar (Mobile & Tablet < lg) */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex justify-center lg:hidden px-4 max-w-full">
        <nav 
          aria-label="Mobile Navigation"
          className="flex items-center rounded-full bg-black/85 dark:bg-[#0b0f1a]/95 border border-white/20 px-2.5 py-1.5 shadow-2xl backdrop-blur-2xl"
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
                      layoutId="activePillNavMobileUnifiedClean"
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
    </>
  );
}
