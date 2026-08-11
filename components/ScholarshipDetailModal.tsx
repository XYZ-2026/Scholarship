"use client";

import React, { useEffect } from "react";

export interface ModalScholarship {
  id: string | number;
  name: string;
  country: string;
  countrySlug?: string;
  countryCode?: string;
  countryFlag?: string;
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

interface ModalProps {
  scholarship: ModalScholarship | null;
  onClose: () => void;
}

const countryCodeMap: Record<string, string> = {
  "united-kingdom": "GB",
  "united kingdom": "GB",
  "united-states": "US",
  "united states": "US",
  "germany": "DE",
  "canada": "CA",
  "australia": "AU",
  "netherlands": "NL",
  "sweden": "SE",
  "japan": "JP",
};

export default function ScholarshipDetailModal({ scholarship, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (scholarship) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scholarship, onClose]);

  if (!scholarship) return null;

  const countryKey = (scholarship.countrySlug || scholarship.country || "").toLowerCase();
  const displayCode = scholarship.countryCode || countryCodeMap[countryKey] || (scholarship.country ? scholarship.country.slice(0, 2).toUpperCase() : "INT");

  const fieldsStr = Array.isArray(scholarship.fields) ? scholarship.fields.join(", ") : (scholarship.fields || "All Fields");
  const highlightsList = Array.isArray(scholarship.highlights) && scholarship.highlights.length > 0
    ? scholarship.highlights
    : [
        "Full tuition and living costs",
        "Travel expenses covered",
        "Technical training focus",
        "Practical field experience",
        "Professional networking",
      ];
  const overviewText = scholarship.overview || `Official financial aid and scholarship programme for international students pursuing degree studies in ${scholarship.country}.`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white rounded-[32px] max-w-4xl lg:max-w-5xl w-full border border-[#E7E2DE] shadow-[0_32px_80px_rgba(0,0,0,0.3)] overflow-hidden my-auto animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color Top Accent Bar */}
        <div
          className="h-[5px] w-full"
          style={{ background: `linear-gradient(90deg, ${scholarship.color || "#690B1B"}, ${(scholarship.color || "#690B1B")}80, transparent)` }}
        />

        {/* Modal Outer Padding Wrapper */}
        <div className="p-6 sm:p-8 md:p-10 relative">
          {/* Top Header Row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-xl bg-[#F6F4F2] border border-[#EBEBEB] flex items-center justify-center text-[15px] font-black text-[#111] tracking-wider shadow-2xs">
                {displayCode}
              </div>
              <div>
                <span className="text-[12px] text-[#999] font-bold block leading-none">{scholarship.country}</span>
                <span className="text-[9.5px] uppercase tracking-[0.14em] font-extrabold px-2.5 py-0.5 rounded-full inline-block mt-1 bg-[#F6F4F2] text-[#690B1B] border border-[#E7E2DE]">
                  {scholarship.tag || "Scholarship"}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-[34px] h-[34px] rounded-full bg-[#F6F4F2] text-[#888] flex items-center justify-center hover:bg-[#690B1B] hover:text-white transition-all duration-300 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 2-Column Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1.2fr] gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <div>
                <h2 className="text-[24px] sm:text-[28px] font-black text-[#111] tracking-tight leading-[1.2]">
                  {scholarship.name}
                </h2>
                <div className="mt-2.5 flex items-center gap-2.5 flex-wrap">
                  <span className="text-[13.5px] text-[#777] font-semibold">{scholarship.level}</span>
                  <span className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full ${
                    scholarship.funding === "Fully Funded"
                      ? "bg-[#E8F8F0] text-[#0F8A43] border border-[#0F8A43]/15"
                      : "bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/15"
                  }`}>
                    {scholarship.funding}
                  </span>
                </div>
              </div>

              {/* Light Grey Info Box */}
              <div className="bg-[#F9F8F6] p-5 sm:p-6 rounded-2xl border border-[#F0EEEB] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-[#A5A09A] uppercase tracking-wider">FUNDING AMOUNT</span>
                  <span className="text-[13.5px] font-extrabold text-[#111]">{scholarship.amount}</span>
                </div>
                <div className="h-px bg-[#EDEBE8]" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-[#A5A09A] uppercase tracking-wider">APPLICATION DEADLINE</span>
                  <span className="text-[13.5px] font-extrabold text-[#690B1B]">{scholarship.deadline}</span>
                </div>
                <div className="h-px bg-[#EDEBE8]" />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-extrabold text-[#A5A09A] uppercase tracking-wider shrink-0">FIELDS OF STUDY</span>
                  <span className="text-[13px] font-extrabold text-[#333] text-right truncate">{fieldsStr}</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <a
                href={scholarship.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative w-full h-[50px] rounded-xl overflow-hidden bg-[#690B1B] text-white text-[14.5px] font-extrabold flex items-center justify-center gap-2.5 hover:bg-[#520815] transition-all duration-300 cursor-pointer shadow-md"
              >
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1200ms] ease-out" />
                <span className="relative flex items-center gap-2">
                  Visit Official Website
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </span>
              </a>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6 md:border-l md:border-[#F0EEEB] md:pl-8">
              {/* OVERVIEW */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-[26px] h-[26px] rounded-lg bg-[#690B1B]/[0.06] flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#690B1B" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  </div>
                  <span className="text-[11.5px] font-extrabold text-[#690B1B] uppercase tracking-widest">OVERVIEW</span>
                </div>
                <p className="text-[13.5px] leading-[1.75] text-[#555] font-medium">{overviewText}</p>
              </div>

              {/* KEY BENEFITS */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-[26px] h-[26px] rounded-lg bg-[#C4A15F]/[0.1] flex items-center justify-center">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B7A5E" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <span className="text-[11.5px] font-extrabold text-[#8B7A5E] uppercase tracking-widest">KEY BENEFITS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {highlightsList.map((h, hi) => (
                    <div key={hi} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F8F6] border border-[#F0EEEB]">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#690B1B]/[0.08] flex items-center justify-center shrink-0">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#690B1B" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-[12.5px] text-[#444] font-semibold leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
