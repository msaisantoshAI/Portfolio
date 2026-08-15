'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextMorphProps {
  words: string[];
  interval?: number;
  className?: string;
  gradient?: boolean;
}

export default function TextMorph({
  words,
  interval = 2800,
  className = '',
  gradient = true,
}: TextMorphProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="inline-block relative overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 28, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -28, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block whitespace-nowrap ${
            gradient
              ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-300 bg-clip-text text-transparent drop-shadow-sm font-bold'
              : className
          }`}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
