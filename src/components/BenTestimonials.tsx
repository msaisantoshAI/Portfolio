'use client';

import React from 'react';

interface TestimonialCard {
  author: string;
  role: string;
  company: string;
  quote: string;
  rotation: string;
  borderColor: string;
  tag: string;
  accent: string;
}

const testimonials: TestimonialCard[] = [
  {
    author: 'Design Lead & Manager',
    role: 'Enterprise Digital Solutions',
    company: 'Tata Consultancy Services',
    quote: '“Sai Santosh has an exceptional ability to dissect chaotic requirements into clean, scalable design systems. His UX architecture on the eSOW platform directly eliminated weeks of delivery turnaround time.”',
    rotation: 'rotate-[-1.5deg]',
    borderColor: 'border-blue-500/30',
    tag: '⚡ SPEED & SCALE',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  {
    author: 'Principal Solutions Architect',
    role: 'Infrastructure & Cloud Systems',
    company: 'Global Enterprise Delivery',
    quote: '“Rarely do you meet a designer who understands technical architecture and edge cases so deeply. His intuition for user flows made our front-end delivery seamless and highly resilient.”',
    rotation: 'rotate-[1.5deg]',
    borderColor: 'border-cyan-500/30',
    tag: '🛠️ TECHNICAL EMPATHY',
    accent: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    author: 'Product Manager',
    role: 'Digital Innovation Team',
    company: 'Enterprise SaaS Division',
    quote: '“His data-driven mindset paired with rapid interactive prototyping enabled us to validate complex user hypotheses with stakeholders weeks ahead of schedule.”',
    rotation: 'rotate-[-1deg]',
    borderColor: 'border-amber-500/30',
    tag: '📈 PRODUCT THINKING',
    accent: 'text-amber-600 dark:text-amber-400',
  },
  {
    author: 'Design Guild Lead',
    role: 'AI UX & Masterclass Community',
    company: 'Design Matters Community',
    quote: '“Truly actionable sessions on generative workflows. Santosh demystifies complex AI models and turns them into concrete, human-centered UI patterns that designers can apply immediately.”',
    rotation: 'rotate-[2deg]',
    borderColor: 'border-purple-500/30',
    tag: '🎯 MENTORSHIP & CLARITY',
    accent: 'text-purple-600 dark:text-purple-400',
  },
];

export default function BenTestimonials() {
  return (
    <section className="px-4 py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-10 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Peer Feedback &amp; Collaboration
          </p>
          <h2 className="section-heading text-zinc-900 dark:text-white">
            What&apos;s it like working with me?
          </h2>
          <p className="body-lead text-zinc-600 dark:text-zinc-400 mx-auto">
            I believe by working hard, being kind, and obsessing over craft — <span className="text-zinc-900 dark:text-white font-medium">real product impact happens.</span>
          </p>
        </div>

        {/* Scattered Sticky Cards Grid (Stars removed for senior credibility) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className={`transform ${item.rotation} hover:rotate-0 hover:scale-[1.015] transition-all duration-300 rounded-3xl border ${item.borderColor} bg-zinc-50 dark:bg-black/50 p-6 sm:p-8 shadow-sm hover:shadow-md backdrop-blur-md flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-800 dark:text-zinc-200 bg-white dark:bg-white/10 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 shadow-sm">
                    {item.tag}
                  </span>
                  <span className={`text-xs font-mono font-bold ${item.accent}`}>
                    ✦ Verified Colleague
                  </span>
                </div>

                <p className="body-copy text-zinc-700 dark:text-zinc-200 italic">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {item.author}
                  </h3>
                  <p className="caption-meta text-zinc-500 dark:text-zinc-400 font-mono">
                    {item.role} &bull; {item.company}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-xs font-mono ${item.accent}`} aria-hidden="true">
                  ✦
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
