'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherFeatureGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem('sai_weather_guide_modal_seen');
      if (!seen) {
        // Pop up smoothly after entrance (~3.2s)
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem('sai_weather_guide_modal_seen', 'true');
    } catch {
      // Ignore
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm pointer-events-auto">
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
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm rounded-2xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/20 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl text-zinc-900 dark:text-white font-sans z-10 space-y-3"
          >
            {/* Header: Icon + Title + Close Button */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-base">✨</span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Live Environmental Sky
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-6 h-6 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs transition-colors cursor-pointer"
                aria-label="Close notification"
              >
                ✕
              </button>
            </div>

            {/* Simple Clear Explanation */}
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              This portfolio adapts live to real-world <strong>weather, day/night cycles, and local time</strong>. You can switch global cities anytime using the location button on the bottom-right corner!
            </p>

            {/* Got It Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
