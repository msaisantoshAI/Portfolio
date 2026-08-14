'use client';

import React from 'react';

interface TestimonialCard {
  author: string;
  role: string;
  avatar?: string;
  quote: string;
  rotation: string;
  borderColor: string;
  bgGradient: string;
  tag: string;
}

const testimonials: TestimonialCard[] = [
  {
    author: 'Design Lead & Manager',
    role: 'Enterprise SaaS Division, TCS',
    quote: '“Sai Santosh has an incredible talent for dissecting chaotic requirements into clean, scalable design systems. His work on eSOW saved hundreds of operational hours.”',
    rotation: 'rotate-[-2deg]',
    borderColor: 'border-blue-400/40',
    bgGradient: 'from-blue-950/40 to-black/80',
    tag: '⚡ SPEED & SCALE',
  },
  {
    author: 'Senior Solutions Architect',
    role: 'Infrastructure & Cloud Systems',
    quote: '“Rarely do you meet a designer who understands technical architecture so deeply. His intuition for edge cases made our front-end delivery seamless.”',
    rotation: 'rotate-[2deg]',
    borderColor: 'border-cyan-400/40',
    bgGradient: 'from-cyan-950/40 to-black/80',
    tag: '🛠️ TECHNICAL EMPATHY',
  },
  {
    author: 'Workshop Attendee',
    role: 'AI UX Masterclass Participant',
    quote: '“Truly eye-opening session on generative workflows! Santosh made complex AI models feel practical and accessible for designers.”',
    rotation: 'rotate-[-1deg]',
    borderColor: 'border-purple-400/40',
    bgGradient: 'from-purple-950/40 to-black/80',
    tag: '🎯 MENTORSHIP & CLARITY',
  },
  {
    author: 'Product Manager',
    role: 'Digital Innovation Team',
    quote: '“His data-first mindset paired with rapid Figma prototyping enabled us to validate user hypotheses weeks ahead of schedule.”',
    rotation: 'rotate-[3deg]',
    borderColor: 'border-amber-400/40',
    bgGradient: 'from-amber-950/40 to-black/80',
    tag: '📈 PRODUCT THINKING',
  },
];

export default function BenTestimonials() {
  return (
    <section className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-zinc-900/80 border border-white/10 p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-400 font-semibold">
            Peer Feedback &amp; Collaborations
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            What&apos;s it like working with me?
          </h2>
          <p className="text-base sm:text-xl font-light text-zinc-400 leading-relaxed">
            I believe by working hard, being kind, and obsessing over craft — <span className="text-white font-medium">amazing things happen.</span>
          </p>
        </div>

        {/* Scattered Sticky Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`transform ${item.rotation} hover:rotate-0 hover:scale-[1.02] transition-all duration-300 rounded-3xl border ${item.borderColor} bg-gradient-to-br ${item.bgGradient} p-8 shadow-2xl backdrop-blur-md flex flex-col justify-between space-y-6`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    {item.tag}
                  </span>
                  <div className="flex text-amber-400 text-xs gap-1">
                    ★★★★★
                  </div>
                </div>

                <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed italic">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {item.author}
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono">
                    {item.role}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-mono text-white">
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
