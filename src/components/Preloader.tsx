'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState } from '@/context/EnvironmentContext';

function getSkyAtmosphere(timePhase: TimePhase, weatherState: WeatherState, isDay: boolean) {
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';
  const isSunset = timePhase === 'sunset' || timePhase === 'goldenHour';
  const isDawn = timePhase === 'dawn';
  const isRain = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';

  if (isRain) {
    return isNight 
      ? 'linear-gradient(to bottom, #060a12 0%, #121a28 60%, #1a2538 100%)'
      : 'linear-gradient(to bottom, #4a6275 0%, #688298 60%, #899fb2 100%)';
  }

  if (isNight) {
    return 'linear-gradient(to bottom, #02040a 0%, #060e1f 50%, #0a1733 100%)';
  }
  if (isSunset) {
    return 'linear-gradient(to bottom, #3b1443 0%, #a83279 40%, #ff7e5f 80%, #feb47b 100%)';
  }
  if (isDawn) {
    return 'linear-gradient(to bottom, #15102a 0%, #684a75 45%, #ff7e5f 80%, #ffd2a0 100%)';
  }
  // Daytime
  return 'linear-gradient(to bottom, #115293 0%, #2980b9 45%, #6dd5fa 85%, #b2e8ff 100%)';
}

export default function Preloader() {
  const { timePhase, weatherState, isDay } = useEnvironment();
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Reduced motion preference: complete immediately with clean crossfade
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const t = setTimeout(() => setIsComplete(true), 400);
      return () => clearTimeout(t);
    }

    // Total descent sequence duration: ~3.4 seconds
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 3400);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted || isComplete) return null;

  const skyGradient = getSkyAtmosphere(timePhase, weatherState, isDay);
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';

  return (
    <AnimatePresence>
      <motion.div
        key="camera-descent-preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-0 z-[999999] overflow-hidden pointer-events-none select-none bg-[#030612]"
      >
        {/* ========================================================================= */}
        {/* 1. HIGH-ALTITUDE SKY DOME (Descends as camera falls toward earth)         */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ y: 0, scale: 1.35 }}
          animate={{ y: '-35%', scale: 1.05 }}
          transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: skyGradient }}
          className="absolute inset-0 w-full h-[150vh] origin-top"
        >
          {/* Celestial Sun / Moon Disk at high altitude */}
          <motion.div
            initial={{ scale: 1.3, y: 30, opacity: 0.95 }}
            animate={{ scale: 0.9, y: -60, opacity: 0.7 }}
            transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute rounded-full left-1/2 -translate-x-1/2 top-[18%]"
            style={{
              width: !isNight ? '160px' : '90px',
              height: !isNight ? '160px' : '90px',
              background: !isNight
                ? 'radial-gradient(circle, rgba(255,255,250,1) 0%, rgba(255,225,140,0.85) 40%, rgba(255,180,60,0.2) 75%, transparent 100%)'
                : 'radial-gradient(circle, rgba(245,250,255,1) 0%, rgba(200,225,255,0.7) 45%, transparent 75%)',
              boxShadow: !isNight
                ? '0 0 100px rgba(255,215,100,0.85), 0 0 200px rgba(255,160,50,0.45)'
                : '0 0 60px rgba(200,230,255,0.7)',
            }}
          />

          {/* High altitude stars (night) */}
          {isNight && (
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-40" />
          )}
        </motion.div>

        {/* ========================================================================= */}
        {/* 2. CLOUD DECKS PASSING THE CAMERA (Moving outward and upward)             */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 80 }}
          animate={{
            scale: [0.8, 1.4, 2.6],
            opacity: [0, 0.85, 0],
            y: [-20, -120, -280],
          }}
          transition={{ duration: 2.8, times: [0, 0.4, 1], ease: 'easeOut' }}
          className="absolute inset-x-0 top-1/4 w-full h-[60vh] flex items-center justify-center pointer-events-none"
        >
          <div 
            className="w-[120vw] h-[50vh] rounded-full filter blur-xl opacity-75"
            style={{
              background: !isNight 
                ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(240,248,255,0.6) 45%, transparent 75%)'
                : 'radial-gradient(ellipse at center, rgba(140,170,220,0.4) 0%, rgba(40,60,100,0.2) 45%, transparent 75%)',
            }}
          />
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. HERO GROUND SCENE REVEAL (Lands seamlessly into exact hero perspective)*/}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 1.28, y: 90 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/hero-lying.jpg"
            alt="Sai Santosh Madhari hero view landing"
            fill
            priority
            className="object-cover object-center sm:object-[center_35%]"
            quality={95}
          />

          {/* Sunlight flare hitting ground */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 14% 16%, rgba(255, 255, 235, 0.35) 0%, transparent 60%)'
            }}
          />
        </motion.div>

        {/* ========================================================================= */}
        {/* 4. MINIMAL WELCOME MESSAGE (Clean, subtle, softly animated)                */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: [0, 0.95, 0.95, 0],
              y: [14, 0, 0, -8],
            }}
            transition={{
              duration: 2.1,
              delay: 1.1,
              times: [0, 0.25, 0.8, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-sm sm:text-base md:text-lg text-white font-light tracking-wide drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] max-w-md font-sans"
          >
            Welcome to my portfolio. Hope you’ll like it.
          </motion.p>
        </div>

      </motion.div>
    </AnimatePresence>
  );
}
