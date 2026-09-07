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
      <div className="rounded-[32px] bg-white dark:bg-[#121214] border border-black/10 dark:border-white/12 p-6 sm:p-10 md:p-14 shadow-md dark:shadow-[0_16px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Peer Feedback &amp; Collaboration
          </p>
          <h2 className="section-heading text-zinc-950 dark:text-white">
            What&apos;s it like working with me?
          </h2>
          <p className="body-lead text-zinc-600 dark:text-zinc-300">
            Unfiltered notes from engineering leaders, product managers, and design teammates.
          </p>
        </div>

        {/* 4 Pinned Paper Note Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 sm:p-8 bg-zinc-50 dark:bg-[#18181B] border border-black/10 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 transform ${item.rotation} hover:rotate-0 flex flex-col justify-between space-y-4`}
            >
              {/* Top Pin / Tag */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
                  {item.tag}
                </span>
                <span className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700 shadow-inner border border-zinc-400/40" />
              </div>

              {/* Quote Body */}
              <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed font-normal italic">
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
