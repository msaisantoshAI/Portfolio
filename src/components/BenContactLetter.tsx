'use client';

import React, { useState } from 'react';

export default function BenContactLetter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Direct mailto link fallback
    window.location.href = `mailto:Saisantoshmadhari@gmail.com?subject=Product Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="px-4 py-8 sm:py-12 sm:px-6 md:px-10 lg:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-7 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-black/5 dark:border-white/10 pb-5">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Get In Touch
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Let&apos;s build something interesting.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Whether you are building an AI product, scaling an enterprise SaaS system, or looking for a design partner &mdash; I&apos;d love to connect.
          </p>
        </div>

        {/* 2 Column Layout: Handwritten Letter + Accessible Connect Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-1">
          
          {/* Left: Yellow/Amber Warm Letter Note Card */}
          <div className="lg:col-span-6 rounded-2xl bg-amber-500 p-6 sm:p-8 text-zinc-900 shadow-md relative overflow-hidden flex flex-col justify-between border-2 border-amber-300">
            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between pb-2.5 border-b border-zinc-900/20">
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  💌 A LETTER FOR YOU
                </span>
                <span className="font-mono text-xs font-bold">
                  📍 HYDERABAD / WORLDWIDE
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm font-medium leading-relaxed font-sans text-zinc-950">
                <p className="font-bold text-base">Dear collaborator,</p>
                <p>
                  I enjoy building high-impact digital products with thoughtful, curious teams.
                </p>
                <p>
                  I love creating calm, intuitive software that solves real operational friction and makes complex workflows feel effortless.
                </p>
                <p>
                  If that aligns with your product vision, let&apos;s start a conversation.
                </p>
                <p className="pt-1 italic font-mono text-xs">
                  Warm regards,<br />
                  <span className="font-bold text-sm not-italic">Sai Santosh Madhari</span>
                </p>
              </div>
            </div>

            <div className="pt-3.5 relative z-10 flex items-center justify-between border-t border-zinc-900/20 mt-3">
              <span className="text-[11px] font-mono font-bold">Product Designer &bull; AI Builder</span>
              <span className="text-base" aria-hidden="true">✨</span>
            </div>
          </div>

          {/* Right: Direct Connection Links & Accessible Form */}
          <div className="lg:col-span-6 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-black/50 p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Direct Inquiries
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Drop a note directly via email, LinkedIn, or send a quick message:
                </p>
              </div>

              {/* Direct Link Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="mailto:Saisantoshmadhari@gmail.com"
                  className="touch-target flex items-center gap-2.5 p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
                >
                  <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">Saisantoshmadhari@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/sai-santosh-madhari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target flex items-center gap-2.5 p-3 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-zinc-900 dark:text-white font-semibold text-xs border border-black/10 dark:border-white/10 transition-all active:scale-95"
                >
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn Profile ↗</span>
                </a>
              </div>

              {/* Fast Transmission Form */}
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="name-input" className="block text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Lin"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/15 dark:border-white/15 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="block text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Email
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/15 dark:border-white/15 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="msg-input" className="block text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Project / Role Details
                  </label>
                  <textarea
                    id="msg-input"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the product challenge or opportunity..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-black/40 border border-black/15 dark:border-white/15 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="touch-target w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  {isSubmitted ? '✓ Message Opened in Mail Client' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
