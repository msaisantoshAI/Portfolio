'use client';

import React from 'react';
import { motion } from 'framer-motion';

const strengths = [
  {
    id: '01',
    pillar: 'Product Thinking',
    tag: 'Design & Strategy',
    description: 'Understanding problems, users, workflows, and opportunities to design the right solutions.',
  },
  {
    id: '02',
    pillar: 'Business Mindset',
    tag: 'Growth & ROI',
    description: 'Connecting product decisions with growth, efficiency, adoption, and measurable business value.',
  },
  {
    id: '03',
    pillar: 'Technology & AI',
    tag: 'Architecture & Leverage',
    description: 'Understanding systems and exploring technology and AI where they create meaningful value.',
  },
  {
    id: '04',
    pillar: 'Cross-functional Collaboration',
    tag: 'Execution & Delivery',
    description: 'Working with product, engineering, business, and other teams to turn ideas into shipped products.',
  },
];

export default function WhatIBringSection() {
  return (
    <section id="what-i-bring" className="px-4 py-12 sm:py-16 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[36px] bg-white/95 dark:bg-[#121214]/95 border border-black/[0.08] dark:border-white/[0.1] p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-3xl space-y-10 transition-colors duration-300">
        
        {/* Minimal Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block">
              Core Value &bull; Strengths
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
              What I Bring to the Table
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white border border-black/[0.06] dark:border-white/10">
              Design &times; Business &times; Technology &times; AI
            </span>
          </div>
        </div>

        {/* 4 Clean Minimal Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.map((item, idx) => (
            <motion.article
              key={item.pillar}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-3xl bg-zinc-50/80 dark:bg-[#18181B]/80 border border-black/[0.06] dark:border-white/[0.08] p-8 md:p-10 hover:border-black/25 dark:hover:border-white/25 transition-all duration-200 flex flex-col justify-between space-y-6 shadow-2xs group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                    {item.id}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
                  {item.pillar}
                </h3>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
