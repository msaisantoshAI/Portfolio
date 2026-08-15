'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring mechanics for the subtle following ring
  const springConfig = { damping: 28, stiffness: 260, mass: 0.35 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on devices with fine pointer (mouse/trackpad) and screen >= 768px
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

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none">
      {/* 1. Core Dot Pointer */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* 2. Sleek Magnetic Follow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-blue-500/40 dark:border-blue-400/40 bg-blue-500/5 dark:bg-blue-400/5"
        animate={{
          width: isHovering ? 42 : 24,
          height: isHovering ? 42 : 24,
          borderColor: isHovering ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.35)',
          scale: isHovering ? 1.15 : 1,
        }}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
      />
    </div>
  );
}
