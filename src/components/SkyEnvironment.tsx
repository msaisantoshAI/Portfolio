'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState, LocationRegion } from '@/context/EnvironmentContext';
import LiveClouds from '@/components/LiveClouds';
import TreeCanopy from '@/components/TreeCanopy';

// Crystal-clear sky mapping adapting purely to location & daylight time phase (NO WATER/RAIN DROPS)
function getAutoSkyImage(
  timePhase: TimePhase, 
  weatherState: WeatherState, 
  isDay: boolean,
  location: string,
  region: LocationRegion
): string {
  const locLower = (location || '').toLowerCase();
  const isHyderabad = locLower.includes('hyderabad');
  const isIndia = region === 'india' || locLower.includes('india') || locLower.includes('mumbai') || locLower.includes('delhi') || isHyderabad;
  const isUS = region === 'us' || locLower.includes('francisco') || locLower.includes('york') || locLower.includes('usa') || locLower.includes('california');
  const isEurope = region === 'europe' || locLower.includes('london') || locLower.includes('paris') || locLower.includes('berlin') || locLower.includes('europe');
  const isAsia = region === 'asia' || locLower.includes('tokyo') || locLower.includes('singapore') || locLower.includes('dubai') || locLower.includes('asia');

  // Location-specific pure sky mapping
  if (isHyderabad) {
    if (!isDay || timePhase === 'night') return '/images/locations/hyderabad-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/hyderabad-sunset.jpg';
    if (timePhase === 'dawn') return '/images/locations/sky-dawn.jpg';
    if (timePhase === 'morning') return '/images/locations/sky-morning.jpg';
    return '/images/locations/hyderabad-day.jpg';
  }

  if (isIndia) {
    if (!isDay || timePhase === 'night') return '/images/locations/india-sky-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/india-sky-sunset.jpg';
    if (timePhase === 'dawn') return '/images/locations/sky-dawn.jpg';
    if (timePhase === 'morning') return '/images/locations/sky-morning.jpg';
    return '/images/locations/india-sky-day.jpg';
  }

  if (isUS) {
    if (!isDay || timePhase === 'night') return '/images/locations/us-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/us-sunset.jpg';
    return '/images/locations/us-day.jpg';
  }

  if (isEurope) {
    if (!isDay || timePhase === 'night') return '/images/locations/europe-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/europe-sunset.jpg';
    return '/images/locations/europe-day.jpg';
  }

  if (isAsia) {
    if (!isDay || timePhase === 'night') return '/images/locations/asia-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/asia-sunset.jpg';
    return '/images/locations/asia-day.jpg';
  }

  // Global Time Phase Fallback
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
  const { themeMode, timePhase, weatherState, isDay, location, region, windSpeed } = useEnvironment();
  const { scrollYProgress } = useScroll();

  // Instantaneous spring-driven scroll tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  // Vertical scroll translation
  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-38%']);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Manual Modes vs Auto Mode
  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  // Compute Auto Sky Image URL with location & region awareness
  const autoSkyImageUrl = getAutoSkyImage(timePhase, weatherState, isDay, location, region);

  const isNight = !isDay || timePhase === 'night';
  const isSunset = timePhase === 'sunset';
  const isGoldenHour = timePhase === 'goldenHour';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: Clean Daytime Sky Image with Trees & Moving Clouds  */}
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

        {/* Live Clouds in Light Mode */}
        <LiveClouds weatherState="partlyCloudy" timePhase="afternoon" isDay={true} />

        {/* Moving Tree Canopy */}
        <TreeCanopy timePhase="afternoon" isDay={true} windSpeed={14} />
      </div>

      {/* ========================================================================= */}
      {/* 2. MANUAL DARK MODE: Starry Night Sky Image with Trees & Stars            */}
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

        {/* Live Clouds in Dark Mode */}
        <LiveClouds weatherState="clear" timePhase="night" isDay={false} />

        {/* Moving Tree Canopy in Night Mode */}
        <TreeCanopy timePhase="night" isDay={false} windSpeed={10} />
      </div>

      {/* ========================================================================= */}
      {/* 3. AUTO MODE: LIVE LOCATION-SPECIFIC SKY + CLOUDS + SWAYING CANOPY        */}
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

        {/* Night Stars Atmosphere in Auto Mode */}
        {isNight && (
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:36px_36px] opacity-40 pointer-events-none" />
        )}

        {/* Golden Hour Radiance in Auto Mode */}
        {isGoldenHour && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(circle at 20% 20%, rgba(255, 180, 40, 0.45) 0%, rgba(255, 120, 50, 0.2) 40%, transparent 75%)'
            }}
          />
        )}

        {/* Sunset Twilight Radiance in Auto Mode */}
        {isSunset && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              background: 'linear-gradient(to top, rgba(140, 30, 90, 0.4) 0%, rgba(255, 100, 60, 0.25) 45%, transparent 80%)'
            }}
          />
        )}

        {/* Dynamic Live Animated Clouds matching local weather and daylight */}
        <LiveClouds weatherState={weatherState} timePhase={timePhase} isDay={isDay} />

        {/* Living Swaying Tree Canopy framing the sky with scroll parallax and wind breeze */}
        <TreeCanopy timePhase={timePhase} isDay={isDay} windSpeed={windSpeed} />

        {/* Dynamic atmospheric lighting gradient */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: isDay 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)' 
              : 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)'
          }}
        />
      </div>

    </div>
  );
}
