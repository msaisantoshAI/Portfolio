'use client';

import React, { useEffect, useRef } from 'react';

interface HeroBreezeCanvasProps {
  isNight: boolean;
  isSunset: boolean;
  isRainy: boolean;
}

export default function HeroBreezeCanvas({ isNight, isSunset, isRainy }: HeroBreezeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Floating Dandelion Spores / Breeze Particles
    const sporeCount = isRainy ? 15 : isNight ? 25 : 35;
    const spores: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      oscillation: number;
      oscSpeed: number;
    }> = [];

    for (let i = 0; i < sporeCount; i++) {
      spores.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 1,
        speedX: Math.random() * 0.8 + 0.3,
        speedY: (Math.random() - 0.5) * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.3,
        oscillation: Math.random() * Math.PI * 2,
        oscSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Determine particle color based on lighting state
      let fillStyle = 'rgba(255, 255, 255, ';
      if (isSunset) {
        fillStyle = 'rgba(255, 220, 160, ';
      } else if (isNight) {
        fillStyle = 'rgba(180, 220, 255, ';
      } else if (isRainy) {
        fillStyle = 'rgba(200, 220, 240, ';
      }

      for (let i = 0; i < spores.length; i++) {
        const s = spores[i];
        s.oscillation += s.oscSpeed;
        s.x += s.speedX + Math.cos(s.oscillation) * 0.4;
        s.y += s.speedY + Math.sin(s.oscillation) * 0.3;

        // Wrap around screen
        if (s.x > width + 20) s.x = -20;
        if (s.x < -20) s.x = width + 20;
        if (s.y > height + 20) s.y = -20;
        if (s.y < -20) s.y = height + 20;

        // Draw soft glowing dandelion spore / breeze mote
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${fillStyle}${s.opacity * (0.8 + Math.sin(s.oscillation) * 0.2)})`;
        ctx.fill();

        // Draw soft glow
        if (s.size > 2) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `${fillStyle}${s.opacity * 0.25})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isNight, isSunset, isRainy]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
