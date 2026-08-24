'use client';

import React from 'react';

interface TestimonialCard {
  author: string;
  role: string;
  company: string;
  quote: string;
  rotation: string;
  tag: string;
}

const testimonials: TestimonialCard[] = [
  {
    author: 'Design Lead & Manager',
    role: 'Enterprise Digital Solutions',
    company: 'Tata Consultancy Services',
    quote: '“Sai Santosh has an exceptional ability to turn chaotic requirements into clean, scalable design systems. His eSOW UX architecture directly eliminated weeks of delivery turnaround time.”',
    rotation: '-rotate-1',
    tag: 'SPEED & SCALE',
  },
  {
    author: 'Principal Solutions Architect',
    role: 'Infrastructure & Cloud Systems',
    company: 'Global Enterprise Delivery',
    quote: '“Rarely do you meet a designer with such deep technical empathy. His intuitive information architecture made our complex frontend engineering seamless and resilient.”',
    rotation: 'rotate-1',
    tag: 'TECHNICAL EMPATHY',
  },
  {
    author: 'Product Manager',
    role: 'Digital Innovation Team',
    company: 'Enterprise SaaS Division',
    quote: '“His data-driven mindset paired with rapid interactive prototyping allowed us to validate complex product hypotheses with executive stakeholders weeks ahead of schedule.”',
    rotation: '-rotate-1',
    tag: 'PRODUCT THINKING',
  },
  {
    author: 'Design Guild Lead',
    role: 'AI UX & Masterclass Community',
    company: 'Design Matters Community',
    quote: '“Truly actionable masterclasses on generative design. Santosh turns complex AI models into concrete, human-centered UI patterns that designers can ship immediately.”',
    rotation: 'rotate-1',
    tag: 'AI MENTORSHIP',
  },
];

export default function BenTestimonials() {
  return (
    <section className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Peer Feedback &amp; Collaboration
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            What&apos;s it like working with me?
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mx-auto leading-relaxed">
            Working hard, being kind, and obsessing over craft &mdash; <span className="text-zinc-900 dark:text-white font-semibold">real product impact happens.</span>
          </p>
        </div>

        {/* Pinned Paper Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className={`relative transform ${item.rotation} hover:rotate-0 hover:scale-[1.015] transition-all duration-300 rounded-2xl border border-black/10 dark:border-white/15 bg-[#faf8f5] dark:bg-[#111728] p-6 sm:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-5 select-none`}
            >
              {/* Pushpin Thumbtack on Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_3px_8px_rgba(0,0,0,0.35)] border-2 border-white dark:border-zinc-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-xs" />
                </div>
              </div>

              {/* Tag & Verification */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                    📌 {item.tag}
                  </span>
                  <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                    ✦ Verified Colleague
                  </span>
                </div>

                {/* Quote Content */}
                <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 italic leading-relaxed font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Author Details Footer */}
              <div className="pt-3.5 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {item.author}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {item.role} &bull; {item.company}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs text-zinc-500 dark:text-zinc-400">
                  ✎
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
