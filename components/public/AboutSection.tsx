export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#faf0e6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Why Choose Unity Hostel</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mt-3">
            Where Comfort <span className="italic text-emerald-700">Meets Care</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="reveal stagger-1 bg-white p-4 md:p-8 rounded-[1rem] md:rounded-[2rem] hover-card border border-stone-100 group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 md:w-16 md:h-16 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-600 mb-3 md:mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-stone-900 mb-1.5 md:mb-3 leading-tight">Fully Furnished</h3>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                Premium beds, spacious wardrobes, and dedicated study tables designed for maximum comfort and focus.
              </p>
            </div>
          </div>

          <div className="reveal stagger-2 bg-white p-4 md:p-8 rounded-[1rem] md:rounded-[2rem] hover-card border border-stone-100 group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 md:w-16 md:h-16 bg-orange-50 rounded-xl md:rounded-2xl flex items-center justify-center text-orange-600 mb-3 md:mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-stone-900 mb-1.5 md:mb-3 leading-tight">Homestyle Meals</h3>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                Nutritious breakfast, lunch, and dinner cooked fresh daily. Experience the taste of home with our hygienic kitchens.
              </p>
            </div>
          </div>

          <div className="reveal stagger-3 bg-white p-4 md:p-8 rounded-[1rem] md:rounded-[2rem] hover-card border border-stone-100 group flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center text-blue-600 mb-3 md:mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-sm md:text-xl font-bold text-stone-900 mb-1.5 md:mb-3 leading-tight">24/7 Security</h3>
              <p className="text-stone-500 text-sm md:text-base leading-relaxed">
                Sleep peacefully knowing you're protected by round-the-clock CCTV surveillance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
