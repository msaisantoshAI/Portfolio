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
    icon: string; 
    description: string;
  }[] = [
    { 
      id: 'light', 
      label: 'Light', 
      icon: '☀', 
      description: 'Daytime sky background' 
    },
    { 
      id: 'dark', 
      label: 'Dark', 
      icon: '🌙', 
      description: 'Night starry sky background' 
    },
    { 
      id: 'system', 
      label: 'Auto', 
      icon: '✨', 
      description: `Live ${location} • ${timePhase} sky` 
    },
  ];

  const currentOption = options.find((opt) => opt.id === themeMode) || options[2];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="touch-target inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#0a0f1d]/90 hover:bg-[#131d36] text-white font-sans text-xs sm:text-sm font-semibold border border-white/20 hover:border-white/40 shadow-md backdrop-blur-xl transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm sm:text-base">{currentOption.icon}</span>
        <span className="font-semibold tracking-tight">{currentOption.label}</span>
        <svg 
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu with Radio Option Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 4 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-1.5 w-60 rounded-2xl bg-[#080d1a]/95 backdrop-blur-2xl border border-white/20 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 overflow-hidden font-sans"
            role="listbox"
          >
            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">
                Background Theme
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
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-150 group ${
                      isSelected 
                        ? 'bg-blue-600/25 border border-blue-500/40 text-white' 
                        : 'hover:bg-white/10 text-zinc-300 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{opt.icon}</span>
                      <div className="flex flex-col">
                        <span className={`text-xs font-semibold ${isSelected ? 'text-blue-300' : 'text-white'}`}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-zinc-400 leading-tight">
                          {opt.description}
                        </span>
                      </div>
                    </div>

                    {/* Radio Button Indicator */}
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'border-blue-400 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' 
                        : 'border-white/30 group-hover:border-white/60 bg-white/5'
                    }`}>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
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
