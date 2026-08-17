'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherFeatureGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('sai_weather_guide_dismissed_v4');
      if (!dismissed) {
        // Pop up smoothly 1.2s after page loads
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
      sessionStorage.setItem('sai_weather_guide_dismissed_v4', 'true');
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
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/20 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-zinc-900 dark:text-white font-sans z-10 space-y-4"
          >
            {/* Header: Icon + Title + Close Button */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Live Environmental Sky
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white text-xs transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>

            {/* Simple Clear Explanation */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              This portfolio adapts live to real-world <strong>weather, day/night cycles, and local time</strong>. Click the weather icon button in the bottom-right corner anytime to switch cities, countries, and see the background sky change!
            </p>

            {/* Got It Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Got it ✕
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
