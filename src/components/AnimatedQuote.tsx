'use client';
import React from 'react';
import { motion } from 'framer-motion';

const fullText = "AI can be powerful, clever, and new — but it’s useless if humans don’t know what to do with it. That’s exactly where a UX designer becomes essential";

export default function AnimatedQuote() {
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-32 relative flex items-center justify-center text-center">
      <div className="max-w-4xl flex flex-col items-center justify-center">
         <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-3 mb-8"
         >
            <div className="h-[1px] w-6 bg-blue-500/30" />
            <span className="text-[10px] md:text-xs font-mono text-blue-500/60 uppercase tracking-[0.5em]">My Philosophy</span>
            <div className="h-[1px] w-6 bg-blue-500/30" />
         </motion.div>
         
         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-lg md:text-2xl font-medium leading-relaxed tracking-tight max-w-3xl text-white"
         >
            {fullText}
         </motion.p>
         
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            viewport={{ once: true }}
            className="mt-2 flex flex-col items-center"
         >
              <div className="w-px h-4 bg-gradient-to-b from-blue-500/40 to-transparent mb-2" />
              <span className="text-[10px] md:text-xs text-white/60 font-light tracking-[0.3em] uppercase">Sai Santosh</span>
         </motion.div>
      </div>
    </section>
  );
}
