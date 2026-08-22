'use client';

import React, { useState } from 'react';

export default function BenContactLetter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    window.location.href = `mailto:Saisantoshmadhari@gmail.com?subject=Product Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="px-4 py-8 sm:py-12 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full font-sans">
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-2">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Get In Touch
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="section-heading text-zinc-900 dark:text-white">
              Let&apos;s build something great.
            </h2>
            <span className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-light">
              (Or explore new opportunities)
            </span>
          </div>
          <p className="body-lead text-zinc-600 dark:text-zinc-300">
            Whether you are building an AI product, scaling enterprise SaaS, or looking for a product design partner &mdash; let&apos;s talk.
          </p>
        </div>

        {/* 2 Column Layout: Handwritten Letter + Connect Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch pt-1">
          
          {/* Left: Yellow/Amber Warm Letter Note Card */}
          <div className="lg:col-span-6 transform rotate-[-0.5deg] hover:rotate-0 transition-transform duration-500 rounded-3xl bg-[#f59e0b] p-6 sm:p-8 text-zinc-900 shadow-xl relative overflow-hidden flex flex-col justify-between border-4 border-amber-300">
            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-zinc-900/20">
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  💌 A LETTER FOR YOU
                </span>
                <span className="font-mono text-xs font-bold">
                  📍 HYDERABAD / WORLDWIDE
                </span>
              </div>

              <div className="space-y-2.5 text-sm sm:text-base font-medium leading-relaxed font-sans text-zinc-950">
                <p className="font-bold text-base sm:text-lg">Dear collaborator,</p>
                <p>
                  I love building high-impact digital products with thoughtful, curious teams.
                </p>
                <p>
                  My goal is simple: eliminate software friction and turn complex systems into calm, delightful workflows.
                </p>
                <p>
                  If you value craft, speed, and genuine product thinking, I would love to hear from you.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-zinc-900/20 relative z-10 flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-zinc-950">Warmly,</p>
                <p className="font-bold text-base text-zinc-950 font-mono">Sai Santosh Madhari</p>
                <p className="text-xs text-zinc-800 font-mono font-medium">Product Designer &bull; AI Builder</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-bold shadow-md">
                ✍️
              </div>
            </div>
          </div>

          {/* Right: Direct Interactive Form Card */}
          <div className="lg:col-span-6 rounded-3xl bg-zinc-50/80 dark:bg-black/40 border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
                Send a direct note
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Usually responds within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 text-center space-y-2 my-auto">
                <span className="text-2xl">🚀</span>
                <h4 className="font-bold text-blue-900 dark:text-blue-100">Message Ready!</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Opening your default mail client to dispatch your message.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-black/10 dark:border-white/15 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-black/10 dark:border-white/15 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 uppercase">
                    Project Note or Idea
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product or team goals..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900/90 border border-black/10 dark:border-white/15 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="touch-target w-full py-3 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Send Message &rarr;
                </button>
              </form>
            )}

            <div className="pt-2 text-center">
              <a
                href="mailto:Saisantoshmadhari@gmail.com"
                className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                Or direct email: Saisantoshmadhari@gmail.com
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
