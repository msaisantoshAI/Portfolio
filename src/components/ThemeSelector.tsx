'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment, ThemeMode } from '@/context/EnvironmentContext';

export default function ThemeSelector() {
  const { themeMode, setThemeMode, location, timePhase } = useEnvironment();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options: { 
    id: ThemeMode; 
    label: string; 
    description: string;
  }[] = [
    { 
      id: 'system', 
      label: 'Auto', 
      description: `Live ${location} • ${timePhase}` 
    },
    { 
      id: 'light', 
      label: 'Light', 
      description: 'Daytime mode' 
    },
    { 
      id: 'dark', 
      label: 'Dark', 
      description: 'Night mode' 
    },
  ];

  const currentOption = options.find((opt) => opt.id === themeMode) || options[0];

  return (
    <div className="relative inline-block text-left font-sans" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="touch-target inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white/95 dark:hover:bg-black/80 text-zinc-900 dark:text-white font-sans text-xs sm:text-sm font-semibold border border-black/10 dark:border-white/20 shadow-md backdrop-blur-2xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Toggle visual theme mode"
      >
        <span className="font-semibold tracking-tight">{currentOption.label}</span>
        <svg 
          className={`w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-zinc-900 dark:text-white' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu with Radio Button Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-1.5 w-52 sm:w-56 rounded-2xl bg-white/95 dark:bg-[#0c111e]/95 backdrop-blur-3xl border border-black/10 dark:border-white/20 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-50 overflow-hidden font-sans"
            role="listbox"
          >
            <div className="px-2.5 py-1.5 border-b border-black/5 dark:border-white/10 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 font-mono">
                Environment Mode
              </span>
            </div>

            <div className="space-y-1">
              {options.map((opt) => {
                const isSelected = themeMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setThemeMode(opt.id);
                      setIsOpen(false);
                    }}
                    role="option"
                    aria-selected={isSelected}
                    className={`w-full touch-target text-left px-3 py-2 rounded-xl transition-all duration-150 flex items-center gap-3 text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {/* Radio Button Circle */}
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-400 bg-white dark:bg-[#0c111e]'
                        : 'border-zinc-400 dark:border-zinc-600 bg-transparent'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </div>

                    {/* Text Label & Description */}
                    <div>
                      <p className="font-semibold text-xs leading-tight text-zinc-900 dark:text-white">
                        {opt.label}
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
