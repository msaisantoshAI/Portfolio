'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  // Split strictly by spaces to animate words individually
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
         <span key={i} className="inline-flex overflow-hidden mr-[0.25em] py-2 -my-2">
             <motion.span
                className="inline-block origin-bottom leading-[1.2]"
                initial={{ y: "100%", opacity: 0, rotate: 5 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                   duration: 0.8, 
                   ease: [0.16, 1, 0.3, 1], // Cinematic custom bezier ease-out
                   delay: delay + (i * 0.04)   // Slight stagger
                }}
             >
                {word}
             </motion.span>
         </span>
      ))}
    </span>
  );
}
