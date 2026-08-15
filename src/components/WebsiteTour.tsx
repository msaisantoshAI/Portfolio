'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  id: string;
  targetId: string;
  badge: string;
  title: string;
  description: string;
  icon: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'environment',
    targetId: 'home',
    badge: 'Step 1 / 7',
    icon: '🌤️',
    title: 'Living Sky & Atmosphere',
    description: 'This website is a living environmental canvas synchronized with your local time, daylight phase, weather, and gentle wind breeze.'
  },
  {
    id: 'about',
    targetId: 'about',
    badge: 'Step 2 / 7',
    icon: '🎨',
    title: 'Creative & Technical Foundations',
    description: 'Starting in Fine Arts & Visual Thinking, transitioning into enterprise SaaS systems and human-in-the-loop AI interfaces.'
  },
  {
    id: 'experience',
    targetId: 'experience',
    badge: 'Step 3 / 7',
    icon: '💼',
    title: 'Work History & TCS Leadership',
    description: 'Proven track record leading UX architecture, reducing recurring issues by 80%, and scaling enterprise design systems.'
  },
  {
    id: 'work',
    targetId: 'work',
    badge: 'Step 4 / 7',
    icon: '🚀',
    title: 'Selected Case Studies',
    description: 'Deep dives into contract automation (eSOW Planner), critical infrastructure telemetry (TMS/SAS), and cloud sandboxes.'
  },
  {
    id: 'process',
    targetId: 'process',
    badge: 'Step 5 / 7',
    icon: '📐',
    title: 'The 5-Stage Product Process',
    description: 'A repeatable, evidence-based methodology: Discover → Structure → Design → Build → Validate.'
  },
  {
    id: 'ai-exploration',
    targetId: 'ai-exploration',
    badge: 'Step 6 / 7',
    icon: '⚡',
    title: 'AI Exploration & Playground',
    description: 'Interactive experimental lab featuring Antigravity Studio, streaming UI states, and multi-agent canvas prototypes.'
  },
  {
    id: 'drawings',
    targetId: 'drawings',
    badge: 'Step 7 / 7',
    icon: '🖼️',
    title: 'Additional Works: I Draw',
    description: 'Fine art oil paintings, large-scale murals, and design thinking workshops with interactive lightbox inspection.'
  },
];

export default function WebsiteTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = tourSteps[currentStepIndex];

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const startTour = () => {
    setCurrentStepIndex(0);
    setIsOpen(true);
    scrollToTarget(tourSteps[0].targetId);
  };

  const handleNext = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      scrollToTarget(tourSteps[nextIndex].targetId);
    } else {
      setIsOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      scrollToTarget(tourSteps[prevIndex].targetId);
    }
  };

  return (
    <>
      {/* 1. Quick "Take a Tour" Launch Pill on Bottom Right */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 font-sans pointer-events-auto">
        <button
          type="button"
          onClick={startTour}
          className="touch-target inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#0a0f1d]/90 hover:bg-[#131e3d] text-white text-xs sm:text-[13px] font-semibold border border-white/20 hover:border-white/40 shadow-lg backdrop-blur-2xl transition-all duration-200 hover:scale-105 active:scale-95 group focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Start Portfolio Tour"
          title="Take a 1-minute guided tour of the portfolio"
        >
          <span className="text-blue-400 group-hover:rotate-12 transition-transform">✨</span>
          <span>Guided Tour</span>
        </button>
      </div>

      {/* 2. Interactive Tour Step Card Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-16 sm:bottom-20 left-4 sm:left-6 z-50 max-w-sm w-[calc(100vw-32px)] sm:w-[380px] font-sans pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="p-5 rounded-3xl bg-[#080d1a]/95 border border-white/25 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl text-white space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentStep.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                      {currentStep.badge}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white text-xs transition-colors"
                  aria-label="Close Tour"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {currentStep.description}
              </p>

              {/* Progress Dots & Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                {/* Dots */}
                <div className="flex items-center gap-1.5">
                  {tourSteps.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentStepIndex 
                          ? 'w-4 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                          : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2">
                  {currentStepIndex > 0 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-zinc-300 hover:text-white transition-all"
                    >
                      &larr; Prev
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-md shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    {currentStepIndex < tourSteps.length - 1 ? 'Next &rarr;' : 'Finish ✦'}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
