'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, LocationRegion, TimePhase, WeatherState } from '@/context/EnvironmentContext';
import WeatherCanvas from './WeatherCanvas';

// Real-world location & time-adaptive local photographic sky mapping
function getLocationImage(region: LocationRegion, timePhase: TimePhase, weatherState: WeatherState, isDay: boolean): string {
  // If it's actively raining or thunderstorming
  if (weatherState === 'rain' || weatherState === 'thunderstorm') {
    if (region === 'india') return '/images/locations/hyderabad-rain.jpg';
    if (region === 'us') return '/images/locations/us-day.jpg';
    return '/images/locations/hyderabad-rain.jpg';
  }

  // 1. INDIA / HYDERABAD
  if (region === 'india') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/hyderabad-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/hyderabad-night.jpg';
    // Daytime
    return '/images/locations/hyderabad-day.jpg';
  }

  // 2. UNITED STATES / AMERICAS
  if (region === 'us') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/us-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/us-night.jpg';
    // Daytime
    return '/images/locations/us-day.jpg';
  }

  // 3. EUROPE / UK
  if (region === 'europe') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/europe-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/europe-night.jpg';
    // Daytime
    return '/images/locations/europe-day.jpg';
  }

  // 4. ASIA / EAST ASIA
  if (region === 'asia') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/asia-sunset.jpg';
    if (!isDay || timePhase === 'night') return '/images/locations/asia-night.jpg';
    // Daytime
    return '/images/locations/asia-day.jpg';
  }

  // 5. GLOBAL FALLBACK
  if (timePhase === 'goldenHour' || timePhase === 'sunset') return '/images/locations/hyderabad-sunset.jpg';
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
  const treeTopLeftY = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0, -60, -140, -220]);
  const treeTopRightY = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, -90, -180, -280]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Manual Modes vs Auto Mode
  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  // Compute Auto Image URL
  const autoImageUrl = getLocationImage(region, timePhase, weatherState, isDay);

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
      {/* 3. AUTO MODE: REAL, CRISP LOCATION-SPECIFIC PHOTOGRAPHIC SKY & SKYLINE     */}
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
            key={autoImageUrl}
            src={autoImageUrl}
            alt={`Live ${location} sky environment`}
            fill
            priority
            className="object-cover object-top transition-opacity duration-1000"
            sizes="100vw"
            quality={92}
          />
        </motion.div>

        {/* Subtle contrast gradient for foreground readability without blurring image */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: isDay 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)' 
              : 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)'
          }}
        />
      </div>


      {/* ========================================================================= */}
      {/* 4. REAL WEATHER-SPECIFIC PARTICLES & ATMOSPHERE (Canvas Layer)            */}
      {/* ========================================================================= */}
      
      {/* Overcast / Cloudy Diffused Atmosphere */}
      {(weatherState === 'cloudy' || weatherState === 'partlyCloudy') && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            weatherState === 'cloudy' ? 'opacity-30' : 'opacity-15'
          } bg-slate-900/20`}
        />
      )}

      {/* Fog / Mist Layer */}
      {weatherState === 'fog' && (
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-slate-100/20 dark:bg-slate-900/20 transition-opacity duration-1000">
          <div className="absolute top-[25%] -left-[10%] w-[120vw] h-[250px] bg-white/20 dark:bg-white/10 blur-2xl animate-drift-slow" />
          <div className="absolute top-[55%] -left-[10%] w-[120vw] h-[300px] bg-white/15 dark:bg-white/10 blur-2xl animate-drift-medium" />
        </div>
      )}

      {/* Storm / Rain Mood Atmosphere */}
      {(weatherState === 'rain' || weatherState === 'thunderstorm') && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            weatherState === 'thunderstorm' ? 'opacity-40' : 'opacity-25'
          } bg-slate-950/30`}
        />
      )}

      {/* Live Canvas Particles (Rain / Snow / Thunderstorm Glow) */}
      <WeatherCanvas weatherState={weatherState} isDay={isDay} />


      {/* ========================================================================= */}
      {/* 5. OCCASIONAL OVERHANGING CANOPY BRANCHES (Parallax Scroll)               */}
      {/* ========================================================================= */}
      
      {/* Top-Left Tree Branch Canopy */}
      <motion.div 
        style={{ y: treeTopLeftY }}
        className="absolute -top-12 -left-12 sm:-left-6 w-[340px] sm:w-[480px] md:w-[580px] h-auto pointer-events-none opacity-85 dark:opacity-75 transition-opacity duration-700"
      >
        <svg 
          viewBox="0 0 600 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        >
          <path 
            d="M -20,-20 Q 80,60 160,110 Q 240,160 360,190 Q 260,130 190,70 Q 120,20 -20,-20 Z" 
            className="fill-[#1b2b1a] dark:fill-[#060a05] transition-colors duration-1000"
          />
          <path 
            d="M 120,80 Q 180,160 260,220 Q 320,270 410,310 Q 310,250 230,180 Q 160,120 120,80 Z" 
            className="fill-[#162515] dark:fill-[#040804] transition-colors duration-1000"
          />
          <g className="transition-colors duration-1000">
            <ellipse cx="180" cy="90" rx="65" ry="45" transform="rotate(-15 180 90)" className="fill-[#2b5625]/85 dark:fill-[#081207]/90" />
            <ellipse cx="220" cy="115" rx="75" ry="50" transform="rotate(10 220 115)" className="fill-[#34662d]/80 dark:fill-[#0b180a]/90" />
            <ellipse cx="320" cy="180" rx="85" ry="55" transform="rotate(25 320 180)" className="fill-[#264c21]/85 dark:fill-[#081207]/90" />
            <ellipse cx="370" cy="195" rx="75" ry="48" transform="rotate(-10 370 195)" className="fill-[#32612b]/80 dark:fill-[#0b180a]/90" />
            <ellipse cx="440" cy="240" rx="70" ry="45" transform="rotate(-20 440 240)" className="fill-[#22431d]/85 dark:fill-[#070e06]/90" />
          </g>
        </svg>
      </motion.div>

      {/* Top-Right Delicate Canopy Branch */}
      <motion.div 
        style={{ y: treeTopRightY }}
        className="absolute -top-8 -right-10 sm:-right-4 w-[280px] sm:w-[400px] md:w-[480px] h-auto pointer-events-none opacity-85 dark:opacity-75 transition-opacity duration-700"
      >
        <svg 
          viewBox="0 0 500 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
        >
          <path 
            d="M 520,-20 Q 420,50 330,90 Q 230,130 120,150 Q 210,110 310,60 Q 410,15 520,-20 Z" 
            className="fill-[#1b2b1a] dark:fill-[#060a05] transition-colors duration-1000"
          />
          <g className="transition-colors duration-1000">
            <ellipse cx="280" cy="100" rx="70" ry="48" transform="rotate(20 280 100)" className="fill-[#285022]/85 dark:fill-[#070f06]/90" />
            <ellipse cx="240" cy="120" rx="65" ry="42" transform="rotate(-15 240 120)" className="fill-[#34662d]/80 dark:fill-[#0a1609]/90" />
            <ellipse cx="180" cy="155" rx="60" ry="40" transform="rotate(10 180 155)" className="fill-[#2b5625]/85 dark:fill-[#081207]/90" />
            <ellipse cx="130" cy="190" rx="55" ry="38" transform="rotate(-25 130 190)" className="fill-[#366c30]/80 dark:fill-[#0b180a]/90" />
          </g>
        </svg>
      </motion.div>

    </div>
  );
}
