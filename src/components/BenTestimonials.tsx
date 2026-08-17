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
  paperBg: string;
}

const testimonials: TestimonialCard[] = [
  {
    author: 'Design Lead & Manager',
    role: 'Enterprise Digital Solutions',
    company: 'Tata Consultancy Services',
    quote: '“Sai Santosh has an exceptional ability to dissect chaotic requirements into clean, scalable design systems. His UX architecture on the eSOW platform directly eliminated weeks of delivery turnaround time.”',
    rotation: '-rotate-2',
    pinColor: 'from-red-400 via-rose-500 to-red-700',
    tag: 'SPEED & SCALE',
    accent: 'text-blue-600 dark:text-blue-400',
    paperBg: 'bg-[#faf8f5] dark:bg-[#111728]',
  },
  {
    author: 'Principal Solutions Architect',
    role: 'Infrastructure & Cloud Systems',
    company: 'Global Enterprise Delivery',
    quote: '“Rarely do you meet a designer who understands technical architecture and edge cases so deeply. His intuition for user flows made our front-end delivery seamless and highly resilient.”',
    rotation: 'rotate-2',
    pinColor: 'from-amber-400 via-yellow-500 to-amber-700',
    tag: 'TECHNICAL EMPATHY',
    accent: 'text-cyan-600 dark:text-cyan-400',
    paperBg: 'bg-[#fcfaf7] dark:bg-[#13192c]',
  },
  {
    author: 'Product Manager',
    role: 'Digital Innovation Team',
    company: 'Enterprise SaaS Division',
    quote: '“His data-driven mindset paired with rapid interactive prototyping enabled us to validate complex user hypotheses with stakeholders weeks ahead of schedule.”',
    rotation: '-rotate-1',
    pinColor: 'from-emerald-400 via-teal-500 to-emerald-700',
    tag: 'PRODUCT THINKING',
    accent: 'text-amber-600 dark:text-amber-400',
    paperBg: 'bg-[#fdfbf7] dark:bg-[#12182a]',
  },
  {
    author: 'Design Guild Lead',
    role: 'AI UX & Masterclass Community',
    company: 'Design Matters Community',
    quote: '“Truly actionable sessions on generative workflows. Santosh demystifies complex AI models and turns them into concrete, human-centered UI patterns that designers can apply immediately.”',
    rotation: 'rotate-1.5',
    pinColor: 'from-blue-400 via-indigo-500 to-blue-700',
    tag: 'MENTORSHIP & CLARITY',
    accent: 'text-purple-600 dark:text-purple-400',
    paperBg: 'bg-[#f8f9fa] dark:bg-[#141a2e]',
  },
];

export default function BenTestimonials() {
  return (
    <section className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Peer Feedback &amp; Collaboration
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
            What&apos;s it like working with me?
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mx-auto leading-relaxed">
            I believe by working hard, being kind, and obsessing over craft — <span className="text-zinc-900 dark:text-white font-semibold">real product impact happens.</span>
          </p>
        </div>

        {/* Pinned Paper Notes Memo Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 pt-4 pb-2">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className={`relative transform ${item.rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-300 rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/15 ${item.paperBg} p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-6 select-none`}
            >
              {/* Pushpin Thumbtack on Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.pinColor} shadow-[0_3px_8px_rgba(0,0,0,0.35)] border-2 border-white dark:border-zinc-800 flex items-center justify-center`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-xs" />
                </div>
              </div>

              {/* Tag & Verification */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-zinc-800 dark:text-zinc-200 bg-black/5 dark:bg-white/10 px-3 py-1 rounded-full border border-black/5 dark:border-white/10">
                    📌 {item.tag}
                  </span>
                  <span className={`text-xs font-mono font-semibold ${item.accent}`}>
                    ✦ Verified Colleague
                  </span>
                </div>

                {/* Quote Content */}
                <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 italic leading-relaxed font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Author Details Footer */}
              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {item.author}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {item.role} &bull; {item.company}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs text-zinc-500 dark:text-zinc-400">
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
