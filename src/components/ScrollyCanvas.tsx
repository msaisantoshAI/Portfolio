'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Overlay from '@/components/Overlay';

const FRAME_COUNT = 89;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const currentIndex = useRef(0);

  const getFrameUrl = (index: number) => {
    // Exact mapping to prompt: frame_00_delay-0.067s.webp
    const paddedIndex = index.toString().padStart(2, '0');
    return `/sequence/frame_${paddedIndex}_delay-0.067s.webp`;
  };

  const renderFrame = (index: number, imgOverride?: HTMLImageElement) => {
    const img = imgOverride || images[index];
    if (!canvasRef.current || !img || !img.complete) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const preloadImages = async () => {
      const cache: HTMLImageElement[] = new Array(FRAME_COUNT);
      let loadedCount = 0;

      // Phase 1: Load even frames + frame 0 and last frame (for initial and final states)
      const phase1Indices = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (i % 2 === 0 || i === FRAME_COUNT - 1) phase1Indices.push(i);
      }

      // Phase 2: Load odd frames (for smoothness)
      const phase2Indices = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (i % 2 !== 0 && i !== 0 && i !== FRAME_COUNT - 1) phase2Indices.push(i);
      }

      const loadIdx = (i: number) => {
        return new Promise<void>((resolve) => {
          const img = document.createElement('img');
          img.src = getFrameUrl(i);
          img.onload = () => {
            cache[i] = img;
            loadedCount++;
            setLoadedPercent(Math.floor((loadedCount / FRAME_COUNT) * 100));
            if (i === 0) {
              setIsFirstFrameReady(true);
              setTimeout(() => renderFrame(0, img), 50);
            }
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            setLoadedPercent(Math.floor((loadedCount / FRAME_COUNT) * 100));
            resolve();
          };
        });
      };

      // Run Phase 1
      await Promise.all(phase1Indices.map(loadIdx));
      setImages([...cache]); // Update state with partial cache for early interaction

      // Run Phase 2 in background (no await)
      Promise.all(phase2Indices.map(loadIdx)).then(() => {
        setImages([...cache]);
      });
    };

    preloadImages();
  }, []);

  // Guarantee canvas dimensions map to screen
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set actual canvas resolution for crispness
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrame(currentIndex.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFirstFrameReady]);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.floor(latest);
    if (idx !== currentIndex.current) {
      if (images[idx]) {
        currentIndex.current = idx;
        requestAnimationFrame(() => renderFrame(idx));
      } else {
        // Fallback to nearest loaded frame for smoothness if phase 2 isn't done
        const nearest = idx % 2 === 0 ? idx : Math.max(0, idx - 1);
        if (images[nearest]) {
          currentIndex.current = nearest;
          requestAnimationFrame(() => renderFrame(nearest));
        }
      }
    }
  });

  return (
    <div ref={containerRef} className="h-[500vh] relative bg-[#03050c]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Render text overlay synced to the EXACT canvas height ref */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* Loading Overlay */}
        {loadedPercent < 100 && (
          <div className={`absolute inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-1000 ${loadedPercent > 50 ? 'bg-black/40 backdrop-blur-sm' : 'bg-[#03050c]'}`}>
            <div className="text-white shrink-0 text-sm font-medium tracking-widest uppercase font-mono">
              Loading Resources {loadedPercent}%
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="block w-full h-full transition-opacity duration-1000"
          style={{ opacity: isFirstFrameReady ? 1 : 0 }}
        />
      </div>
    </div>
  );
}
