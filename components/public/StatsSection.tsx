export default function StatsSection() {
  return (
    <section className="py-8 md:py-10 bg-emerald-900 text-white relative z-20 md:-mt-12 mx-4 md:mx-auto max-w-5xl rounded-3xl shadow-2xl border border-emerald-800/50">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-8 px-2 md:px-6 divide-x divide-emerald-800/0 md:divide-emerald-800 text-center">
        <div className="reveal border-r border-emerald-800 md:border-r-0">
          <div className="font-display text-4xl md:text-5xl font-bold text-emerald-300 mb-1">30+</div>
          <div className="text-[10px] md:text-xs font-semibold tracking-widest text-emerald-100/70 uppercase">Residents</div>
        </div>
        <div className="reveal stagger-1">
          <div className="font-display text-4xl md:text-5xl font-bold text-emerald-300 mb-1">2 Yrs</div>
          <div className="text-[10px] md:text-xs font-semibold tracking-widest text-emerald-100/70 uppercase">Experience</div>
        </div>
        <div className="reveal stagger-2 border-r border-emerald-800 md:border-r-0 border-t border-emerald-800/50 md:border-t-0 pt-6 md:pt-0">
          <div className="font-display text-4xl md:text-5xl font-bold text-emerald-300 mb-1">5★</div>
          <div className="text-[10px] md:text-xs font-semibold tracking-widest text-emerald-100/70 uppercase">Rating</div>
        </div>
        <div className="reveal stagger-3 border-t border-emerald-800/50 md:border-t-0 pt-6 md:pt-0">
          <div className="font-display text-4xl md:text-5xl font-bold text-emerald-300 mb-1">100%</div>
          <div className="text-[10px] md:text-xs font-semibold tracking-widest text-emerald-100/70 uppercase">Hygiene</div>
        </div>
      </div>
    </section>
  );
}
