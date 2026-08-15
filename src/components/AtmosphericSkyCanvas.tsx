'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState } from '@/context/EnvironmentContext';

// Atmospheric Sky Color Profiles with vibrant, rich saturation
function getAtmosphericSkyConfig(timePhase: TimePhase, weatherState: WeatherState, isDay: boolean) {
  const isStorm = weatherState === 'thunderstorm';
  const isHeavyRain = weatherState === 'heavyRain';
  const isRain = weatherState === 'rain';
  const isOvercast = weatherState === 'cloudy';
  const isFog = weatherState === 'fog';
  const isSnow = weatherState === 'snow';

  // 1. STORMY / HEAVY RAIN
  if (isStorm || isHeavyRain) {
    return {
      gradient: 'linear-gradient(180deg, #090d16 0%, #162032 40%, #223048 75%, #182234 100%)',
      ambientGlow: 'radial-gradient(circle at 50% 30%, rgba(100, 150, 220, 0.25) 0%, transparent 60%)',
      sunMoon: { x: '50%', y: '22%', opacity: 0.2, isSun: false },
      sunFlare: 'none',
    };
  }

  // 2. RAIN / DRIZZLE
  if (isRain) {
    if (!isDay || timePhase === 'night') {
      return {
        gradient: 'linear-gradient(180deg, #050810 0%, #0c1424 45%, #142036 80%, #090e1a 100%)',
        ambientGlow: 'radial-gradient(circle at 80% 20%, rgba(80, 130, 200, 0.25) 0%, transparent 60%)',
        sunMoon: { x: '80%', y: '20%', opacity: 0.3, isSun: false },
        sunFlare: 'none',
      };
    }
    return {
      gradient: 'linear-gradient(180deg, #2c4255 0%, #4a6880 40%, #6c8fa8 75%, #466075 100%)',
      ambientGlow: 'radial-gradient(circle at 35% 25%, rgba(200, 230, 255, 0.45) 0%, transparent 60%)',
      sunMoon: { x: '35%', y: '25%', opacity: 0.45, isSun: true },
      sunFlare: 'none',
    };
  }

  // 3. FOG / MIST
  if (isFog) {
    return {
      gradient: isDay 
        ? 'linear-gradient(180deg, #5b758c 0%, #8ca4b8 40%, #b8cad6 80%, #9cb2c2 100%)'
        : 'linear-gradient(180deg, #0e1520 0%, #1a2536 40%, #28374c 80%, #151e2c 100%)',
      ambientGlow: 'radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.35) 0%, transparent 70%)',
      sunMoon: { x: '50%', y: '30%', opacity: 0.3, isSun: isDay },
      sunFlare: 'none',
    };
  }

  // 4. SNOW
  if (isSnow) {
    return {
      gradient: isDay 
        ? 'linear-gradient(180deg, #3d5f85 0%, #6892bd 40%, #a4c4e2 80%, #7da2c8 100%)'
        : 'linear-gradient(180deg, #08101e 0%, #122038 40%, #1c3254 80%, #0d182a 100%)',
      ambientGlow: 'radial-gradient(circle at 50% 30%, rgba(230, 245, 255, 0.5) 0%, transparent 65%)',
      sunMoon: { x: '50%', y: '25%', opacity: 0.6, isSun: isDay },
      sunFlare: 'none',
    };
  }

  // 5. CLOUDY / OVERCAST
  if (isOvercast) {
    if (!isDay || timePhase === 'night') {
      return {
        gradient: 'linear-gradient(180deg, #04070e 0%, #0a1120 40%, #121e34 80%, #060b14 100%)',
        ambientGlow: 'radial-gradient(circle at 80% 20%, rgba(90, 135, 210, 0.25) 0%, transparent 60%)',
        sunMoon: { x: '80%', y: '20%', opacity: 0.35, isSun: false },
        sunFlare: 'none',
      };
    }
    return {
      gradient: 'linear-gradient(180deg, #244868 0%, #4a759c 35%, #76a1c6 75%, #466e92 100%)',
      ambientGlow: 'radial-gradient(circle at 45% 20%, rgba(230, 245, 255, 0.55) 0%, transparent 60%)',
      sunMoon: { x: '45%', y: '20%', opacity: 0.5, isSun: true },
      sunFlare: 'none',
    };
  }

  // 6. CLEAR / VIBRANT LIVING NATURAL SKY PHASES
  switch (timePhase) {
    case 'dawn':
      return {
        gradient: 'linear-gradient(180deg, #100a26 0%, #2f1947 25%, #702f5a 50%, #c44d56 75%, #ff8c69 100%)',
        ambientGlow: 'radial-gradient(circle at 30% 70%, rgba(255, 140, 90, 0.7) 0%, rgba(255, 90, 80, 0.3) 40%, transparent 70%)',
        sunMoon: { x: '30%', y: '68%', opacity: 0.9, isSun: true },
        sunFlare: 'radial-gradient(circle at 30% 68%, rgba(255, 200, 150, 0.5) 0%, transparent 45%)',
      };
    case 'morning':
      return {
        gradient: 'linear-gradient(180deg, #0d47a1 0%, #1976d2 30%, #42a5f5 65%, #90caf9 90%, #bbdefb 100%)',
        ambientGlow: 'radial-gradient(circle at 25% 22%, rgba(255, 255, 240, 0.8) 0%, rgba(255, 235, 170, 0.35) 45%, transparent 70%)',
        sunMoon: { x: '25%', y: '22%', opacity: 1, isSun: true },
        sunFlare: 'radial-gradient(circle at 25% 22%, rgba(255, 255, 220, 0.6) 0%, transparent 50%)',
      };
    case 'afternoon':
      return {
        gradient: 'linear-gradient(180deg, #0b3c8c 0%, #1565c0 28%, #1e88e5 60%, #42a5f5 85%, #64b5f6 100%)',
        ambientGlow: 'radial-gradient(circle at 50% 16%, rgba(255, 255, 250, 0.85) 0%, rgba(255, 230, 150, 0.4) 40%, transparent 70%)',
        sunMoon: { x: '50%', y: '16%', opacity: 1, isSun: true },
        sunFlare: 'radial-gradient(circle at 50% 16%, rgba(255, 255, 240, 0.7) 0%, transparent 55%)',
      };
    case 'goldenHour':
      return {
        gradient: 'linear-gradient(180deg, #1f0d3d 0%, #4a1942 25%, #8c2a3e 50%, #d9531e 75%, #f5a623 100%)',
        ambientGlow: 'radial-gradient(circle at 75% 60%, rgba(255, 170, 40, 0.85) 0%, rgba(255, 100, 30, 0.4) 45%, transparent 70%)',
        sunMoon: { x: '75%', y: '60%', opacity: 0.95, isSun: true },
        sunFlare: 'radial-gradient(circle at 75% 60%, rgba(255, 200, 80, 0.65) 0%, transparent 50%)',
      };
    case 'sunset':
      return {
        gradient: 'linear-gradient(180deg, #0d0628 0%, #2e0854 22%, #681458 48%, #ba2846 72%, #ff6b4a 100%)',
        ambientGlow: 'radial-gradient(circle at 80% 75%, rgba(255, 90, 60, 0.85) 0%, rgba(180, 40, 100, 0.4) 50%, transparent 75%)',
        sunMoon: { x: '80%', y: '75%', opacity: 0.9, isSun: true },
        sunFlare: 'radial-gradient(circle at 80% 75%, rgba(255, 140, 80, 0.55) 0%, transparent 50%)',
      };
    case 'twilight':
      return {
        gradient: 'linear-gradient(180deg, #040510 0%, #0d1228 30%, #1e1b42 60%, #301f4c 85%, #180d28 100%)',
        ambientGlow: 'radial-gradient(circle at 82% 30%, rgba(160, 130, 230, 0.45) 0%, transparent 60%)',
        sunMoon: { x: '82%', y: '30%', opacity: 0.75, isSun: false },
        sunFlare: 'none',
      };
    case 'night':
    default:
      return {
        gradient: 'linear-gradient(180deg, #010206 0%, #040915 30%, #081328 65%, #040b1a 100%)',
        ambientGlow: 'radial-gradient(circle at 82% 18%, rgba(180, 220, 255, 0.35) 0%, rgba(60, 100, 180, 0.15) 45%, transparent 65%)',
        sunMoon: { x: '82%', y: '18%', opacity: 0.95, isSun: false },
        sunFlare: 'none',
      };
  }
}

