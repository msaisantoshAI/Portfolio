'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = React.useState({ name: '', email: '', query: '' });
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Live Google Apps Script web app URL
      await fetch('https://script.google.com/macros/s/AKfycbxcLJJsuVrQvG9EgXS1GS2llln_8lWvywxnCzC4N_kb1Qz5iX2M1Fw1H6VOF3i_E3hx/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', query: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-16 px-8 min-h-[80vh] flex items-center justify-center relative">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center"
        >
           <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
             Let&apos;s Build Together.
           </h1>
           <p className="text-xl md:text-2xl text-slate-600 dark:text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
             I am currently open to exciting new opportunities mapping complex structural matrices to beautiful intuitive user flows.
           </p>

           <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-20">
              <a 
                href="mailto:Saisantoshmadhari@gmail.com" 
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 text-lg w-full md:w-auto text-center"
              >
                Send me an Email
              </a>
              <a 
                href="https://www.linkedin.com/in/saisantoshmadhari0711/" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-slate-200 dark:bg-white/[0.05] border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white rounded-full font-semibold tracking-wide hover:bg-slate-300 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 text-lg w-full md:w-auto text-center"
              >
                Connect on LinkedIn
              </a>
           </div>

           {/* Query Form Section */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="w-full max-w-xl mx-auto bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative"
           >
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12"
                >
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Query Logged</h3>
                  <p className="text-white/50">Your request has been sent to my Google Sheet database.</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-8 text-left">Send a Query</h2>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2 text-left">
                      <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-4 font-mono">Your Name</label>
                      <input 
                        id="name"
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-4 font-mono">Your Email</label>
                      <input 
                        id="email"
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                    <div className="space-y-2 text-left">
                      <label htmlFor="query" className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-4 font-mono">Query</label>
                      <textarea 
                        id="query"
                        required
                        rows={4}
                        value={formData.query}
                        onChange={(e) => setFormData({...formData, query: e.target.value})}
                        placeholder="What can I help you with?"
                        className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform active:scale-95 disabled:opacity-50 shadow-xl"
                    >
                      {status === 'submitting' ? 'Transmitting to Sheet...' : 'Submit Query'}
                    </button>
                    {status === 'error' && <p className="text-red-400 text-xs mt-2">Error sending data. Please check connection.</p>}
                  </form>
                </>
              )}
           </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
