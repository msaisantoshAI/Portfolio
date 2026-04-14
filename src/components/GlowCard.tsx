'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

export default function GlowCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.15), transparent 80%)`;

  return (
    <motion.div 
       ref={containerRef}
       onMouseMove={handleMouseMove}
       className={`relative flex flex-col group/glow p-[1px] md:p-[2px] transition-all rounded-[2rem] hover:-translate-y-1 hover:shadow-2xl duration-700 ${className}`}
    >
        {/* Base static border & shadow */}
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10 group-hover/glow:ring-blue-500/50 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-[#16181d]/50" />

        {/* Animated spinning gradient border on Hover */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden opacity-0 group-hover/glow:opacity-100 transition-opacity duration-700 blur-[1px]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2500px] h-[2500px] bg-[conic-gradient(transparent,transparent,#3b82f6,#8b5cf6,#06b6d4,transparent)] animate-[spin_4s_linear_infinite]" />
        </div>
        
        {/* Main Card Content Container Layer */}
        <div className="relative w-full h-full bg-[#16181d] border border-white/5 rounded-[calc(2rem-1px)] md:rounded-[calc(2rem-2px)] overflow-hidden z-10 box-border">
          
          {/* Spotlight tracking cursor */}
          <motion.div 
             className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/glow:opacity-100 transition-opacity duration-700"
             style={{ background: spotlightBg }}
          />

          <div className="relative z-10 h-full w-full">
            {children}
          </div>
        </div>
    </motion.div>
  );
}
