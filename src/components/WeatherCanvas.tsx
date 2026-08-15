'use client';

import React, { useEffect, useRef } from 'react';
import { WeatherState } from '@/context/EnvironmentContext';

interface WeatherCanvasProps {
  weatherState: WeatherState;
  isDay: boolean;
}

export default function WeatherCanvas({ weatherState, isDay }: WeatherCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only render particles for rain, snow, or thunderstorm
    if (weatherState !== 'rain' && weatherState !== 'snow' && weatherState !== 'thunderstorm') {
      return;
    }

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

    // Rain particles
    const rainCount = weatherState === 'thunderstorm' ? 70 : 45;
    const raindrops = Array.from({ length: rainCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 20 + 15,
      speed: Math.random() * 8 + 12,
      opacity: Math.random() * 0.35 + 0.15,
    }));

    // Snow particles
    const snowCount = 40;
    const snowflakes = Array.from({ length: snowCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      speedY: Math.random() * 1 + 0.8,
      speedX: Math.random() * 0.8 - 0.4,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    // Thunderstorm ambient lightning flash state
    let lightningOpacity = 0;
    let nextLightningTime = Date.now() + Math.random() * 8000 + 6000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. RAIN / THUNDERSTORM
      if (weatherState === 'rain' || weatherState === 'thunderstorm') {
        ctx.strokeStyle = isDay ? 'rgba(255, 255, 255, 0.45)' : 'rgba(180, 210, 255, 0.35)';
        ctx.lineWidth = 1.2;

        for (const drop of raindrops) {
          ctx.beginPath();
          ctx.globalAlpha = drop.opacity;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 2, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          drop.x -= 1.2;

          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
          if (drop.x < 0) {
            drop.x = width;
          }
        }

        // Thunderstorm subtle ambient light flash (safe, accessible, rare)
        if (weatherState === 'thunderstorm') {
          const now = Date.now();
          if (now > nextLightningTime) {
            lightningOpacity = 0.25; // Subtle soft flash, not harsh
            nextLightningTime = now + Math.random() * 12000 + 8000;
          }

          if (lightningOpacity > 0.01) {
            ctx.fillStyle = `rgba(220, 240, 255, ${lightningOpacity})`;
            ctx.fillRect(0, 0, width, height);
            lightningOpacity *= 0.88; // Smooth decay
          }
        }
      }

      // 2. SNOW
      if (weatherState === 'snow') {
        ctx.fillStyle = '#ffffff';
        for (const flake of snowflakes) {
          ctx.beginPath();
          ctx.globalAlpha = flake.opacity;
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
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

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [weatherState, isDay]);

  if (weatherState !== 'rain' && weatherState !== 'snow' && weatherState !== 'thunderstorm') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80 transition-opacity duration-1000"
    />
  );
}
