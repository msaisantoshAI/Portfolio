'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useEnvironment, ThemeMode } from '@/context/EnvironmentContext';

export default function ThemeSelector() {
  const { themeMode, setThemeMode } = useEnvironment();

  const options: { id: ThemeMode; label: string; icon: string }[] = [
    { id: 'light', label: 'Light', icon: '☀' },
    { id: 'dark', label: 'Dark', icon: '🌙' },
    { id: 'system', label: 'Auto', icon: '✨' },
  ];

  return (
    <div 
      className="inline-flex items-center rounded-full p-1 bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/20 shadow-md text-xs"
      role="group"
      aria-label="Theme mode selector"
    >
      {options.map((opt) => {
        const isActive = themeMode === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setThemeMode(opt.id)}
            className={`relative px-2.5 sm:px-3 py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-blue-400 ${
              isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            aria-pressed={isActive}
            title={opt.id === 'system' ? 'Auto (Time & Weather Adaptive)' : `${opt.label} Mode`}
          >
            {isActive && (
              <motion.span
                layoutId="activeThemeSegment"
                className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)] -z-10"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="text-xs sm:text-[13px]">{opt.icon}</span>
            <span className="hidden sm:inline text-xs">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
