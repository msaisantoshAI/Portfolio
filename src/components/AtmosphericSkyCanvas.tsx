'use client';

import React, { useEffect, useRef } from 'react';
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

// 95 Real Twinkling Stars
const CELESTIAL_STARS = Array.from({ length: 95 }, (_, i) => ({
  id: i,
  x: ((i * 41 + 13) % 98) + 1,
  y: ((i * 57 + 7) % 76) + 1,
  size: (i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : i % 2 === 0 ? 1.2 : 0.8),
  opacity: 0.35 + ((i * 19) % 60) / 100,
  duration: 1.8 + (i % 6) * 0.6,
  delay: (i % 8) * 0.4,
}));

export default function AtmosphericSkyCanvas() {
  const { 
    timePhase, 
    weatherState, 
    region,
    isDay, 
    cloudCover, 
    windSpeed, 
    isWindy,
    moonPosition
  } = useEnvironment();

  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
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

  // 60FPS Particles Simulation (Rain streaks, Snow, Lightning)
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

    const rainCount = isHeavy ? 70 : isRain ? 40 : 0;
    const rainDrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 26 + 16,
      speed: Math.random() * 8 + 15,
      opacity: Math.random() * 0.45 + 0.25,
    }));

    const snowCount = isSnow ? 50 : 0;
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
        ctx.lineWidth = isHeavy ? 1.5 : 1.1;

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
            lightningOpacity = 0.25;
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

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      
      {/* 1. REAL PHOTOREALISTIC SKY & CLOUDS BACKGROUND LAYER */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-x-0 -top-10 w-full h-[155vh] min-h-[1200px]"
      >
        <Image
          key={skyAsset}
          src={skyAsset}
          alt="Real Living Sky and Clouds"
          fill
          priority
          sizes="100vw"
          quality={95}
          className={`object-cover object-center transition-all duration-1000 ${
            isNight 
              ? 'brightness-[0.88] contrast-[1.08]' 
              : isSunset 
              ? 'brightness-[0.96] contrast-[1.12] saturate-[1.3]' 
              : isGoldenHour 
              ? 'brightness-[1.06] contrast-[1.08] saturate-[1.25]' 
              : isDawn 
              ? 'brightness-[0.98] contrast-[1.05] saturate-[1.15]' 
              : 'brightness-[1.08] contrast-[1.04]'
          }`}
        />
      </motion.div>

      {/* 2. Living Interactive Atmospheric Canvas (Clouds, Starfield, Dynamic Sky, Shooting Stars) */}
      <LivingAtmosphere isHero={false} />

      {/* 2. REAL-TIME ASTRONOMICAL MOVING SUN & MOON (Positioned accurately according to local clock) */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Sun orb removed per user preference - relying on natural photorealistic atmospheric sky textures */}

        {/* Dynamic Moon Orb with Lunar Craters & Silvery Moonbeams (Positioned at live moonPosition) */}
        {isNight && (
          <motion.div
            animate={{
              left: `${moonPosition.x}%`,
              top: `${moonPosition.y}%`,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '95px',
              height: '95px',
            }}
          >
            <div className="relative w-full h-full">
              <div 
                className="absolute inset-0 rounded-full border border-white/50 overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 45%, #94a3b8 80%, #64748b 100%)',
                  boxShadow: '0 0 50px rgba(210, 235, 255, 0.85), 0 0 110px rgba(120, 170, 255, 0.4)',
                }}
              >
                {/* Lunar Craters */}
                <div className="absolute top-3 left-4 w-5 h-5 rounded-full bg-slate-400/40 filter blur-[1px]" />
                <div className="absolute bottom-4 right-5 w-6 h-6 rounded-full bg-slate-500/35 filter blur-[1px]" />
                <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-slate-400/30 filter blur-[1px]" />
                <div className="absolute bottom-7 left-6 w-4 h-4 rounded-full bg-slate-400/25 filter blur-[1px]" />
              </div>
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(210,235,255,0.45)_0%,transparent_70%)]" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 3. TWINKLING REAL STARS LAYER (At Night) */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
          {CELESTIAL_STARS.map((star) => (
            <motion.div
              key={star.id}
              animate={{
                opacity: [star.opacity * 0.35, star.opacity, star.opacity * 0.35],
                scale: [0.85, 1.25, 0.85],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
                ease: 'easeInOut',
              }}
              className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95)]"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* 4. DYNAMIC WIND-DRIFTING NATURAL CLOUD VEIL */}
      {cloudCover > 20 && (
        <motion.div 
          animate={{
            x: ['-3%', '4%', '-3%'],
          }}
          transition={{
            duration: 48 / Math.max(0.6, windSpeed / 10),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-x-0 top-8 w-[135%] h-[340px] pointer-events-none"
          style={{
            opacity: Math.min(0.8, cloudCover / 100 + 0.1),
            background: !isNight
              ? 'radial-gradient(ellipse 70% 35% at 40% 35%, rgba(255, 255, 255, 0.7) 0%, rgba(240, 248, 255, 0.25) 45%, transparent 70%)'
              : 'radial-gradient(ellipse 70% 35% at 40% 35%, rgba(160, 195, 240, 0.3) 0%, rgba(40, 60, 100, 0.1) 45%, transparent 70%)'
          }}
        />
      )}

      {/* 5. Minimal Edge Canopy Foliage */}
      <motion.div
        animate={isWindy ? {
          rotate: [-0.8, 0.8, -0.8],
          x: ['-0.5%', '0.5%', '-0.5%'],
        } : {
          rotate: [-0.2, 0.2, -0.2],
          x: ['-0.2%', '0.2%', '-0.2%'],
        }}
        transition={{
          duration: isWindy ? 6 : 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ scale: foliageScale }}
        className="absolute inset-0 pointer-events-none origin-top-left opacity-35"
      >
        <div 
          className="absolute -top-10 -left-10 w-72 h-72 pointer-events-none"
          style={{
            background: isNight
              ? 'radial-gradient(ellipse at top left, rgba(6, 12, 24, 0.8) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at top left, rgba(20, 45, 30, 0.45) 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -top-10 -right-10 w-72 h-72 pointer-events-none"
          style={{
            background: isNight
              ? 'radial-gradient(ellipse at top right, rgba(6, 12, 24, 0.8) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at top right, rgba(20, 45, 30, 0.45) 0%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* 6. Active 60fps Particles (Rain, Snow, Lightning) */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* 7. Subtle Ambient Contrast Vignette */}
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
