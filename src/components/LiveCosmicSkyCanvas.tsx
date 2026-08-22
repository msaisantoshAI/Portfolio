'use client';

import React, { useEffect, useRef } from 'react';
import { TimePhase, WeatherState } from '@/context/EnvironmentContext';

interface LiveCosmicSkyProps {
  isNightMode: boolean;
  timePhase: TimePhase;
  weatherState: WeatherState;
  location: string;
  isWindy: boolean;
  windSpeed: number;
}

// Generate location-specific aesthetic configuration
function getLocationSkyProfile(city: string) {
  const normalized = (city || '').toLowerCase();

  if (normalized.includes('tokyo') || normalized.includes('kyoto') || normalized.includes('seoul') || normalized.includes('japan')) {
    return {
      type: 'cyber-night',
      nebulaColor: 'rgba(124, 58, 237, 0.22)',
      nebulaSecondary: 'rgba(37, 99, 235, 0.18)',
      starCount: 110,
      hasAurora: false,
      meteorRate: 0.025,
      dayTint: 'rgba(147, 197, 253, 0.15)',
    };
  }

  if (normalized.includes('reykjavik') || normalized.includes('oslo') || normalized.includes('stockholm') || normalized.includes('helsinki') || normalized.includes('iceland')) {
    return {
      type: 'aurora-nordic',
      nebulaColor: 'rgba(16, 185, 129, 0.28)',
      nebulaSecondary: 'rgba(139, 92, 246, 0.22)',
      starCount: 130,
      hasAurora: true,
      meteorRate: 0.03,
      dayTint: 'rgba(186, 230, 253, 0.2)',
    };
  }

  if (normalized.includes('london') || normalized.includes('paris') || normalized.includes('berlin') || normalized.includes('amsterdam') || normalized.includes('europe')) {
    return {
      type: 'sapphire-fog',
      nebulaColor: 'rgba(30, 58, 138, 0.25)',
      nebulaSecondary: 'rgba(37, 99, 235, 0.15)',
      starCount: 85,
      hasAurora: false,
      meteorRate: 0.015,
      dayTint: 'rgba(254, 243, 199, 0.12)',
    };
  }

  if (normalized.includes('york') || normalized.includes('francisco') || normalized.includes('chicago') || normalized.includes('toronto') || normalized.includes('usa')) {
    return {
      type: 'celestial-gotham',
      nebulaColor: 'rgba(30, 64, 175, 0.22)',
      nebulaSecondary: 'rgba(217, 119, 6, 0.12)',
      starCount: 95,
      hasAurora: false,
      meteorRate: 0.02,
      dayTint: 'rgba(191, 219, 254, 0.15)',
    };
  }

  if (normalized.includes('sydney') || normalized.includes('melbourne') || normalized.includes('auckland') || normalized.includes('australia')) {
    return {
      type: 'oceanic-southern',
      nebulaColor: 'rgba(14, 116, 144, 0.25)',
      nebulaSecondary: 'rgba(59, 130, 246, 0.18)',
      starCount: 120,
      hasAurora: false,
      meteorRate: 0.022,
      dayTint: 'rgba(165, 243, 252, 0.18)',
    };
  }

  if (normalized.includes('dubai') || normalized.includes('riyadh') || normalized.includes('cairo')) {
    return {
      type: 'desert-obsidian',
      nebulaColor: 'rgba(67, 56, 202, 0.2)',
      nebulaSecondary: 'rgba(245, 158, 11, 0.15)',
      starCount: 140,
      hasAurora: false,
      meteorRate: 0.035,
      dayTint: 'rgba(253, 230, 138, 0.22)',
    };
  }

  // Default: Hyderabad & India (Deccan Cosmic Starfield)
  return {
    type: 'deccan-cosmic',
    nebulaColor: 'rgba(59, 130, 246, 0.22)',
    nebulaSecondary: 'rgba(99, 102, 241, 0.18)',
    starCount: 105,
    hasAurora: false,
    meteorRate: 0.02,
    dayTint: 'rgba(254, 215, 170, 0.14)',
  };
}

