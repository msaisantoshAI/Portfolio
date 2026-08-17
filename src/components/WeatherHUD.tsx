'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment, WeatherState } from '@/context/EnvironmentContext';

function getWeatherIcon(state: WeatherState, isDay: boolean): string {
  switch (state) {
    case 'clear':
      return isDay ? '☀️' : '🌙';
    case 'partlyCloudy':
      return isDay ? '⛅' : '☁️';
    case 'cloudy':
      return '☁️';
    case 'rain':
    case 'heavyRain':
      return '🌧️';
    case 'thunderstorm':
      return '⛈️';
    case 'fog':
      return '🌫️';
    case 'snow':
      return '❄️';
    default:
      return isDay ? '☀️' : '🌙';
  }
}

const CITY_PRESETS = [
  { name: 'Hyderabad', flag: '🇮🇳', lat: 17.385, lon: 78.4867, tz: 'Asia/Kolkata' },
  { name: 'London', flag: '🇬🇧', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { name: 'New York', flag: '🇺🇸', lat: 40.7128, lon: -74.006, tz: 'America/New_York' },
  { name: 'Tokyo', flag: '🇯🇵', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { name: 'Dubai', flag: '🇦🇪', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { name: 'Toronto', flag: '🇨🇦', lat: 43.6532, lon: -79.3832, tz: 'America/Toronto' },
  { name: 'Sydney', flag: '🇦🇺', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
  { name: 'Singapore', flag: '🇸🇬', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore' },
  { name: 'Bengaluru', flag: '🇮🇳', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata' },
  { name: 'Paris', flag: '🇫🇷', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
];

export default function WeatherHUD() {
  const { 
    location, 
    country,
    localTime, 
    temperature, 
    weatherState, 
    isDay, 
    themeMode, 
    isSimulating,
    setCustomLocation,
    resetToLiveLocation
  } = useEnvironment();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showGuideNote, setShowGuideNote] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Check if guide note was previously dismissed
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('sai_guide_note_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setShowGuideNote(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleDismissGuideNote = () => {
    setShowGuideNote(false);
    try {
      localStorage.setItem('sai_guide_note_dismissed', 'true');
    } catch {
      // Ignore
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!localTime) return null;

  const icon = getWeatherIcon(weatherState, isDay);
  const displayLocation = country ? `${location}, ${country}` : location;

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await setCustomLocation(searchQuery.trim());
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <div className="fixed bottom-16 right-3 sm:bottom-5 sm:right-5 z-40 font-sans pointer-events-auto" ref={modalRef}>
      
      {/* 1. COMPACT GUIDE NOTE TOOLTIP OVER LOCATION BUTTON */}
      <AnimatePresence>
        {showGuideNote && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-[calc(100%+10px)] right-0 w-[260px] sm:w-[280px] p-3 rounded-2xl bg-[#090e1c]/95 text-white border border-blue-400/40 shadow-xl backdrop-blur-2xl z-50 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1 uppercase tracking-wider">
                <span>✨</span>
                <span>Interactive Sky</span>
              </span>
              <button
                type="button"
                onClick={handleDismissGuideNote}
                className="w-4 h-4 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white text-[10px] transition-colors"
                aria-label="Dismiss tip"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-zinc-200 leading-snug font-normal">
              Click below to switch cities and watch the website sky &amp; weather adapt live!
            </p>

            <button
              type="button"
              onClick={() => {
                handleDismissGuideNote();
                setIsOpen(true);
              }}
              className="self-end px-2.5 py-0.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold transition-colors"
            >
              Switch City ↗
            </button>

            {/* Little pointer arrow */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#090e1c] border-r border-b border-blue-400/40 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Original Sleek Ambient Status Chip */}
      <motion.button
        type="button"
        onClick={() => {
          if (showGuideNote) handleDismissGuideNote();
          setIsOpen(!isOpen);
        }}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="touch-target inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#0a0f1d]/90 hover:bg-[#131e3d] text-white font-sans text-xs border border-white/20 hover:border-blue-400/50 shadow-lg backdrop-blur-2xl transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Open Worldwide Location Switcher"
        title="Click to test different world locations!"
      >
        {/* Location Pin */}
        <span className="flex items-center gap-1 text-zinc-300 font-medium">
          <span className="text-blue-400 text-xs">📍</span>
          <span className="font-semibold text-white tracking-tight">{displayLocation}</span>
        </span>

        {/* Temperature */}
        {temperature !== null && (
          <>
            <span className="text-white/25 text-[10px]" aria-hidden="true">•</span>
            <span className="font-medium text-zinc-200">{temperature}°C</span>
          </>
        )}

        {/* Weather Icon & Local Clock */}
        <span className="text-white/25 text-[10px]" aria-hidden="true">•</span>
        <span className="flex items-center gap-1 text-amber-300 font-medium">
          <span className="text-xs">{icon}</span>
          <span className="font-semibold text-white tracking-wide">{localTime}</span>
        </span>

        {/* Simulator / Live indicator */}
        {isSimulating ? (
          <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 ml-0.5">
            CUSTOM
          </span>
        ) : (
          themeMode === 'system' && (
            <span className="relative flex h-1.5 w-1.5 ml-0.5" title="Live environment active">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
          )
        )}
      </motion.button>

      {/* 3. Original Compact Location Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-12 right-0 w-[290px] sm:w-[330px] max-h-[75vh] overflow-y-auto rounded-2xl bg-[#090d1c]/95 border border-white/20 p-4 shadow-2xl backdrop-blur-3xl text-white space-y-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🌍</span> Worldwide Weather
                </h4>
                <p className="text-[10px] text-zinc-400">
                  Switch city to adapt sky live
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[10px] text-zinc-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Quick Status */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-300 font-medium flex items-center gap-1">
                <span>{icon}</span>
                <span>{location}</span>
              </span>
              <span className="font-mono font-bold text-white">
                {temperature !== null ? `${temperature}°C` : ''} &bull; {localTime}
              </span>
            </div>

            {/* Live Search Input */}
            <form onSubmit={handleSearchSubmit} className="space-y-1">
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="Type any city/country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-blue-400 font-sans"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  {isSearching ? '...' : 'Go'}
                </button>
              </div>
            </form>

            {/* Quick-Select Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">
                Popular Cities
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {CITY_PRESETS.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => {
                      setCustomLocation(city.name, city.lat, city.lon, city.tz);
                      setIsOpen(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left border flex items-center justify-between transition-all cursor-pointer ${
                      location.toLowerCase().includes(city.name.toLowerCase())
                        ? 'bg-blue-600/30 border-blue-400/60 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    <span>{city.flag} {city.name}</span>
                    <span className="text-[9px] text-zinc-400">&rarr;</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset to Auto Live Location */}
            {isSimulating && (
              <button
                type="button"
                onClick={() => {
                  resetToLiveLocation();
                  setIsOpen(false);
                }}
                className="w-full py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all text-center"
              >
                ↻ Reset to My Live Location
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
