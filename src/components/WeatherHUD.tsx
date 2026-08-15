'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment, WeatherState } from '@/context/EnvironmentContext';

function getWeatherIcon(state: WeatherState, isDay: boolean): string {
  switch (state) {
    case 'clear':
      return isDay ? '☀' : '🌙';
    case 'partlyCloudy':
      return isDay ? '⛅' : '☁';
    case 'cloudy':
      return '☁';
    case 'rain':
      return '🌧';
    case 'thunderstorm':
      return '⛈';
    case 'fog':
      return '🌫';
    case 'snow':
      return '❄';
    default:
      return isDay ? '☀' : '🌙';
  }
}

export default function WeatherHUD() {
  const { location, localTime, temperature, weatherState, isDay, weatherDescription, themeMode, timePhase } = useEnvironment();
  const [showTooltip, setShowTooltip] = useState(false);

  if (!localTime) return null;

  const icon = getWeatherIcon(weatherState, isDay);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 font-sans pointer-events-auto">
      
      {/* Floating Ambient Status Chip */}
      <motion.button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="touch-target inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f1d]/85 hover:bg-[#121c38]/90 text-white font-sans text-xs sm:text-[13px] border border-white/20 hover:border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 group"
        aria-label={`Current location: ${location}, ${temperature !== null ? `${temperature}°C` : ''}, ${weatherDescription}, ${localTime}`}
      >
        {/* Location Pin */}
        <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <span className="text-blue-400 group-hover:scale-110 transition-transform">📍</span>
          <span className="font-semibold text-white tracking-tight">{location}</span>
        </span>

        {/* Temperature */}
        {temperature !== null && (
          <>
            <span className="text-white/25 font-light" aria-hidden="true">•</span>
            <span className="font-medium text-zinc-200">{temperature}°C</span>
          </>
        )}

        {/* Weather Icon & Local Clock */}
        <span className="text-white/25 font-light" aria-hidden="true">•</span>
        <span className="flex items-center gap-1.5 text-amber-300 font-medium">
          <span className="text-sm">{icon}</span>
          <span className="font-semibold text-white tracking-wide">{localTime}</span>
        </span>

        {/* Live sync pulse for auto mode */}
        {themeMode === 'system' && (
          <span className="relative flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        )}
      </motion.button>

      {/* Expanded Details Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full right-0 mb-1 w-64 p-3 rounded-2xl bg-[#080d1a]/95 border border-white/20 shadow-2xl backdrop-blur-2xl text-left pointer-events-none"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                Live Environment Engine
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {themeMode === 'system' ? 'Auto Synced' : `${themeMode.toUpperCase()} Mode`}
              </span>
            </div>

            <div className="space-y-1 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Sky Phase:</span>
                <span className="font-medium text-white capitalize">{timePhase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Condition:</span>
                <span className="font-medium text-white">{weatherDescription}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Location:</span>
                <span className="font-medium text-white">{location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
