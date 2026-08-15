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
  { name: 'Paris', flag: '🇫🇷', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { name: 'Singapore', flag: '🇸🇬', lat: 1.3521, lon: 103.8198, tz: 'Asia/Singapore' },
  { name: 'Mumbai', flag: '🇮🇳', lat: 19.076, lon: 72.8777, tz: 'Asia/Kolkata' },
  { name: 'Bengaluru', flag: '🇮🇳', lat: 12.9716, lon: 77.5946, tz: 'Asia/Kolkata' },
  { name: 'Reykjavik', flag: '🇮🇸', lat: 64.1466, lon: -21.9426, tz: 'Atlantic/Reykjavik' },
];

export default function WeatherHUD() {
  const { 
    location, 
    country,
    localTime, 
    temperature, 
    windSpeed,
    weatherState, 
    isDay, 
    weatherDescription, 
    themeMode, 
    timePhase,
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
        // Show after a subtle 1.8s delay for new visitors
        const timer = setTimeout(() => {
          setShowGuideNote(true);
        }, 1800);
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 font-sans pointer-events-auto" ref={modalRef}>
      
      {/* GUIDE NOTE POPUP OVER LOCATION BUTTON FOR NEW USERS */}
      <AnimatePresence>
        {showGuideNote && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[calc(100%+14px)] right-0 w-[290px] sm:w-[320px] p-4 rounded-2xl bg-[#080d1a]/95 text-white border border-blue-400/40 shadow-[0_16px_40px_rgba(0,0,0,0.8)] backdrop-blur-2xl z-50 flex flex-col gap-2.5"
          >
            {/* Header & Dismiss */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="animate-spin text-sm">✨</span>
                <span>Interactive Sky</span>
              </span>
              <button
                type="button"
                onClick={handleDismissGuideNote}
                className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white text-xs transition-colors"
                aria-label="Dismiss guide tip"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-200 leading-relaxed font-normal">
              Click the location button below to switch cities (e.g. <strong>Tokyo, London, Dubai</strong>) and watch the entire sky, time &amp; weather adapt live!
            </p>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  handleDismissGuideNote();
                  setIsOpen(true);
                }}
                className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-md transition-colors"
              >
                Try It Now ↗
              </button>
            </div>

            {/* Little pointer arrow */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-[#080d1a] border-r border-b border-blue-400/40 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Floating Ambient Status Chip (Click to open Location Switcher) */}
      <motion.button
        type="button"
        onClick={() => {
          if (showGuideNote) handleDismissGuideNote();
          setIsOpen(!isOpen);
        }}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="touch-target inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f1d]/90 hover:bg-[#131e3d] text-white font-sans text-xs sm:text-[13px] border border-white/25 hover:border-blue-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Open Worldwide Location Switcher"
        title="Click to test different world locations!"
      >
        {/* Location Pin */}
        <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
          <span className="text-blue-400 group-hover:scale-110 transition-transform">📍</span>
          <span className="font-semibold text-white tracking-tight">{displayLocation}</span>
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

        {/* Simulator / Live indicator */}
        {isSimulating ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 ml-1">
            CUSTOM
          </span>
        ) : (
          themeMode === 'system' && (
            <span className="relative flex h-2 w-2 ml-0.5" title="Live environment active">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          )
        )}
      </motion.button>

      {/* 2. Expanded Interactive Worldwide Location & Atmosphere Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-14 right-0 w-[340px] sm:w-[420px] max-h-[82vh] overflow-y-auto rounded-3xl bg-[#090d1c]/95 border border-white/20 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl text-white space-y-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🌍</span> Worldwide Live Weather
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Switch location &amp; watch the living sky adapt in real-time
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-zinc-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Current Active Environmental Telemetry Card */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Current Station:</span>
                <span className="font-semibold text-blue-400">{location}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[10px] text-zinc-400 block">TEMP</span>
                  <span className="text-sm font-bold text-white">{temperature !== null ? `${temperature}°C` : '--'}</span>
                </div>
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[10px] text-zinc-400 block">WIND</span>
                  <span className="text-sm font-bold text-cyan-300">{windSpeed} km/h</span>
                </div>
                <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-[10px] text-zinc-400 block">PHASE</span>
                  <span className="text-xs font-bold text-amber-300 capitalize">{timePhase}</span>
                </div>
              </div>
              <div className="text-[11px] text-zinc-300 text-center font-light pt-1">
                {icon} {weatherDescription} &bull; Local clock: <span className="font-mono font-bold text-white">{localTime}</span>
              </div>
            </div>

            {/* Live Global Search Input */}
            <form onSubmit={handleSearchSubmit} className="space-y-1.5">
              <label htmlFor="city-search" className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Search Any Global City / Country
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="city-search"
                  type="text"
                  placeholder="e.g. San Francisco, Berlin, Kyoto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-blue-400 font-sans"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  {isSearching ? '...' : 'Apply'}
                </button>
              </div>
            </form>

            {/* Worldwide Quick-Select Presets */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Popular Worldwide Stations
              </span>
              <div className="grid grid-cols-2 gap-2">
                {CITY_PRESETS.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => {
                      setCustomLocation(city.name, city.lat, city.lon, city.tz);
                      setIsOpen(false);
                    }}
                    className={`touch-target px-3 py-2 rounded-xl text-xs font-medium text-left border flex items-center justify-between transition-all cursor-pointer ${
                      location.toLowerCase().includes(city.name.toLowerCase())
                        ? 'bg-blue-600/30 border-blue-400/60 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    <span>{city.flag} {city.name}</span>
                    <span className="text-[10px] text-zinc-400">&rarr;</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reset to Auto Live Geolocation */}
            {isSimulating && (
              <button
                type="button"
                onClick={() => {
                  resetToLiveLocation();
                  setIsOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all text-center"
              >
                ↻ Reset to My Auto Live Location
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
