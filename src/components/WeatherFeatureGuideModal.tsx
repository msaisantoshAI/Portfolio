'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherFeatureGuideModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem('sai_weather_guide_modal_seen');
      if (!seen) {
        // Pop up smoothly after initial entrance (~3.5s)
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 3600);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
          {/* Backdrop Click to close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/20 p-6 sm:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-zinc-900 dark:text-white font-sans z-10 space-y-4"
          >
            {/* Top Bar: Icon + Close Button */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 text-xs font-bold font-mono uppercase tracking-wider">
                <span>✨</span>
                <span>Interactive Feature</span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white text-sm transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                ✕
              </button>
            </div>

            {/* Headline */}
            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Live Environmental Sky
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                This portfolio adapts in real-time to your local <strong>weather, daylight, and atmospheric conditions</strong>.
              </p>
            </div>

            {/* How to access guide tip */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-black/40 border border-black/5 dark:border-white/10 flex items-start gap-3">
              <span className="text-xl shrink-0">📍</span>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                Click the <strong>location button on the bottom-right corner</strong> anytime to switch between global cities (e.g. <em>Tokyo, London, Dubai</em>) or switch between Auto, Light &amp; Dark themes!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 text-center cursor-pointer"
              >
                Explore Portfolio ↗
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
