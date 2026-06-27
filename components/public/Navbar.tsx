'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 bg-[#faf0e6]/80 backdrop-blur-md saturate-150 border-b border-stone-200/50 shadow-black/5 ${isScrolled ? 'shadow-md' : 'shadow-lg'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2 md:gap-3">
          <img src="/assets/image.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-sm" />
          <span className="font-display text-xl md:text-2xl font-bold text-emerald-900 tracking-tight">Unity Hostel & PG</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-stone-600 text-sm tracking-wide">
          <Link href="#about" className="hover:text-emerald-600 transition-colors">About</Link>
          <Link href="#rooms" className="hover:text-emerald-600 transition-colors">Rooms</Link>
          <Link href="#facilities" className="hover:text-emerald-600 transition-colors">Facilities</Link>
          <Link href="#dining" className="hover:text-emerald-600 transition-colors">Dining</Link>
          <Link href="#gallery" className="hover:text-emerald-600 transition-colors">Gallery</Link>
          <Link href="#faq" className="hover:text-emerald-600 transition-colors">FAQ</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="hidden md:inline-flex items-center justify-center text-stone-600 font-medium hover:text-emerald-600 transition-colors text-sm">Owner Login</Link>
          <a href="https://wa.me/919687886878?text=Hii%20i%20want%20to%20book%20a%20room%20for%20me%20" target="_blank" rel="noreferrer"
            className="inline-flex bg-emerald-600 text-white px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-medium hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg shadow-emerald-600/20 active:scale-95 whitespace-nowrap">
            Book a Visit
          </a>
        </div>
      </div>
    </nav>
  );
}
