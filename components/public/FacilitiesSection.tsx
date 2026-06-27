export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-24 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
        <span className="font-display font-bold text-[20vw] leading-none whitespace-nowrap">FACILITIES</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="reveal text-center mb-16">
          <span className="text-emerald-400 font-bold tracking-widest uppercase text-sm">What We Offer</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3">
            Everything You <span className="italic text-emerald-400">Need</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto auto-rows-[140px] md:auto-rows-[180px]">
          
          <div className="reveal stagger-1 col-span-2 row-span-2 bg-gradient-to-br from-stone-800/80 to-stone-800/30 backdrop-blur-md border border-stone-700/50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col justify-end text-left relative overflow-hidden">
            <div className="absolute top-6 right-6 md:top-8 md:right-8 text-stone-700/30 group-hover:text-emerald-500/10 transition-colors duration-500">
              <svg className="w-24 h-24 md:w-40 md:h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
            </div>
            <div className="text-emerald-400 mb-3 md:mb-5 transform group-hover:-translate-y-2 transition-transform duration-300 relative z-10">
              <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
            </div>
            <h4 className="font-display font-bold text-stone-100 text-xl md:text-3xl leading-tight relative z-10">High-Speed<br/>Enterprise WiFi</h4>
            <p className="text-stone-400 mt-2 text-xs md:text-sm max-w-xs relative z-10">Stay connected with our seamless, zero-drop wireless network available in every corner.</p>
          </div>

          <div className="reveal stagger-2 col-span-1 row-span-1 bg-stone-800/40 backdrop-blur-md border border-stone-700/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-center hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col items-center justify-center">
            <div className="text-emerald-400 mb-2 md:mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2H4a2 2 0 0 1 -2 -2V8a2 2 0 0 1 2 -2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 17v3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 17v3" />
              </svg>
            </div>
            <h4 className="font-bold text-stone-200 text-sm leading-tight">AC</h4>
          </div>

          <div className="reveal stagger-3 col-span-1 row-span-1 bg-stone-800/40 backdrop-blur-md border border-stone-700/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-center hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col items-center justify-center">
            <div className="text-emerald-400 mb-2 md:mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h4 className="font-bold text-stone-200 text-sm leading-tight">Cleaning</h4>
          </div>

          <div className="reveal stagger-4 col-span-1 row-span-1 bg-stone-800/40 backdrop-blur-md border border-stone-700/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-center hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col items-center justify-center">
            <div className="text-emerald-400 mb-2 md:mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 className="font-bold text-stone-200 text-sm leading-tight">CCTV</h4>
          </div>

          <div className="reveal stagger-1 col-span-1 row-span-1 bg-stone-800/40 backdrop-blur-md border border-stone-700/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-center hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col items-center justify-center">
            <div className="text-emerald-400 mb-2 md:mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path></svg>
            </div>
            <h4 className="font-bold text-stone-200 text-sm leading-tight">RO Water</h4>
          </div>

          <div className="reveal stagger-2 col-span-2 md:col-span-2 row-span-1 bg-stone-800/40 backdrop-blur-md border border-stone-700/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex items-center gap-4 md:gap-6 text-left relative overflow-hidden">
            <div className="bg-emerald-500/10 p-3 md:p-4 rounded-xl text-emerald-400 transform group-hover:scale-110 transition-transform duration-300 shrink-0">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            </div>
            <div>
              <h4 className="font-bold text-stone-100 text-sm md:text-lg leading-tight mb-1">3 Time Meals </h4>
              <span className="inline-block text-[9px] md:text-[10px] uppercase tracking-wider text-emerald-400 border border-emerald-400/30 rounded-full px-2 py-0.5 bg-emerald-400/10">Coming Soon</span>
            </div>
          </div>

          <div className="reveal stagger-3 col-span-1 row-span-1 bg-stone-800/40 backdrop-blur-md border border-stone-700/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-center hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-emerald-400 mb-2 md:mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <h4 className="font-bold text-stone-200 text-sm leading-tight mb-1">Laundry</h4>
            <span className="inline-block text-[8px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">Soon</span>
          </div>

          <div className="reveal stagger-4 col-span-1 row-span-1 bg-stone-800/40 backdrop-blur-md border border-stone-700/50 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-center hover:bg-stone-800 hover:border-emerald-500/30 transition-all duration-300 group flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-emerald-400 mb-2 md:mb-3 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h4 className="font-bold text-stone-200 text-sm leading-tight mb-1">Power Backup</h4>
            <span className="inline-block text-[8px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">Soon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
