export default function Contact() {
  return (
    <section id="contact" className="relative z-20 bg-[#0A0A0A] py-32 px-8 md:px-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
          Let's build <br className="hidden md:block"/> something <span className="text-zinc-600">meaningful.</span>
        </h2>
        
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="mailto:hello@example.com" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform">
            Say Hello
          </a>
          <a href="#" className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:bg-white/5 transition-colors">
            Connect on LinkedIn
          </a>
        </div>
      </div>
      
      <div className="mt-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-zinc-600 text-sm border-t border-zinc-800/50 pt-8">
        <p>© {new Date().getFullYear()} Santosh | UX Designer</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-zinc-300 transition-colors">Dribbble</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Behance</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
        </div>
      </div>
    </section>
  );
}
