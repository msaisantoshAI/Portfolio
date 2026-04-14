export default function About() {
  return (
    <section id="about" className="relative z-20 bg-[#0A0A0A] py-32 px-8 md:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
        <div className="flex-1 space-y-8 md:sticky md:top-32">
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            I don't just design interfaces, I design <span className="text-zinc-500 italic">solutions.</span>
          </h3>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-lg">
            With over half a decade of experience spanning enterprise SaaS and consumer apps, my process relies heavily on data-backed research, rapid iteration, and a deep understanding of human-computer interaction.
          </p>
        </div>
        
        <div className="flex-1 space-y-12 w-full">
          {[
            { tag: "01", title: "Discovery", desc: "Deep diving into user needs and business constraints." },
            { tag: "02", title: "Strategy", desc: "Defining the architecture and interaction patterns." },
            { tag: "03", title: "Execution", desc: "Crafting high-fidelity, accessible digital solutions." }
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="flex items-start space-x-6">
                <span className="text-zinc-700 font-mono text-sm mt-1">{item.tag}</span>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">{item.title}</h4>
                  <p className="text-zinc-400 text-base leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </div>
              {idx !== 2 && <div className="mt-8 h-[1px] w-full bg-white/5" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
