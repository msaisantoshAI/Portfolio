'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherFeatureGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('sai_weather_guide_dismissed_v5');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('sai_weather_guide_dismissed_v5', 'true');
    } catch {
      // Ignore
    }
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

          {/* Simple Clean Notification Pop Up in Center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/20 p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-zinc-900 dark:text-white font-sans z-10 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2.5">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Live Dynamic Atmosphere
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white text-xs transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>

            {/* Concise Explanation */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              This site automatically syncs its background with your local time &amp; live weather. You can also explore other cities using the weather button in the bottom right corner.
            </p>

            {/* Got It Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
