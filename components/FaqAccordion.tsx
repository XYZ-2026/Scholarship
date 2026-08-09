"use client";

import React, { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`bg-white border rounded-[20px] overflow-hidden transition-all duration-500 ${openFaq === i ? "border-[#690B1B]/15 shadow-[0_8px_32px_rgba(105,11,27,0.06)]" : "border-[#EBEBEB] hover:border-[#D5CFC9]"}`}>
          <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-7 py-6 flex items-center justify-between text-left cursor-pointer group" aria-expanded={openFaq === i}>
            <span className={`text-[15px] font-bold pr-6 transition-colors duration-300 ${openFaq === i ? "text-[#690B1B]" : "text-[#111] group-hover:text-[#690B1B]"}`}>{faq.q}</span>
            <div className={`w-[34px] h-[34px] shrink-0 rounded-full flex items-center justify-center transition-all duration-500 ${openFaq === i ? "bg-[#690B1B] text-white rotate-45 shadow-[0_4px_12px_rgba(105,11,27,0.2)]" : "bg-[#F6F4F2] border border-[#E7E2DE] text-[#999] group-hover:border-[#690B1B]/20 group-hover:text-[#690B1B]"}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </div>
          </button>
          <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="px-7 pb-7">
              <div className="h-px bg-gradient-to-r from-[#690B1B]/10 via-[#E7E2DE] to-transparent mb-5" />
              <p className="text-[14px] leading-[2] text-[#727272]">{faq.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
