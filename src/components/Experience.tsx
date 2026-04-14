'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '@/components/TextReveal';
import GlowCard from '@/components/GlowCard';

const experience = [
  {
    role: 'Product / UX Designer',
    company: 'Tata Consultancy Services',
    tenure: 'Oct 2022 — Present',
    metrics: [
      'Conducted heuristic evaluations and UX audits to identify usability gaps and improve workflow efficiency.',
      'Redesigned Customer internal platform, creating a user-centric dashboard and streamlined estimation workflows to boost visibility and reduce task time.',
      'Designed solutions for TM System (TMS) to enhance resource tracking and operational clarity.',
      'Created prototypes and design specs in Figma/XD, validating ideas through iterative stakeholder feedback.',
      'Collaborated with cross-functional teams to align design goals with business objectives and ensure smooth implementation.',
      'Built scalable icons Library and its states and contributed to the Design System, ensuring visual consistency and accessibility.',
      'Delivered design presentations on Conversational AI and UX strategy to improve team collaboration and understanding.',
      'Used behavioral analytics and user feedback to optimize usability and overall user satisfaction.',
      'Stayed current with UX trends, accessibility, and IA best practices, applying them to enterprise design systems.'
    ]
  }
];

export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative bg-transparent py-8 px-8 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-normal text-white mb-6">
             <TextReveal text="Professional Experience" delay={0.2} />
          </h2>
          <div className="w-16 h-1 bg-white/20 rounded-full mx-auto" />
        </motion.div>
        <div className="flex flex-col space-y-16">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlowCard className="mb-12">
                <div className="flex flex-col p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col items-start pt-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-200">{exp.role}</span>
                      </h3>
                      <span className="text-white/80 font-medium mb-4">{exp.company}</span>
                      <span className="text-blue-400 text-sm font-medium tracking-widest font-mono bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">
                        {exp.tenure}
                      </span>
                    </div>

                    {/* Expand Toggle Button for Mobile */}
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="md:hidden flex items-center justify-center space-x-2 bg-blue-500/10 text-blue-400 px-6 py-3 rounded-xl border border-blue-500/20 w-full active:scale-95 transition-transform"
                    >
                      <span className="font-bold text-sm tracking-wide">{isExpanded ? 'Show Less' : 'View Responsibilities'}</span>
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
                         className="overflow-hidden mt-8 md:mt-12"
                      >
                        <ul className="grid grid-cols-1 gap-y-4">
                          {exp.metrics.map((metric, i) => (
                            <motion.li 
                              key={i} 
                              className="text-white/70 text-base leading-relaxed flex items-start"
                            >
                              <span className="mr-4 mt-1 text-blue-500/60 text-2xl leading-none">&quot;</span>
                              <span className="text-white">{metric}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
