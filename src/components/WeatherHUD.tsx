'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment, WeatherState, TimePhase } from '@/context/EnvironmentContext';

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

const CITY_PRESETS = [
  { name: 'Hyderabad', flag: '🇮🇳', lat: 17.385, lon: 78.4867, tz: 'Asia/Kolkata' },
  { name: 'San Francisco', flag: '🇺🇸', lat: 37.7749, lon: -122.4194, tz: 'America/Los_Angeles' },
  { name: 'New York', flag: '🇺🇸', lat: 40.7128, lon: -74.006, tz: 'America/New_York' },
  { name: 'London', flag: '🇬🇧', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { name: 'Tokyo', flag: '🇯🇵', lat: 35.6762, lon: 139.6503, tz: 'Asia/Tokyo' },
  { name: 'Paris', flag: '🇫🇷', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { name: 'Dubai', flag: '🇦🇪', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai' },
  { name: 'Sydney', flag: '🇦🇺', lat: -33.8688, lon: 151.2093, tz: 'Australia/Sydney' },
];

const TIME_PHASES: { id: TimePhase; label: string; icon: string; timeHint: string }[] = [
  { id: 'dawn', label: 'Dawn', icon: '🌅', timeHint: '6:00 AM' },
  { id: 'morning', label: 'Morning', icon: '☀️', timeHint: '9:30 AM' },
  { id: 'afternoon', label: 'Afternoon', icon: '🌤️', timeHint: '2:00 PM' },
  { id: 'goldenHour', label: 'Golden Hour', icon: '🌇', timeHint: '5:45 PM' },
  { id: 'sunset', label: 'Sunset', icon: '🌆', timeHint: '6:45 PM' },
  { id: 'night', label: 'Night', icon: '🌌', timeHint: '11:30 PM' },
];

export default function WeatherHUD() {
  const { 
    location, 
    localTime, 
    temperature, 
    weatherState, 
    isDay, 
    weatherDescription, 
    themeMode, 
    timePhase,
    isSimulating,
    setCustomLocation,
    setTimePhaseOverride,
    setWeatherOverride,
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

  if (!localTime) return null;

  const icon = getWeatherIcon(weatherState, isDay);

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
      
      {/* 1. Floating Ambient Status Chip (Click to open Playground) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="touch-target inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f1d]/90 hover:bg-[#131e3d] text-white font-sans text-xs sm:text-[13px] border border-white/20 hover:border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Open Interactive Location and Environment Simulator"
        title="Click to test different world locations & skies!"
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

        {/* Simulator / Live indicator */}
        {isSimulating ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 ml-1">
            TESTING
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

      {/* 2. Interactive World Playground Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-full right-0 mb-2 w-[340px] sm:w-[400px] p-4 rounded-3xl bg-[#080d1a]/95 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-left overflow-hidden text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>🌍</span> World Environment Simulator
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {location} &bull; {weatherDescription} &bull; {timePhase} phase
                </p>
              </div>

              {isSimulating && (
                <button
                  type="button"
                  onClick={resetToLiveLocation}
                  className="touch-target px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 hover:bg-white/20 text-zinc-200 border border-white/20 transition-all"
                  title="Reset to your real local time & city"
                >
                  ↺ Reset
                </button>
              )}
            </div>

            {/* City Search Input */}
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type any city (e.g., Tokyo, London, Paris)..."
                  className="w-full pl-3.5 pr-16 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-[11px] font-semibold text-white transition-all"
                >
                  {isSearching ? '...' : 'Go'}
                </button>
              </div>
            </form>

            {/* Quick Location Preset Pills */}
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1.5">
                Quick Worldwide Locations:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {CITY_PRESETS.map((city) => {
                  const isSelected = location.toLowerCase().includes(city.name.toLowerCase());
                  return (
                    <button
                      key={city.name}
                      type="button"
                      onClick={() => setCustomLocation(city.name, city.lat, city.lon, city.tz)}
                      className={`p-1.5 rounded-xl text-center text-xs font-medium border transition-all flex flex-col items-center gap-0.5 ${
                        isSelected 
                          ? 'bg-blue-600/30 border-blue-400 text-white shadow-sm' 
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                      }`}
                    >
                      <span className="text-sm">{city.flag}</span>
                      <span className="text-[10px] truncate max-w-full font-semibold">{city.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time-Travel & Sky Phase Preview */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                  Time of Day / Sky Phase:
                </span>
                <span className="text-[10px] font-semibold text-blue-400 capitalize">
                  Current: {timePhase}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {TIME_PHASES.map((phase) => {
                  const isSelected = timePhase === phase.id;
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setTimePhaseOverride(phase.id)}
                      className={`p-2 rounded-xl text-left border transition-all flex flex-col ${
                        isSelected 
                          ? 'bg-blue-600/30 border-blue-400 text-white shadow-sm' 
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{phase.icon}</span>
                        <span className="text-[9px] text-zinc-400">{phase.timeHint}</span>
                      </div>
                      <span className="text-xs font-semibold mt-1">{phase.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Weather Condition Simulation */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1.5">
                Weather Simulation:
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWeatherOverride(null)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    weatherState !== 'rain' 
                      ? 'bg-blue-600/25 border-blue-400 text-white' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                  }`}
                >
                  ☀️ Clear Sky
                </button>
                <button
                  type="button"
                  onClick={() => setWeatherOverride('rain')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    weatherState === 'rain' 
                      ? 'bg-blue-600/25 border-blue-400 text-white' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300'
                  }`}
                >
                  🌧️ Monsoon Rain
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
