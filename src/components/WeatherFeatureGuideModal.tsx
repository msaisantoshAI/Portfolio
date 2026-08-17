'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherFeatureGuideModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem('sai_weather_guide_toast_seen');
      if (!seen) {
        // Show as a gentle notification after page entry (~2.8s)
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 2800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('sai_weather_guide_toast_seen', 'true');
    } catch {
      // Ignore
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 sm:top-24 right-4 sm:right-6 md:right-8 z-50 w-[300px] sm:w-[340px] rounded-2xl bg-white/95 dark:bg-[#090e1c]/95 border border-black/10 dark:border-white/20 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-zinc-900 dark:text-white font-sans pointer-events-auto select-none"
          role="status"
          aria-live="polite"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase font-mono tracking-wider">
              <span className="text-sm">✨</span>
              <span>Live Weather Sky</span>
            </div>
            <button
              type="button"
              onClick={handleDismiss}
              className="w-5 h-5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>

          {/* Simple & Clear Explanation */}
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pt-2">
            The sky adapts in real-time to live daylight and weather. Click the <strong>location button on the bottom-right</strong> anytime to test global cities (e.g. <em>Tokyo, London, Dubai</em>)!
          </p>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-2 pt-2.5">
            <button
              type="button"
              onClick={handleDismiss}
              className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
