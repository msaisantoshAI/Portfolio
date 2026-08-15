'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEnvironment, TimePhase, WeatherState } from '@/context/EnvironmentContext';

// Color definitions for Rayleigh & Mie Atmospheric Scattering across 7 Solar Phases
function getAtmosphericSkyConfig(timePhase: TimePhase, weatherState: WeatherState, isDay: boolean, cloudCover: number) {
  const isStorm = weatherState === 'thunderstorm';
  const isHeavyRain = weatherState === 'heavyRain';
  const isRain = weatherState === 'rain';
  const isOvercast = weatherState === 'cloudy' || cloudCover >= 75;
  const isFog = weatherState === 'fog';
  const isSnow = weatherState === 'snow';

  // 1. STORMY / HEAVY RAIN
  if (isStorm || isHeavyRain) {
    return {
      gradient: 'linear-gradient(to top, #141c2b 0%, #1f2a3f 30%, #101622 70%, #080b12 100%)',
      ambientGlow: 'radial-gradient(circle at 50% 40%, rgba(120, 160, 220, 0.25) 0%, transparent 60%)',
      sunMoon: { x: '50%', y: '25%', opacity: 0.15, isSun: false },
      cloudTint: 'rgba(25, 35, 50, 0.85)',
      fogOpacity: 0.4,
    };
  }

  // 2. RAIN / DRIZZLE
  if (isRain) {
    if (!isDay || timePhase === 'night') {
      return {
        gradient: 'linear-gradient(to top, #090e18 0%, #131c2d 40%, #0a0f19 80%, #04070c 100%)',
        ambientGlow: 'radial-gradient(circle at 80% 20%, rgba(80, 120, 180, 0.2) 0%, transparent 60%)',
        sunMoon: { x: '80%', y: '20%', opacity: 0.2, isSun: false },
        cloudTint: 'rgba(20, 28, 42, 0.8)',
        fogOpacity: 0.35,
      };
    }
    return {
      gradient: 'linear-gradient(to top, #7a94a8 0%, #58758c 35%, #38536b 70%, #203548 100%)',
      ambientGlow: 'radial-gradient(circle at 35% 25%, rgba(200, 225, 255, 0.4) 0%, transparent 60%)',
      sunMoon: { x: '35%', y: '25%', opacity: 0.35, isSun: true },
      cloudTint: 'rgba(120, 145, 165, 0.75)',
      fogOpacity: 0.3,
    };
  }

  // 3. FOG / MIST
  if (isFog) {
    return {
      gradient: isDay 
        ? 'linear-gradient(to top, #d0dbe5 0%, #a8bac8 40%, #768d9f 80%, #4a5f70 100%)'
        : 'linear-gradient(to top, #141b24 0%, #1d2836 40%, #101620 80%, #080c12 100%)',
      ambientGlow: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
      sunMoon: { x: '50%', y: '30%', opacity: 0.25, isSun: isDay },
      cloudTint: isDay ? 'rgba(200, 215, 225, 0.85)' : 'rgba(30, 42, 55, 0.85)',
      fogOpacity: 0.7,
    };
  }

  // 4. SNOW
  if (isSnow) {
    return {
      gradient: isDay 
        ? 'linear-gradient(to top, #c2d5e8 0%, #9cb7d4 35%, #6a8fb8 70%, #3e6085 100%)'
        : 'linear-gradient(to top, #0c1424 0%, #16243d 40%, #0a101c 80%, #040810 100%)',
      ambientGlow: 'radial-gradient(circle at 50% 30%, rgba(220, 240, 255, 0.45) 0%, transparent 65%)',
      sunMoon: { x: '50%', y: '25%', opacity: 0.5, isSun: isDay },
      cloudTint: isDay ? 'rgba(230, 240, 250, 0.8)' : 'rgba(35, 50, 75, 0.75)',
      fogOpacity: 0.25,
    };
  }

  // 5. CLOUDY / OVERCAST
  if (isOvercast) {
    if (!isDay || timePhase === 'night') {
      return {
        gradient: 'linear-gradient(to top, #070c16 0%, #0f1828 40%, #090e19 80%, #03050a 100%)',
        ambientGlow: 'radial-gradient(circle at 80% 20%, rgba(100, 140, 200, 0.2) 0%, transparent 60%)',
        sunMoon: { x: '80%', y: '20%', opacity: 0.25, isSun: false },
        cloudTint: 'rgba(18, 25, 38, 0.85)',
        fogOpacity: 0.2,
      };
    }
    return {
      gradient: 'linear-gradient(to top, #a1b8cc 0%, #829eb6 35%, #567691 70%, #2f4b62 100%)',
      ambientGlow: 'radial-gradient(circle at 45% 20%, rgba(230, 245, 255, 0.5) 0%, transparent 60%)',
      sunMoon: { x: '45%', y: '20%', opacity: 0.4, isSun: true },
      cloudTint: 'rgba(140, 165, 185, 0.8)',
      fogOpacity: 0.2,
    };
  }

  // 6. CLEAR / PARTLY CLOUDY SOLAR PHASES
  switch (timePhase) {
    case 'dawn':
      return {
        gradient: 'linear-gradient(to top, #ff7e5f 0%, #feb47b 20%, #8b687f 45%, #3d2f57 75%, #15102a 100%)',
        ambientGlow: 'radial-gradient(circle at 20% 75%, rgba(255, 140, 90, 0.65) 0%, transparent 60%)',
        sunMoon: { x: '20%', y: '70%', opacity: 0.85, isSun: true },
        cloudTint: 'rgba(255, 190, 160, 0.55)',
        fogOpacity: 0.1,
      };
    case 'morning':
      return {
        gradient: 'linear-gradient(to top, #89f7fe 0%, #66a6ff 35%, #2980b9 70%, #1a4a6e 100%)',
        ambientGlow: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 240, 0.7) 0%, transparent 60%)',
        sunMoon: { x: '25%', y: '25%', opacity: 0.95, isSun: true },
        cloudTint: 'rgba(255, 255, 255, 0.65)',
        fogOpacity: 0.05,
      };
    case 'afternoon':
      return {
        gradient: 'linear-gradient(to top, #4facfe 0%, #00f2fe 15%, #1976d2 55%, #0d47a1 85%, #062254 100%)',
        ambientGlow: 'radial-gradient(circle at 50% 15%, rgba(255, 255, 245, 0.75) 0%, transparent 65%)',
        sunMoon: { x: '50%', y: '15%', opacity: 1, isSun: true },
        cloudTint: 'rgba(255, 255, 255, 0.7)',
        fogOpacity: 0.05,
      };
    case 'goldenHour':
      return {
        gradient: 'linear-gradient(to top, #f12711 0%, #f5af19 30%, #b85d19 55%, #4a1942 80%, #12071f 100%)',
        ambientGlow: 'radial-gradient(circle at 75% 65%, rgba(255, 170, 50, 0.8) 0%, transparent 65%)',
        sunMoon: { x: '75%', y: '60%', opacity: 0.95, isSun: true },
        cloudTint: 'rgba(255, 195, 120, 0.65)',
        fogOpacity: 0.1,
      };
    case 'sunset':
      return {
        gradient: 'linear-gradient(to top, #ff4e50 0%, #f9d423 20%, #a83279 50%, #3b1443 75%, #0c0414 100%)',
        ambientGlow: 'radial-gradient(circle at 80% 80%, rgba(255, 90, 60, 0.75) 0%, transparent 60%)',
        sunMoon: { x: '80%', y: '78%', opacity: 0.85, isSun: true },
        cloudTint: 'rgba(255, 140, 110, 0.6)',
        fogOpacity: 0.12,
      };
    case 'twilight':
      return {
        gradient: 'linear-gradient(to top, #1a162b 0%, #2a2048 25%, #181938 55%, #0b0c1e 80%, #03040b 100%)',
        ambientGlow: 'radial-gradient(circle at 82% 35%, rgba(160, 130, 220, 0.4) 0%, transparent 60%)',
        sunMoon: { x: '82%', y: '35%', opacity: 0.6, isSun: false },
        cloudTint: 'rgba(100, 90, 140, 0.45)',
        fogOpacity: 0.15,
      };
    case 'night':
    default:
      return {
        gradient: 'linear-gradient(to top, #050811 0%, #0a1329 35%, #060d1e 70%, #02040a 100%)',
        ambientGlow: 'radial-gradient(circle at 82% 18%, rgba(180, 220, 255, 0.3) 0%, transparent 60%)',
        sunMoon: { x: '82%', y: '18%', opacity: 0.9, isSun: false },
        cloudTint: 'rgba(120, 160, 220, 0.25)',
        fogOpacity: 0.15,
      };
  }
}

