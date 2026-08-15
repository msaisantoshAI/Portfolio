'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ThemeSelector from '@/components/ThemeSelector';
import WeatherHUD from '@/components/WeatherHUD';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 md:px-12 pt-4 sm:pt-5 pointer-events-none transition-all duration-300 font-sans">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 pointer-events-auto">
          
          {/* Left: Brand Identity */}
          <a 
            href="#home" 
            className="touch-target flex items-center gap-2.5 sm:gap-3 group bg-[#0a0f1d]/90 backdrop-blur-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-white/25 shadow-lg transition-transform duration-200 hover:scale-105 shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
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
          </a>

          {/* Center: Desktop Navigation Pills */}
          <nav 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center rounded-full px-3 py-1.5 bg-[#0a0f1d]/90 border border-white/25 shadow-lg backdrop-blur-2xl"
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
          </nav>

          {/* Right: Weather HUD & Theme Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
          </div>

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
