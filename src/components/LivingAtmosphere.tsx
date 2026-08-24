'use client';

import React, { useEffect, useRef } from 'react';
import { useEnvironment, LocationRegion } from '@/context/EnvironmentContext';

interface LivingAtmosphereProps {
  mousePos?: { x: number; y: number };
  isHero?: boolean;
}

// Generate a deterministic seed from location string & coordinates
function getLocationSeed(location: string, lat: number, lon: number): number {
  let hash = Math.abs(Math.round(lat * 100) * 31 + Math.round(lon * 100) * 17);
  for (let i = 0; i < location.length; i++) {
    hash = (hash << 5) - hash + location.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Location-specific celestial and atmospheric presets
interface LocationAtmosphereProfile {
  name: string;
  nightSkyGradients: string[];
  auroraColor?: string;
  nebulaColor: string;
  starDensity: number; // 80 to 200
  cloudTint: string;
  dayAtmosphereTint: string;
  hazeColor: string;
  specialEffect?: 'aurora' | 'shootingStars' | 'cosmicDust' | 'cityGlow' | 'coastalMist';
}

function getLocationProfile(
  location: string, 
  country: string, 
  region: LocationRegion, 
  lat: number, 
  lon: number
): LocationAtmosphereProfile {
  const locLower = `${location} ${country}`.toLowerCase();
  const seed = getLocationSeed(location, lat, lon);

  // 1. TOKYO / EAST ASIA: Deep cyber-violet cosmic night, shimmering stardust, glowing horizon
  if (locLower.includes('tokyo') || locLower.includes('japan') || locLower.includes('seoul') || region === 'asia') {
    return {
      name: 'Tokyo / East Asia',
      nightSkyGradients: ['#04020a', '#0d0822', '#1a0b36', '#2b104d'],
      nebulaColor: 'rgba(168, 85, 247, 0.18)',
      starDensity: 140,
      cloudTint: 'rgba(192, 132, 252, 0.35)',
      dayAtmosphereTint: 'rgba(129, 140, 248, 0.12)',
      hazeColor: 'rgba(147, 51, 234, 0.2)',
      specialEffect: 'cosmicDust',
    };
  }

  // 2. LONDON / NORTHERN EUROPE: Deep navy mist, soft aurora borealis ribbons, cool overcast drift
  if (locLower.includes('london') || locLower.includes('paris') || locLower.includes('berlin') || locLower.includes('europe') || region === 'europe' || lat > 48) {
    return {
      name: 'London / Northern Europe',
      nightSkyGradients: ['#020611', '#061226', '#0b203d', '#0d324d'],
      auroraColor: 'rgba(52, 211, 153, 0.22)',
      nebulaColor: 'rgba(56, 189, 248, 0.15)',
      starDensity: 110,
      cloudTint: 'rgba(148, 163, 184, 0.4)',
      dayAtmosphereTint: 'rgba(186, 230, 253, 0.15)',
      hazeColor: 'rgba(14, 165, 233, 0.18)',
      specialEffect: 'aurora',
    };
  }

  // 3. NEW YORK / US EAST COAST: Midnight electric cobalt, crisp high-density stars, silver lunar glare
  if (locLower.includes('york') || locLower.includes('boston') || locLower.includes('toronto') || region === 'us' && lon > -85) {
    return {
      name: 'New York / US East',
      nightSkyGradients: ['#02040a', '#071124', '#0d1f42', '#122e5e'],
      nebulaColor: 'rgba(59, 130, 246, 0.2)',
      starDensity: 160,
      cloudTint: 'rgba(191, 219, 254, 0.35)',
      dayAtmosphereTint: 'rgba(96, 165, 250, 0.14)',
      hazeColor: 'rgba(37, 99, 235, 0.22)',
      specialEffect: 'shootingStars',
    };
  }

  // 4. SAN FRANCISCO / WEST COAST: Twilight violet-amber horizon, Pacific coastal mist
  if (locLower.includes('francisco') || locLower.includes('seattle') || locLower.includes('california') || (region === 'us' && lon <= -85)) {
    return {
      name: 'San Francisco / West Coast',
      nightSkyGradients: ['#04030d', '#0e0b24', '#1e133d', '#321b4a'],
      nebulaColor: 'rgba(236, 72, 153, 0.15)',
      starDensity: 135,
      cloudTint: 'rgba(244, 114, 182, 0.3)',
      dayAtmosphereTint: 'rgba(251, 146, 60, 0.12)',
      hazeColor: 'rgba(217, 70, 239, 0.18)',
      specialEffect: 'coastalMist',
    };
  }

  // 5. HYDERABAD / INDIA: Warm celestial sapphire, golden horizon glow, rich tropical star canopy
  if (locLower.includes('india') || locLower.includes('hyderabad') || locLower.includes('mumbai') || locLower.includes('delhi') || region === 'india') {
    return {
      name: 'Hyderabad / India',
      nightSkyGradients: ['#030612', '#08142c', '#0f244a', '#173663'],
      nebulaColor: 'rgba(99, 102, 241, 0.22)',
      starDensity: 150,
      cloudTint: 'rgba(224, 231, 255, 0.38)',
      dayAtmosphereTint: 'rgba(253, 224, 71, 0.12)',
      hazeColor: 'rgba(79, 70, 229, 0.2)',
      specialEffect: 'shootingStars',
    };
  }

  // 6. SOUTHERN HEMISPHERE (Sydney, Melbourne, Cape Town, etc.)
  if (lat < 0) {
    return {
      name: 'Southern Hemisphere',
      nightSkyGradients: ['#02040e', '#061026', '#0c1d3f', '#132d5c'],
      nebulaColor: 'rgba(45, 212, 191, 0.18)',
      starDensity: 175,
      cloudTint: 'rgba(153, 246, 228, 0.3)',
      dayAtmosphereTint: 'rgba(56, 189, 248, 0.15)',
      hazeColor: 'rgba(20, 184, 166, 0.2)',
      specialEffect: 'shootingStars',
    };
  }

  // 7. DYNAMIC PROCEDURAL GENERATION (Unique for every other city in the world)
  const hue1 = (seed * 47) % 360;
  const hue2 = (hue1 + 35) % 360;
  return {
    name: location,
    nightSkyGradients: [
      '#02040a',
      `hsl(${hue1}, 65%, 8%)`,
      `hsl(${hue1}, 55%, 15%)`,
      `hsl(${hue2}, 45%, 22%)`,
    ],
    nebulaColor: `hsla(${hue1}, 75%, 60%, 0.16)`,
    starDensity: 120 + (seed % 60),
    cloudTint: `hsla(${hue1}, 40%, 80%, 0.3)`,
    dayAtmosphereTint: `hsla(${hue2}, 60%, 65%, 0.12)`,
    hazeColor: `hsla(${hue1}, 70%, 50%, 0.18)`,
    specialEffect: seed % 2 === 0 ? 'shootingStars' : 'cosmicDust',
  };
}

export default function LivingAtmosphere({ mousePos = { x: 0, y: 0 }, isHero = false }: LivingAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    location,
    country,
    region,
    latitude,
    longitude,
    timePhase,
    weatherState,
    windSpeed,
    isWindy,
    isDay,
    themeMode,
  } = useEnvironment();

  const isNight = themeMode === 'dark' || (themeMode === 'system' && (!isDay || timePhase === 'night' || timePhase === 'twilight'));
  const isSunset = timePhase === 'sunset' || timePhase === 'goldenHour';
  const isDawn = timePhase === 'dawn';
  const isRain = weatherState === 'rain' || weatherState === 'heavyRain' || weatherState === 'thunderstorm';
  const isThunder = weatherState === 'thunderstorm';

  const profile = getLocationProfile(location, country, region, latitude, longitude);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 1. Procedural Stars with Individual Twinkle Cycles
    const stars = Array.from({ length: profile.starDensity }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.85),
      size: Math.random() * 1.8 + 0.4,
      baseAlpha: Math.random() * 0.6 + 0.25,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: i % 7 === 0 ? '#93c5fd' : i % 11 === 0 ? '#ddd6fe' : '#ffffff',
    }));

    // 2. Procedural Drifting Clouds
    const cloudCount = 5;
    const clouds = Array.from({ length: cloudCount }, (_, i) => ({
      x: (i / cloudCount) * width + Math.random() * 100,
      y: (height * 0.1) + Math.random() * (height * 0.5),
      radiusX: 180 + Math.random() * 220,
      radiusY: 60 + Math.random() * 80,
      speed: (0.15 + Math.random() * 0.25) * ((windSpeed || 10) / 10),
      opacity: 0.12 + Math.random() * 0.18,
    }));

    // 3. Shooting Stars Engine
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      decay: number;
    }
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + 2000 + Math.random() * 4000;

    // 4. Rain & Atmospheric Particles
    const rainDrops = Array.from({ length: isRain ? (weatherState === 'heavyRain' ? 120 : 60) : 0 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 12 + Math.random() * 10,
      length: 15 + Math.random() * 18,
      opacity: 0.25 + Math.random() * 0.35,
    }));

    // 5. Ambient Light Motives (Floating Sunlight / Stardust)
    const dustMotes = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.4 + 0.1,
      fadeSpeed: Math.random() * 0.01 + 0.005,
    }));

    let frame = 0;
    let lightningFlash = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const mx = mousePos.x * 25;
      const my = mousePos.y * 20;

      // ----------------------------------------------------
      // A. NIGHT SKY: Dynamic Location Gradients & Nebulae
      // ----------------------------------------------------
      if (isNight) {
        // Deep Animated Cosmic Gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, profile.nightSkyGradients[0]);
        skyGrad.addColorStop(0.35, profile.nightSkyGradients[1]);
        skyGrad.addColorStop(0.7, profile.nightSkyGradients[2]);
        skyGrad.addColorStop(1, profile.nightSkyGradients[3]);

        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // Soft Moving Cosmic Nebula Sheen
        const nebulaX = width * 0.5 + Math.sin(frame * 0.005) * 60 + mx * 0.5;
        const nebulaY = height * 0.3 + Math.cos(frame * 0.004) * 30 + my * 0.5;
        const nebulaGrad = ctx.createRadialGradient(nebulaX, nebulaY, 10, nebulaX, nebulaY, width * 0.55);
        nebulaGrad.addColorStop(0, profile.nebulaColor);
        nebulaGrad.addColorStop(0.6, 'rgba(30, 27, 75, 0.05)');
        nebulaGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = nebulaGrad;
        ctx.fillRect(0, 0, width, height);

        // Aurora Ribbon Effect (for Northern Europe & High Latitudes)
        if (profile.auroraColor) {
          const auroraY = height * 0.25 + Math.sin(frame * 0.01) * 20;
          const auroraGrad = ctx.createLinearGradient(0, auroraY - 80, 0, auroraY + 120);
          auroraGrad.addColorStop(0, 'transparent');
          auroraGrad.addColorStop(0.5, profile.auroraColor);
          auroraGrad.addColorStop(1, 'transparent');

          ctx.fillStyle = auroraGrad;
          ctx.beginPath();
          ctx.moveTo(0, auroraY);
          for (let x = 0; x <= width; x += 40) {
            const wave = Math.sin(x * 0.006 + frame * 0.015) * 30 + Math.cos(x * 0.012 - frame * 0.01) * 15;
            ctx.lineTo(x, auroraY + wave);
          }
          ctx.lineTo(width, height);
          ctx.lineTo(0, height);
          ctx.closePath();
          ctx.fill();
        }

        // Twinkling Stars
        stars.forEach((star) => {
          star.twinklePhase += star.twinkleSpeed;
          const currentAlpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.35;
          const clampedAlpha = Math.max(0.1, Math.min(1, currentAlpha));

          ctx.save();
          ctx.fillStyle = star.color;
          ctx.globalAlpha = clampedAlpha;
          ctx.beginPath();
          ctx.arc(star.x + mx * 0.3, star.y + my * 0.3, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Shooting Stars
        if (Date.now() > nextShootingStarTime && profile.specialEffect === 'shootingStars') {
          shootingStars.push({
            x: Math.random() * width * 0.8 + width * 0.1,
            y: Math.random() * height * 0.35,
            length: 80 + Math.random() * 60,
            speed: 16 + Math.random() * 10,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
            opacity: 1,
            decay: 0.025 + Math.random() * 0.015,
          });
          nextShootingStarTime = Date.now() + 4000 + Math.random() * 8000;
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.opacity -= s.decay;

          if (s.opacity <= 0) {
            shootingStars.splice(i, 1);
            continue;
          }

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const sGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
          sGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          sGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.6)');
          sGrad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

          ctx.strokeStyle = sGrad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        }
      } else {
        // ----------------------------------------------------
        // B. DAYTIME / SUNSET ATMOSPHERE
        // ----------------------------------------------------
        if (isSunset) {
          const sunsetGrad = ctx.createLinearGradient(0, height * 0.3, 0, height);
          sunsetGrad.addColorStop(0, 'transparent');
          sunsetGrad.addColorStop(0.6, 'rgba(249, 115, 22, 0.18)');
          sunsetGrad.addColorStop(1, 'rgba(225, 29, 72, 0.25)');
          ctx.fillStyle = sunsetGrad;
          ctx.fillRect(0, 0, width, height);
        } else if (isDawn) {
          const dawnGrad = ctx.createLinearGradient(0, height * 0.4, 0, height);
          dawnGrad.addColorStop(0, 'transparent');
          dawnGrad.addColorStop(0.6, 'rgba(251, 146, 60, 0.14)');
          dawnGrad.addColorStop(1, 'rgba(244, 63, 94, 0.18)');
          ctx.fillStyle = dawnGrad;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // ----------------------------------------------------
      // C. PROCEDURAL DRIFTING LIVING CLOUDS (60FPS Movement)
      // ----------------------------------------------------
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.radiusX > width) {
          cloud.x = -cloud.radiusX;
          cloud.y = height * 0.1 + Math.random() * (height * 0.5);
        }

        const cx = cloud.x + mx * 0.2;
        const cy = cloud.y + my * 0.2;

        const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cloud.radiusX);
        cGrad.addColorStop(0, profile.cloudTint);
        cGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.06)');
        cGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = cGrad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, cloud.radiusX, cloud.radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // ----------------------------------------------------
      // D. FLOATING LIGHT DUST & PARTICLES
      // ----------------------------------------------------
      dustMotes.forEach((mote) => {
        mote.x += mote.speedX + (isWindy ? 0.8 : 0);
        mote.y += mote.speedY;

        if (mote.y < 0) {
          mote.y = height;
          mote.x = Math.random() * width;
        }
        if (mote.x > width) mote.x = 0;
        if (mote.x < 0) mote.x = width;

        ctx.save();
        ctx.fillStyle = isNight ? '#93c5fd' : '#fef08a';
        ctx.globalAlpha = mote.alpha;
        ctx.beginPath();
        ctx.arc(mote.x + mx * 0.5, mote.y + my * 0.5, mote.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ----------------------------------------------------
      // E. LIVE RAIN & THUNDERSTORM SIMULATION
      // ----------------------------------------------------
      if (isRain && rainDrops.length > 0) {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.4)';
        ctx.lineWidth = 1.2;

        rainDrops.forEach((drop) => {
          drop.y += drop.speed;
          drop.x += isWindy ? 2.5 : 0.5;

          if (drop.y > height) {
            drop.y = -drop.length;
            drop.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x + (isWindy ? 4 : 1), drop.y + drop.length);
          ctx.stroke();
        });

        // Thunder Lightning Flash
        if (isThunder && Math.random() < 0.008) {
          lightningFlash = 0.7;
        }
        if (lightningFlash > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${lightningFlash})`;
          ctx.fillRect(0, 0, width, height);
          lightningFlash *= 0.85;
          if (lightningFlash < 0.02) lightningFlash = 0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [profile, isNight, isSunset, isDawn, isRain, isThunder, weatherState, windSpeed, isWindy, mousePos.x, mousePos.y]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${isHero ? 'z-10' : 'z-0'}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
