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
    themeMode,
    location, 
    country,
    localTime, 
    temperature, 
    weatherState, 
    isDay, 
    isSimulating,
    setCustomLocation,
    resetToLiveLocation
  } = useEnvironment();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Weather HUD only appears when user is in AUTO mode
  if (themeMode !== 'system' || !localTime) return null;

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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 font-sans pointer-events-auto select-none" ref={modalRef}>
      
      {/* 1. Small Sleek Weather & Location Icon Button in Right Corner (Auto Mode only) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="touch-target relative flex items-center justify-center gap-1.5 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full bg-white/90 dark:bg-[#28282B]/95 hover:bg-white dark:hover:bg-[#333338] text-zinc-900 dark:text-white font-sans text-xs font-semibold border border-black/10 dark:border-white/15 shadow-sm backdrop-blur-2xl transition-all group focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-white cursor-pointer"
        aria-label="Open Worldwide Location & Weather Switcher"
        title={`Live Location: ${displayLocation} • Click to change cities & sky!`}
      >
        <span className="text-base group-hover:scale-110 transition-transform">
          {icon}
        </span>
        <span className="text-xs font-bold text-zinc-800 dark:text-white max-w-[80px] sm:max-w-[100px] truncate">
          {location}
        </span>
        {temperature !== null && (
          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            {temperature}°
          </span>
        )}

        {/* Live indicator dot */}
        <span className="relative flex h-2 w-2 ml-0.5">
          {isSimulating ? (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400" />
          ) : (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </>
          )}
        </span>
      </motion.button>

      {/* 2. Interactive Worldwide Location & Atmosphere Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute bottom-14 right-0 w-[280px] sm:w-[320px] max-h-[75vh] overflow-y-auto rounded-3xl bg-white/95 dark:bg-[#28282B]/98 border border-black/10 dark:border-white/15 p-4 shadow-lg backdrop-blur-3xl text-zinc-900 dark:text-white space-y-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-2.5">
              <div>
                <h4 className="text-xs font-bold flex items-center gap-1.5 text-zinc-900 dark:text-white">
                  <span>🌍</span> Worldwide Live Sky
                </h4>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  Switch city to adapt sky &amp; atmosphere live
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-[10px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Current Active Station Box */}
            <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-950 dark:text-white flex items-center gap-1.5">
                <span>{icon}</span>
                <span>{location}</span>
              </span>
              <span className="font-mono font-bold text-zinc-800 dark:text-white text-[11px]">
                {temperature !== null ? `${temperature}°C` : ''} &bull; {localTime}
              </span>
            </div>

            {/* Live Search Input */}
            <form onSubmit={handleSearchSubmit} className="space-y-1">
              <label htmlFor="city-search-input" className="text-[9px] font-mono uppercase font-bold tracking-wider text-zinc-400 block">
                Search Global City
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  id="city-search-input"
                  type="text"
                  placeholder="e.g. Tokyo, London, Paris..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-950 dark:border-white font-sans"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-3 py-1.5 rounded-xl bg-zinc-950 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 text-xs font-semibold text-white dark:text-zinc-950 transition-colors cursor-pointer"
                >
                  {isSearching ? '...' : 'Apply'}
                </button>
              </div>
            </form>

            {/* Popular Worldwide Stations - NO ARROWS */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-zinc-400 block">
                Popular Stations
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
                    className={`touch-target px-2.5 py-1.5 rounded-xl text-xs font-medium text-left border flex items-center justify-between transition-all cursor-pointer ${
                      location.toLowerCase().includes(city.name.toLowerCase())
                        ? 'bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-bold border-zinc-950 dark:border-white shadow-xs'
                        : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/15 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    <span>{city.flag} {city.name}</span>
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
                className="w-full py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-bold transition-all text-center cursor-pointer"
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
