'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';
import GlowCard from '@/components/GlowCard';

const steps = [
  {
    icon: "🧠",
    title: "Step 1 — Understand",
    subtitle: "Start with human, not AI.",
    questions: [
      "User's primary goal?",
      "Problem context?",
      "Success metrics?"
    ],
    focusTitle: "Focus:",
    focusPoints: ["Real human need"]
  },
  {
    icon: "🔍",
    title: "Step 2 — Explore AI Value",
    subtitle: "Use AI wisely.",
    questions: [
      "Where does AI help?",
      "Will it confuse?",
      "AI vs User roles?"
    ],
    focusTitle: "Goal:",
    focusPoints: ["Strategic AI usage"]
  },
  {
    icon: "⚠️",
    title: "Step 3 — Identify Friction",
    subtitle: "Find user struggles.",
    questions: [
      "Is it confusing?",
      "Information overload?",
      "Next steps unclear?"
    ],
    focusTitle: "Action:",
    focusPoints: ["Remove complexity"]
  },
  {
    icon: "🧩",
    title: "Step 4 — Clear Experience",
    subtitle: "Turn AI usable.",
    questions: [
      "Simple UI flows",
      "Step-by-step guides",
      "Human tonality"
    ],
    focusTitle: "Core:",
    focusPoints: ["Natural, not robotic"]
  },
  {
    icon: "🧪",
    title: "Step 5 — Test & Improve",
    subtitle: "Validate with real people.",
    questions: [
      "Instant clarity?",
      "Actionable outputs?",
      "Trust established?"
    ],
    focusTitle: "Metric:",
    focusPoints: ["Time to action"]
  }
];

export default function MyApproach() {
  return (
    <section className="max-w-[1400px] mx-auto pt-8 pb-16 relative">
       <div className="mb-12 px-4 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-4xl font-bold tracking-normal text-white mb-4">
              <TextReveal text="My Approach" delay={0.1} />
            </h2>
            <p className="text-lg md:text-xl font-light bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 tracking-wide mb-6">
               Designing Products with AI which People Can Actually Use
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            <div className="mt-6 inline-block bg-blue-500/10 border border-blue-500/20 px-6 py-2 rounded-full">
               <span className="text-blue-300 text-sm tracking-widest uppercase font-mono font-semibold">5-Step Process</span>
            </div>
       </div>

       {/* Grid Container Fitting All 5 Cards on Desktop */}
       <div className="w-full px-4 md:px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 w-full">
            {steps.map((step, i) => (
              <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="h-full w-full"
              >
                  <GlowCard className="h-full w-full">
                      <div className="p-5 md:p-6 h-full flex flex-col min-h-[350px]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-3xl md:text-4xl drop-shadow-md">{step.icon}</div>
                            <div className="text-white/20 font-mono text-lg font-bold">
                              {i + 1}
                            </div>
                        </div>
                        
                        <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-snug">{step.title}</h3>
                        <p className="text-slate-400 font-medium text-xs md:text-sm mb-4 leading-snug">{step.subtitle}</p>
                        
                        <div className="flex flex-col flex-grow">
                            <ul className="space-y-2 mb-4">
                              {step.questions.map((q, idx) => (
                                  <li key={idx} className="flex items-start text-slate-300">
                                    <span className="text-blue-500 mr-2 mt-0.5 opacity-50 text-xs">✦</span>
                                    <span className="leading-snug font-light text-xs md:text-sm">{q}</span>
                                  </li>
                              ))}
                            </ul>

                            {step.focusTitle && (
                              <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5 mt-auto relative overflow-hidden group">
                                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  <span className="text-[10px] md:text-xs font-mono text-blue-400 uppercase tracking-widest block mb-2 relative z-10">{step.focusTitle}</span>
                                  <ul className="space-y-2 relative z-10">
                                    {step.focusPoints.map((fp, idx) => (
                                        <li key={idx} className="text-white flex items-center font-medium text-xs md:text-sm drop-shadow-md leading-tight">
                                          <span className="mr-2 text-blue-500 text-xs">👉</span> {fp}
                                        </li>
                                    ))}
                                  </ul>
                              </div>
                            )}
                        </div>
                      </div>
                  </GlowCard>
              </motion.div>
            ))}
          </div>
       </div>
    </section>
  )
}
