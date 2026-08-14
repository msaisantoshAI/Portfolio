'use client';

import React from 'react';

interface TestimonialCard {
  author: string;
  role: string;
  quote: string;
  rotation: string;
  borderColor: string;
  tag: string;
  accent: string;
}

const testimonials: TestimonialCard[] = [
  {
    author: 'Design Lead & Manager',
    role: 'Enterprise SaaS Division, TCS',
    quote: '“Sai Santosh has an incredible talent for dissecting chaotic requirements into clean, scalable design systems. His work on eSOW saved hundreds of operational hours.”',
    rotation: 'rotate-[-2deg]',
    borderColor: 'border-blue-500/30',
    tag: '⚡ SPEED & SCALE',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  {
    author: 'Senior Solutions Architect',
    role: 'Infrastructure & Cloud Systems',
    quote: '“Rarely do you meet a designer who understands technical architecture so deeply. His intuition for edge cases made our front-end delivery seamless.”',
    rotation: 'rotate-[2deg]',
    borderColor: 'border-cyan-500/30',
    tag: '🛠️ TECHNICAL EMPATHY',
    accent: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    author: 'Workshop Attendee',
    role: 'AI UX Masterclass Participant',
    quote: '“Truly eye-opening session on generative workflows! Santosh made complex AI models feel practical and accessible for designers.”',
    rotation: 'rotate-[-1deg]',
    borderColor: 'border-purple-500/30',
    tag: '🎯 MENTORSHIP & CLARITY',
    accent: 'text-purple-600 dark:text-purple-400',
  },
  {
    author: 'Product Manager',
    role: 'Digital Innovation Team',
    quote: '“His data-first mindset paired with rapid Figma prototyping enabled us to validate user hypotheses weeks ahead of schedule.”',
    rotation: 'rotate-[2.5deg]',
    borderColor: 'border-amber-500/30',
    tag: '📈 PRODUCT THINKING',
    accent: 'text-amber-600 dark:text-amber-400',
  },
];

export default function BenTestimonials() {
  return (
    <section className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/85 dark:bg-zinc-900/85 border border-black/5 dark:border-white/10 p-8 md:p-14 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl space-y-12 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Peer Feedback &amp; Collaborations
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            What&apos;s it like working with me?
          </h2>
          <p className="text-base sm:text-xl font-light text-zinc-600 dark:text-zinc-400 leading-relaxed">
            I believe by working hard, being kind, and obsessing over craft — <span className="text-zinc-900 dark:text-white font-medium">amazing things happen.</span>
          </p>
        </div>

        {/* Scattered Sticky Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`transform ${item.rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-300 rounded-3xl border ${item.borderColor} bg-zinc-50 dark:bg-black/60 p-8 shadow-md hover:shadow-xl backdrop-blur-md flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-800 dark:text-white/90 bg-white dark:bg-white/10 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 shadow-sm">
                    {item.tag}
                  </span>
                  <div className="flex text-amber-500 dark:text-amber-400 text-xs gap-1">
                    ★★★★★
                  </div>
                </div>

                <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-200 font-light leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {item.author}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {item.role}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-full bg-white dark:bg-white/10 border border-black/10 dark:border-white/20 flex items-center justify-center text-xs font-mono ${item.accent}`}>
                  ✦
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