// 95 Realistic Multi-Magnitude Twinkling Stars
const REALISTIC_STARS = Array.from({ length: 95 }, (_, i) => ({
  id: i,
  x: ((i * 41 + 13) % 98) + 1,
  y: ((i * 57 + 7) % 76) + 1,
  size: (i % 5 === 0 ? 2.4 : i % 3 === 0 ? 1.8 : i % 2 === 0 ? 1.2 : 0.8),
  opacity: 0.4 + ((i * 19) % 55) / 100,
  duration: 1.8 + (i % 6) * 0.6,
  delay: (i % 8) * 0.4,
}));

export default function AtmosphericSkyCanvas() {
  const { 
    timePhase, 
    weatherState, 
    isDay, 
    cloudCover, 
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

  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-28%']);
  const config = getAtmosphericSkyConfig(timePhase, weatherState, isDay);
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';

  // 60FPS Particles Simulation (Rain, Snow, Lightning)
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
      
      {/* 1. Base Vibrant Celestial Sky Dome */}
      <motion.div
        style={{
          y: skyY,
          background: config.gradient,
        }}
        className="absolute inset-x-0 -top-12 w-full h-[150vh] min-h-[1200px] transition-all duration-1000 origin-top"
      >
        {/* Ambient Atmospheric Flare / Zenith Radiance */}
        <div 
          className="absolute inset-0 transition-all duration-1000 pointer-events-none"
          style={{ background: config.ambientGlow }}
        />

        {/* 2. REALISTIC SUN / MOON CELESTIAL ORB */}
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-1000"
          style={{
            left: config.sunMoon.x,
            top: config.sunMoon.y,
            transform: 'translate(-50%, -50%)',
            width: config.sunMoon.isSun ? '140px' : '95px',
            height: config.sunMoon.isSun ? '140px' : '95px',
            opacity: config.sunMoon.opacity,
          }}
        >
          {config.sunMoon.isSun ? (
            /* Photorealistic Sun with Solar Corona */
            <div className="relative w-full h-full">
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #ffffff 0%, #fffbeb 30%, #ffd166 60%, rgba(255, 170, 50, 0.4) 85%, transparent 100%)',
                  boxShadow: '0 0 60px rgba(255, 220, 100, 0.9), 0 0 140px rgba(255, 160, 40, 0.6), 0 0 240px rgba(255, 120, 20, 0.35)',
                }}
              />
              <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,240,0.5)_0%,transparent_70%)] animate-pulse" />
            </div>
          ) : (
            /* Photorealistic Moon with Lunar Crater Details & Silver Halo */
            <div className="relative w-full h-full">
              <div 
                className="absolute inset-0 rounded-full border border-white/40 overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 45%, #94a3b8 80%, #64748b 100%)',
                  boxShadow: '0 0 45px rgba(210, 235, 255, 0.8), 0 0 100px rgba(120, 170, 255, 0.35)',
                }}
              >
                {/* Subtle Lunar Crater Details */}
                <div className="absolute top-3 left-4 w-5 h-5 rounded-full bg-slate-400/40 filter blur-[1px]" />
                <div className="absolute bottom-4 right-5 w-6 h-6 rounded-full bg-slate-500/35 filter blur-[1px]" />
                <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-slate-400/30 filter blur-[1px]" />
                <div className="absolute bottom-7 left-6 w-4 h-4 rounded-full bg-slate-400/25 filter blur-[1px]" />
              </div>
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(210,235,255,0.4)_0%,transparent_70%)]" />
            </div>
          )}
        </div>

        {/* 3. REALISTIC STARRY NIGHT SKY & MILKY WAY (When Night / Twilight) */}
        {isNight && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
            {REALISTIC_STARS.map((star) => (
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

            {/* Faint Cosmic Milky Way Nebula Dust */}
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 85% 45% at 50% 30%, rgba(140, 180, 255, 0.35) 0%, rgba(90, 55, 140, 0.18) 50%, transparent 80%)'
              }}
            />
          </div>
        )}

        {/* 4. NATURAL REALISTIC CLOUD DRIFT (Responsive to Weather & Wind) */}
        {cloudCover > 15 && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
            {/* Upper Cirrus Wisps */}
            <motion.div 
              animate={{
                x: ['-4%', '5%', '-4%'],
              }}
              transition={{
                duration: 50 / Math.max(0.6, windSpeed / 10),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-x-0 top-10 w-[135%] h-[380px] pointer-events-none"
              style={{
                opacity: Math.min(0.85, cloudCover / 100 + 0.1),
                background: !isNight
                  ? 'radial-gradient(ellipse 70% 35% at 35% 30%, rgba(255, 255, 255, 0.75) 0%, rgba(240, 248, 255, 0.35) 45%, transparent 70%)'
                  : 'radial-gradient(ellipse 70% 35% at 35% 30%, rgba(160, 195, 240, 0.35) 0%, rgba(40, 60, 100, 0.15) 45%, transparent 70%)'
              }}
            />

            {/* Mid-Altitude Natural Cloud Banks */}
            {cloudCover > 40 && (
              <motion.div 
                animate={{
                  x: ['5%', '-6%', '5%'],
                }}
                transition={{
                  duration: 38 / Math.max(0.6, windSpeed / 10),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-x-0 top-36 w-[140%] h-[420px] pointer-events-none"
                style={{
                  opacity: Math.min(0.9, cloudCover / 100),
                  background: !isNight
                    ? 'radial-gradient(ellipse 65% 40% at 65% 45%, rgba(255, 255, 255, 0.8) 0%, rgba(230, 242, 255, 0.4) 50%, transparent 75%)'
                    : 'radial-gradient(ellipse 65% 40% at 65% 45%, rgba(140, 175, 220, 0.35) 0%, rgba(30, 48, 80, 0.15) 50%, transparent 75%)'
                }}
              />
            )}
          </div>
        )}

        {/* 5. Minimal Natural Canopy Tree Fronds at Viewport Edge */}
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

        {/* Natural Atmospheric Ground Depth */}
        <div 
          className="absolute bottom-0 inset-x-0 h-[30vh] pointer-events-none"
          style={{
            background: isNight
              ? 'linear-gradient(to top, rgba(3, 5, 12, 0.75) 0%, transparent 100%)'
              : 'linear-gradient(to top, rgba(255, 255, 255, 0.15) 0%, transparent 100%)'
          }}
        />
      </motion.div>

      {/* 6. Active Weather Particles (Rain, Snow, Lightning) */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* 7. Subtle Contrast Vignette */}
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
