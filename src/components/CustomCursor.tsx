'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring mechanics for subtle tracking
  const springConfig = { damping: 30, stiffness: 350, mass: 0.2 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    const isDesktop = window.innerWidth >= 768;

    if (!isFinePointer || !isDesktop) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none">
      {/* Sleek, Constant Small Circle Cursor (No Large Bloating Ball) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full border border-black/80 dark:border-white/80 pointer-events-none z-[99999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Inner Micro Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-black dark:bg-white pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
}
