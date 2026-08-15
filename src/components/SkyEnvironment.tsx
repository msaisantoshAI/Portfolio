'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState, LocationRegion } from '@/context/EnvironmentContext';

// Resolve exact real-time photographic sky image for any location and solar phase
function getLocationSkyImage(
  region: LocationRegion,
  location: string,
  timePhase: TimePhase,
  weatherState: WeatherState,
  isDay: boolean
): string {
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';
  const isRain = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';
  const locLower = location.toLowerCase();

  // 1. HYDERABAD SPECIFIC
  if (locLower.includes('hyderabad')) {
    if (isRain) return '/images/locations/hyderabad-rain.jpg';
    if (isNight) return '/images/locations/hyderabad-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/hyderabad-sunset.jpg';
    return '/images/locations/hyderabad-day.jpg';
  }

  // 2. INDIA REGION (Mumbai, Bengaluru, Delhi, etc.)
  if (region === 'india' || locLower.includes('india') || locLower.includes('mumbai') || locLower.includes('bengaluru')) {
    if (isRain) return '/images/locations/india-sky-rain.jpg';
    if (isNight) return '/images/locations/india-sky-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/india-sky-sunset.jpg';
    if (timePhase === 'dawn') return '/images/locations/sky-dawn.jpg';
    return '/images/locations/india-sky-day.jpg';
  }

  // 3. US / NORTH AMERICA (New York, San Francisco, Toronto, etc.)
  if (region === 'us' || locLower.includes('york') || locLower.includes('francisco') || locLower.includes('states') || locLower.includes('usa') || locLower.includes('toronto')) {
    if (isNight) return '/images/locations/us-sky-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/us-sky-sunset.jpg';
    return '/images/locations/us-sky-day.jpg';
  }

  // 4. EUROPE (London, Paris, Reykjavik, Berlin, etc.)
  if (region === 'europe' || locLower.includes('london') || locLower.includes('paris') || locLower.includes('reykjavik')) {
    if (isNight) return '/images/locations/europe-sky-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/europe-sky-sunset.jpg';
    return '/images/locations/europe-sky-day.jpg';
  }

  // 5. ASIA (Tokyo, Singapore, Dubai, etc.)
  if (region === 'asia' || locLower.includes('tokyo') || locLower.includes('singapore') || locLower.includes('dubai')) {
    if (isNight) return '/images/locations/asia-sky-night.jpg';
    if (timePhase === 'sunset' || timePhase === 'goldenHour') return '/images/locations/asia-sky-sunset.jpg';
    return '/images/locations/asia-sky-day.jpg';
  }

  // 6. GLOBAL DEFAULT REAL-TIME SKY PHASES
  if (isRain) return '/images/locations/sky-rain.jpg';
  if (isNight) return '/images/locations/sky-night.jpg';
  if (timePhase === 'sunset') return '/images/locations/sky-sunset.jpg';
  if (timePhase === 'goldenHour') return '/images/locations/sky-golden.jpg';
  if (timePhase === 'dawn') return '/images/locations/sky-dawn.jpg';
  if (timePhase === 'morning') return '/images/locations/sky-morning.jpg';
  return '/images/locations/sky-afternoon.jpg';
}

