'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

const skills = [
  'Accessibility (WCAG)',
  'AI Assistance',
  'AI Integration',
  'Cross-functional Coordination',
  'Data-Driven Design Decisions',
  'Design Systems',
  'Heuristic Evaluation',
  'Interaction Design',
  'Lean UX',
  'Product Thinking',
  'Project Management Basics',
  'Research and UX Audit',
  'Stakeholder Collaboration',
  'Visual & Interface Design',
  'Wireframing & Prototyping'
];

export default function BentoSkills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative p-6 h-full flex flex-col transition-colors duration-300">
      <div className="w-full flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-normal text-white mb-4">
              <TextReveal text="Skills Matrix" delay={0.2} />
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </motion.div>

          {/* Expand Toggle Button for Mobile */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden flex items-center justify-center p-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 active:scale-90 transition-transform"
          >
            <motion.svg 
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {(isExpanded || (mounted && window.innerWidth >= 768)) && (
            <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: "auto", opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               transition={{ duration: 0.4, ease: "easeInOut" }}
               className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    className="group pointer-events-auto cursor-default"
                  >
                    <div className="px-6 py-4 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:bg-blue-500/5 dark:hover:bg-blue-500/10 hover:border-blue-500/20 dark:hover:border-blue-500/40 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 transform hover:-translate-y-1">
                      <span className="text-slate-800 dark:text-white/80 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors tracking-wide text-base">
                        {skill}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
