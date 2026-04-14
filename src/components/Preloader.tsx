'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Progress Counter Engine
    const duration = 6000; 
    const interval = 30;
    const step = 100 / (duration / interval);
    
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setIsLoading(false), 1000); 
          return 100;
        }
        return prev + step;
      });
    }, interval);

    // Audio Playback Reliability Logic (Silent Fallback)
    const videoElement = document.getElementById('preloader-video') as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = false;
      videoElement.volume = 0.8;
      videoElement.play().catch(() => {
        // Browser blocked audio - Force muted playback to ensure video still shows
        videoElement.muted = true;
        videoElement.play();
      });
    }

    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 2.5, filter: "blur(20px)" }}
          transition={{ duration: 1.5, ease: [0.64, 0, 0.78, 0] }}
          className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col justify-end overflow-hidden"
        >
          {/* Background Cinematic Video Sequence */}
          <div className="absolute inset-0 z-0">
            <video
              id="preloader-video"
              autoPlay
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            >
              <source src="/sequence/intro.mp4" type="video/mp4" />
            </video>
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#121212]/30 to-transparent" />
          </div>

          {/* Loading Indicator HUD */}
          <div className="relative z-10 p-12 w-full flex justify-between items-end">
             <div className="flex flex-col">
                <span className="text-white/50 font-mono text-xs tracking-[0.3em] uppercase mb-4">Loading Portfolio Experience</span>
                
                <div className="flex items-baseline space-x-2">
                   <motion.span 
                      className="text-6xl md:text-8xl text-white tracking-tighter font-bold"
                   >
                      {Math.floor(progress)}
                   </motion.span>
                   <span className="text-xl md:text-2xl text-blue-500 font-light opacity-50">%</span>
                </div>
             </div>
             
             {/* Dynamic loading bar */}
             <div className="w-1/3 max-w-sm h-0.5 bg-white/10 relative overflow-hidden mb-4 hidden md:block">
               <motion.div 
                 className="absolute top-0 left-0 bottom-0 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                 style={{ width: `${progress}%` }}
               />
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
