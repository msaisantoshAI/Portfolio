'use client';

import React, { useState, useEffect } from 'react';
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

type EntryPhase = 'enter' | 'discover' | 'adapt' | 'awaken' | 'lookup' | 'reveal' | 'complete';

export default function Preloader() {
  const { 
    location, 
    localTime, 
    temperature, 
    weatherState, 
    isDay, 
    weatherDescription, 
    timePhase 
  } = useEnvironment();

  const [phase, setPhase] = useState<EntryPhase>('enter');
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('complete');
      return;
    }

    // Smooth percentage progress counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(100, prev + 2);
      });
    }, 55);

    // Fast, crisp progression phases (~3 seconds total)
    const t1 = setTimeout(() => setPhase('discover'), 500);
    const t2 = setTimeout(() => setPhase('adapt'), 1100);
    const t3 = setTimeout(() => setPhase('awaken'), 1800);
    const t4 = setTimeout(() => setPhase('lookup'), 2300);
    const t5 = setTimeout(() => setPhase('reveal'), 2900);
    const t6 = setTimeout(() => setPhase('complete'), 3400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  if (!isMounted || phase === 'complete') return null;

  const weatherIcon = getWeatherIcon(weatherState, isDay);
  const isNight = !isDay || timePhase === 'night';
  const isSunset = timePhase === 'sunset' || timePhase === 'goldenHour';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="world-entry-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#030612] flex flex-col items-center justify-between p-6 sm:p-10 select-none pointer-events-auto overflow-hidden font-sans"
      >
        {/* ========================================================================= */}
        {/* 1. SOLID OBSIDIAN BACKDROP WITH ATMOSPHERIC BLOOM                         */}
        {/* ========================================================================= */}
        <div 
          className={`absolute inset-0 z-0 transition-colors duration-700 ${
            isNight 
              ? 'bg-[#02050e]' 
              : isSunset 
              ? 'bg-[#0e0714]' 
              : 'bg-[#030714]'
          }`}
        >
          {/* Ambient Starlight Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px] opacity-25" />
          
          {/* Horizon Light Bloom */}
          {(phase === 'adapt' || phase === 'awaken' || phase === 'lookup') && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.7, scale: 1.1 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isNight
                  ? 'radial-gradient(circle at 50% 60%, rgba(60, 100, 200, 0.3) 0%, transparent 70%)'
                  : isSunset
                  ? 'radial-gradient(circle at 50% 65%, rgba(255, 140, 50, 0.4) 0%, rgba(180, 50, 100, 0.25) 40%, transparent 75%)'
                  : 'radial-gradient(circle at 50% 40%, rgba(255, 255, 230, 0.45) 0%, rgba(100, 180, 255, 0.3) 45%, transparent 75%)'
              }}
            />
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP BAR: SKIP BUTTON & BRANDING                                        */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full flex items-center justify-between pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.15 }}
            className="text-[11px] font-mono tracking-widest uppercase text-white/70 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Sai&apos;s World</span>
          </motion.div>

          <button
            type="button"
            onClick={() => setPhase('complete')}
            className="touch-target px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            Skip ↗
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. CENTER PROGRESSION PHASES & CENTER LOADING BAR                         */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full px-4 space-y-8">
          
          <div className="min-h-[140px] flex items-center justify-center w-full">
            {/* SCREEN 1 — ENTER */}
            {phase === 'enter' && (
              <motion.div
                key="enter-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative flex items-center justify-center w-12 h-12">
                  <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,1),0_0_50px_rgba(100,180,255,0.9)]" />
                </div>
                <p className="text-base text-zinc-200 font-light tracking-wide">
                  Every experience begins with a new perspective.
                </p>
              </motion.div>
            )}

            {/* SCREEN 2 — DISCOVER */}
            {phase === 'discover' && (
              <motion.div
                key="discover-screen"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Discovering your world...
                </h2>
                <p className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
                  Reading location &bull; atmosphere &bull; time
                </p>
              </motion.div>
            )}

            {/* SCREEN 3 — ADAPT */}
            {phase === 'adapt' && (
              <motion.div
                key="adapt-screen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 border border-white/25 backdrop-blur-2xl shadow-2xl">
                  <span className="text-blue-400 font-bold text-sm">📍 {location}</span>
                  <span className="text-white/30">&bull;</span>
                  <span className="text-amber-300 text-sm font-semibold">{weatherIcon} {temperature !== null ? `${temperature}°C` : ''} {weatherDescription}</span>
                  <span className="text-white/30">&bull;</span>
                  <span className="text-white font-mono text-xs font-bold">{localTime}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 font-light">
                  Synchronizing atmosphere and daylight with your environment
                </p>
              </motion.div>
            )}

            {/* SCREEN 4 — AWAKEN */}
            {phase === 'awaken' && (
              <motion.div
                key="awaken-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mb-1" />
                <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white/90 font-bold">
                  Awakening the living canvas...
                </p>
              </motion.div>
            )}

            {/* SCREEN 5 — LOOK UP */}
            {phase === 'lookup' && (
              <motion.div
                key="lookup-screen"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]">
                  LOOK UP.
                </h1>
                <p className="text-sm sm:text-base text-zinc-200 font-light tracking-wide">
                  There&apos;s a world worth exploring.
                </p>
              </motion.div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* CENTERED PROGRESS BAR WITH PERCENTAGE COUNTER                              */}
          {/* ========================================================================= */}
          <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center gap-2">
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden border border-white/10 p-0.5 shadow-inner">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-zinc-400 px-0.5">
              <span>INITIALIZING SYSTEM</span>
              <span className="text-blue-400 font-bold">{progress}%</span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM BAR                                                             */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full flex items-center justify-between text-xs text-white/50 font-mono">
          <span>Product Designer &times; AI Builder</span>
          <span>{location} &bull; {localTime}</span>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
