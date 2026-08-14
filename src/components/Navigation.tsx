'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Section spy
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
      {/* Unified, Non-Overlapping Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 md:px-10 pt-4 pointer-events-none transition-all duration-300">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between pointer-events-auto">
          
          {/* Left: Brand Identity */}
          <a 
            href="#home" 
            className="touch-target flex items-center gap-2.5 group bg-black/60 dark:bg-black/70 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/15 shadow-sm transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Sai Santosh Madhari Home"
          >
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-white/20 shrink-0">
              <Image 
                src="/images/headshot.png" 
                alt="Sai Santosh Madhari profile" 
                fill 
                className="object-cover" 
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors pr-1">
              Sai Santosh
            </span>
          </a>

          {/* Center: Clean Floating Pill Navbar (Desktop) */}
          <nav 
            aria-label="Main Navigation"
            className="hidden md:flex items-center rounded-full px-2.5 py-1 bg-black/60 dark:bg-[#0b0f1a]/80 border border-white/15 shadow-md backdrop-blur-xl"
          >
            <div className="flex items-center gap-0.5">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive ? 'text-white font-semibold' : 'text-zinc-300 hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activePillNavUnified"
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

          {/* Right: Primary Action + Theme Switcher (Clutter-Free) */}
          <div className="flex items-center gap-2">
            <a 
              href="mailto:Saisantoshmadhari@gmail.com" 
              className="touch-target inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
              </svg>
              <span>Say Hello</span>
            </a>

            {/* Theme Toggle Utility */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>

        </div>
      </header>

      {/* Bottom Floating Pill Navbar (Mobile) */}
      <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center md:hidden px-4">
        <nav 
          aria-label="Mobile Navigation"
          className="flex items-center rounded-full bg-black/85 dark:bg-[#0b0f1a]/95 border border-white/20 px-3 py-1.5 shadow-xl backdrop-blur-2xl"
        >
          <div className="flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`touch-target relative px-3 py-1 text-xs font-medium transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-300'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePillNavMobileUnified"
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
