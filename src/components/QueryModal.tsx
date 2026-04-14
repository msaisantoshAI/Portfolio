'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QueryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QueryModal({ isOpen, onClose }: QueryModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setFormData({ name: '', email: '', query: '' });
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-10"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white tracking-tight">Start Conversation</h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-xl">✕</button>
              </div>

              {status === 'success' ? (
                <div className="text-center py-12">
                   <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Message Received</h3>
                   <p className="text-white/50">I&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Query / Message</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.query}
                      onChange={(e) => setFormData({...formData, query: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                      placeholder="How can I help you?"
                    />
                  </div>

                  <button 
                    disabled={status === 'submitting'}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Transmitting...' : 'Send Message'}
                  </button>
                  
                  {status === 'error' && (
                    <p className="text-red-400 text-xs text-center">Connection error. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
