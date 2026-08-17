'use client';

import React from 'react';

interface TestimonialCard {
  author: string;
  role: string;
  company: string;
  quote: string;
  rotation: string;
  pinColor: string;
  tag: string;
  accent: string;
}

const testimonials: TestimonialCard[] = [
  {
    author: 'Design Lead & Manager',
    role: 'Enterprise Digital Solutions',
    company: 'Tata Consultancy Services',
    quote: '“Sai Santosh has an exceptional ability to dissect chaotic requirements into clean, scalable design systems. His UX architecture on the eSOW platform directly eliminated weeks of delivery turnaround time.”',
    rotation: '-rotate-2 hover:rotate-0',
    pinColor: 'bg-red-500',
    tag: '⚡ SPEED & SCALE',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  {
    author: 'Principal Solutions Architect',
    role: 'Infrastructure & Cloud Systems',
    company: 'Global Enterprise Delivery',
    quote: '“Rarely do you meet a designer who understands technical architecture and edge cases so deeply. His intuition for user flows made our front-end delivery seamless and highly resilient.”',
    rotation: 'rotate-2 hover:rotate-0',
    pinColor: 'bg-blue-500',
    tag: '🛠️ TECHNICAL EMPATHY',
    accent: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    author: 'Product Manager',
    role: 'Digital Innovation Team',
    company: 'Enterprise SaaS Division',
    quote: '“His data-driven mindset paired with rapid interactive prototyping enabled us to validate complex user hypotheses with stakeholders weeks ahead of schedule.”',
    rotation: '-rotate-1 hover:rotate-0',
    pinColor: 'bg-amber-500',
    tag: '📈 PRODUCT THINKING',
    accent: 'text-amber-600 dark:text-amber-400',
  },
  {
    author: 'Design Guild Lead',
    role: 'AI UX & Masterclass Community',
    company: 'Design Matters Community',
    quote: '“Truly actionable sessions on generative workflows. Santosh demystifies complex AI models and turns them into concrete, human-centered UI patterns that designers can apply immediately.”',
    rotation: 'rotate-1.5 hover:rotate-0',
    pinColor: 'bg-emerald-500',
    tag: '🎯 MENTORSHIP & CLARITY',
    accent: 'text-purple-600 dark:text-purple-400',
  },
];

export default function BenTestimonials() {
  return (
    <section className="px-4 py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Peer Feedback &amp; Collaboration
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            What&apos;s it like working with me?
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mx-auto">
            I believe by working hard, being kind, and obsessing over craft — <span className="text-zinc-900 dark:text-white font-medium">real product impact happens.</span>
          </p>
        </div>

        {/* Pinned Papers / Corkboard Note Sheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-4">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className={`relative transform ${item.rotation} transition-all duration-300 hover:scale-[1.02] rounded-2xl border border-black/10 dark:border-white/15 bg-[#fffef9] dark:bg-[#111728] p-7 sm:p-9 shadow-[0_12px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-6 select-none group`}
            >
              {/* Pushpin at Top Center */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full ${item.pinColor} border-2 border-white dark:border-zinc-800 shadow-[0_4px_8px_rgba(0,0,0,0.4)] flex items-center justify-center`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
              </div>

              {/* Tag & Status */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-800 dark:text-zinc-200 bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full border border-black/5 dark:border-white/10 shadow-xs">
                    {item.tag}
                  </span>
                  <span className={`text-xs font-mono font-bold ${item.accent}`}>
                    ✦ Verified Colleague
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-200 italic leading-relaxed font-serif">
                  {item.quote}
                </p>
              </div>

              {/* Colleague Credentials */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {item.author}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {item.role} &bull; <span className="font-semibold text-zinc-800 dark:text-zinc-300">{item.company}</span>
                  </p>
                </div>
                <span className="text-xl opacity-40 group-hover:opacity-80 transition-opacity">
                  📌
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
