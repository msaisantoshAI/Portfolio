'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';

const PRESET_CITIES = [
  { name: 'Hyderabad', flag: '🇮🇳', lat: 17.385, lon: 78.4867, tz: 'Asia/Kolkata', vibe: 'Live Local Time' },
  { name: 'Tokyo', flag: '🇯🇵', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo', vibe: 'Cosmic Night / Twilight' },
  { name: 'London', flag: '🇬🇧', lat: 51.5074, lon: -0.1278, tz: 'Europe/London', vibe: 'Afternoon Clouds' },
  { name: 'New York', flag: '🇺🇸', lat: 40.7128, lon: -74.006, tz: 'America/New_York', vibe: 'Morning Light' },
  { name: 'Dubai', flag: '🇦🇪', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai', vibe: 'Golden Hour' },
  { name: 'Sydney', flag: '🇦🇺', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney', vibe: 'Southern Sky' },
];

export default function WeatherWelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { location, localTime, setCustomLocation } = useEnvironment();

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('sai_weather_welcome_seen');
      if (!seen) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('sai_weather_welcome_seen', 'true');
    } catch {
      // Ignore
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
          
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-3xl bg-[#090e1c]/95 border border-white/20 p-6 sm:p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl space-y-6 select-none"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close guide popup"
            >
              ✕
            </button>

            {/* Header / Eyebrow */}
            <div className="space-y-2 pr-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-semibold border border-blue-400/30">
                <span>✨</span> Living Atmospheric Experience
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
                Experience a Live Weather-Synced Portfolio
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                This website is powered by a real-time environmental engine. The background sky, atmospheric lighting, and local clock adapt to your real location or any world city you select.
              </p>
            </div>

            {/* Current Active Station */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-base">📍</span>
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-mono">Current Station</span>
                  <span className="font-bold text-white text-sm">{location}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-zinc-400 block text-[10px] uppercase font-mono">Local Clock</span>
                <span className="font-mono font-bold text-amber-300 text-sm">{localTime}</span>
              </div>
            </div>

            {/* Interactive World City Selector Chips */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Test a different city &amp; watch the sky transform:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRESET_CITIES.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => {
                      setCustomLocation(city.name, city.lat, city.lon, city.tz);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer ${
                      location.toLowerCase().includes(city.name.toLowerCase())
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <span>{city.flag}</span>
                      <span>{city.name}</span>
                    </span>
                    <span className="text-[10px] text-zinc-400 font-light mt-0.5">
                      {city.vibe}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Dismiss Button */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <span className="text-[11px] text-zinc-400">
                You can change locations anytime via the button at the bottom.
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 ml-3"
              >
                Explore Portfolio &rarr;
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
