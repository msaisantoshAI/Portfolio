"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Code2, PenTool, Layout, Layers, UserCheck, Zap } from "lucide-react";

const skillCategories = [
  {
    title: "Design Foundation",
    icon: <PenTool className="w-5 h-5" />,
    skills: ["Visual Design", "Typography", "Color Theory", "Layout Composition", "Grid Systems"]
  },
  {
    title: "User Experience",
    icon: <UserCheck className="w-5 h-5" />,
    skills: ["User Research", "Information Architecture", "Wireframing", "Usability Testing", "Personas"]
  },
  {
    title: "Arsenal & Tools",
    icon: <Layout className="w-5 h-5" />,
    skills: ["Figma (Expert)", "Adobe CC", "Framer", "Prototyping", "Design Systems"]
  },
  {
    title: "Engineering",
    icon: <Code2 className="w-5 h-5" />,
    skills: ["React / Next.js", "Tailwind CSS", "HTML5 Canvas", "Framer Motion", "Basic Backend"]
  }
];

export default function Skills() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="relative z-20 bg-[#0A0A0A] py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight">
          My <span className="text-zinc-500 italic">Arsenal</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              layout
              className="bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden cursor-pointer hover:bg-zinc-800/30 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
            >
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400">
                    {category.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{category.title}</h4>
                    <p className="text-zinc-500 text-sm">{category.skills.length} Expertise Areas</p>
                  </div>
                </div>
                
                <motion.div 
                  animate={{ rotate: expandedIndex === idx ? 180 : 0 }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>

              <AnimatePresence>
                {expandedIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-2">
                      <div className="h-[1px] w-full bg-white/5 mb-6" />
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/10 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
