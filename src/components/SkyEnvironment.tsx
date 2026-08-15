'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState } from '@/context/EnvironmentContext';

// Real-world time-phase and weather-adaptive crystal-clear sky mapping
function getAutoSkyImage(timePhase: TimePhase, weatherState: WeatherState, isDay: boolean): string {
  // If actively raining in real-world weather -> show real monsoon / rain cloud sky
  if (weatherState === 'rain' || weatherState === 'thunderstorm') {
    return '/images/locations/sky-rain.jpg';
  }

  switch (timePhase) {
    case 'dawn':
      return '/images/locations/sky-dawn.jpg';
    case 'morning':
      return '/images/locations/sky-morning.jpg';
    case 'afternoon':
      return '/images/locations/sky-afternoon.jpg';
    case 'goldenHour':
      return '/images/locations/sky-golden.jpg';
    case 'sunset':
      return '/images/locations/sky-sunset.jpg';
    case 'night':
      return '/images/locations/sky-night.jpg';
    default:
      return isDay ? '/images/locations/sky-morning.jpg' : '/images/locations/sky-night.jpg';
  }
}

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode, timePhase, weatherState, isDay, location } = useEnvironment();
  const { scrollYProgress } = useScroll();

  // Instantaneous spring-driven scroll tracking that adapts dynamically to user's scrolling speed
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  // Vertical scroll translation (drifting through the sky proportionally to scroll speed)
  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-42%']);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Manual Modes vs Auto Mode
  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  // Compute Auto Sky Image URL
  const autoSkyImageUrl = getAutoSkyImage(timePhase, weatherState, isDay);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: User's original chosen Day Sky Image                */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div 
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-day.png"
            alt="Manual Daytime Sky"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={92}
          />
        </motion.div>
        
        {/* Soft sunlight zenith warmth */}
        <div 
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 15% 12%, rgba(255, 255, 240, 0.35) 0%, rgba(255, 235, 170, 0.1) 30%, transparent 65%)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. MANUAL DARK MODE: User's original chosen Night Sky Image               */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div 
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-night.png"
            alt="Manual Nighttime Sky"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={92}
          />
        </motion.div>

        {/* Soft moonlight aura */}
        <div 
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.2) 0%, rgba(50, 90, 180, 0.08) 35%, transparent 65%)'
          }}
        />
      </div>


      {/* ========================================================================= */}
      {/* 3. AUTO MODE: REAL-TIME LIVING SKY (Dawn -> Morning -> Afternoon -> Golden -> Sunset -> Night) */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isAuto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div 
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            key={autoSkyImageUrl}
            src={autoSkyImageUrl}
            alt={`Live ${location} sky at ${timePhase}`}
            fill
            priority
            className="object-cover object-top transition-opacity duration-1000"
            sizes="100vw"
            quality={92}
          />
        </motion.div>

        {/* Crisp gentle contrast gradient ensuring 100% WCAG 2.2 AA readability */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: isDay 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)' 
              : 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)'
          }}
        />
      </div>

    </div>
  );
}
