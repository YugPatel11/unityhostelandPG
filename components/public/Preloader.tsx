'use client';

import { useEffect, useState } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFading(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setVisible(false);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="preloader" className={`fixed inset-0 z-[100] bg-[#faf0e6] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center">
        <div className="absolute -inset-4 border-[3px] border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <img src="/assets/image.png" alt="Loading..." className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover shadow-2xl animate-pulse-slow" />
      </div>
    </div>
  );
}
