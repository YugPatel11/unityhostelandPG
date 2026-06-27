export default function Footer() {
  return (
    <>
      <section id="contact" className="py-16 md:py-24 bg-emerald-900 border-t-8 border-emerald-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="reveal font-display text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8">Ready to move in?</h2>
          <p className="reveal stagger-1 text-emerald-100 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
            Join the Unity Hostel community today and experience the best student living in Kosamba.
          </p>
          <div className="reveal stagger-2 flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/919687886878?text=Hii%20i%20want%20to%20book%20a%20room%20for%20me%20" target="_blank" rel="noreferrer"
              className="bg-white text-emerald-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-transform hover:-translate-y-1 shadow-xl shadow-emerald-950/50">
              Book a Visit
            </a>
            <a href="tel:+919687886878"
              className="bg-emerald-800 border border-emerald-700 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-transform hover:-translate-y-1 flex items-center gap-2">
              Call +91 96878 86878
            </a>
          </div>
          
          <div className="reveal stagger-3 mt-12 md:mt-16 w-full max-w-4xl mx-auto rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-emerald-800/50 relative bg-emerald-800">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.9319103623006!2d72.96137808197503!3d21.470207882272124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be03bbd92841e89%3A0x1efcc1db97479f5b!2sUnity%20Hostel%20-%20PG!5e1!3m2!1sen!2sin!4v1781950607455!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full block hover:opacity-90 transition-opacity"></iframe>
          </div>
        </div>
      </section>

      <footer className="bg-stone-950 text-stone-500 py-8 border-t border-stone-800 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Unity Hostel and PG. All rights reserved.</p>
      </footer>
    </>
  );
}
