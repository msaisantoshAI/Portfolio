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
    <section id="contact" className="px-4 py-10 sm:py-14 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white dark:bg-[#121214] border border-black/10 dark:border-white/12 p-7 sm:p-12 md:p-16 shadow-md dark:shadow-[0_16px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="eyebrow text-zinc-500 dark:text-zinc-400 font-mono">
            Get In Touch
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="section-heading text-zinc-950 dark:text-white">
              Let&apos;s build something interesting.
            </h2>
            <span className="text-base sm:text-xl text-zinc-500 dark:text-zinc-400 font-light">
              (Or explore new opportunities)
            </span>
          </div>
          <p className="body-lead text-zinc-600 dark:text-zinc-300">
            Whether you are building an AI product, redesigning a complex enterprise SaaS workflow, or looking for a senior product design partner — I&apos;d love to connect.
          </p>
        </div>

        {/* 2 Column Layout: Handwritten Letter + Accessible Connect Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Left: Warm Letter Note Card */}
          <div className="lg:col-span-6 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500 rounded-3xl bg-zinc-100 dark:bg-[#18181B] p-7 sm:p-9 text-zinc-900 dark:text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-black/10 dark:border-white/15">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-zinc-600 dark:text-zinc-400">
                  💌 A LETTER FOR YOU
                </span>
                <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  📍 HYDERABAD / WORLDWIDE
                </span>
              </div>

              <div className="space-y-3 text-sm sm:text-base font-medium leading-relaxed font-sans text-zinc-950 dark:text-zinc-100">
                <p className="font-bold text-lg text-zinc-950 dark:text-white">Dear potential collaborator,</p>
                <p>
                  I enjoy building high-impact digital products with thoughtful, curious humans.
                </p>
                <p>
                  My sweet spot is at the intersection of <span className="font-bold underline decoration-zinc-900 dark:decoration-white decoration-2">Design, Technology, AI, and Business</span> &mdash; untangling dense systems and transforming them into natural user workflows.
                </p>
                <p>
                  If you have a challenging product in the works, let&apos;s talk.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between mt-4">
              <span className="font-mono text-xs font-bold text-zinc-950 dark:text-white">
                Sai Santosh Madhari
              </span>
              <span className="text-xs font-mono font-bold bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 rounded-full">
                Open for Opportunities
              </span>
            </div>
          </div>

          {/* Right: Clean Connect Form (6 Cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#18181B] p-7 sm:p-9 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                Send a message directly
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Leave a note below and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-zinc-950 dark:text-white text-center space-y-2">
                <p className="font-bold text-base">Message Sent!</p>
                <p className="text-xs">Thanks for reaching out &mdash; talk soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121214] text-zinc-950 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all placeholder:text-zinc-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121214] text-zinc-950 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all placeholder:text-zinc-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Message / Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about what you are building..."
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121214] text-zinc-950 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white transition-all placeholder:text-zinc-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="touch-target w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Send Message</span>
                  <span>&rarr;</span>
                </button>
              </form>
            )}

            {/* Quick Email & Social Links */}
            <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Direct: <a href="mailto:saisantoshmadhari@gmail.com" className="text-zinc-950 dark:text-white font-semibold hover:underline">saisantoshmadhari@gmail.com</a></span>
              <div className="flex gap-3 font-semibold">
                <a href="https://www.linkedin.com/in/sai-santosh-madhari/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 dark:hover:text-white">LinkedIn ↗</a>
                <a href="https://github.com/msaisantoshAI" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 dark:hover:text-white">GitHub ↗</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