export default function SkyEnvironment() {
  const [mounted, setMounted] = useState(false);
  const { 
    themeMode, 
    location, 
    region, 
    timePhase, 
    weatherState, 
    isDay, 
    windSpeed, 
    isWindy 
  } = useEnvironment();

  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-35%']);
  const canopyScale = useTransform(smoothProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 60FPS Weather Particle Engine (Rain, Snow, Lightning)
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isRain = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';
    const isHeavy = weatherState === 'heavyRain' || weatherState === 'thunderstorm';
    const isSnow = weatherState === 'snow';

    const rainCount = isHeavy ? 65 : isRain ? 35 : 0;
    const rainDrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 24 + 14,
      speed: Math.random() * 8 + 14,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    const snowCount = isSnow ? 45 : 0;
    const snowflakes = Array.from({ length: snowCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.5 + 0.35,
      oscillation: Math.random() * Math.PI * 2,
    }));

    let lightningOpacity = 0;
    let nextLightningTime = Date.now() + Math.random() * 9000 + 7000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rain
      if (isRain) {
        ctx.strokeStyle = isDay ? 'rgba(255, 255, 255, 0.45)' : 'rgba(190, 225, 255, 0.4)';
        ctx.lineWidth = isHeavy ? 1.4 : 1.0;

        for (const drop of rainDrops) {
          ctx.beginPath();
          ctx.globalAlpha = drop.opacity;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - (windSpeed / 7), drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x -= (windSpeed / 10);

          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
          if (drop.x < 0) drop.x = width;
        }

        // Thunderstorm lightning
        if (weatherState === 'thunderstorm') {
          const now = Date.now();
          if (now > nextLightningTime) {
            lightningOpacity = 0.22;
            nextLightningTime = now + Math.random() * 14000 + 8000;
          }
          if (lightningOpacity > 0.01) {
            ctx.fillStyle = `rgba(230, 245, 255, ${lightningOpacity})`;
            ctx.fillRect(0, 0, width, height);
            lightningOpacity *= 0.88;
          }
        }
      }

      // Snow
      if (isSnow) {
        ctx.fillStyle = '#ffffff';
        for (const flake of snowflakes) {
          ctx.beginPath();
          ctx.globalAlpha = flake.opacity;
          flake.oscillation += 0.02;
          const currentX = flake.x + Math.sin(flake.oscillation) * 1.5;
          ctx.arc(currentX, flake.y, flake.radius, 0, Math.PI * 2);
          ctx.fill();

          flake.y += flake.speedY;
          flake.x += flake.speedX;

          if (flake.y > height) {
            flake.y = -10;
            flake.x = Math.random() * width;
          }
          if (flake.x > width) flake.x = 0;
          if (flake.x < 0) flake.x = width;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [weatherState, isDay, windSpeed]);

  if (!mounted) return null;

  const isManualLight = themeMode === 'light';
  const isManualDark = themeMode === 'dark';
  const isAuto = themeMode === 'system';

  // Environmental time phases for Auto mode
  const autoSkyImage = getLocationSkyImage(region, location, timePhase, weatherState, isDay);
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';
  const isSunset = timePhase === 'sunset';
  const isGoldenHour = timePhase === 'goldenHour';
  const isDawn = timePhase === 'dawn';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none transition-colors duration-1000">
      
      {/* ========================================================================= */}
      {/* 1. MANUAL LIGHT MODE: Photorealistic Day Sky Image & Upward Trees         */}
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
      {/* 3. AUTO MODE: REAL-TIME LIVING LOCATION SKY & ATMOSPHERE                  */}
      {/* ========================================================================= */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isAuto ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dynamic Wind Sway & Spring Parallax Wrapper */}
        <motion.div 
          animate={isWindy ? {
            rotate: [-0.6, 0.6, -0.6],
            x: ['-0.6%', '0.6%', '-0.6%'],
          } : {
            rotate: [-0.2, 0.2, -0.2],
            x: ['-0.2%', '0.2%', '-0.2%'],
          }}
          transition={{
            duration: isWindy ? 6 : 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ y: skyY, scale: canopyScale }}
          className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px] origin-top"
        >
          <Image
            src={autoSkyImage}
            alt={`Real-time sky of ${location}`}
            fill
            priority
            className={`object-cover object-top transition-all duration-1000 ${
              isSunset 
                ? 'brightness-[0.94] contrast-[1.08] saturate-[1.3]' 
                : isGoldenHour 
                ? 'brightness-[1.05] contrast-[1.05] saturate-[1.25]' 
                : isDawn 
                ? 'brightness-[0.95] contrast-[1.03] saturate-[1.1]' 
                : 'brightness-[1.05] contrast-[1.02]'
            }`}
            sizes="100vw"
            quality={95}
          />
        </motion.div>

        {/* ------------------------------------------------------------------- */}
        {/* ATMOSPHERIC SOLAR LIGHTING FILTERS                                  */}
        {/* ------------------------------------------------------------------- */}

        {/* Daytime Sun Flare */}
        {!isNight && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-40"
            style={{
              background: 'radial-gradient(circle at 20% 16%, rgba(255, 255, 240, 0.45) 0%, rgba(255, 235, 170, 0.18) 30%, transparent 65%)'
            }}
          />
        )}

        {/* Golden Hour Warm Amber Sunlight */}
        {isGoldenHour && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-75"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 170, 40, 0.35) 0%, rgba(255, 110, 50, 0.2) 45%, transparent 75%)'
            }}
          />
        )}

        {/* Sunset Twilight Crimson Tint */}
        {isSunset && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-80"
            style={{
              background: 'linear-gradient(to top, rgba(90, 20, 110, 0.45) 0%, rgba(230, 70, 70, 0.3) 35%, rgba(255, 140, 40, 0.2) 65%, transparent 100%)'
            }}
          />
        )}

        {/* Dawn Rose Horizon */}
        {isDawn && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-70"
            style={{
              background: 'linear-gradient(to top, rgba(255, 120, 80, 0.3) 0%, rgba(255, 190, 130, 0.15) 35%, transparent 70%)'
            }}
          />
        )}

        {/* Night Starfield Texture & Moon Halo */}
        {isNight && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-85"
            style={{
              background: 'radial-gradient(circle at 82% 14%, rgba(180, 220, 255, 0.25) 0%, rgba(30, 60, 140, 0.15) 35%, transparent 70%)'
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-35" />
          </div>
        )}

        {/* Active Weather Particles (Rain, Snow, Lightning) */}
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Contrast Readability Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            background: isDay 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)' 
              : 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)'
          }}
        />
      </div>

    </div>
  );
}
