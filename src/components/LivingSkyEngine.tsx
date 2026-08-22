'use client';

import React, { useEffect, useRef } from 'react';
import { useEnvironment, TimePhase, WeatherState } from '@/context/EnvironmentContext';

interface LivingSkyEngineProps {
  className?: string;
}

// Compute location-specific atmospheric & celestial profile
function getLocationAtmosphere(city: string, timePhase: TimePhase, weather: WeatherState, isDay: boolean) {
  const norm = (city || '').toLowerCase();

  // Color profiles based on Time Phase & Location
  let skyTop = '#0a1128';
  let skyMid = '#1c2541';
  let skyBottom = '#0b132b';
  let sunGlow = 'rgba(255, 200, 100, 0.4)';
  let isAurora = false;
  let meteorFrequency = 0.02;
  let nebulaColor1 = 'rgba(59, 130, 246, 0.2)';
  let nebulaColor2 = 'rgba(99, 102, 241, 0.15)';

  if (norm.includes('reykjavik') || norm.includes('oslo') || norm.includes('stockholm') || norm.includes('helsinki') || norm.includes('iceland')) {
    isAurora = true;
    meteorFrequency = 0.035;
    nebulaColor1 = 'rgba(16, 185, 129, 0.3)';
    nebulaColor2 = 'rgba(139, 92, 246, 0.25)';
  } else if (norm.includes('tokyo') || norm.includes('seoul') || norm.includes('kyoto')) {
    nebulaColor1 = 'rgba(124, 58, 237, 0.28)';
    nebulaColor2 = 'rgba(59, 130, 246, 0.22)';
    meteorFrequency = 0.03;
  } else if (norm.includes('london') || norm.includes('paris') || norm.includes('berlin')) {
    nebulaColor1 = 'rgba(30, 58, 138, 0.25)';
    nebulaColor2 = 'rgba(56, 189, 248, 0.12)';
  } else if (norm.includes('york') || norm.includes('francisco') || norm.includes('chicago')) {
    nebulaColor1 = 'rgba(29, 78, 216, 0.25)';
    nebulaColor2 = 'rgba(245, 158, 11, 0.15)';
  } else if (norm.includes('sydney') || norm.includes('melbourne')) {
    nebulaColor1 = 'rgba(13, 148, 136, 0.25)';
    nebulaColor2 = 'rgba(37, 99, 235, 0.18)';
  } else if (norm.includes('dubai') || norm.includes('riyadh')) {
    nebulaColor1 = 'rgba(79, 70, 229, 0.22)';
    nebulaColor2 = 'rgba(245, 158, 11, 0.18)';
  }

  // Realistic Rayleigh Scattering Palettes by Solar Time
  if (isDay) {
    if (timePhase === 'dawn') {
      skyTop = '#1e1b4b';
      skyMid = '#4338ca';
      skyBottom = '#fb923c';
      sunGlow = 'rgba(251, 146, 60, 0.5)';
    } else if (timePhase === 'morning') {
      skyTop = '#1e40af';
      skyMid = '#3b82f6';
      skyBottom = '#93c5fd';
      sunGlow = 'rgba(255, 250, 200, 0.6)';
    } else if (timePhase === 'goldenHour') {
      skyTop = '#1e3a8a';
      skyMid = '#c2410c';
      skyBottom = '#fbbf24';
      sunGlow = 'rgba(251, 191, 36, 0.7)';
    } else {
      // Solar Noon / Afternoon
      skyTop = '#1d4ed8';
      skyMid = '#3b82f6';
      skyBottom = '#bae6fd';
      sunGlow = 'rgba(255, 255, 255, 0.75)';
    }
  } else {
    // Night & Twilight
    if (timePhase === 'sunset') {
      skyTop = '#311042';
      skyMid = '#831843';
      skyBottom = '#ea580c';
      sunGlow = 'rgba(234, 88, 12, 0.65)';
    } else if (timePhase === 'twilight') {
      skyTop = '#0f172a';
      skyMid = '#1e1b4b';
      skyBottom = '#3b0764';
      sunGlow = 'rgba(168, 85, 247, 0.35)';
    } else {
      // Deep Night
      skyTop = '#030712';
      skyMid = '#0b132b';
      skyBottom = '#050c1e';
      sunGlow = 'rgba(147, 197, 253, 0.15)';
    }
  }

  // Weather Overrides
  if (weather === 'rain' || weather === 'heavyRain' || weather === 'thunderstorm') {
    skyTop = '#0f172a';
    skyMid = '#1e293b';
    skyBottom = '#334155';
  } else if (weather === 'fog') {
    skyTop = '#1e293b';
    skyMid = '#475569';
    skyBottom = '#64748b';
  } else if (weather === 'cloudy') {
    if (isDay) {
      skyTop = '#334155';
      skyMid = '#64748b';
      skyBottom = '#94a3b8';
    } else {
      skyTop = '#090d16';
      skyMid = '#131b2e';
      skyBottom = '#1e293b';
    }
  }

  return {
    skyTop,
    skyMid,
    skyBottom,
    sunGlow,
    isAurora,
    meteorFrequency,
    nebulaColor1,
    nebulaColor2,
  };
}

