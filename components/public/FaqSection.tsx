'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "Are there any restrictions on timings?",
    answer: "No, there are no restrictions on timings. You are free to come and go as per your convenience."
  },
  {
    question: "Is there any security deposit?",
    answer: "No, there is no security deposit required."
  },
  {
    question: "Is there any railway station nearby?",
    answer: "Yes, Kosamba railway station is nearby and easily accessible from the PG."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-24 bg-[#faf0e6]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Got Questions?</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mt-3">
            Frequently Asked <span className="italic text-emerald-700">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => toggleFaq(index)}
              className="reveal stagger-1 bg-white border border-stone-200 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-300 transition-colors"
            >
              <div className="p-6 flex justify-between items-center bg-white z-10 relative">
                <h3 className="font-bold text-stone-900">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-emerald-600 transform transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className={`px-6 text-stone-500 transition-all duration-300 ease-in-out ${openIndex === index ? 'pb-6 opacity-100 max-h-40' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
