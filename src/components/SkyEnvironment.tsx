'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';
import WeatherCanvas from './WeatherCanvas';

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode, timePhase, weatherState, isDay, effectiveTheme } = useEnvironment();
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

  // Determine whether to display daytime or nighttime sky asset
  const showDaySky = effectiveTheme === 'light' || (themeMode === 'system' && (timePhase === 'morning' || timePhase === 'afternoon' || timePhase === 'dawn' || timePhase === 'goldenHour'));
  const showNightSky = !showDaySky;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================= */}
      {/* 1. DAYTIME SKY (Panoramic Day Sky Image + Parallax)       */}
      {/* ========================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showDaySky ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div 
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-day.png"
            alt="Sunny blue sky background"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
        
        {/* Daytime Sunlight Zenith Bloom */}
        <div 
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 15% 12%, rgba(255, 255, 240, 0.4) 0%, rgba(255, 235, 170, 0.15) 30%, transparent 65%)'
          }}
        />
      </div>

      {/* ========================================================= */}
      {/* 2. NIGHTTIME SKY (Panoramic Night Sky Image + Parallax)   */}
      {/* ========================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showNightSky ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <motion.div 
          style={{ y: skyY }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-night.png"
            alt="Starry night sky background with moon"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={90}
          />
        </motion.div>

        {/* Night Moon & Galaxy Aura */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.2) 0%, rgba(50, 90, 180, 0.08) 35%, transparent 65%)'
          }}
        />
      </div>


      {/* ========================================================= */}
      {/* 3. TIME-PHASE ATMOSPHERIC COLOR TINTS (Dawn, Golden, Dusk) */}
      {/* ========================================================= */}
      
      {/* Dawn / Sunrise Rose-Gold Horizon Glow */}
      {themeMode === 'system' && timePhase === 'dawn' && (
        <div 
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none opacity-60"
          style={{
            background: 'linear-gradient(to top, rgba(255, 130, 80, 0.45) 0%, rgba(255, 190, 120, 0.2) 30%, transparent 70%)'
          }}
        />
      )}

      {/* Golden Hour Warm Amber Glow */}
      {themeMode === 'system' && timePhase === 'goldenHour' && (
        <div 
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none opacity-65"
          style={{
            background: 'radial-gradient(circle at 85% 20%, rgba(255, 170, 40, 0.5) 0%, rgba(255, 110, 50, 0.25) 40%, transparent 75%)'
          }}
        />
      )}

      {/* Sunset Twilight Crimson/Violet Gradient */}
      {themeMode === 'system' && timePhase === 'sunset' && (
        <div 
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none opacity-70"
          style={{
            background: 'linear-gradient(to top, rgba(90, 20, 110, 0.5) 0%, rgba(200, 60, 80, 0.35) 30%, rgba(255, 140, 50, 0.2) 60%, transparent 100%)'
          }}
        />
      )}


      {/* ========================================================= */}
      {/* 4. WEATHER-SPECIFIC ATMOSPHERIC OVERLAYS                   */}
      {/* ========================================================= */}
      
      {/* Overcast / Cloudy Diffused Atmosphere */}
      {(weatherState === 'cloudy' || weatherState === 'partlyCloudy') && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            weatherState === 'cloudy' ? 'opacity-40' : 'opacity-20'
          } bg-slate-900/30`}
        />
      )}

      {/* Fog / Mist Layer */}
      {weatherState === 'fog' && (
        <div className="absolute inset-0 pointer-events-none opacity-50 bg-slate-100/40 dark:bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-1000">
          <div className="absolute top-[25%] -left-[10%] w-[120vw] h-[250px] bg-white/30 dark:bg-white/10 blur-3xl animate-drift-slow" />
          <div className="absolute top-[55%] -left-[10%] w-[120vw] h-[300px] bg-white/25 dark:bg-white/10 blur-3xl animate-drift-medium" />
        </div>
      )}

      {/* Storm / Rain Mood Atmosphere */}
      {(weatherState === 'rain' || weatherState === 'thunderstorm') && (
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            weatherState === 'thunderstorm' ? 'opacity-55' : 'opacity-35'
          } bg-slate-950/40`}
        />
      )}

      {/* 5. Live Canvas Particles (Rain / Snow / Thunderstorm Glow) */}
      <WeatherCanvas weatherState={weatherState} isDay={isDay} />


      {/* ========================================================= */}
      {/* 6. OCCASIONAL OVERHANGING CANOPY BRANCHES (Parallax Scroll) */}
      {/* ========================================================= */}
      
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

      {/* Volumetric ambient cloud drift highlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[60vw] max-w-[700px] h-[220px] rounded-full bg-white/20 dark:bg-blue-400/5 blur-3xl animate-drift-slow" />
        <div className="absolute top-[60%] -right-[10%] w-[65vw] max-w-[750px] h-[240px] rounded-full bg-white/15 dark:bg-blue-400/5 blur-3xl animate-drift-medium" />
      </div>

    </div>
  );
}
