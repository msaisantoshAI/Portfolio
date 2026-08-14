import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 pointer-events-auto">
      <div className="absolute inset-0 bg-[#0A0A0A]/50 backdrop-blur-md border-b border-white/5" />
      <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#0A0A0A] font-bold text-lg">
            S.
          </div>
          <span className="text-white font-semibold tracking-wide hidden sm:block">Santosh UX</span>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-0.5 transition-transform"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </div>
            <span className="hidden sm:block">Back</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#work" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform">
            Resume
          </button>
          <button className="md:hidden p-2 text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
