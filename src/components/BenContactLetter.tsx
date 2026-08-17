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
      <div className="rounded-[32px] bg-white/95 dark:bg-[#0c111e]/95 border border-black/10 dark:border-white/15 p-7 sm:p-12 md:p-16 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_50px_-8px_rgba(0,0,0,0.6)] backdrop-blur-2xl space-y-8 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="eyebrow text-blue-600 dark:text-blue-400">
            Get In Touch
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="section-heading text-zinc-900 dark:text-white">
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
          
          {/* Left: Yellow/Amber Warm Letter Note Card */}
          <div className="lg:col-span-6 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500 rounded-3xl bg-[#f59e0b] p-7 sm:p-9 text-zinc-900 shadow-xl relative overflow-hidden flex flex-col justify-between border-4 border-amber-300">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900/20">
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  💌 A LETTER FOR YOU
                </span>
                <span className="font-mono text-xs font-bold">
                  📍 HYDERABAD / WORLDWIDE
                </span>
              </div>

              <div className="space-y-3 text-sm sm:text-base font-medium leading-relaxed font-sans text-zinc-950">
                <p className="font-bold text-lg">Dear potential collaborator,</p>
                <p>
                  I enjoy building high-impact digital products with thoughtful, curious humans.
                </p>
                <p>
                  I love creating small moments of magic in software that solve real human friction and make everyday enterprise work a little more joyful.
                </p>
                <p>
                  ...and I enjoy wearing different hats to ship the best product possible. I don&apos;t like to be limited as just a &ldquo;Figma Designer&rdquo; — I am a builder, systems thinker, &amp; creative tinkerer :)
                </p>
                <p className="font-semibold pt-1">
                  If that feels like your team or vision, let&apos;s start a conversation.
                </p>
                <p className="pt-2 italic font-mono text-sm">
                  Thanks for reading,<br />
                  <span className="font-bold text-base not-italic">Sai Santosh Madhari</span>
                </p>
              </div>
            </div>

            <div className="pt-5 relative z-10 flex items-center justify-between border-t-2 border-zinc-900/20 mt-4">
              <span className="text-xs font-mono font-bold">Product Designer &bull; AI Specialist</span>
              <span className="text-lg" aria-hidden="true">✨</span>
            </div>
          </div>

          {/* Right: Direct Connection Links & Accessible Form */}
          <div className="lg:col-span-6 rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-black/50 p-6 sm:p-9 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Direct Inquiries
                </h3>
                <p className="caption-meta text-zinc-600 dark:text-zinc-400">
                  Drop a message directly via email, LinkedIn, or the transmission form below:
                </p>
              </div>

              {/* Direct Link Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:Saisantoshmadhari@gmail.com"
                  className="touch-target flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <svg className="w-5 h-5 text-white dark:text-black shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Direct Email</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/saisantoshmadhari0711/"
                  target="_blank"
                  rel="noreferrer"
                  className="touch-target flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white font-semibold text-xs sm:text-sm hover:border-blue-500/50 transition-all shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              {/* Accessible Transmission Form with Visible Labels */}
              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-center space-y-2" role="status">
                  <span className="text-2xl" aria-hidden="true">✨</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Opening Email Client...</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">If your mail app did not open, you can send an email directly to Saisantoshmadhari@gmail.com</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="e.g. Maya Lin"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Email <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="maya@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Message or Project Vision
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder="Tell me about the role, project, or design challenge..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors resize-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="touch-target w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)] active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Start a conversation &rarr;
                  </button>
                </form>
              )}
            </div>

            <div className="pt-3 border-t border-black/5 dark:border-white/10 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              <span>📍 Remote &amp; Worldwide Relocation</span>
              <span>⚡ Fast Response &lt; 24h</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
