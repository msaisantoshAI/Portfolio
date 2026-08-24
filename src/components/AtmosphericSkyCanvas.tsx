'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState, LocationRegion } from '@/context/EnvironmentContext';
import LivingAtmosphere from '@/components/LivingAtmosphere';

// Select authentic photorealistic sky photograph based on live Time, Weather & Region
function getPhotorealisticSkyAsset(timePhase: TimePhase, weatherState: WeatherState, region: LocationRegion, isDay: boolean): string {
  const isRain = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';

  if (isRain) {
    if (region === 'india') return '/images/locations/india-sky-rain.jpg';
    return '/images/locations/sky-rain.jpg';
  }

  if (!isDay || timePhase === 'night') {
    if (region === 'india') return '/images/locations/india-sky-night.jpg';
    if (region === 'europe') return '/images/locations/europe-sky-night.jpg';
    if (region === 'asia') return '/images/locations/asia-sky-night.jpg';
    if (region === 'us') return '/images/locations/us-sky-night.jpg';
    return '/images/locations/sky-night.jpg';
  }

  if (timePhase === 'sunset' || timePhase === 'twilight') {
    if (region === 'india') return '/images/locations/india-sky-sunset.jpg';
    if (region === 'europe') return '/images/locations/europe-sky-sunset.jpg';
    if (region === 'asia') return '/images/locations/asia-sky-sunset.jpg';
    if (region === 'us') return '/images/locations/us-sky-sunset.jpg';
    return '/images/locations/sky-sunset.jpg';
  }

  if (timePhase === 'goldenHour') {
    return '/images/locations/sky-golden.jpg';
  }

  if (timePhase === 'dawn') {
    return '/images/locations/sky-dawn.jpg';
  }

  if (timePhase === 'morning') {
    return '/images/locations/sky-morning.jpg';
  }

  // Afternoon / Day default
  if (region === 'india') return '/images/locations/india-sky-day.jpg';
  if (region === 'europe') return '/images/locations/europe-sky-day.jpg';
  if (region === 'asia') return '/images/locations/asia-sky-day.jpg';
  if (region === 'us') return '/images/locations/us-sky-day.jpg';
  return '/images/locations/sky-afternoon.jpg';
}

export default function AtmosphericSkyCanvas() {
  const { 
    timePhase, 
    weatherState, 
    region, 
    isDay, 
    isWindy,
    moonPosition
  } = useEnvironment();

  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-25%']);
  const foliageScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);

  const skyAsset = getPhotorealisticSkyAsset(timePhase, weatherState, region, isDay);
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';
  const isGoldenHour = timePhase === 'goldenHour';
  const isSunset = timePhase === 'sunset';
  const isDawn = timePhase === 'dawn';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none transition-colors duration-1000">
      
      {/* 1. Photorealistic Base Sky Layer with Scroll Parallax */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-x-0 -top-12 w-full h-[155vh] min-h-[1200px]"
      >
        <Image
          src={skyAsset}
          alt="Atmospheric Sky"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-top transition-opacity duration-1000"
        />

        {/* Dawn / Golden Hour / Sunset Ambient Lighting Overlays */}
        {isGoldenHour && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background: 'radial-gradient(ellipse at 35% 20%, rgba(255, 175, 55, 0.4) 0%, rgba(255, 120, 30, 0.15) 45%, transparent 75%)'
            }}
          />
        )}

        {isSunset && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background: 'linear-gradient(to top, rgba(90, 20, 110, 0.35) 0%, rgba(220, 60, 80, 0.25) 40%, rgba(255, 140, 50, 0.12) 70%, transparent 100%)'
            }}
          />
        )}

        {isDawn && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background: 'linear-gradient(to top, rgba(255, 130, 80, 0.28) 0%, rgba(255, 190, 120, 0.15) 35%, transparent 70%)'
            }}
          />
        )}
      </motion.div>

      {/* 2. Living Interactive Atmospheric Canvas */}
      <LivingAtmosphere isHero={false} />

      {/* 3. Moon Orb in Night Mode */}
      {isNight && (
        <motion.div
          animate={{
            left: `${moonPosition.x}%`,
            top: `${moonPosition.y}%`,
          }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '80px',
            height: '80px',
          }}
        >
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 rounded-full border border-white/50 overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 45%, #94a3b8 80%, #64748b 100%)',
                boxShadow: '0 0 45px rgba(210, 235, 255, 0.8), 0 0 90px rgba(120, 170, 255, 0.35)',
              }}
            />
            <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(210,235,255,0.35)_0%,transparent_70%)]" />
          </div>
        </motion.div>
      )}

      {/* 4. Natural Foreground Canopy Branches */}
      <motion.div
        animate={{
          rotate: [-0.2, 0.2, -0.2],
          x: ['-0.2%', '0.2%', '-0.2%'],
        }}
        transition={{
          duration: isWindy ? 6 : 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ scale: foliageScale }}
        className="absolute inset-0 pointer-events-none origin-top-left opacity-30"
      >
        <div 
          className="absolute -top-10 -left-10 w-72 h-72 pointer-events-none"
          style={{
            background: isNight
              ? 'radial-gradient(ellipse at top left, rgba(6, 12, 24, 0.8) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at top left, rgba(20, 45, 30, 0.4) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -top-10 -right-10 w-72 h-72 pointer-events-none"
          style={{
            background: isNight
              ? 'radial-gradient(ellipse at top right, rgba(6, 12, 24, 0.8) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at top right, rgba(20, 45, 30, 0.4) 0%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* 5. Subtle Ambient Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: isDay 
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 40%, rgba(0,0,0,0.08) 100%)' 
            : 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
}