export default function LivingSkyEngine({ className = '' }: LivingSkyEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    location, 
    timePhase, 
    weatherState, 
    isDay, 
    themeMode, 
    windSpeed, 
    cloudCover,
    sunPosition,
    moonPosition
  } = useEnvironment();

  const isNightEffective = themeMode === 'dark' || (themeMode === 'system' && (!isDay || timePhase === 'night' || timePhase === 'twilight'));

  useEffect(() => {
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

    const atmos = getLocationAtmosphere(location, timePhase, weatherState, !isNightEffective);

    // 1. Photorealistic Volumetric Clouds (Generated with soft radial gradient stamps)
    const clouds: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      scaleX: number;
    }> = [];

    const cloudCount = weatherState === 'clear' ? 8 : weatherState === 'partlyCloudy' ? 24 : 45;
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * (width + 400) - 200,
        y: Math.random() * (height * 0.55),
        radius: Math.random() * 120 + 80,
        alpha: Math.random() * 0.18 + 0.06,
        speed: (Math.random() * 0.2 + 0.1) * (windSpeed ? Math.max(0.5, windSpeed / 15) : 0.8),
        scaleX: Math.random() * 1.5 + 1.2,
      });
    }

    // 2. Realistic Stars
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }> = [];

    if (isNightEffective) {
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.75),
          radius: Math.random() * 1.5 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.04 + 0.015,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    // 3. Meteors / Shooting Stars
    const meteors: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
    }> = [];

    // 4. Weather Particles (Rain / Snow)
    const rainDrops: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      alpha: number;
    }> = [];

    const isRaining = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';
    if (isRaining) {
      for (let i = 0; i < 90; i++) {
        rainDrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 25 + 15,
          speed: Math.random() * 15 + 18,
          alpha: Math.random() * 0.4 + 0.2,
        });
      }
    }

    let time = 0;
    let thunderTimer = 0;
    let isThundering = false;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // A. RENDER RAYLEIGH ATMOSPHERIC SKY GRADIENT
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, atmos.skyTop);
      skyGrad.addColorStop(0.55, atmos.skyMid);
      skyGrad.addColorStop(1, atmos.skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // B. SUN / MOON CELESTIAL GLOW
      if (!isNightEffective) {
        // Solar Radiance
        const sunX = (sunPosition?.x || 50) * 0.01 * width;
        const sunY = (sunPosition?.y || 20) * 0.01 * height;

        const sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, width * 0.45);
        sunGrad.addColorStop(0, atmos.sunGlow);
        sunGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.15)');
        sunGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Night Nebula & Moon Radiance
        const nebulaGrad = ctx.createRadialGradient(
          width * (0.4 + Math.sin(time * 0.2) * 0.1),
          height * 0.3,
          20,
          width * 0.5,
          height * 0.35,
          width * 0.7
        );
        nebulaGrad.addColorStop(0, atmos.nebulaColor1);
        nebulaGrad.addColorStop(0.5, atmos.nebulaColor2);
        nebulaGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = nebulaGrad;
        ctx.fillRect(0, 0, width, height);

        // Northern Lights Aurora Wave (Reykjavik / Nordic)
        if (atmos.isAurora) {
          ctx.save();
          for (let l = 0; l < 3; l++) {
            ctx.beginPath();
            ctx.moveTo(0, height * 0.15);
            for (let x = 0; x <= width; x += 25) {
              const y =
                height * 0.2 +
                Math.sin(x * 0.003 + time * 0.8 + l * 1.2) * 50 +
                Math.cos(x * 0.005 - time * 0.4) * 30;
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height * 0.5);
            ctx.lineTo(0, height * 0.5);
            ctx.closePath();

            const aurora = ctx.createLinearGradient(0, height * 0.1, 0, height * 0.5);
            aurora.addColorStop(0, 'transparent');
            aurora.addColorStop(0.4, l === 0 ? 'rgba(52, 211, 153, 0.22)' : 'rgba(167, 139, 250, 0.18)');
            aurora.addColorStop(1, 'transparent');
            ctx.fillStyle = aurora;
            ctx.fill();
          }
          ctx.restore();
        }

        // Render Twinkling Drifting Stars
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const alpha = s.baseAlpha + Math.sin(time * s.twinkleSpeed * 10 + s.twinkleOffset) * 0.35;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, alpha))})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.shadowBlur = s.radius > 1.2 ? 5 : 1;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Spawn Shooting Stars / Meteors
        if (Math.random() < atmos.meteorFrequency && meteors.length < 3) {
          meteors.push({
            x: Math.random() * width * 0.85,
            y: Math.random() * height * 0.4,
            length: Math.random() * 90 + 50,
            speed: Math.random() * 14 + 12,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            alpha: 1,
          });
        }

        // Render Meteors
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
          ctx.lineWidth = 2.2;
          ctx.lineCap = 'round';
          ctx.stroke();

          m.x += Math.cos(m.angle) * m.speed;
          m.y += Math.sin(m.angle) * m.speed;
          m.alpha -= 0.028;

          if (m.alpha <= 0 || m.x > width || m.y > height) {
            meteors.splice(i, 1);
          }
        }
      }

      // C. RENDER REALISTIC VOLUMETRIC DRIFTING CLOUDS (Photorealistic Volumetric Mist)
      for (let i = 0; i < clouds.length; i++) {
        const c = clouds[i];
        c.x += c.speed;
        if (c.x - c.radius * 2 > width) {
          c.x = -c.radius * 2;
          c.y = Math.random() * (height * 0.55);
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(c.scaleX, 1);

        const cloudGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, c.radius);
        const cloudTint = !isNightEffective ? 'rgba(255, 255, 255,' : 'rgba(30, 41, 59,';
        cloudGrad.addColorStop(0, `${cloudTint} ${c.alpha * 1.5})`);
        cloudGrad.addColorStop(0.6, `${cloudTint} ${c.alpha})`);
        cloudGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = cloudGrad;
        ctx.beginPath();
        ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // D. RENDER RAIN OR THUNDER
      if (isRaining) {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';

        for (let i = 0; i < rainDrops.length; i++) {
          const r = rainDrops[i];
          r.y += r.speed;
          r.x += (windSpeed || 10) * 0.1;

          if (r.y > height) {
            r.y = -20;
            r.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + 2, r.y + r.length);
          ctx.stroke();
        }

        // Thunder Lightning Flash
        if (weatherState === 'thunderstorm') {
          thunderTimer += 0.016;
          if (thunderTimer > 4 && Math.random() < 0.03) {
            isThundering = true;
            thunderTimer = 0;
          }
          if (isThundering) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.fillRect(0, 0, width, height);
            isThundering = false;
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
  }, [location, timePhase, weatherState, isDay, themeMode, windSpeed, cloudCover, sunPosition, moonPosition, isNightEffective]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
