"use client";

import React, { useState } from "react";
import ScholarshipDetailModal, { ModalScholarship } from "./ScholarshipDetailModal";

export interface ScholarshipItem {
  id: number;
  name: string;
  country: string;
  countrySlug?: string;
  flag: string;
  funding: string;
  deadline: string;
  amount: string;
  fields: string[];
  level: string;
  tag: string;
  color: string;
  overview?: string;
  highlights?: string[];
  url?: string;
}

interface Props {
  scholarships: ScholarshipItem[];
  categories: string[];
}

export default function HomeInteractiveScholarships({ scholarships, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeModalScholarship, setActiveModalScholarship] = useState<ModalScholarship | null>(null);

  const filtered = activeCategory === "All"
    ? scholarships
    : scholarships.filter((s) => {
        const cat = activeCategory.toLowerCase();
        const funding = (s.funding || "").toLowerCase();
        const level = (s.level || "").toLowerCase();
        const country = (s.country || "").toLowerCase();

        if (cat === "fully funded") return funding.includes("fully");
        if (cat === "masters") return level.includes("master");
        if (cat === "phd") return level.includes("phd") || level.includes("doctor");
        if (cat === "usa") return country.includes("united states") || country.includes("usa");
        if (cat === "europe") {
          return ["united kingdom", "germany", "netherlands", "sweden", "europe", "france"].some((c) =>
            country.includes(c)
          );
        }

        return funding.includes(cat) || level.includes(cat) || country.includes(cat);
      });

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

      {/* Empty State Fallback */}
      {filtered.length === 0 && (
        <div className="text-center py-12 px-6 bg-white rounded-2xl border border-[#E7E2DE]">
          <p className="text-[15px] font-semibold text-[#555]">No scholarships match this category filter.</p>
          <button
            onClick={() => setActiveCategory("All")}
            className="mt-3 px-5 py-2 text-[13px] font-bold text-[#690B1B] bg-[#690B1B]/[0.06] rounded-full hover:bg-[#690B1B]/[0.12] transition-colors cursor-pointer"
          >
            View All Scholarships
          </button>
        </div>
      )}

      {/* Scholarship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {filtered.map((s: ScholarshipItem) => {
          const fieldsStr = Array.isArray(s.fields) ? s.fields.join(", ") : (s.fields || "All Fields");

          return (
            <article
              key={s.id}
              id={`scholarship-${s.id}`}
              className="bg-white border border-[#EBEBEB] hover:border-[#690B1B]/25 hover-lift shadow-[0_2px_12px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              onClick={() => setActiveModalScholarship({
                ...s,
                countryFlag: s.flag,
              })}
            >
              <div>
                {/* Color accent bar */}
                <div className="h-[4px]" style={{ background: `linear-gradient(90deg, ${s.color || "#690B1B"}, ${(s.color || "#690B1B")}80, transparent)` }} />

                {/* Card header */}
                <div className="h-[56px] border-b border-[#F5F3F1] flex items-center justify-between px-6">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[22px]" aria-label={`${s.country} flag`}>{s.flag || "🌐"}</span>
                    <span className="text-[12px] text-[#999] font-medium">{s.country}</span>
                  </div>
                  <span
                    className="text-[9.5px] uppercase tracking-[0.12em] font-extrabold px-3 py-1.5 rounded-full"
                    style={{ color: s.color || "#690B1B", backgroundColor: `${s.color || "#690B1B"}08`, border: `1px solid ${s.color || "#690B1B"}15` }}
                  >
                    {s.tag || "Scholarship"}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6 pb-4">
                  <h3 className="text-[18px] font-bold text-[#111] group-hover:text-[#690B1B] transition-colors duration-300 leading-snug">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-[#999] font-medium">{s.level}</p>

                  {/* Details rows */}
                  <div className="mt-5 space-y-0">
                    {[
                      { label: "Funding", value: s.amount, hl: false },
                      { label: "Deadline", value: s.deadline, hl: true },
                      { label: "Fields", value: fieldsStr, hl: false },
                    ].map((row, ri) => (
                      <div key={ri}>
                        <div className="flex items-center justify-between py-3">
                          <span className="text-[12px] text-[#B5B0AA] font-medium uppercase tracking-wide">{row.label}</span>
                          <span className={`text-[13.5px] font-bold ${row.hl ? "text-[#690B1B]" : "text-[#333]"}`}>{row.value}</span>
                        </div>
                        {ri < 2 && <div className="h-px bg-gradient-to-r from-[#F5F3F1] via-[#EDEBE8] to-[#F5F3F1]" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                    s.funding === "Fully Funded"
                      ? "bg-[#0F8A43]/[0.08] text-[#0F8A43] border border-[#0F8A43]/15"
                      : "bg-[#D97706]/[0.08] text-[#D97706] border border-[#D97706]/15"
                  }`}>
                    {s.funding}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalScholarship({
                        ...s,
                        countryFlag: s.flag,
                      });
                    }}
                    className="text-[12px] font-extrabold text-[#690B1B] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    View Details
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Detail Modal Component */}
      <ScholarshipDetailModal
        scholarship={activeModalScholarship}
        onClose={() => setActiveModalScholarship(null)}
      />
    </div>
  );
}
