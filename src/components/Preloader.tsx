'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

type CinematicPhase = 
  | 'above'       // Phase 1: High above the sky / clouds (0.0s - 0.8s)
  | 'descending'  // Phase 2: Descending through cloud strata (0.8s - 1.6s)
  | 'discovering' // Phase 3: Discovering live world & weather (1.6s - 2.4s)
  | 'breakthrough'// Phase 4 & 5: Breaking through clouds to ground & LOOK UP (2.4s - 3.4s)
  | 'landing'     // Phase 6: Landing directly into Sai's hero perspective (3.4s - 4.2s)
  | 'reveal'      // Phase 7: Reveal Sai Santosh & Designer title (4.2s - 4.8s)
  | 'complete';   // Phase 8: Seamless handover to interactive portfolio (4.8s+)

export default function Preloader() {
  const { 
    location, 
    country,
    localTime, 
    temperature, 
    weatherState, 
    isDay, 
    weatherDescription, 
    timePhase 
  } = useEnvironment();

  const [phase, setPhase] = useState<CinematicPhase>('above');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Reduced motion support: skip flight and enter directly
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('complete');
      return;
    }

    // Precise cinematic camera timeline (Total ~4.8s)
    const t1 = setTimeout(() => setPhase('descending'), 800);
    const t2 = setTimeout(() => setPhase('discovering'), 1600);
    const t3 = setTimeout(() => setPhase('breakthrough'), 2500);
    const t4 = setTimeout(() => setPhase('landing'), 3500);
    const t5 = setTimeout(() => setPhase('reveal'), 4200);
    const t6 = setTimeout(() => setPhase('complete'), 4900);

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
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';
  const isSunset = timePhase === 'sunset' || timePhase === 'goldenHour';
  const isDawn = timePhase === 'dawn';
  const displayLocation = country ? `${location}, ${country}` : location;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="cinematic-camera-flight"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[99999] bg-[#02050e] overflow-hidden select-none pointer-events-auto font-sans"
      >
        {/* ========================================================================= */}
        {/* 1. CINEMATIC CAMERA FLIGHT SCENE LAYERS (DESCENDING THROUGH SKY TO HERO)   */}
        {/* ========================================================================= */}

        {/* LAYER A: Stratospheric High Sky Dome */}
        <motion.div 
          initial={{ scale: 1.35, y: '-10%', opacity: 1 }}
          animate={{ 
            scale: (phase === 'landing' || phase === 'reveal') ? 1.0 : 1.25, 
            y: (phase === 'landing' || phase === 'reveal') ? '0%' : '-4%',
            opacity: (phase === 'landing' || phase === 'reveal') ? 0 : 1
          }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Stratospheric Sky Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: isNight
                ? 'linear-gradient(to bottom, #02040a 0%, #060e22 45%, #0e1a38 100%)'
                : isSunset
                ? 'linear-gradient(to bottom, #1a0822 0%, #5a1936 40%, #c44e38 75%, #f4a242 100%)'
                : isDawn
                ? 'linear-gradient(to bottom, #0d122b 0%, #2f254e 40%, #7d4465 75%, #ff8a65 100%)'
                : 'linear-gradient(to bottom, #0b3b70 0%, #1976d2 35%, #42a5f5 70%, #90caf9 100%)'
            }}
          />

          {/* Sun / Moon Orb */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 1.0 }}
            className="absolute top-[18%] left-[65%] w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: !isNight
                ? 'radial-gradient(circle, rgba(255,255,245,1) 0%, rgba(255,220,120,0.8) 40%, transparent 75%)'
                : 'radial-gradient(circle, rgba(240,248,255,1) 0%, rgba(180,210,255,0.7) 40%, transparent 75%)',
              boxShadow: !isNight 
                ? '0 0 80px rgba(255,210,80,0.8)' 
                : '0 0 60px rgba(180,220,255,0.6)'
            }}
          />
        </motion.div>

        {/* LAYER B: Passing Cloud Strata (Descending Perspective) */}
        {(phase === 'descending' || phase === 'discovering') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 0.85, 0.4], scale: [0.9, 1.4, 2.0] }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full pointer-events-none filter blur-sm"
          >
            <div 
              className="absolute inset-0"
              style={{
                background: isNight
                  ? 'radial-gradient(ellipse at 50% 50%, rgba(30, 45, 75, 0.7) 0%, transparent 65%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 65%)'
              }}
            />
          </motion.div>
        )}

        {/* LAYER C: Ground & Hero Target Scene (Lands directly into Sai in the grass) */}
        <motion.div
          initial={{ scale: 1.45, opacity: 0, filter: 'blur(8px)' }}
          animate={{
            scale: (phase === 'landing' || phase === 'reveal') ? 1.0 : (phase === 'breakthrough' ? 1.18 : 1.4),
            opacity: (phase === 'breakthrough' || phase === 'landing' || phase === 'reveal') ? 1 : 0,
            filter: (phase === 'landing' || phase === 'reveal') ? 'blur(0px)' : 'blur(4px)',
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/images/hero-lying.jpg"
            alt="Sai Santosh Madhari in the grass"
            fill
            priority
            className={`object-cover object-center sm:object-[center_35%] transition-all duration-1000 ${
              isNight 
                ? 'brightness-[0.62] contrast-[1.1] saturate-[0.92]' 
                : isSunset 
                ? 'brightness-[0.92] contrast-[1.06] saturate-[1.25]' 
                : 'brightness-[1.18] contrast-[1.02] saturate-[1.08]'
            }`}
            quality={95}
          />
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. CINEMATIC TEXT & HUD OVERLAYS                                          */}
        {/* ========================================================================= */}

        {/* Skip button on top right */}
        <div className="absolute top-6 right-6 z-30 pointer-events-auto">
          <button
            type="button"
            onClick={() => setPhase('complete')}
            className="touch-target px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/70 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            Skip Intro ↗
          </button>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto">

          {/* PHASE 1: ENTERING (0.0s - 0.8s) */}
          {phase === 'above' && (
            <motion.div
              key="phase-above"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping mb-1" />
              <span className="text-xs font-mono tracking-[0.35em] uppercase text-white/70 font-bold">
                ENTERING
              </span>
            </motion.div>
          )}

          {/* PHASE 2: DESCENDING (0.8s - 1.6s) */}
          {phase === 'descending' && (
            <motion.div
              key="phase-descending"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs font-mono tracking-[0.25em] uppercase text-blue-300 font-semibold">
                Descending through atmosphere...
              </span>
            </motion.div>
          )}

          {/* PHASE 3 & 4: DISCOVERING YOUR WORLD (1.6s - 2.4s) */}
          {phase === 'discovering' && (
            <motion.div
              key="phase-discovering"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-3.5"
            >
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-300 font-semibold">
                Discovering your world...
              </span>

              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#080d1a]/85 border border-white/25 backdrop-blur-2xl shadow-2xl">
                <span className="text-blue-400 font-bold text-sm">📍 {displayLocation}</span>
                <span className="text-white/30">&bull;</span>
                <span className="text-amber-300 text-sm font-semibold">{weatherIcon} {temperature !== null ? `${temperature}°C` : ''} {weatherDescription}</span>
                <span className="text-white/30">&bull;</span>
                <span className="text-white font-mono text-xs font-bold">{localTime}</span>
              </div>
            </motion.div>
          )}

          {/* PHASE 5: BREAK THROUGH & LOOK UP (2.4s - 3.4s) */}
          {phase === 'breakthrough' && (
            <motion.div
              key="phase-breakthrough"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-300 font-bold mb-1">
                Almost there...
              </span>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                LOOK UP.
              </h1>
            </motion.div>
          )}

          {/* PHASE 6 & 7: LANDING & REVEAL (3.4s - 4.8s) */}
          {(phase === 'landing' || phase === 'reveal') && (
            <motion.div
              key="phase-reveal"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                SAI SANTOSH
              </h2>
              <p className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-200 font-semibold">
                PRODUCT DESIGNER &times; AI BUILDER
              </p>
            </motion.div>
          )}

        </div>

      </motion.div>
    </AnimatePresence>
  );
}
