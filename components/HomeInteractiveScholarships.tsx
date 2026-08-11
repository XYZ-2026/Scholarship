"use client";

import React, { useState } from "react";

interface ScholarshipItem {
  id: number;
  name: string;
  country: string;
  flag: string;
  funding: string;
  deadline: string;
  amount: string;
  fields: string[];
  level: string;
  tag: string;
  color: string;
}

interface Props {
  scholarships: ScholarshipItem[];
  categories: string[];
}

export default function HomeInteractiveScholarships({ scholarships, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? scholarships
    : scholarships.filter(
        (s) =>
          s.funding.includes(activeCategory) ||
          s.level.includes(activeCategory) ||
          s.country.includes(activeCategory) ||
          (activeCategory === "USA" && s.country === "United States") ||
          (activeCategory === "Europe" && ["Europe", "Germany", "United Kingdom"].includes(s.country))
      );

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-8 sm:mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 sm:px-6 h-[38px] sm:h-[40px] rounded-full text-[12.5px] sm:text-[13px] font-semibold transition-all duration-400 cursor-pointer border ${
              activeCategory === cat
                ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_6px_20px_rgba(105,11,27,0.2)]"
                : "bg-white/80 backdrop-blur-sm text-[#5F5F5F] border-[#E7E2DE] hover:border-[#690B1B]/40 hover:text-[#690B1B] hover:shadow-[0_2px_12px_rgba(105,11,27,0.06)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
        {filtered.map((s) => (
          <article key={s.id} className="card-premium hover-lift cursor-pointer group">
            <div className="h-[4px] rounded-t-[24px]" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}80, transparent)` }} />
            <div className="h-[52px] sm:h-[56px] border-b border-[#F5F3F1] flex items-center justify-between px-5 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="text-[20px] sm:text-[22px]" aria-label={`${s.country} flag`}>{s.flag}</span>
                <span className="text-[11.5px] sm:text-[12px] text-[#999] font-medium">{s.country}</span>
              </div>
              <span className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.12em] font-extrabold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full" style={{ color: s.color, backgroundColor: `${s.color}08`, border: `1px solid ${s.color}15` }}>{s.tag}</span>
            </div>
            <div className="p-5 sm:p-6 pb-6 sm:pb-7">
              <h3 className="text-[17px] sm:text-[18px] font-bold text-[#111] group-hover:text-[#690B1B] transition-colors duration-300 leading-snug">{s.name}</h3>
              <p className="mt-1 sm:mt-1.5 text-[12.5px] sm:text-[13px] text-[#999] font-medium">{s.level}</p>
              <div className="mt-5 sm:mt-6 space-y-0">
                {[
                  { label: "Funding", value: s.amount, hl: false },
                  { label: "Deadline", value: s.deadline, hl: true },
                  { label: "Fields", value: s.fields.join(", "), hl: false },
                ].map((row, ri) => (
                  <div key={ri}>
                    <div className="flex items-center justify-between py-2.5 sm:py-3">
                      <span className="text-[11.5px] sm:text-[12px] text-[#B5B0AA] font-medium uppercase tracking-wide">{row.label}</span>
                      <span className={`text-[13px] sm:text-[13.5px] font-bold ${row.hl ? "text-[#690B1B]" : "text-[#333]"}`}>{row.value}</span>
                    </div>
                    {ri < 2 && <div className="h-px bg-gradient-to-r from-[#F5F3F1] via-[#EDEBE8] to-[#F5F3F1]" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-7 flex gap-2.5 sm:gap-3">
                <a href="#scholarships" className="flex-1 h-[42px] sm:h-[44px] rounded-xl bg-[#690B1B] text-white text-[13px] sm:text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-[#7A1022] hover:shadow-[0_6px_20px_rgba(105,11,27,0.18)] transition-all duration-300 cursor-pointer">
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <button aria-label="Save scholarship" className="h-[42px] w-[42px] sm:h-[44px] sm:w-[44px] shrink-0 rounded-xl border border-[#E7E2DE] bg-[#FAFAF9] flex items-center justify-center text-[#B5B0AA] hover:text-[#690B1B] hover:border-[#690B1B]/30 transition-all duration-300 cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
