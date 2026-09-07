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
      <div className="rounded-[32px] bg-white dark:bg-[#28282B] border border-black/10 dark:border-white/12 p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-md backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto border-b border-black/5 dark:border-white/10 pb-5">
          <p className="eyebrow text-zinc-500 dark:text-zinc-400 font-mono">
            Peer Feedback &amp; Collaboration
          </p>
          <h2 className="section-heading text-zinc-950 dark:text-white">
            What&apos;s it like working with me?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
            Unfiltered notes from engineering leaders, product managers, and design teammates.
          </p>
        </div>

        {/* 4 Pinned Paper Note Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 sm:p-8 bg-zinc-50/90 dark:bg-[#333338]/60 border border-black/10 dark:border-white/10 shadow-xs hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 transform ${item.rotation} hover:rotate-0 flex flex-col justify-between space-y-4`}
            >
              {/* Top Pin / Tag */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-zinc-900 dark:text-white border border-black/10 dark:border-white/15">
                  {item.tag}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shadow-inner border border-zinc-400/40" />
              </div>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal italic">
                {item.quote}
              </p>

              {/* Author Footer */}
              <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {item.author}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {item.role} &bull; <span className="font-semibold">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
