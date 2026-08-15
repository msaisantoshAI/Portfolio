'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, LocationRegion, TimePhase, WeatherState } from '@/context/EnvironmentContext';
import WeatherCanvas from './WeatherCanvas';

// Real-world location & time-adaptive photographic sky mapping
function getLocationImage(region: LocationRegion, timePhase: TimePhase, weatherState: WeatherState, isDay: boolean): string {
  // If it's actively raining or thunderstorming
  if (weatherState === 'rain' || weatherState === 'thunderstorm') {
    if (region === 'india') return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop';
    if (region === 'us') return 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=2000&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000&auto=format&fit=crop';
  }

  // 1. INDIA / HYDERABAD
  if (region === 'india') {
    if (timePhase === 'dawn') return 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2000&auto=format&fit=crop';
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return 'https://images.unsplash.com/photo-1590447158019-883d8d5f8bc7?q=80&w=2000&auto=format&fit=crop';
    if (!isDay || timePhase === 'night') return 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2000&auto=format&fit=crop';
    // Daytime
    return 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?q=80&w=2000&auto=format&fit=crop';
  }

  // 2. UNITED STATES / AMERICAS
  if (region === 'us') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000&auto=format&fit=crop';
    if (!isDay || timePhase === 'night') return 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2000&auto=format&fit=crop';
    // Daytime
    return 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=2000&auto=format&fit=crop';
  }

  // 3. EUROPE / UK
  if (region === 'europe') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop';
    if (!isDay || timePhase === 'night') return 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=2000&auto=format&fit=crop';
    // Daytime
    return 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop';
  }

  // 4. ASIA / EAST ASIA
  if (region === 'asia') {
    if (timePhase === 'goldenHour' || timePhase === 'sunset') return 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop';
    if (!isDay || timePhase === 'night') return 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2000&auto=format&fit=crop';
    // Daytime
    return 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop';
  }

  // 5. GLOBAL FALLBACK
  if (timePhase === 'goldenHour' || timePhase === 'sunset') return 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?q=80&w=2000&auto=format&fit=crop';
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

  // Manual Modes
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
            quality={90}
          />
        </motion.div>
        
        {/* Soft sunlight zenith bloom */}
        <div 
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 15% 12%, rgba(255, 255, 240, 0.4) 0%, rgba(255, 235, 170, 0.15) 30%, transparent 65%)'
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
            quality={90}
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
            quality={90}
          />
        </motion.div>

        {/* Subtle atmospheric zenith depth based on day/night */}
        {isDay ? (
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 20% 15%, rgba(255, 255, 240, 0.35) 0%, transparent 65%)'
            }}
          />
        ) : (
          <div 
            className="absolute inset-0 opacity-45 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 80% 15%, rgba(180, 210, 255, 0.25) 0%, rgba(5, 10, 25, 0.3) 50%, transparent 80%)'
            }}
          />
        )}
      </div>


      {/* ========================================================================= */}
      {/* 4. REAL WEATHER-SPECIFIC PARTICLES & ATMOSPHERE (Canvas Layer)            */}
      {/* ========================================================================= */}
      
      {/* Overcast / Cloudy Diffused Atmosphere */}
      {(weatherState === 'cloudy' || weatherState === 'partlyCloudy') && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            weatherState === 'cloudy' ? 'opacity-35' : 'opacity-15'
          } bg-slate-900/30`}
        />
      )}

      {/* Fog / Mist Layer */}
      {weatherState === 'fog' && (
        <div className="absolute inset-0 pointer-events-none opacity-45 bg-slate-100/30 dark:bg-slate-900/30 backdrop-blur-[1px] transition-opacity duration-1000">
          <div className="absolute top-[25%] -left-[10%] w-[120vw] h-[250px] bg-white/25 dark:bg-white/10 blur-3xl animate-drift-slow" />
          <div className="absolute top-[55%] -left-[10%] w-[120vw] h-[300px] bg-white/20 dark:bg-white/10 blur-3xl animate-drift-medium" />
        </div>
      )}

      {/* Storm / Rain Mood Atmosphere */}
      {(weatherState === 'rain' || weatherState === 'thunderstorm') && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            weatherState === 'thunderstorm' ? 'opacity-50' : 'opacity-30'
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
