'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState } from '@/context/EnvironmentContext';

// Atmospheric celestial sky gradient generator based on live local time & weather
function getAtmosphericSky(timePhase: TimePhase, weatherState: WeatherState, isDay: boolean) {
  const isOvercast = weatherState === 'cloudy' || weatherState === 'rain' || weatherState === 'thunderstorm';
  const isStorm = weatherState === 'thunderstorm';
  const isRain = weatherState === 'rain';

  if (isStorm) {
    return {
      gradient: 'linear-gradient(to top, #1c2331 0%, #2e384d 30%, #121722 75%, #090c12 100%)',
      ambientGlow: 'rgba(100, 140, 200, 0.25)',
      sunMoonPos: { x: '50%', y: '30%', opacity: 0.15 },
    };
  }

  if (isRain || isOvercast) {
    if (!isDay || timePhase === 'night') {
      return {
        gradient: 'linear-gradient(to top, #0f1422 0%, #1a2236 40%, #0d121d 80%, #06090f 100%)',
        ambientGlow: 'rgba(70, 100, 160, 0.2)',
        sunMoonPos: { x: '80%', y: '20%', opacity: 0.2 },
      };
    }
    return {
      gradient: 'linear-gradient(to top, #9bb5c9 0%, #7697b0 35%, #4c6e8d 70%, #2a435c 100%)',
      ambientGlow: 'rgba(210, 230, 255, 0.35)',
      sunMoonPos: { x: '25%', y: '20%', opacity: 0.4 },
    };
  }

  // Clear or Partly Cloudy Solar Phases
  switch (timePhase) {
    case 'dawn':
      return {
        gradient: 'linear-gradient(to top, #ff7e5f 0%, #feb47b 20%, #8b687f 45%, #3d2f57 75%, #15102a 100%)',
        ambientGlow: 'radial-gradient(circle at 20% 75%, rgba(255, 140, 90, 0.6) 0%, transparent 60%)',
        sunMoonPos: { x: '20%', y: '70%', opacity: 0.85, isSun: true },
      };
    case 'morning':
      return {
        gradient: 'linear-gradient(to top, #89f7fe 0%, #66a6ff 35%, #2980b9 70%, #1a4a6e 100%)',
        ambientGlow: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 240, 0.65) 0%, transparent 60%)',
        sunMoonPos: { x: '25%', y: '25%', opacity: 0.95, isSun: true },
      };
    case 'afternoon':
      return {
        gradient: 'linear-gradient(to top, #4facfe 0%, #00f2fe 15%, #1976d2 55%, #0d47a1 85%, #062254 100%)',
        ambientGlow: 'radial-gradient(circle at 50% 15%, rgba(255, 255, 245, 0.7) 0%, transparent 65%)',
        sunMoonPos: { x: '50%', y: '15%', opacity: 1, isSun: true },
      };
    case 'goldenHour':
      return {
        gradient: 'linear-gradient(to top, #f12711 0%, #f5af19 30%, #b85d19 55%, #4a1942 80%, #12071f 100%)',
        ambientGlow: 'radial-gradient(circle at 75% 65%, rgba(255, 170, 50, 0.75) 0%, transparent 65%)',
        sunMoonPos: { x: '75%', y: '60%', opacity: 0.95, isSun: true },
      };
    case 'sunset':
      return {
        gradient: 'linear-gradient(to top, #ff4e50 0%, #f9d423 20%, #a83279 50%, #3b1443 75%, #0c0414 100%)',
        ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(255, 90, 60, 0.7) 0%, transparent 60%)',
        sunMoonPos: { x: '80%', y: '78%', opacity: 0.85, isSun: true },
      };
    case 'night':
    default:
      return {
        gradient: 'linear-gradient(to top, #050811 0%, #0a1329 35%, #060d1e 70%, #02040a 100%)',
        ambientGlow: 'radial-gradient(circle at 82% 18%, rgba(180, 220, 255, 0.3) 0%, transparent 60%)',
        sunMoonPos: { x: '82%', y: '18%', opacity: 0.9, isSun: false },
      };
  }
}

