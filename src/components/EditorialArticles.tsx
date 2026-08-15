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
    <section id="writings" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
            06 // WRITINGS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.2]">
          I Write. Quite a Lot.
        </h2>
        <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-200 font-normal mt-2 max-w-2xl">
          Deep dives into AI-native interface ergonomics, enterprise token architecture, and the philosophy of human-centered engineering.
        </p>
      </motion.div>

      {/* 2. EDITORIAL ARTICLE CARDS */}
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
            className="block p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Category & Read Time (3 cols) */}
              <div className="lg:col-span-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 inline-block mb-2">
                  {art.num} &bull; {art.category}
                </span>
                <span className="text-xs text-slate-600 dark:text-zinc-400 font-semibold block">
                  {art.readTime}
                </span>
              </div>

              {/* Title & Description (8 cols) */}
              <div className="lg:col-span-8">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {art.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 font-normal leading-relaxed">
                  {art.description}
                </p>
              </div>

              {/* Arrow CTA (1 col) */}
              <div className="lg:col-span-1 flex justify-end">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all shadow-sm font-bold">
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