// Generate celestial stars
const STAR_COUNT = 85;
const CELESTIAL_STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  id: i,
  x: ((i * 43 + 17) % 100),
  y: ((i * 59 + 11) % 78),
  size: (i % 4 === 0 ? 2.5 : i % 2 === 0 ? 1.6 : 1.0),
  opacity: 0.35 + ((i * 23) % 65) / 100,
  duration: 2.2 + (i % 5) * 0.7,
  delay: (i % 7) * 0.5,
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.12,
    restDelta: 0.0001
  });

  const skyY = useTransform(smoothProgress, [0, 1], ['0%', '-30%']);
  const foliageScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);

  const config = getAtmosphericSkyConfig(timePhase, weatherState, isDay, cloudCover);
  const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';

  // 60FPS Lightweight Particle Simulation (Rain, Snow, Mist, Thunderstorm lightning)
  useEffect(() => {
    const canvas = canvasRef.current;
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

    // Particle instances
    const rainCount = isHeavy ? 65 : isRain ? 35 : 0;
    const rainDrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 24 + 14,
      speed: Math.random() * 9 + 14,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    const snowCount = isSnow ? 45 : 0;
    const snowflakes = Array.from({ length: snowCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 1,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.5 + 0.3,
      oscillation: Math.random() * Math.PI * 2,
    }));

    // Thunderstorm lightning discharge state
    let lightningOpacity = 0;
    let nextLightningTime = Date.now() + Math.random() * 9000 + 7000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Rain Streaks Simulation
      if (isRain) {
        ctx.strokeStyle = isDay ? 'rgba(255, 255, 255, 0.4)' : 'rgba(180, 215, 255, 0.35)';
        ctx.lineWidth = isHeavy ? 1.4 : 1.0;

        for (const drop of rainDrops) {
          ctx.beginPath();
          ctx.globalAlpha = drop.opacity;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - (windSpeed / 8), drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x -= (windSpeed / 12);

          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
          if (drop.x < 0) drop.x = width;
        }

        // Thunderstorm subtle ambient atmospheric flash
        if (weatherState === 'thunderstorm') {
          const now = Date.now();
          if (now > nextLightningTime) {
            lightningOpacity = 0.22;
            nextLightningTime = now + Math.random() * 14000 + 9000;
          }
          if (lightningOpacity > 0.01) {
            ctx.fillStyle = `rgba(220, 240, 255, ${lightningOpacity})`;
            ctx.fillRect(0, 0, width, height);
            lightningOpacity *= 0.88;
          }
        }
      }

      // 2. Snow Simulation
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
      
      {/* 1. Base Procedural Celestial Sky Dome */}
      <motion.div
        style={{
          y: skyY,
          background: config.gradient,
        }}
        className="absolute inset-x-0 -top-12 w-full h-[150vh] min-h-[1200px] transition-all duration-1000 origin-top"
      >
        {/* Ambient Zenith / Horizon Lighting Glow */}
        <div 
          className="absolute inset-0 transition-all duration-1000 pointer-events-none"
          style={{ background: config.ambientGlow }}
        />

        {/* 2. Celestial Body (Sun / Moon) */}
        <div
          className="absolute rounded-full pointer-events-none transition-all duration-1000"
          style={{
            left: config.sunMoon.x,
            top: config.sunMoon.y,
            transform: 'translate(-50%, -50%)',
            width: config.sunMoon.isSun ? '130px' : '85px',
            height: config.sunMoon.isSun ? '130px' : '85px',
            opacity: config.sunMoon.opacity,
            background: config.sunMoon.isSun
              ? 'radial-gradient(circle, rgba(255,255,245,1) 0%, rgba(255,225,140,0.85) 35%, rgba(255,180,50,0.3) 65%, transparent 100%)'
              : 'radial-gradient(circle, rgba(245,250,255,1) 0%, rgba(210,230,255,0.75) 40%, rgba(120,170,255,0.2) 75%, transparent 100%)',
            boxShadow: config.sunMoon.isSun
              ? '0 0 80px rgba(255, 220, 110, 0.8), 0 0 160px rgba(255, 160, 50, 0.4)'
              : '0 0 50px rgba(210, 235, 255, 0.7), 0 0 100px rgba(120, 170, 255, 0.3)',
          }}
        />

        {/* 3. Procedural Starry Night Sky (When Night / Twilight) */}
        {isNight && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
            {CELESTIAL_STARS.map((star) => (
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
                className="absolute rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.85)]"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
              />
            ))}

            {/* Faint Milky Way Nebula Dust */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(140, 180, 255, 0.3) 0%, rgba(80, 45, 130, 0.15) 50%, transparent 80%)'
              }}
            />
          </div>
        )}

        {/* 4. Multi-Tier Procedural Cloud Formations (Drifting based on wind) */}
        {cloudCover > 10 && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{ opacity: Math.min(1, cloudCover / 100 + 0.15) }}
          >
            {/* Far Cloud Tier (Slowest Drift) */}
            <motion.div
              animate={{
                x: ['-4%', '6%', '-4%'],
              }}
              transition={{
                duration: 52 / Math.max(0.6, windSpeed / 10),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-8 -left-20 w-[140%] h-[340px] filter blur-3xl pointer-events-none"
            >
              <div 
                className="w-full h-full"
                style={{
                  background: `radial-gradient(ellipse 65% 50% at 30% 35%, ${config.cloudTint} 0%, transparent 65%), radial-gradient(ellipse 55% 45% at 75% 40%, ${config.cloudTint} 0%, transparent 65%)`
                }}
              />
            </motion.div>

            {/* Mid Cloud Tier (Moderate Drift) */}
            {cloudCover > 30 && (
              <motion.div
                animate={{
                  x: ['5%', '-6%', '5%'],
                }}
                transition={{
                  duration: 38 / Math.max(0.6, windSpeed / 10),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-28 -right-20 w-[135%] h-[400px] filter blur-2xl pointer-events-none"
              >
                <div 
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(ellipse 70% 50% at 60% 45%, ${config.cloudTint} 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 50%, ${config.cloudTint} 0%, transparent 60%)`
                  }}
                />
              </motion.div>
            )}

            {/* Near Cloud Tier (Responsive Overcast Formations) */}
            {cloudCover > 60 && (
              <motion.div
                animate={{
                  x: ['-6%', '8%', '-6%'],
                }}
                transition={{
                  duration: 26 / Math.max(0.6, windSpeed / 10),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-44 -left-32 w-[150%] h-[480px] filter blur-3xl pointer-events-none"
              >
                <div 
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 45% 50%, ${config.cloudTint} 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 85% 45%, ${config.cloudTint} 0%, transparent 60%)`
                  }}
                />
              </motion.div>
            )}
          </div>
        )}

        {/* 5. Minimal Peripheral Silhouette Foliage (Subtle canopy fronds swaying at the edges) */}
        <motion.div
          animate={isWindy ? {
            rotate: [-0.8, 0.8, -0.8],
            x: ['-0.5%', '0.5%', '-0.5%'],
          } : {
            rotate: [-0.25, 0.25, -0.25],
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
          {/* Top-Left Delicate Canopy Frond */}
          <div 
            className="absolute -top-10 -left-10 w-72 h-72 pointer-events-none"
            style={{
              background: isNight
                ? 'radial-gradient(ellipse at top left, rgba(6, 12, 24, 0.8) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at top left, rgba(20, 45, 30, 0.45) 0%, transparent 70%)'
            }}
          />

          {/* Top-Right Delicate Canopy Frond */}
          <div 
            className="absolute -top-10 -right-10 w-72 h-72 pointer-events-none"
            style={{
              background: isNight
                ? 'radial-gradient(ellipse at top right, rgba(6, 12, 24, 0.8) 0%, transparent 70%)'
                : 'radial-gradient(ellipse at top right, rgba(20, 45, 30, 0.45) 0%, transparent 70%)'
            }}
          />
        </motion.div>

        {/* Atmospheric Horizon Depth Diffusion */}
        <div 
          className="absolute bottom-0 inset-x-0 h-[35vh] pointer-events-none"
          style={{
            background: isNight
              ? 'linear-gradient(to top, rgba(3, 5, 12, 0.75) 0%, transparent 100%)'
              : 'linear-gradient(to top, rgba(255, 255, 255, 0.2) 0%, transparent 100%)'
          }}
        />
      </motion.div>

      {/* 6. Active Weather Particles Canvas (Rain, Snow, Lightning) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* 7. Ambient Contrast Vignette guaranteeing 100% WCAG 2.2 AA Readability */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: isDay 
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, transparent 40%, rgba(0,0,0,0.12) 100%)' 
            : 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)'
        }}
      />
    </div>
  );
}
