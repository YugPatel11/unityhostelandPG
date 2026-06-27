export default function RoomsSection() {
  return (
    <section id="rooms" className="py-24 bg-[#faf0e6] border-y border-[#faf0e6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Our Rooms</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mt-3">
              Spaces Designed for <br /><span className="italic text-emerald-700">Living & Learning</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 max-w-md">
            <p className="text-stone-500 mb-2">Choose from 3, 4, or 5 bed sharing — each room is fully furnished, air-conditioned, and designed for comfort.</p>
            <p className="text-emerald-600 font-semibold text-sm">✨ Coming Soon: Power Backup , Laundry & Meals!</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {/* Room Card 1 */}
          <div className="reveal stagger-1 bg-stone-50 rounded-[1rem] md:rounded-[2rem] overflow-hidden border border-stone-100 hover-card group flex flex-col">
            <div className="relative h-32 md:h-72 overflow-hidden shrink-0">
              <img src="/assets/3_bed.webp" alt="Single Room"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm text-stone-800 text-[8px] md:text-xs font-bold uppercase tracking-wider py-0.5 px-1.5 md:py-1.5 md:px-3 rounded-full shadow-sm">
                Premium
              </div>
            </div>
            <div className="p-3 md:p-8 flex flex-col grow">
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-1 md:mb-4">
                <h3 className="font-display text-[15px] md:text-2xl font-bold text-stone-900 leading-tight">3 Bed Sharing</h3>
                <span className="text-emerald-600 font-bold text-sm md:text-xl mt-0.5 xl:mt-0">₹6,500<span className="text-[9px] md:text-sm text-stone-400 font-normal">/mo</span></span>
              </div>
              <p className="text-stone-500 mb-3 md:mb-6 text-[10px] md:text-sm line-clamp-2 md:line-clamp-none leading-relaxed">Comfortable 3 bed sharing with ample space, dedicated study area, and vibrant community vibe.</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-8 mt-auto">
                <span className="bg-white border border-stone-200 text-stone-600 text-[8px] md:text-xs py-0.5 px-1.5 md:py-1 md:px-3 rounded md:rounded-full font-medium">AC</span>
                <span className="bg-white border border-stone-200 text-stone-600 text-[8px] md:text-xs py-0.5 px-1.5 md:py-1 md:px-3 rounded md:rounded-full font-medium">WiFi</span>
              </div>
              <a href="https://wa.me/919687886878?text=Hii%20i%20want%20to%20book%20a%20room%20for%20me%20" target="_blank" rel="noreferrer"
                className="block w-full text-center py-1.5 md:py-3.5 text-[11px] md:text-base rounded-full border-2 border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-600 hover:text-white transition-colors">Enquire Now</a>
            </div>
          </div>

          {/* Room Card 2 */}
          <div className="reveal stagger-2 bg-stone-50 rounded-[1rem] md:rounded-[2rem] overflow-hidden border-2 border-emerald-500 relative hover-card group shadow-xl shadow-emerald-900/5 flex flex-col">
            <div className="absolute top-0 right-3 md:right-8 bg-emerald-500 text-white text-[8px] md:text-xs font-bold uppercase tracking-wider py-1 px-1.5 md:py-1.5 md:px-4 rounded-b-lg md:rounded-b-xl z-10 shadow-lg leading-none">
              Most Popular
            </div>
            <div className="relative h-32 md:h-72 overflow-hidden shrink-0">
              <img src="/assets/4_bed.jpeg" alt="Double Room"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-3 md:p-8 flex flex-col grow">
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-1 md:mb-4">
                <h3 className="font-display text-[15px] md:text-2xl font-bold text-stone-900 leading-tight">4 Bed Sharing</h3>
                <span className="text-emerald-600 font-bold text-sm md:text-xl mt-0.5 xl:mt-0">₹6,000<span className="text-[9px] md:text-sm text-stone-400 font-normal">/mo</span></span>
              </div>
              <p className="text-stone-500 mb-3 md:mb-6 text-[10px] md:text-sm line-clamp-2 md:line-clamp-none leading-relaxed">Spacious 4 bed sharing with natural light, individual storage, and a dedicated shared study corner.</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-8 mt-auto">
                <span className="bg-white border border-stone-200 text-stone-600 text-[8px] md:text-xs py-0.5 px-1.5 md:py-1 md:px-3 rounded md:rounded-full font-medium">AC</span>
                <span className="bg-white border border-stone-200 text-stone-600 text-[8px] md:text-xs py-0.5 px-1.5 md:py-1 md:px-3 rounded md:rounded-full font-medium">WiFi</span>
              </div>
              <a href="https://wa.me/919687886878?text=Hii%20i%20want%20to%20book%20a%20room%20for%20me%20" target="_blank" rel="noreferrer"
                className="block w-full text-center py-1.5 md:py-3.5 text-[11px] md:text-base rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">Enquire Now</a>
            </div>
          </div>

          {/* Room Card 3 */}
          <div className="reveal stagger-3 bg-stone-50 rounded-[1rem] md:rounded-[2rem] overflow-hidden border border-stone-100 hover-card group flex flex-col">
            <div className="relative h-32 md:h-72 overflow-hidden shrink-0">
              <img src="/assets/5_bed.webp" alt="Triple Room"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm text-stone-800 text-[8px] md:text-xs font-bold uppercase tracking-wider py-0.5 px-1.5 md:py-1.5 md:px-3 rounded-full shadow-sm">
                Budget Friendly
              </div>
            </div>
            <div className="p-3 md:p-8 flex flex-col grow">
              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-1 md:mb-4">
                <h3 className="font-display text-[15px] md:text-2xl font-bold text-stone-900 leading-tight">5 Bed Sharing</h3>
                <span className="text-emerald-600 font-bold text-sm md:text-xl mt-0.5 xl:mt-0">₹5,500<span className="text-[9px] md:text-sm text-stone-400 font-normal">/mo</span></span>
              </div>
              <p className="text-stone-500 mb-3 md:mb-6 text-[10px] md:text-sm line-clamp-2 md:line-clamp-none leading-relaxed">Affordable and comfortable 5 bed sharing — perfect for students who love vibrant community living.</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-8 mt-auto">
                <span className="bg-white border border-stone-200 text-stone-600 text-[8px] md:text-xs py-0.5 px-1.5 md:py-1 md:px-3 rounded md:rounded-full font-medium">AC</span>
                <span className="bg-white border border-stone-200 text-stone-600 text-[8px] md:text-xs py-0.5 px-1.5 md:py-1 md:px-3 rounded md:rounded-full font-medium">WiFi</span>
              </div>
              <a href="https://wa.me/919687886878?text=Hii%20i%20want%20to%20book%20a%20room%20for%20me%20" target="_blank" rel="noreferrer"
                className="block w-full text-center py-1.5 md:py-3.5 text-[11px] md:text-base rounded-full border-2 border-emerald-600 text-emerald-600 font-medium hover:bg-emerald-600 hover:text-white transition-colors">Enquire Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
