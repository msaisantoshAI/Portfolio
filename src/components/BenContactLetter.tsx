'use client';

import React, { useState } from 'react';

export default function BenContactLetter() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Simulate submission / mailto fallback
    window.location.href = `mailto:Saisantoshmadhari@gmail.com?subject=Hello from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="px-5 py-16 md:px-8 lg:px-24 max-w-[1280px] mx-auto w-full">
      <div className="rounded-[28px] bg-white/85 dark:bg-zinc-900/85 border border-black/5 dark:border-white/10 p-8 md:p-14 shadow-[0_12px_40px_rgba(16,24,40,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl space-y-12 transition-colors duration-300">
        
        {/* Section Header */}
        <div className="space-y-3">
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold">
            Get In Touch
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Interested in collaborating?
            </h2>
            <span className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 font-light">
              (Or mentoring)
            </span>
          </div>
          <p className="text-base sm:text-lg font-light text-zinc-600 dark:text-zinc-300">
            I wrote a little letter for you if you are interested in chatting or discussing new product opportunities.
          </p>
        </div>

        {/* 2 Column Layout: Handwritten Letter + Connect Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Left: Yellow/Amber Warm Letter Note Card */}
          <div className="lg:col-span-6 transform rotate-[-1deg] hover:rotate-0 transition-transform duration-500 rounded-3xl bg-[#f59e0b] p-8 sm:p-10 text-zinc-900 shadow-2xl relative overflow-hidden flex flex-col justify-between border-4 border-amber-300">
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900/20">
                <span className="font-mono text-xs uppercase tracking-wider font-bold">
                  💌 A LETTER FOR YOU
                </span>
                <span className="font-mono text-xs font-bold">
                  📍 HYDERABAD / GLOBAL
                </span>
              </div>

              <div className="space-y-3 text-sm sm:text-base font-medium leading-relaxed font-sans">
                <p className="font-bold text-lg">Dear potential collaborator,</p>
                <p>
                  I enjoy building high-impact digital products with thoughtful, curious humans.
                </p>
                <p>
                  I love creating small moments of magic in software that solve real human friction and make everyday work a little more joyful.
                </p>
                <p>
                  ...and I enjoy wearing different hats to ship the best product possible. I don&apos;t like to be limited as just a &ldquo;Designer&rdquo; — I am a builder &amp; creative tinkerer :)
                </p>
                <p className="font-semibold pt-2">
                  If that feels like your team or vision, let&apos;s have a conversation.
                </p>
                <p className="pt-2 italic font-mono text-sm">
                  Thanks for reading,<br />
                  <span className="font-bold text-base not-italic">Sai Santosh Madhari</span>
                </p>
              </div>
            </div>

            <div className="pt-6 relative z-10 flex items-center justify-between border-t-2 border-zinc-900/20 mt-4">
              <span className="text-xs font-mono font-bold">Product Designer &bull; AI Specialist</span>
              <span className="text-lg">✨</span>
            </div>
          </div>

          {/* Right: Direct Connection Links & Quick Transmission Box */}
          <div className="lg:col-span-6 rounded-3xl border border-black/5 dark:border-white/10 bg-zinc-50 dark:bg-black/50 p-8 sm:p-10 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Let&apos;s connect
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Have an open role, an AI project, or want to discuss a design audit? Drop a line directly:
                </p>
              </div>

              {/* Direct Link Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:Saisantoshmadhari@gmail.com"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Direct Email</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/saisantoshmadhari0711/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/10 border border-black/10 dark:border-white/15 text-zinc-900 dark:text-white font-semibold text-sm hover:border-blue-500/50 transition-all shadow-sm active:scale-95"
                >
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              {/* Quick Message Form */}
              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-center space-y-2">
                  <span className="text-2xl">✨</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">Opening Email Client...</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">If your mail app didn&apos;t open automatically, write directly to Saisantoshmadhari@gmail.com</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
                  />
                  <textarea
                    rows={3}
                    placeholder="Your Message or Project Vision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none shadow-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-95"
                  >
                    Send Transmission &rarr;
                  </button>
                </form>
              )}
            </div>

            <div className="pt-4 border-t border-black/5 dark:border-white/10 text-xs font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              <span>📍 Available for remote &amp; worldwide relocation</span>
              <span>⚡ Fast response &lt; 24h</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
