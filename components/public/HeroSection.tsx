export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden bg-stone-900">
      <div className="absolute inset-0 z-0">
        <video src="/assets/topview.mp4" autoPlay loop muted playsInline
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-stone-900/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <span className="reveal inline-block py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold tracking-widest text-[10px] md:text-xs mb-4 md:mb-6 border border-emerald-500/20 backdrop-blur-sm uppercase">
            Premium Living in Kosamba
          </span>
          <h1 className="reveal stagger-1 font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-4 md:mb-6">
            Unity Hostel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">& PG</span>
          </h1>
          <p className="reveal stagger-2 text-stone-300 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light">
            Experience the perfect blend of home warmth and premium amenities. Fully furnished, food-inclusive, and designed for your success.
          </p>
          <div className="reveal stagger-3 flex flex-wrap gap-4">
            <a href="https://wa.me/919687886878?text=Hii%20i%20want%20to%20book%20a%20room%20for%20me%20" target="_blank" rel="noreferrer"
              className="relative overflow-hidden bg-emerald-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 flex items-center gap-2 group">
              <span className="relative z-10">Book a Visit</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-white opacity-20 group-hover:animate-shine"></div>
            </a>
            <a href="https://wa.me/919687886878?text=Hii%20i%20want%20to%20book%20a%20room%20for%20me%20" target="_blank" rel="noreferrer"
              className="bg-white/10 text-white border border-white/20 backdrop-blur-md px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all hover:-translate-y-1 flex items-center gap-2">
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="hidden md:block relative h-full">
          <div className="h-2 bg-stone-800 rounded-full overflow-hidden"></div>
        </div>
      </div>
    </section>
  );
}
