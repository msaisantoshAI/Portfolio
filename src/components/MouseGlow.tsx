'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  
  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for fluid 60fps tracking without thrashing React state too hard
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
         setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden mix-blend-screen transition-opacity duration-1000">
      <motion.div
         className="absolute inset-0 z-0 opacity-40 dark:opacity-60"
         animate={{
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 60%)`,
         }}
         transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
    </div>
  );
}
