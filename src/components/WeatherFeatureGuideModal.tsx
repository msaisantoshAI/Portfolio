'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherFeatureGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs pointer-events-auto">
          {/* Backdrop Click to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0"
          />

          {/* Simple, Clean, Compact Welcome Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-sm rounded-2xl bg-white/95 dark:bg-[#28282B]/98 border border-black/10 dark:border-white/15 p-5 shadow-lg backdrop-blur-2xl text-zinc-950 dark:text-white font-sans z-10 space-y-3"
          >
            {/* Header & Close Icon */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-white">
                Live Climate Mode
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-zinc-600 dark:text-zinc-300 text-xs transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body text */}
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              The website atmosphere and lighting now adapt live to your local climate and time. You can explore different world cities from the station button at the bottom right.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
