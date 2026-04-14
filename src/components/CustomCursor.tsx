'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // High-performance spring mechanics for the dragging glass halo
  const springConfig = { damping: 25, stiffness: 200, mass: 0.4 };
  const haloX = useSpring(cursorX, springConfig);
  const haloY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering an interactive element bounds
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') !== null ||
          target.closest('button') !== null) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* The precise Dot Tracking */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* The dragging Glass Refraction Halo */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-exclusion backdrop-blur-[2px] bg-white/[0.05]"
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          borderColor: isHovering ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
          borderWidth: isHovering ? '1px' : '1px'
        }}
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
      />
    </>
  );
}
