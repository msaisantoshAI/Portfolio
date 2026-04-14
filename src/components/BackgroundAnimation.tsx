"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic Gradients */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-zinc-500/5 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px]"
      />
      
      {/* Floating Noise/Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
    </div>
  );
}
