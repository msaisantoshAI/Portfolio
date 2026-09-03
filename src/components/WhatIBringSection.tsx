'use client';

import React from 'react';
import { motion } from 'framer-motion';

const strengths = [
  {
    pillar: 'Product Thinking',
    tag: 'Design',
    description: 'Understanding problems, users, workflows, and opportunities to design the right solutions.',
    icon: '✦',
  },
  {
    pillar: 'Business Mindset',
    tag: 'Business',
    description: 'Connecting product decisions with growth, efficiency, adoption, and measurable business value.',
    icon: '📈',
  },
  {
    pillar: 'Technology & AI',
    tag: 'Technology & AI',
    description: 'Understanding systems and exploring technology and AI where they create meaningful value.',
    icon: '⚡',
  },
  {
    pillar: 'Cross-functional Collaboration',
    tag: 'Execution',
    description: 'Working with product, engineering, business, and other teams to turn ideas into shipped products.',
    icon: '🤝',
  },
];

export default function WhatIBringSection() {
  return (
    <section id="what-i-bring" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-black/5 dark:border-white/10 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <p className="eyebrow text-blue-600 dark:text-blue-400">
              Core Strengths &bull; Value Creation
            </p>
            <h2 className="section-heading text-zinc-900 dark:text-white">
              What I Bring to the Table
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
              Design &times; Business &times; Technology &times; AI
            </span>
          </div>
        </div>

        {/* 4 Simple Bento Cards (1-Sentence Descriptions for Instant 10-15s Scan) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
          {strengths.map((item, idx) => (
            <motion.article
              key={item.pillar}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl bg-zinc-50/90 dark:bg-black/40 border border-black/10 dark:border-white/10 p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-base sm:text-lg">{item.icon}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
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
