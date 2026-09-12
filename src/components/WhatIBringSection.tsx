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
    <section id="what-i-bring" className="px-5 py-8 md:px-8 lg:px-[120px] max-w-[1440px] mx-auto w-full font-sans">
      <div className="section-surface-shadow mx-auto w-full max-w-[1200px] rounded-[20px] bg-white/80 dark:bg-[#28282B] border border-black/5 dark:border-white/10 p-6 sm:p-10 md:p-12 space-y-10 transition-colors duration-300">
        
        {/* Minimal Section Header */}
        <div className="space-y-1">
          <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] font-bold leading-[1.02] tracking-[-1px] text-zinc-950 dark:text-white">
            What I bring to the table
          </h2>
          <p className="text-[17px] sm:text-[19px] lg:text-xl font-medium leading-[1.35] text-zinc-500 dark:text-zinc-400">
            Design &times; Business &times; Technology &times; AI
          </p>
        </div>

        {/* 4 Clean Minimal Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.map((item, idx) => (
            <motion.article
              key={item.pillar}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-2xl bg-zinc-50 dark:bg-[#333338]/60 border border-black/5 dark:border-white/10 p-6 sm:p-8 hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500">
                    {item.id}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">
                  {item.pillar}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
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