export default function LiveCosmicSkyCanvas({
  isNightMode,
  timePhase,
  weatherState,
  location,
  isWindy,
  windSpeed
}: LiveCosmicSkyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const profile = getLocationSkyProfile(location);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Star Field
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      vx: number;
    }> = [];

    const effectiveStarCount = isNightMode ? profile.starCount : 0;
    for (let i = 0; i < effectiveStarCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.75, // Concentrated on upper sky
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.05,
      });
    }

    // Dynamic Meteors / Shooting Stars
    const meteors: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }> = [];

    // Daytime Sun Motes / Atmospheric Particles
    const sunMotes: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      vy: number;
      vx: number;
    }> = [];

    for (let i = 0; i < 35; i++) {
      sunMotes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.4 + 0.1,
        vy: -Math.random() * 0.3 - 0.1,
        vx: (Math.random() - 0.5) * 0.2 + (windSpeed ? windSpeed * 0.02 : 0.1),
      });
    }

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. RENDER NIGHTTIME CELESTIAL SKY & METEORS
      if (isNightMode) {
        // Shifting Cosmic Nebula Gradient (Unique per location)
        const nebulaGrad = ctx.createRadialGradient(
          width * (0.35 + Math.sin(time * 0.2) * 0.08),
          height * (0.25 + Math.cos(time * 0.15) * 0.05),
          10,
          width * 0.5,
          height * 0.4,
          width * 0.65
        );
        nebulaGrad.addColorStop(0, profile.nebulaColor);
        nebulaGrad.addColorStop(0.5, profile.nebulaSecondary);
        nebulaGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = nebulaGrad;
        ctx.fillRect(0, 0, width, height);

        // Optional Aurora Borealis Wave Ribbons (for Nordic locations)
        if (profile.hasAurora) {
          ctx.save();
          for (let layer = 0; layer < 3; layer++) {
            ctx.beginPath();
            ctx.moveTo(0, height * 0.2);
            for (let x = 0; x <= width; x += 30) {
              const y =
                height * 0.18 +
                Math.sin(x * 0.003 + time * 0.8 + layer) * 45 +
                Math.cos(x * 0.006 - time * 0.5) * 25;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height * 0.45);
            ctx.lineTo(0, height * 0.45);
            ctx.closePath();

            const auroraGrad = ctx.createLinearGradient(0, height * 0.1, 0, height * 0.45);
            auroraGrad.addColorStop(0, 'rgba(52, 211, 153, 0)');
            auroraGrad.addColorStop(0.5, layer === 0 ? 'rgba(52, 211, 153, 0.18)' : 'rgba(167, 139, 250, 0.14)');
            auroraGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');

            ctx.fillStyle = auroraGrad;
            ctx.fill();
          }
          ctx.restore();
        }

        // Render Twinkling Drifting Stars
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset) * 0.35;
          star.x += star.vx;
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = star.radius > 1.2 ? 6 : 2;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Spawn Meteors / Shooting Stars
        if (Math.random() < profile.meteorRate && meteors.length < 3) {
          meteors.push({
            x: Math.random() * width * 0.8,
            y: Math.random() * height * 0.4,
            length: Math.random() * 80 + 40,
            speed: Math.random() * 12 + 10,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            alpha: 1,
            active: true,
          });
        }

        // Update & Render Meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          const tailX = m.x - Math.cos(m.angle) * m.length;
          const tailY = m.y - Math.sin(m.angle) * m.length;

          const meteorGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
          meteorGrad.addColorStop(0.3, `rgba(147, 197, 253, ${m.alpha * 0.8})`);
          meteorGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');

          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.stroke();

          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.alpha -= 0.025;

          if (m.alpha <= 0 || m.x > width || m.y > height) {
            meteors.splice(i, 1);
          }
        }
      } else {
        // 2. RENDER DAYTIME MOVING SOLAR BLOOM & ATMOSPHERIC PARTICLES
        const sunBloom = ctx.createRadialGradient(
          width * (0.65 + Math.sin(time * 0.1) * 0.04),
          height * 0.15,
          10,
          width * 0.65,
          height * 0.15,
          width * 0.5
        );
        sunBloom.addColorStop(0, profile.dayTint);
        sunBloom.addColorStop(0.6, 'rgba(255, 255, 255, 0.06)');
        sunBloom.addColorStop(1, 'transparent');

        ctx.fillStyle = sunBloom;
        ctx.fillRect(0, 0, width, height);

        // Floating Sun Motes / Golden Dust
        for (let i = 0; i < sunMotes.length; i++) {
          const mote = sunMotes[i];
          mote.x += mote.vx;
          mote.y += mote.vy;

          if (mote.y < 0) mote.y = height;
          if (mote.x > width) mote.x = 0;
          if (mote.x < 0) mote.x = width;

          ctx.beginPath();
          ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${mote.alpha * (0.8 + Math.sin(time + i) * 0.2)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isNightMode, location, timePhase, weatherState, isWindy, windSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90 transition-opacity duration-1000"
    />
  );
}
