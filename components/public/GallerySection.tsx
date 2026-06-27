export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#faf0e6] border-y border-stone-200/50 overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-teal-300/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-16 md:mb-24">
          <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-600/10 text-emerald-700 font-semibold tracking-widest text-[10px] md:text-xs mb-4 uppercase border border-emerald-600/20 shadow-sm">
            Visual Tour
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mt-3">
            Take a look <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 italic">Inside</span>
          </h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">Discover the premium facilities and thoughtfully designed spaces waiting for you.</p>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          
          {/* Card 1 */}
          <div className="reveal stagger-1 relative rounded-[1.5rem] p-2 bg-white/60 backdrop-blur-xl border border-white overflow-hidden group break-inside-avoid shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="relative rounded-[1rem] overflow-hidden">
              <img src="/assets/outside.webp" alt="Building Exterior"
                className="w-full h-auto group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View</span>
                <h3 className="text-white font-display text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Building Exterior</h3>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="reveal stagger-2 relative rounded-[1.5rem] p-2 bg-white/60 backdrop-blur-xl border border-white overflow-hidden group break-inside-avoid shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="relative rounded-[1rem] overflow-hidden">
              <img src="/assets/passage.webp" alt="Passage"
                className="w-full h-auto group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View</span>
                <h3 className="text-white font-display text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Passage Area</h3>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="reveal stagger-3 relative rounded-[1.5rem] p-2 bg-white/60 backdrop-blur-xl border border-white overflow-hidden group break-inside-avoid shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="relative rounded-[1rem] overflow-hidden">
              <img src="/assets/lift.jpeg" alt="Lift"
                className="w-full h-auto group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View</span>
                <h3 className="text-white font-display text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Modern Elevator</h3>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="reveal stagger-4 relative rounded-[1.5rem] p-2 bg-white/60 backdrop-blur-xl border border-white overflow-hidden group break-inside-avoid shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="relative rounded-[1rem] overflow-hidden">
              <img src="/assets/cupboard.jpeg" alt="Cupboard"
                className="w-full h-auto group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View</span>
                <h3 className="text-white font-display text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Spacious Storage</h3>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="reveal stagger-5 relative rounded-[1.5rem] p-2 bg-white/60 backdrop-blur-xl border border-white overflow-hidden group break-inside-avoid shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="relative rounded-[1rem] overflow-hidden">
              <img src="/assets/washroom.webp" alt="Washroom"
                className="w-full h-auto group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View</span>
                <h3 className="text-white font-display text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Clean Washrooms</h3>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="reveal stagger-6 relative rounded-[1.5rem] p-2 bg-white/60 backdrop-blur-xl border border-white overflow-hidden group break-inside-avoid shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="relative rounded-[1rem] overflow-hidden">
              <img src="/assets/hichko.jpeg" alt="Hichko"
                className="w-full h-auto group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View</span>
                <h3 className="text-white font-display text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Relaxing Swings</h3>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="reveal stagger-7 relative rounded-[1.5rem] p-2 bg-white/60 backdrop-blur-xl border border-white overflow-hidden group break-inside-avoid shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="relative rounded-[1rem] overflow-hidden">
              <video src="/assets/topview.mp4" autoPlay loop muted playsInline
                className="w-full h-auto group-hover:scale-110 group-hover:-rotate-1 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Video</span>
                <h3 className="text-white font-display text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Aerial View</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
