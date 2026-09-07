'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment, ThemeMode } from '@/context/EnvironmentContext';

export default function ThemeSelector() {
  const { themeMode, setThemeMode } = useEnvironment();
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
  }[] = [
    { id: 'system', label: 'Auto' },
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
  ];

  const currentOption = options.find((opt) => opt.id === themeMode) || options[0];

  const handleSelectMode = (newMode: ThemeMode) => {
    const prevMode = themeMode;
    setThemeMode(newMode);
    setIsOpen(false);

    // If shifting from light/dark to Auto mode, trigger the small welcome popup
    if (newMode === 'system' && prevMode !== 'system') {
      window.dispatchEvent(new CustomEvent('sai_trigger_auto_welcome'));
    }
  };

  return (
    <div className="relative inline-block text-left font-sans" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="touch-target inline-flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-full bg-white/90 dark:bg-[#28282B]/90 hover:bg-white dark:hover:bg-[#333338] text-zinc-950 dark:text-white font-sans text-xs sm:text-sm font-semibold border border-black/10 dark:border-white/15 shadow-xs backdrop-blur-2xl transition-all duration-200 cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Toggle visual theme mode"
      >
        <span className="font-semibold tracking-tight">{currentOption.label}</span>
        <svg 
          className={`w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-zinc-950 dark:text-white' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu with Clean, Uniform Radio Button Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-1.5 w-36 rounded-2xl bg-white/95 dark:bg-[#28282B]/98 backdrop-blur-3xl border border-black/10 dark:border-white/15 p-1.5 shadow-md z-50 overflow-hidden font-sans"
            role="listbox"
          >
            <div className="space-y-1">
              {options.map((opt) => {
                const isSelected = themeMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectMode(opt.id)}
                    role="option"
                    aria-selected={isSelected}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all duration-150 flex items-center gap-2.5 text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-black/5 dark:bg-white/10 text-zinc-950 dark:text-white font-semibold'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    {/* Radio Button Circle */}
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-zinc-950 dark:border-white bg-transparent'
                        : 'border-zinc-400 dark:border-zinc-500 bg-transparent'
                    }`}>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
                      )}
                    </div>

                    {/* Text Label */}
                    <span className="font-semibold text-xs leading-none text-zinc-950 dark:text-white">
                      {opt.label}
                    </span>
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
