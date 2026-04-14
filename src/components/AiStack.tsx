'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

const aiTools = [
  { name: 'Lovable', slug: 'lovable' },
  { name: 'Framer', slug: 'framer' },
  { name: 'UX Pilot', slug: 'figma' },
  { name: 'Antigravity', slug: 'google' },
  { name: 'Claude Code', slug: 'anthropic' },
  { name: 'Perplexity', slug: 'perplexity' },
  { name: 'ChatGPT', slug: 'openai' },
  { name: 'Gemini', slug: 'googlegemini' },
  { name: 'Cursor', slug: 'cursor' }
];

export default function AiStack() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const iconColor = 'ffffff';

  return (
    <div className="relative p-6 transition-colors duration-300 h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-16">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-normal text-white mb-4">
               <TextReveal text="AI Stack" delay={0.2} />
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
                {aiTools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
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
                    <div className="px-6 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/40 hover:shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-3">
                       <div className="w-5 h-5 flex items-center justify-center">
                          {tool.name === 'UX Pilot' ? (
                            <img src="https://www.uxpilot.ai/favicon.ico" alt="UX Pilot" className="w-4 h-4 rounded-sm" />
                          ) : tool.name === 'Antigravity' ? (
                            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="w-8 h-auto object-contain" />
                          ) : tool.name === 'Lovable' ? (
                            <img src="https://lovable.dev/favicon.ico" alt="Lovable" className="w-4 h-4" />
                          ) : tool.slug ? (
                            <img 
                              src={`https://cdn.simpleicons.org/${tool.slug}/${iconColor}`} 
                              alt={`${tool.name} icon`} 
                              className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" 
                              onError={(e) => { 
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('span');
                                  fallback.innerText = '✦';
                                  fallback.className = 'text-blue-500/50';
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          ) : (
                            <span className="text-blue-500/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">✦</span>
                          )}
                       </div>
                       <span className="text-white/80 font-medium group-hover:text-blue-300 transition-colors tracking-wide text-base">
                          {tool.name}
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
