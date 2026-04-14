'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '@/components/TextReveal';

const coreTools = [
  { name: 'Figma', slug: 'figma' },
  { name: 'Adobe CC', slug: 'adobecreativecloud' },
  { name: 'Marvel', slug: 'marvelapp' }, 
  { name: 'Miro', slug: 'miro' },
  { name: 'Balsamiq', slug: 'balsamiq' },
  { name: 'Jira', slug: 'jira' },
  { name: 'Notion', slug: 'notion' },
  { name: 'Confluence', slug: 'confluence' },
  { name: 'Microsoft 365', slug: 'microsoft' },
];

export default function Tools() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const iconColor = 'ffffff';

  return (
    <div className="relative py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-xl md:text-2xl font-bold tracking-normal text-white mb-4">
               <TextReveal text="Arsenal / Tools" delay={0.2} />
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
                {coreTools.map((tool, index) => (
                  <motion.div
                    key={`${tool.name}-${index}`}
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
                         {tool.name === 'Balsamiq' ? (
                           <img src="https://balsamiq.com/favicon.ico" alt="Balsamiq" className="w-4 h-4" />
                         ) : tool.name === 'Microsoft 365' ? (
                           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg" alt="Microsoft 365" className="w-5 h-5" />
                         ) : tool.slug ? (
                           <img 
                             src={`https://cdn.simpleicons.org/${tool.slug}/${iconColor}`} 
                             alt={`${tool.name} icon`} 
                             className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" 
                             onError={(e) => { 
                               e.currentTarget.style.display = 'none';
                               const parent = e.currentTarget.parentElement;
                               if (parent) {
                                 const fallback = document.createElement('div');
                                 fallback.className = 'w-2 h-2 rounded-full bg-blue-500/50';
                                 parent.appendChild(fallback);
                               }
                             }}
                           />
                         ) : (
                           <div className="w-2 h-2 rounded-full bg-blue-500/50 transition-colors" />
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
