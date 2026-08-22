'use client';

import React, { useEffect, useRef } from 'react';
import { useEnvironment, TimePhase } from '@/context/EnvironmentContext';

// Procedural Cloud Particle Definition
interface CloudCluster {
  x: number;
  y: number;
  scale: number;
  speed: number;
  puffs: Array<{ ox: number; oy: number; r: number; alpha: number }>;
}

// Location-specific night palette & celestial profile
function getLocationCelestialProfile(city: string) {
  const normalized = (city || '').toLowerCase();

  if (normalized.includes('tokyo') || normalized.includes('kyoto') || normalized.includes('seoul') || normalized.includes('japan')) {
    return {
      type: 'tokyo-cyber',
      skyGradient: ['#040217', '#0c0730', '#190d45', '#2e1065'],
      nebulaColor: 'rgba(139, 92, 246, 0.24)',
      starCount: 110,
      hasAurora: false,
      meteorRate: 0.025,
      cloudColorDay: 'rgba(255, 255, 255, 0.88)',
      cloudShadowDay: 'rgba(200, 215, 245, 0.65)',
    };
  }

  if (normalized.includes('reykjavik') || normalized.includes('oslo') || normalized.includes('stockholm') || normalized.includes('helsinki') || normalized.includes('iceland')) {
    return {
      type: 'reykjavik-aurora',
      skyGradient: ['#010c14', '#031f1e', '#052e26', '#064e3b'],
      nebulaColor: 'rgba(16, 185, 129, 0.3)',
      starCount: 130,
      hasAurora: true,
      meteorRate: 0.03,
      cloudColorDay: 'rgba(240, 253, 250, 0.9)',
      cloudShadowDay: 'rgba(180, 220, 225, 0.7)',
    };
  }

  if (normalized.includes('london') || normalized.includes('paris') || normalized.includes('berlin') || normalized.includes('amsterdam') || normalized.includes('europe')) {
    return {
      type: 'london-sapphire',
      skyGradient: ['#020617', '#08132e', '#0f214a', '#172554'],
      nebulaColor: 'rgba(37, 99, 235, 0.18)',
      starCount: 85,
      hasAurora: false,
      meteorRate: 0.015,
      cloudColorDay: 'rgba(248, 250, 252, 0.85)',
      cloudShadowDay: 'rgba(195, 205, 220, 0.65)',
    };
  }

  if (normalized.includes('york') || normalized.includes('francisco') || normalized.includes('chicago') || normalized.includes('toronto') || normalized.includes('usa')) {
    return {
      type: 'newyork-gotham',
      skyGradient: ['#020617', '#0b1120', '#111827', '#1f2937'],
      nebulaColor: 'rgba(59, 130, 246, 0.18)',
      starCount: 95,
      hasAurora: false,
      meteorRate: 0.02,
      cloudColorDay: 'rgba(255, 255, 255, 0.88)',
      cloudShadowDay: 'rgba(190, 205, 230, 0.65)',
    };
  }

  if (normalized.includes('sydney') || normalized.includes('melbourne') || normalized.includes('auckland') || normalized.includes('australia')) {
    return {
      type: 'sydney-oceanic',
      skyGradient: ['#010d1a', '#051d38', '#0b2d52', '#15416b'],
      nebulaColor: 'rgba(14, 116, 144, 0.25)',
      starCount: 120,
      hasAurora: false,
      meteorRate: 0.022,
      cloudColorDay: 'rgba(240, 249, 255, 0.9)',
      cloudShadowDay: 'rgba(186, 220, 245, 0.68)',
    };
  }

  if (normalized.includes('dubai') || normalized.includes('riyadh') || normalized.includes('cairo')) {
    return {
      type: 'dubai-desert',
      skyGradient: ['#04010f', '#0c0729', '#1a0f3d', '#2c1a54'],
      nebulaColor: 'rgba(99, 102, 241, 0.2)',
      starCount: 140,
      hasAurora: false,
      meteorRate: 0.035,
      cloudColorDay: 'rgba(255, 251, 235, 0.88)',
      cloudShadowDay: 'rgba(230, 210, 180, 0.6)',
    };
  }

  // Default: Hyderabad & India (Deccan Cosmic Velvet)
  return {
    type: 'hyderabad-deccan',
    skyGradient: ['#020617', '#08102b', '#101c45', '#1e2954'],
    nebulaColor: 'rgba(59, 130, 246, 0.22)',
    starCount: 105,
    hasAurora: false,
    meteorRate: 0.02,
    cloudColorDay: 'rgba(255, 255, 255, 0.88)',
    cloudShadowDay: 'rgba(200, 215, 240, 0.65)',
  };
}

