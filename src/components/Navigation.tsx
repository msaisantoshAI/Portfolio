'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'fun', 'talks', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Saisantoshmadhari@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
      {/* Top Header Bar */}
      <header className="w-full px-5 pt-5 sm:px-8 sm:pt-6 md:px-12 md:pt-8 fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between pointer-events-auto">
          {/* Logo & Identity */}
          <a 
            href="#home" 
            className="touch-target flex items-center gap-3 group bg-white/90 dark:bg-black/70 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-black/10 dark:border-white/15 shadow-sm transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="Sai Santosh Madhari Home"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-black/10 dark:border-white/20 shrink-0">
              <Image 
                src="/images/headshot.png" 
                alt="Sai Santosh Madhari profile" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Sai Santosh
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono tracking-wider uppercase">
                Product Designer
              </span>
            </div>
          </a>

          {/* Action Hierarchy: Primary (Say Hello) + Copy Email Pill + Secondary (Resume, LinkedIn) + Utility (Theme Toggle) */}
          <div className="flex items-center gap-2">
            
            {/* Quick 1-Click Copy Email Pill (Sanjay Menon feature) */}
            <button
              onClick={handleCopyEmail}
              className="touch-target hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-mono text-xs hover:bg-zinc-100 dark:hover:bg-white/20 transition-all backdrop-blur-md shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Copy email address to clipboard"
            >
              <span>{copied ? '✓ Copied!' : '📋 Copy Email'}</span>
            </button>

            {/* Secondary CTA: Resume */}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="View Resume PDF (opens in new tab)" 
              className="touch-target hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-white/90 dark:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 font-medium text-xs md:text-sm hover:bg-zinc-100 dark:hover:bg-white/20 transition-all backdrop-blur-md shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Resume
            </a>

            {/* Secondary Icon: LinkedIn */}
            <a 
              href="https://www.linkedin.com/in/saisantoshmadhari0711/" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn Profile (opens in new tab)" 
              className="touch-target inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-black/70 border border-black/10 dark:border-white/15 text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95 transition-all shadow-sm backdrop-blur-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" />
              </svg>
            </a>

            {/* Primary CTA: Say Hello */}
            <a 
              href="mailto:Saisantoshmadhari@gmail.com" 
              className="touch-target inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z" />
              </svg>
              <span>Say Hello</span>
            </a>

            {/* Utility Control: Theme Toggle */}
            <div className="flex items-center pl-1">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Instant Toast Notification for Copied Email */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed top-20 right-6 sm:right-12 z-50 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-black shadow-xl border border-white/20 text-xs font-mono font-semibold flex items-center gap-2 pointer-events-auto"
            >
              <span>✨ Copied Saisantoshmadhari@gmail.com to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Center Pill Navbar (Desktop) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <nav 
          aria-label="Main Navigation"
          className="flex items-center rounded-full px-3 py-1.5 bg-white/90 dark:bg-[#0b0f1a]/90 border border-black/10 dark:border-white/15 shadow-md backdrop-blur-xl"
        >
          <div className="flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`touch-target relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePillNav"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.4)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Bottom Floating Pill Navbar (Mobile) */}
      <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center md:hidden px-4">
        <nav 
          aria-label="Mobile Navigation"
          className="flex items-center rounded-full bg-white/95 dark:bg-[#0b0f1a]/95 border border-black/10 dark:border-white/15 px-3 py-1.5 shadow-lg backdrop-blur-2xl"
        >
          <div className="flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`touch-target relative px-3 py-1 text-xs font-medium transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePillNavMobile"
                      className="absolute inset-0 bg-blue-600 rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
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