// Generate deterministic starry sky coordinates for night mode
const STAR_COUNT = 65;
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: ((i * 37 + 13) % 100),
  y: ((i * 53 + 7) % 75), // Top 75% of sky
  size: (i % 3 === 0 ? 2.5 : i % 2 === 0 ? 1.8 : 1.2),
  opacity: 0.35 + ((i * 17) % 60) / 100,
  delay: (i % 5) * 0.7,
  duration: 2.5 + (i % 4) * 0.8,
}));

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { themeMode, timePhase, weatherState, isDay, isWindy } = useEnvironment();
  const { scrollYProgress } = useScroll();

  // Instantaneous spring-driven scroll tracking for smooth parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  // Vertical scroll translation (gliding through the sky dome)
  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-35%']);
  const canopyScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Manual Modes vs Auto Mode
  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  // Compute live procedural atmospheric sky for Auto mode
  const atmosphericSky = getAtmosphericSky(timePhase, weatherState, isDay);
  const isNight = !isDay || timePhase === 'night';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: Photorealistic Day Sky Image & Canopy Trees         */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualLight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div 
          style={{ y: skyY, scale: canopyScale }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-day.png"
            alt="Manual Daytime Sky with Trees looking up"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={95}
          />
        </motion.div>
        
        {/* Soft sunlight zenith warmth */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 18% 14%, rgba(255, 255, 240, 0.4) 0%, rgba(255, 235, 170, 0.15) 30%, transparent 65%)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. MANUAL DARK MODE: Photorealistic Night Sky Image & Stars               */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isManualDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <motion.div 
          style={{ y: skyY, scale: canopyScale }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
        >
          <Image
            src="/images/sky-night.png"
            alt="Manual Night Sky with Stars and Trees looking up"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
            quality={95}
          />
        </motion.div>

        {/* Twinkling Starlight Halo */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.25) 0%, rgba(50, 90, 180, 0.1) 35%, transparent 65%)'
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. AUTO MODE: LIVING PROCEDURAL WEATHER & CELESTIAL DOME (0 STATIC IMAGES) */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isAuto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dynamic Celestial Sky Dome */}
        <motion.div 
          animate={isWindy ? {
            x: ['-0.8%', '0.8%', '-0.8%'],
          } : {
            x: ['-0.2%', '0.2%', '-0.2%'],
          }}
          transition={{
            duration: isWindy ? 6 : 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ 
            y: skyY,
            background: atmosphericSky.gradient,
          }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px] transition-all duration-1000"
        >
          {/* Ambient Celestial Glow (Sun / Moon / Twilight horizon) */}
          <div 
            className="absolute inset-0 transition-all duration-1000 pointer-events-none"
            style={{ background: atmosphericSky.ambientGlow }}
          />

          {/* Sun / Moon Celestial Body Orb */}
          <div
            className="absolute rounded-full pointer-events-none transition-all duration-1000"
            style={{
              left: atmosphericSky.sunMoonPos.x,
              top: atmosphericSky.sunMoonPos.y,
              transform: 'translate(-50%, -50%)',
              width: atmosphericSky.sunMoonPos.isSun ? '140px' : '90px',
              height: atmosphericSky.sunMoonPos.isSun ? '140px' : '90px',
              opacity: atmosphericSky.sunMoonPos.opacity,
              background: atmosphericSky.sunMoonPos.isSun
                ? 'radial-gradient(circle, rgba(255,255,245,1) 0%, rgba(255,225,140,0.8) 35%, rgba(255,180,50,0.3) 65%, transparent 100%)'
                : 'radial-gradient(circle, rgba(240,248,255,1) 0%, rgba(200,225,255,0.7) 40%, rgba(100,160,255,0.2) 75%, transparent 100%)',
              boxShadow: atmosphericSky.sunMoonPos.isSun
                ? '0 0 80px rgba(255, 215, 100, 0.8), 0 0 160px rgba(255, 160, 50, 0.4)'
                : '0 0 50px rgba(200, 230, 255, 0.7), 0 0 100px rgba(100, 160, 255, 0.3)',
            }}
          />

          {/* Twinkling Star Field (When Night in Auto Mode) */}
          {isNight && (
            <div className="absolute inset-0 pointer-events-none">
              {STARS.map((star) => (
                <motion.div
                  key={star.id}
                  animate={{
                    opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
                    scale: [0.85, 1.25, 0.85],
                  }}
                  transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: 'easeInOut',
                  }}
                  className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                  }}
                />
              ))}

              {/* Faint Cosmic Milky Way Nebula Texture */}
              <div 
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(130, 170, 255, 0.25) 0%, rgba(70, 40, 120, 0.15) 50%, transparent 80%)'
                }}
              />
            </div>
          )}

          {/* Atmospheric Horizon Depth Diffusion */}
          <div 
            className="absolute bottom-0 inset-x-0 h-[35vh] pointer-events-none"
            style={{
              background: isNight
                ? 'linear-gradient(to top, rgba(3, 5, 12, 0.75) 0%, transparent 100%)'
                : 'linear-gradient(to top, rgba(255, 255, 255, 0.25) 0%, transparent 100%)'
            }}
          />
        </motion.div>

        {/* Global Readability Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: isDay 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 40%, rgba(0,0,0,0.12) 100%)' 
              : 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>

    </div>
  );
}
