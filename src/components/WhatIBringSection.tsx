'use client';

import React from 'react';
import { motion } from 'framer-motion';

const strengths = [
  {
    num: '01',
    pillar: 'Product Thinking',
    tag: 'Problem Space',
    description: 'Deconstructing complex workflows, user friction, and system architectures to design high-clarity, intuitive solutions.',
  },
  {
    num: '02',
    pillar: 'Business Alignment',
    tag: 'Growth & ROI',
    description: 'Directly connecting design decisions to business KPIs, operational velocity, retention, and measurable bottom-line value.',
  },
  {
    num: '03',
    pillar: 'AI & Systems Craft',
    tag: 'Intelligence',
    description: 'Leveraging LLMs and predictive intelligence pragmatically where they solve real-world user problems, not as gimmicks.',
  },
  {
    num: '04',
    pillar: 'Cross-functional Execution',
    tag: 'Delivery',
    description: 'Partnering closely with engineering, product management, and leadership to bring zero-to-one ideas into shipped reality.',
  },
];

export default function WhatIBringSection() {
  return (
    <section id="what-i-bring" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 md:p-14 shadow-sm backdrop-blur-2xl space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 dark:bg-white" />
              <p className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Core Value &bull; Strategic Strengths
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-zinc-950 dark:text-white tracking-tight">
              What I Bring to the Table
            </h2>
          </div>
          <div className="flex items-center">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              Design &times; Business &times; Tech &times; AI
            </span>
          </div>
        </div>

        {/* 4 Architectural Minimalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {strengths.map((item, idx) => (
            <motion.article
              key={item.pillar}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group rounded-2xl bg-zinc-50/80 dark:bg-[#18181B] border border-zinc-200/80 dark:border-zinc-800 p-6 sm:p-8 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
                    {item.num} / 04
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {item.tag}
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
                  {item.pillar}
                </h3>
                
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400 dark:text-zinc-500">
                <span>Verified Impact</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200 text-zinc-950 dark:text-white">→</span>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
