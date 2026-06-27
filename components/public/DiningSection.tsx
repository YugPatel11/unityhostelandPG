export default function DiningSection() {
  return (
    <section id="dining" className="py-24 bg-[#faf0e6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Delicious & Healthy</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mt-3">
            Premium <span className="italic text-emerald-700">Dining Experience</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal stagger-1">
            <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80" alt="Dining Area"
              className="rounded-2xl md:rounded-[2rem] shadow-2xl object-cover h-64 md:h-[500px] w-full" />
          </div>
          <div className="reveal stagger-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-3 flex items-center gap-3">
                <span className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </span>
                Breakfast
              </h3>
              <p className="text-stone-600 leading-relaxed">Start your day right with a hot, nutritious breakfast. Options vary daily from traditional Indian favorites to continental items.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-3 flex items-center gap-3">
                <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </span>
                Lunch
              </h3>
              <p className="text-stone-600 leading-relaxed">Complete thali meals featuring dal, seasonal sabzi, rice, roti, and salad. Packed lunch options available for college students.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-900 mb-3 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                </span>
                Dinner
              </h3>
              <p className="text-stone-600 leading-relaxed">A comforting, light dinner with alternating special menus on weekends. We also accommodate specific dietary preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
