'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function WeatherFeatureGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { location, country, weatherDescription, temperature } = useEnvironment();

  useEffect(() => {
    // Listen for manual shift to Auto mode only (DO NOT open on page load)
    const handleOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('open-auto-welcome-modal', handleOpen);
    return () => window.removeEventListener('open-auto-welcome-modal', handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md pointer-events-auto">
          {/* Backdrop click to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0"
          />

          {/* Simple Clean Welcome Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#121214] border border-black/10 dark:border-white/15 p-6 shadow-2xl backdrop-blur-2xl text-zinc-950 dark:text-white font-sans z-10 space-y-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                  Welcome to Live Climate Mode
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white text-xs transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            {/* Current Sync Info */}
            <div className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-600 dark:text-zinc-300">
                📍 {location}, {country}
              </span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {temperature !== null ? `${temperature}°C` : ''} • {weatherDescription}
              </span>
            </div>

            {/* Feature explanation */}
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              The portfolio background is now synced to your live local climate, time, and celestial lighting. You can also explore other world cities anytime from the weather controller in the bottom right corner.
            </p>

            {/* Action */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="touch-target px-5 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
