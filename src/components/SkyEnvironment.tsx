'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, LocationRegion, TimePhase, WeatherState } from '@/context/EnvironmentContext';
import WeatherCanvas from './WeatherCanvas';

// Real-world location & time-adaptive pure sky & cloud photography mapping
function getLocationSkyImage(region: LocationRegion, timePhase: TimePhase, weatherState: WeatherState, isDay: boolean): string {
  // 1. Rain or Thunderstorm Weather
  if (weatherState === 'rain' || weatherState === 'thunderstorm') {
    if (region === 'india') return '/images/locations/india-sky-rain.jpg';
    if (region === 'us') return '/images/locations/india-sky-rain.jpg';
    return '/images/locations/india-sky-rain.jpg';
  }

  // 2. INDIA / HYDERABAD SKIES
  if (region === 'india') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/india-sky-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/india-sky-night.jpg';
    // Daytime
    return '/images/locations/india-sky-day.jpg';
  }

  // 3. UNITED STATES / AMERICAS SKIES
  if (region === 'us') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/us-sky-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/us-sky-night.jpg';
    // Daytime
    return '/images/locations/us-sky-day.jpg';
  }

  // 4. EUROPE / UK SKIES
  if (region === 'europe') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/europe-sky-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/europe-sky-night.jpg';
    // Daytime
    return '/images/locations/europe-sky-day.jpg';
  }

  // 5. ASIA / EAST ASIA SKIES
  if (region === 'asia') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/asia-sky-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/asia-sky-night.jpg';
    // Daytime
    return '/images/locations/asia-sky-day.jpg';
  }

  // 6. GLOBAL FALLBACK
  if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/india-sky-sunset.jpg';
  if (!isDay || timePhase === 'night') return '/images/sky-night.png';
  return '/images/sky-day.png';
}

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode, timePhase, weatherState, isDay, region, location } = useEnvironment();
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

  // Compute Location-Specific Sky Image URL
  const autoSkyImageUrl = getLocationSkyImage(region, timePhase, weatherState, isDay);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: User's chosen Day Sky Image                          */}
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
        
        {/* Soft sunlight zenith bloom */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 15% 12%, rgba(255, 255, 240, 0.35) 0%, rgba(255, 235, 170, 0.12) 30%, transparent 65%)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. MANUAL DARK MODE: User's chosen Night Sky Image                         */}
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
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.2) 0%, rgba(50, 90, 180, 0.08) 35%, transparent 65%)'
          }}
        />
      </div>


      {/* ========================================================================= */}
      {/* 3. AUTO MODE: LOCATION-SPECIFIC PURE SKY & CLOUD LIVING PHOTOGRAPHY        */}
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
            alt={`Live ${location} sky and clouds`}
            fill
            priority
            className="object-cover object-top transition-opacity duration-1000"
            sizes="100vw"
            quality={92}
          />
        </motion.div>

        {/* Crisp natural contrast gradient without blurring the sky */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: isDay 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)' 
              : 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>


      {/* ========================================================================= */}
      {/* 4. REAL WEATHER-SPECIFIC PARTICLES (Rain, Snow, Lightning Glow Canvas)    */}
      {/* ========================================================================= */}
      
      {/* Live Canvas Particles */}
      <WeatherCanvas weatherState={weatherState} isDay={isDay} />

    </div>
  );
}
