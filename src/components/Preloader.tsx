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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('complete');
      return;
    }

    // Storyboard Sequence: ENTER -> DISCOVER -> ADAPT -> AWAKEN -> LOOK UP -> REVEAL -> COMPLETE
    const t1 = setTimeout(() => setPhase('discover'), 900);
    const t2 = setTimeout(() => setPhase('adapt'), 2000);
    const t3 = setTimeout(() => setPhase('awaken'), 3200);
    const t4 = setTimeout(() => setPhase('lookup'), 4200);
    const t5 = setTimeout(() => setPhase('reveal'), 5500);
    const t6 = setTimeout(() => setPhase('complete'), 6500);

    return () => {
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
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-between p-6 sm:p-10 select-none pointer-events-auto overflow-hidden font-sans"
      >
        {/* ========================================================================= */}
        {/* 1. CINEMATIC ATMOSPHERIC BACKDROP (DISSOLVING FROM OBSIDIAN INTO SKY)      */}
        {/* ========================================================================= */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: phase === 'enter' ? 1 : phase === 'discover' ? 0.92 : phase === 'adapt' || phase === 'awaken' ? 0.7 : phase === 'lookup' ? 0.4 : 0 
          }}
          transition={{ duration: 1.0, ease: 'easeInOut' }}
          className={`absolute inset-0 z-0 transition-colors duration-1000 ${
            isNight 
              ? 'bg-[#030611]' 
              : isSunset 
              ? 'bg-[#150a18]' 
              : 'bg-[#050b18]'
          }`}
        >
          {/* Subtle atmospheric ambient starlight / depth noise */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
          
          {/* Dynamic Horizon Light Bloom during Discovery & Adaptation */}
          {(phase === 'adapt' || phase === 'awaken' || phase === 'lookup') && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1.1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isNight
                  ? 'radial-gradient(circle at 50% 60%, rgba(60, 100, 200, 0.25) 0%, transparent 70%)'
                  : isSunset
                  ? 'radial-gradient(circle at 50% 65%, rgba(255, 140, 50, 0.35) 0%, rgba(180, 50, 100, 0.2) 40%, transparent 75%)'
                  : 'radial-gradient(circle at 50% 40%, rgba(255, 255, 230, 0.4) 0%, rgba(100, 180, 255, 0.25) 45%, transparent 75%)'
              }}
            />
          )}
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. TOP BAR: DISCREET SKIP BUTTON & SUBTLE AMBIENT INDICATOR                */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full flex items-center justify-between pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3 }}
            className="text-[11px] font-mono tracking-widest uppercase text-white/50 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>Sai&apos;s World</span>
          </motion.div>

          <button
            type="button"
            onClick={() => setPhase('complete')}
            className="touch-target px-3 py-1.5 rounded-full text-xs font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 backdrop-blur-md transition-all cursor-pointer"
          >
            Skip Intro ↗
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. CENTER PROGRESSION PHASES                                              */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center max-w-xl mx-auto w-full px-4">
          
          {/* ----------------------------------------------------------------------- */}
          {/* SCREEN 1 — ENTER: Central Pulsing Light Point & Opening Perspective     */}
          {/* ----------------------------------------------------------------------- */}
          {phase === 'enter' && (
            <motion.div
              key="enter-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Tiny luminous point of light (the seed of perspective) */}
              <div className="relative flex items-center justify-center w-12 h-12">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.9] }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_24px_rgba(255,255,255,1),0_0_50px_rgba(100,180,255,0.8)]"
                />
                <motion.div 
                  animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute w-8 h-8 rounded-full border border-blue-300/30"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-zinc-300 font-light tracking-wide max-w-md"
              >
                Every experience begins with a new perspective.
              </motion.p>
            </motion.div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* SCREEN 2 — DISCOVER: Discovering the visitor's real world               */}
          {/* ----------------------------------------------------------------------- */}
          {phase === 'discover' && (
            <motion.div
              key="discover-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center animate-pulse">
                <span className="text-sm">🌐</span>
              </div>

              <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight">
                Discovering your world...
              </h2>
              <p className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
                Reading location &bull; atmosphere &bull; time
              </p>
            </motion.div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* SCREEN 3 — ADAPT: Environment adapts to visitor's location & weather   */}
          {/* ----------------------------------------------------------------------- */}
          {phase === 'adapt' && (
            <motion.div
              key="adapt-screen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Environmental Discovery Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-2xl shadow-xl">
                <span className="text-blue-400 font-semibold text-sm">📍 {location}</span>
                <span className="text-white/30">&bull;</span>
                <span className="text-amber-300 text-sm font-medium">{weatherIcon} {temperature !== null ? `${temperature}°C` : ''} {weatherDescription}</span>
                <span className="text-white/30">&bull;</span>
                <span className="text-white font-mono text-xs font-semibold">{localTime}</span>
              </div>

              <p className="text-sm text-zinc-200 font-light tracking-wide max-w-sm">
                Synchronizing atmosphere and daylight with your environment...
              </p>
            </motion.div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* SCREEN 4 — AWAKEN: The world is waking up                               */}
          {/* ----------------------------------------------------------------------- */}
          {phase === 'awaken' && (
            <motion.div
              key="awaken-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mb-2" />
              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-white/70">
                Awakening the experience...
              </p>
            </motion.div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* SCREEN 5 — LOOK UP: Signature moment with expansive editorial typography*/}
          {/* ----------------------------------------------------------------------- */}
          {phase === 'lookup' && (
            <motion.div
              key="lookup-screen"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.1 }}
                className="text-xs font-mono tracking-[0.3em] uppercase text-blue-300 mb-1"
              >
                SAI SANTOSH &bull; PORTFOLIO
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
              >
                LOOK UP.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.9, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base sm:text-lg text-zinc-200 font-light tracking-wide max-w-md mt-1"
              >
                There&apos;s a world worth exploring.
              </motion.p>
            </motion.div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM SUBTLE BRANDING & LIVE ENVIRONMENT CONTINUITY                   */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full flex items-center justify-between text-[11px] text-white/40 font-mono">
          <span>Product Designer &times; AI Builder</span>
          <span>{location} &bull; {localTime}</span>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
