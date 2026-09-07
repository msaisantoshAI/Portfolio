'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function WeatherFeatureGuideModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { location, timePhase, weatherDescription, temperature } = useEnvironment();

  useEffect(() => {
    // Listen for manual switch to Auto mode from ThemeSelector
    const handleTrigger = () => {
      setIsOpen(true);
    };

    window.addEventListener('sai_trigger_auto_welcome', handleTrigger);
    return () => window.removeEventListener('sai_trigger_auto_welcome', handleTrigger);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md pointer-events-auto">
          {/* Backdrop Click to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0"
          />

          {/* Simple Clean Welcome Popup Card on Mode Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-3xl bg-white/95 dark:bg-[#121214]/98 border border-black/10 dark:border-white/15 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-zinc-950 dark:text-white font-sans z-10 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Live Atmosphere
                </span>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                  Welcome to Live Climate Mode
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white text-xs transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>

            {/* Current Detected Live State */}
            <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-zinc-900 dark:text-white">
                📍 {location}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {weatherDescription} &bull; {temperature !== null ? `${temperature}°C` : ''} &bull; {timePhase}
              </span>
            </div>

            {/* Concise Feature Explanation & How to Explore */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              The sky, natural lighting, and hero atmosphere now mirror live meteorological data. You can switch to any global city anytime using the weather control at the bottom right.
            </p>

            {/* Explore Action Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Explore Atmosphere &rarr;
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
