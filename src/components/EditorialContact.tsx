'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EditorialContact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'msaisantosh.design@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto font-sans">
      
      {/* 1. LARGE CLOSING HEADLINE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)] mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
            09 // CONTACT
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.12] mb-6">
          Let&apos;s build something<br />
          <span className="text-blue-600 dark:text-blue-400">
            extraordinary together.
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-zinc-200 font-normal leading-relaxed max-w-2xl">
          Whether you are architecting a next-generation AI workflow, redesigning mission-critical enterprise software, or seeking a product design leader with deep engineering fluency &mdash; my inbox is open.
        </p>
      </motion.div>

      {/* 2. CONTACT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left Column: Direct Outreach Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Status Badge Card */}
          <div className="p-6 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Available for Global &amp; Remote Roles
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-normal leading-relaxed">
              Based in <strong>Hyderabad, India</strong> (IST / UTC+5:30), collaborating seamlessly across North American, European, and Asian time zones.
            </p>
          </div>

          {/* Email Quick Action Card */}
          <div className="p-6 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-xl border border-slate-200/90 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.55)] space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-zinc-400 font-bold block">
              Direct Inquiries
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-slate-950 dark:text-white truncate font-mono">
                {email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="touch-target px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all active:scale-95 flex-shrink-0 shadow-sm"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/sai-santosh-madhari/"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex-1 p-4 rounded-2xl bg-white/90 dark:bg-[#0a0f1d]/90 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-slate-200/90 dark:border-white/15 text-center text-xs sm:text-sm font-bold text-slate-950 dark:text-white transition-all group shadow-sm"
            >
              LinkedIn &rarr;
            </a>
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target flex-1 p-4 rounded-2xl bg-white/90 dark:bg-[#0a0f1d]/90 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 border border-slate-200/90 dark:border-white/15 text-center text-xs sm:text-sm font-bold text-slate-950 dark:text-white transition-all group shadow-sm"
            >
              Resume PDF &rarr;
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Message Form Card (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-[#0a0f1d]/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.65)]">
            
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                  Message Received!
                </h3>
                <p className="text-sm text-slate-700 dark:text-zinc-300 font-normal max-w-sm mx-auto">
                  Thank you for reaching out. I will respond to your email at the earliest opportunity.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-300 font-bold mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/15 text-sm text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-300 font-bold mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/15 text-sm text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-300 font-bold mb-1.5">
                    Project Goals / Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about the problem you're solving, timelines, or your team..."
                    className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/15 text-sm text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="touch-target w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-slate-950 font-bold text-sm transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message →'}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </section>
  );
}