// Generate Daytime Sky Gradients based on solar time phase
function getDaytimeSkyGradient(timePhase: TimePhase): string[] {
  switch (timePhase) {
    case 'dawn':
      return ['#1e1b4b', '#4338ca', '#db2777', '#f97316', '#fde047'];
    case 'morning':
      return ['#1d4ed8', '#2563eb', '#60a5fa', '#93c5fd', '#bfdbfe'];
    case 'goldenHour':
      return ['#1e3a8a', '#2563eb', '#d97706', '#ea580c', '#fbbf24'];
    case 'sunset':
      return ['#0f172a', '#4c1d95', '#be123c', '#e11d48', '#fb923c'];
    case 'twilight':
      return ['#020617', '#0f172a', '#1e1b4b', '#312e81'];
    case 'afternoon':
    default:
      return ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'];
  }
}

export default function AtmosphericSkyCanvas() {
  const { 
    timePhase, 
    weatherState, 
    location,
    isDay, 
    cloudCover, 
    windSpeed, 
    isWindy,
    sunPosition,
    moonPosition
  } = useEnvironment();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const profile = getLocationCelestialProfile(location);
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isNight = !isDay || timePhase === 'night' || timePhase === 'twilight';
    const isRain = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';
    const isSnow = weatherState === 'snow';
    const isFog = weatherState === 'fog';

    // 1. PROCEDURAL MOVING CLOUDS
    const clouds: CloudCluster[] = [];
    const effectiveCloudCount = isFog ? 12 : Math.max(3, Math.floor((cloudCover || 30) / 10));

    for (let i = 0; i < effectiveCloudCount; i++) {
      const puffs: Array<{ ox: number; oy: number; r: number; alpha: number }> = [];
      const puffCount = 7 + Math.floor(Math.random() * 6);
      const baseR = 50 + Math.random() * 60;

      for (let p = 0; p < puffCount; p++) {
        puffs.push({
          ox: (p - puffCount / 2) * (baseR * 0.5) + (Math.random() - 0.5) * 25,
          oy: (Math.random() - 0.5) * (baseR * 0.4),
          r: baseR * (0.6 + Math.random() * 0.5),
          alpha: 0.55 + Math.random() * 0.35,
        });
      }

      clouds.push({
        x: Math.random() * (width + 600) - 300,
        y: Math.random() * height * 0.55 + 20,
        scale: 0.8 + Math.random() * 0.7,
        speed: (0.25 + Math.random() * 0.35) * ((windSpeed || 15) / 12),
        puffs,
      });
    }

    // 2. PROCEDURAL STARS
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    const starCount = isNight ? profile.starCount : 0;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        radius: Math.random() * 1.5 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // 3. PROCEDURAL METEORS (Shooting Stars)
    const meteors: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
    }> = [];

    // 4. PRECIPITATION (Rain / Snow)
    const rainDrops: Array<{ x: number; y: number; length: number; speed: number; alpha: number }> = [];
    const snowFlakes: Array<{ x: number; y: number; r: number; speed: number; sway: number; swaySpeed: number }> = [];

    if (isRain) {
      const dropCount = weatherState === 'heavyRain' || weatherState === 'thunderstorm' ? 90 : 45;
      for (let i = 0; i < dropCount; i++) {
        rainDrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 20 + 12,
          speed: Math.random() * 14 + 16,
          alpha: Math.random() * 0.4 + 0.3,
        });
      }
    }

    if (isSnow) {
      for (let i = 0; i < 60; i++) {
        snowFlakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 2.5 + 1,
          speed: Math.random() * 1.5 + 0.8,
          sway: Math.random() * Math.PI * 2,
          swaySpeed: Math.random() * 0.02 + 0.01,
        });
      }
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // =======================================================================
      // LAYER 1: PROCEDURAL ATMOSPHERIC SKY GRADIENT (Zero Static Images)
      // =======================================================================
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);

      if (isNight) {
        // Location-Unique Night Gradients
        const stops = profile.skyGradient;
        skyGrad.addColorStop(0, stops[0]);
        skyGrad.addColorStop(0.35, stops[1]);
        skyGrad.addColorStop(0.7, stops[2]);
        skyGrad.addColorStop(1, stops[3]);
      } else {
        // Solar Time-Phase Daytime Gradients
        const dayStops = getDaytimeSkyGradient(timePhase);
        for (let s = 0; s < dayStops.length; s++) {
          skyGrad.addColorStop(s / (dayStops.length - 1), dayStops[s]);
        }
      }

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // =======================================================================
      // LAYER 2: CELESTIAL SUN / MOON WITH ATMOSPHERIC HALO
      // =======================================================================
      if (isNight) {
        // Night Celestial Moon & Glow
        const moonX = (moonPosition.x / 100) * width;
        const moonY = (moonPosition.y / 100) * height * 0.6;

        const moonHalo = ctx.createRadialGradient(moonX, moonY, 4, moonX, moonY, 120);
        moonHalo.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        moonHalo.addColorStop(0.3, 'rgba(219, 234, 254, 0.15)');
        moonHalo.addColorStop(1, 'transparent');
        ctx.fillStyle = moonHalo;
        ctx.beginPath();
        ctx.arc(moonX, moonY, 120, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(moonX, moonY, 14, 0, Math.PI * 2);
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // Daytime Solar Disc & Corona Bloom
        const sunX = (sunPosition.x / 100) * width;
        const sunY = (sunPosition.y / 100) * height * 0.65;

        const sunCorona = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 220);
        sunCorona.addColorStop(0, 'rgba(255, 255, 240, 0.65)');
        sunCorona.addColorStop(0.3, timePhase === 'goldenHour' || timePhase === 'sunset' ? 'rgba(251, 146, 60, 0.25)' : 'rgba(191, 219, 254, 0.2)');
        sunCorona.addColorStop(1, 'transparent');
        ctx.fillStyle = sunCorona;
        ctx.beginPath();
        ctx.arc(sunX, sunY, 220, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(sunX, sunY, 18, 0, Math.PI * 2);
        ctx.shadowColor = timePhase === 'goldenHour' ? '#f59e0b' : '#60a5fa';
        ctx.shadowBlur = 24;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // =======================================================================
      // LAYER 3: NIGHTTIME COSMIC NEBULA, AURORA & TWINKLING STARS
      // =======================================================================
      if (isNight) {
        // Location-specific Aurora Borealis Waves (for Nordic cities)
        if (profile.hasAurora) {
          ctx.save();
          for (let l = 0; l < 2; l++) {
            ctx.beginPath();
            ctx.moveTo(0, height * 0.2);
            for (let x = 0; x <= width; x += 25) {
              const y =
                height * 0.16 +
                Math.sin(x * 0.0035 + time * 0.7 + l) * 50 +
                Math.cos(x * 0.007 - time * 0.4) * 25;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height * 0.5);
            ctx.lineTo(0, height * 0.5);
            ctx.closePath();

            const auroraGrad = ctx.createLinearGradient(0, height * 0.1, 0, height * 0.5);
            auroraGrad.addColorStop(0, 'rgba(52, 211, 153, 0)');
            auroraGrad.addColorStop(0.5, l === 0 ? 'rgba(52, 211, 153, 0.22)' : 'rgba(167, 139, 250, 0.16)');
            auroraGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');

            ctx.fillStyle = auroraGrad;
            ctx.fill();
          }
          ctx.restore();
        }

        // Shimmering Stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 10 + s.twinkleOffset) * 0.35;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, alpha))})`;
          ctx.fill();
        }

        // Shooting Stars (Meteors)
        if (Math.random() < profile.meteorRate && meteors.length < 3) {
          meteors.push({
            x: Math.random() * width * 0.85,
            y: Math.random() * height * 0.4,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 12 + 10,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            alpha: 1,
          });
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;

          const mGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          mGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
          mGrad.addColorStop(0.4, `rgba(147, 197, 253, ${m.alpha * 0.8})`);
          mGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');

          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = mGrad;
          ctx.lineWidth = 2;
          ctx.stroke();

          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.alpha -= 0.025;

          if (m.alpha <= 0 || m.x > width || m.y > height) {
            meteors.splice(i, 1);
          }
        }
      }

      // =======================================================================
      // LAYER 4: PROCEDURAL MOVING CLOUDS (Dynamic Motion during Day & Dusk)
      // =======================================================================
      for (let c = 0; c < clouds.length; c++) {
        const cloud = clouds[c];
        cloud.x += cloud.speed;

        // Wrap around seamlessly
        if (cloud.x > width + 300) {
          cloud.x = -350;
          cloud.y = Math.random() * height * 0.55 + 20;
        }

        ctx.save();
        ctx.translate(cloud.x, cloud.y);
        ctx.scale(cloud.scale, cloud.scale);

        for (let p = 0; p < cloud.puffs.length; p++) {
          const puff = cloud.puffs[p];
          const puffGrad = ctx.createRadialGradient(
            puff.ox - puff.r * 0.25,
            puff.oy - puff.r * 0.25,
            puff.r * 0.1,
            puff.ox,
            puff.oy,
            puff.r
          );

          if (isNight) {
            puffGrad.addColorStop(0, 'rgba(30, 41, 59, 0.45)');
            puffGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.25)');
            puffGrad.addColorStop(1, 'transparent');
          } else if (timePhase === 'goldenHour' || timePhase === 'sunset') {
            puffGrad.addColorStop(0, 'rgba(254, 243, 199, 0.85)');
            puffGrad.addColorStop(0.4, 'rgba(251, 146, 60, 0.55)');
            puffGrad.addColorStop(0.8, 'rgba(194, 65, 12, 0.25)');
            puffGrad.addColorStop(1, 'transparent');
          } else {
            puffGrad.addColorStop(0, profile.cloudColorDay);
            puffGrad.addColorStop(0.65, profile.cloudShadowDay);
            puffGrad.addColorStop(1, 'transparent');
          }

          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(puff.ox, puff.oy, puff.r, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // =======================================================================
      // LAYER 5: PROCEDURAL WEATHER PRECIPITATION (Rain / Snow / Fog)
      // =======================================================================
      if (isRain) {
        ctx.strokeStyle = 'rgba(191, 219, 254, 0.55)';
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';

        const windAngle = ((windSpeed || 10) / 100) * 0.4;
        for (let r = 0; r < rainDrops.length; r++) {
          const drop = rainDrops[r];
          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + Math.sin(windAngle) * drop.length, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x += Math.sin(windAngle) * drop.speed;

          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
        }
      }

      if (isSnow) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        for (let s = 0; s < snowFlakes.length; s++) {
          const flake = snowFlakes[s];
          flake.sway += flake.swaySpeed;
          flake.y += flake.speed;
          flake.x += Math.sin(flake.sway) * 0.8 + ((windSpeed || 10) / 40);

          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
          ctx.fill();

          if (flake.y > height) {
            flake.y = -10;
            flake.x = Math.random() * width;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [timePhase, weatherState, location, isDay, cloudCover, windSpeed, isWindy, sunPosition, moonPosition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000"
    />
  );
}
