'use client';

import React from 'react';

export default function Footer() {
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Talks', href: '#talks' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#03050c] text-white border-t border-white/10 py-16 sm:py-20 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-white/10">
          
          {/* Left: Identity (4 cols) */}
          <div className="md:col-span-4 space-y-1">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Sai Santosh
            </h3>
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Product Designer &times; AI Builder
            </p>
          </div>

          {/* Center: Navigation (5 cols) */}
          <div className="md:col-span-5 flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs text-zinc-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right: Direct Channels (3 cols) */}
          <div className="md:col-span-3 flex flex-wrap md:justify-end gap-4">
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Resume &rarr;
            </a>
            <a
              href="https://www.linkedin.com/in/sai-santosh-madhari/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-300 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:msaisantosh.design@gmail.com"
              className="text-xs text-zinc-300 hover:text-white transition-colors"
            >
              Email
            </a>
          </div>

        </div>

        {/* Bottom Row: Metadata & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <p>
            Based in Hyderabad, India &bull; Available for Global &amp; Remote Roles
          </p>
          <p>
            &copy; {new Date().getFullYear()} Sai Santosh Madhari. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
