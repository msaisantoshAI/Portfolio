'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "Sai possesses that rare dual capability of a world-class visual artist combined with a rigorous systems thinker. His work on the Task Management System completely overhauled our operators' daily throughput while reducing triage errors by over 80%.",
    author: "Enterprise Delivery Director",
    role: "Global Operations & Delivery",
    company: "Tata Consultancy Services (TCS)"
  },
  {
    quote: "When developing complex AI agent workflows, the hardest challenge is preventing operator cognitive overload. Sai designed an interface that gave our operators total clarity, verifiable audit traces, and complete confidence in autonomous actions.",
    author: "Head of Product & AI",
    role: "Cognitive Platform Group",
    company: "Enterprise AI Client Partner"
  },
  {
    quote: "Sai speaks the language of engineering just as fluently as design. His tokens were immaculate, his WCAG accessibility was verified out of the box, and handoffs were the smoothest our front-end team has ever experienced.",
    author: "Senior Engineering Lead",
    role: "Core Architecture & Platform",
    company: "Enterprise SaaS Initiative"
  }
];

export default function EditorialTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. SECTION LABEL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">
          08 // TESTIMONIALS
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
          Peer Endorsements &amp; Leadership Feedback
        </h2>
      </motion.div>

      {/* 3. LARGE EDITORIAL QUOTATION SHOWCASE */}
      <div className="relative p-8 sm:p-14 lg:p-16 rounded-3xl bg-white/40 dark:bg-[#0b0f1a]/70 backdrop-blur-2xl border border-slate-200/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)]">
        
        {/* Large Decorative Quotation Mark */}
        <span className="absolute top-6 left-8 sm:top-10 sm:left-12 text-6xl sm:text-8xl font-serif text-blue-500/20 dark:text-blue-400/20 pointer-events-none select-none">
          &ldquo;
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative z-10 max-w-4xl"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-900 dark:text-white leading-relaxed mb-8 sm:mb-12">
              &ldquo;{current.quote}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200/50 dark:border-white/10">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {current.author}
                </h4>
                <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {current.role} &bull; <span className="text-slate-500 dark:text-zinc-400">{current.company}</span>
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="touch-target w-11 h-11 rounded-full bg-white/80 dark:bg-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-slate-200/70 dark:border-white/15 flex items-center justify-center text-slate-800 dark:text-white transition-all shadow-sm active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="touch-target w-11 h-11 rounded-full bg-white/80 dark:bg-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-slate-200/70 dark:border-white/15 flex items-center justify-center text-slate-800 dark:text-white transition-all shadow-sm active:scale-95"
                  aria-label="Next Testimonial"
                >
                  &rarr;
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

    </section>
  );
}
