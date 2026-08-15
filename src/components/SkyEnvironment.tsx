'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment } from '@/context/EnvironmentContext';
import WeatherCanvas from './WeatherCanvas';

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode, timePhase, weatherState, isDay } = useEnvironment();
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
  const cloudLayer1Y = useTransform(smoothProgress, [0, 1], ['0%', '-25%']);
  const cloudLayer2Y = useTransform(smoothProgress, [0, 1], ['0%', '-55%']);
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

  // Auto Mode Specific Time & Phase Visuals
  const isAutoDay = isAuto && isDay && (timePhase === 'morning' || timePhase === 'afternoon');
  const isAutoDawn = isAuto && timePhase === 'dawn';
  const isAutoGoldenHour = isAuto && timePhase === 'goldenHour';
  const isAutoSunset = isAuto && timePhase === 'sunset';
  const isAutoNight = isAuto && (!isDay || timePhase === 'night');

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: Keep user's chosen Day Sky Image                     */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualLight ? 'opacity-100' : 'opacity-0'
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
      {/* 2. MANUAL DARK MODE: Keep user's chosen Night Sky Image                    */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualDark ? 'opacity-100' : 'opacity-0'
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
      {/* 3. AUTO MODE: REAL, LOCATION-SPECIFIC DYNAMIC ATMOSPHERIC ENVIRONMENT      */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isAuto ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Base Dynamic Sky Canvas Gradients tailored to real-world location & time */}
        
        {/* A. Auto Daytime Clear Sky Base */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isAutoDay ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, #1d6ed8 0%, #3b88ee 35%, #70aeff 70%, #a4cdff 100%)'
          }}
        >
          {/* Dynamic Sun Flare & Natural Light Rays */}
          <div 
            className="absolute top-[8%] left-[20%] w-[500px] h-[500px] rounded-full opacity-65 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 245, 0.9) 0%, rgba(255, 235, 160, 0.4) 30%, rgba(255, 200, 100, 0.1) 60%, transparent 80%)',
              filter: 'blur(30px)'
            }}
          />
        </div>

        {/* B. Auto Dawn Morning Horizon Awakening */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isAutoDawn ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, #1b356e 0%, #385a9c 35%, #88658f 60%, #e07d67 85%, #fca464 100%)'
          }}
        >
          <div 
            className="absolute bottom-0 inset-x-0 h-[60%] opacity-70 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 100%, rgba(255, 170, 90, 0.6) 0%, rgba(240, 110, 80, 0.3) 40%, transparent 80%)'
            }}
          />
        </div>

        {/* C. Auto Golden Hour Amber Radiance */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isAutoGoldenHour ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, #2b5596 0%, #5d74a8 30%, #c48354 65%, #f19543 85%, #ffb861 100%)'
          }}
        >
          <div 
            className="absolute top-[12%] right-[15%] w-[650px] h-[650px] rounded-full opacity-70 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 240, 190, 0.85) 0%, rgba(255, 160, 50, 0.45) 35%, rgba(240, 90, 40, 0.15) 65%, transparent 80%)',
              filter: 'blur(35px)'
            }}
          />
        </div>

        {/* D. Auto Sunset Twilight Palette */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isAutoSunset ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, #09132c 0%, #1e1f4b 25%, #562758 50%, #9e3650 75%, #d85c42 90%, #f68c4a 100%)'
          }}
        />

        {/* E. Auto Real Night Celestial Cosmos */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isAutoNight ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 75% 15%, #0d1b3e 0%, #060e22 45%, #02050f 100%)'
          }}
        >
          {/* Luminous Moon */}
          <div 
            className="absolute top-[10%] right-[18%] w-[110px] h-[110px] rounded-full bg-[#f4f7ff] shadow-[0_0_60px_rgba(200,225,255,0.75),0_0_120px_rgba(100,160,255,0.3)] pointer-events-none"
          />
          {/* Twinkling Starfield */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(#a5c8ff_1.5px,transparent_1.5px)] [background-size:64px_64px] opacity-60" />
        </div>

        {/* Real Dynamic Layered Cloud Formations in Auto Mode */}
        <motion.div 
          style={{ y: cloudLayer1Y }}
          className="absolute inset-x-0 top-0 w-full h-[140vh] pointer-events-none opacity-45"
        >
          <div className="absolute top-[18%] left-[8%] w-[550px] h-[180px] rounded-full bg-white/40 dark:bg-white/10 blur-3xl animate-drift-slow" />
          <div className="absolute top-[48%] right-[10%] w-[680px] h-[220px] rounded-full bg-white/35 dark:bg-white/10 blur-3xl animate-drift-medium" />
        </motion.div>

        <motion.div 
          style={{ y: cloudLayer2Y }}
          className="absolute inset-x-0 top-0 w-full h-[140vh] pointer-events-none opacity-35"
        >
          <div className="absolute top-[32%] right-[25%] w-[420px] h-[140px] rounded-full bg-white/30 dark:bg-white/10 blur-2xl animate-drift-fast" />
          <div className="absolute top-[68%] left-[15%] w-[520px] h-[160px] rounded-full bg-white/25 dark:bg-white/10 blur-2xl animate-drift-slow" />
        </motion.div>

      </div>


      {/* ========================================================================= */}
      {/* 4. REAL WEATHER-SPECIFIC OVERLAYS (Rain, Storm, Fog, Overcast)           */}
      {/* ========================================================================= */}
      
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


      {/* ========================================================================= */}
      {/* 6. OCCASIONAL OVERHANGING CANOPY BRANCHES (Parallax Scroll)               */}
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
