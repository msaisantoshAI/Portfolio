'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ARTICLES = [
  {
    num: '01',
    category: 'Design Systems & AI',
    readTime: '6 min read',
    title: 'Designing for Non-Deterministic AI: How to Build UI for Outputs That Shift',
    description: 'Why conventional static design systems fail when handling variable AI outputs, and how probabilistic UI states, confidence indicators, and undo buffers preserve user trust.',
    link: '#'
  },
  {
    num: '02',
    category: 'Enterprise SaaS Architecture',
    readTime: '8 min read',
    title: 'The Death of Form-Heavy Enterprise Software: Moving to Agentic Triage',
    description: 'Deconstructing how high-friction corporate workflows can transition from 50-field manual forms into conversational intent pipelines with real-time human verification.',
    link: '#'
  },
  {
    num: '03',
    category: 'Accessibility & Design Engineering',
    readTime: '5 min read',
    title: 'WCAG 2.2 AA in Mission-Critical Tools: Why Accessibility is Core Engineering',
    description: 'A practical framework for implementing contrast tokens, full keyboard-first traversal loops, and screen-reader semantics in dense enterprise command centers.',
    link: '#'
  }
];

export default function EditorialArticles() {
  return (
    <section id="writings" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          06 // WRITINGS
        </span>
        <div className="h-px w-12 bg-blue-500/30 dark:bg-blue-400/30" />
      </motion.div>

      {/* 2. SECTION HEADLINE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-14 sm:mb-20 max-w-3xl"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          I Write. Quite a Lot.
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-light mt-3">
          Deep dives into AI-native interface ergonomics, enterprise token architecture, and the philosophy of human-centered engineering.
        </p>
      </motion.div>

      {/* 3. EDITORIAL ARTICLE ROWS */}
      <div className="space-y-6 sm:space-y-8">
        {ARTICLES.map((art, i) => (
          <motion.a
            key={art.title}
            href={art.link}
            onClick={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="block p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-[#0b0f1a]/60 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 hover:border-blue-500/40 dark:hover:border-blue-400/40 transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Category & Read Time (3 cols) */}
              <div className="lg:col-span-3">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 block mb-1">
                  {art.num} &bull; {art.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  {art.readTime}
                </span>
              </div>

              {/* Title & Description (8 cols) */}
              <div className="lg:col-span-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {art.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 font-light leading-relaxed">
                  {art.description}
                </p>
              </div>

              {/* Arrow CTA (1 col) */}
              <div className="lg:col-span-1 flex justify-end">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all">
                  &rarr;
                </div>
              </div>

            </div>
          </motion.a>
        ))}
      </div>

    </section>
  );
}
