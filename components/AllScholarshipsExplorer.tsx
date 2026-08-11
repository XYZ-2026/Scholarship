"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScholarshipDetailModal, { ModalScholarship } from "./ScholarshipDetailModal";
import type { WixScholarship } from "@/lib/wixCms";

interface Props {
  scholarships: WixScholarship[];
}

export default function AllScholarshipsExplorer({ scholarships }: Props) {
  const [activeModalScholarship, setActiveModalScholarship] = useState<ModalScholarship | null>(null);
  const [countryFilter, setCountryFilter] = useState("All");
  const [fundingFilter, setFundingFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const countryOptions = [
    { label: "All Countries", value: "All", flag: "🌐" },
    { label: "United Kingdom", value: "United Kingdom", flag: "🇬🇧" },
    { label: "United States", value: "United States", flag: "🇺🇸" },
    { label: "Germany", value: "Germany", flag: "🇩🇪" },
    { label: "Canada", value: "Canada", flag: "🇨🇦" },
    { label: "Australia", value: "Australia", flag: "🇦🇺" },
    { label: "Netherlands", value: "Netherlands", flag: "🇳🇱" },
    { label: "Sweden", value: "Sweden", flag: "🇸🇪" },
    { label: "Japan", value: "Japan", flag: "🇯🇵" },
  ];

  const fundingOptions = ["All", "Fully Funded", "Partially Funded"];
  const levelOptions = ["All", "Bachelors", "Masters", "PhD", "Postdoctoral"];

  const filtered = scholarships.filter((s) => {
    const matchCountry = countryFilter === "All" || s.country.toLowerCase() === countryFilter.toLowerCase();
    const matchFunding = fundingFilter === "All" || s.funding === fundingFilter;
    const matchLevel = levelFilter === "All" || (s.level || "").includes(levelFilter);
    const q = searchQuery.toLowerCase().trim();
    
    const fieldsList = Array.isArray(s.fields) ? s.fields : [s.fields || ""];
    const highlightsList = Array.isArray(s.highlights) ? s.highlights : [s.highlights || ""];
    
    const matchSearch = !q || [
      s.name, s.country, s.tag, s.funding, s.level, s.overview,
      ...fieldsList, ...highlightsList,
    ].some((text) => text && String(text).toLowerCase().includes(q));

    return matchCountry && matchFunding && matchLevel && matchSearch;
  });

  return (
    <>
      {/* ╔══════════════════════════════════════╗
         ║          HERO BANNER SECTION           ║
         ╚══════════════════════════════════════╝ */}
      <section className="relative bg-gradient-to-br from-[#1F0408] via-[#450712] to-[#120205] text-white pt-14 pb-16 sm:pt-20 sm:pb-24 px-5 md:px-10 overflow-hidden">
        {/* Glow Accents */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#690B1B]/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-[#C4A15F]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/60 mb-4 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#C4A15F] font-bold">2,500+ Scholarships</span>
          </div>

          <h1 className="text-[32px] sm:text-[48px] lg:text-[58px] font-black tracking-tight leading-[1.08] text-white max-w-4xl mx-auto">
            Global Scholarship <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#F3E5AB] to-[#C4A15F]">Directory</span>
          </h1>

          <p className="mt-4 text-[15px] sm:text-[17px] text-white/80 max-w-2xl mx-auto font-normal leading-[1.7]">
            Browse all 2,500+ verified financial aid opportunities, fully funded government grants, and university awards updated live.
          </p>

          {/* Quick Stats Badges */}
          <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[13.5px] font-bold">
              <span>🎓</span>
              <span>2,500+ Active Awards</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[13.5px] font-bold">
              <span>🌍</span>
              <span>80+ Countries</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/15 px-4 sm:px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[13.5px] font-bold">
              <span>✨</span>
              <span>100% Verified Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║          SEARCH & FILTER TOOLBAR       ║
         ╚══════════════════════════════════════╝ */}
      <section className="bg-white border-b border-[#E7E2DE] sticky top-[84px] md:top-[92px] z-40 shadow-xs py-4">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-3.5">
          {/* Top Row: Search Input */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search 2,500+ scholarships by title, degree level, field, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[46px] pl-11 pr-10 rounded-2xl bg-[#FAFAF9] border border-[#E7E2DE] text-[14px] text-[#111] placeholder:text-[#999] focus:outline-none focus:border-[#690B1B] focus:bg-white focus:ring-2 focus:ring-[#690B1B]/10 transition-all duration-300"
            />
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" className="absolute left-4 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#690B1B] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            )}
          </div>

          {/* Bottom Row: Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            {/* Country Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-[#A5A5A5] font-extrabold uppercase tracking-wider mr-1">Country:</span>
              {countryOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCountryFilter(opt.value)}
                  className={`px-3.5 h-[34px] rounded-full text-[12px] font-bold transition-all duration-300 cursor-pointer border flex items-center gap-1.5 shrink-0 ${
                    countryFilter === opt.value
                      ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_4px_12px_rgba(105,11,27,0.18)]"
                      : "bg-[#F9F8F6] text-[#555] border-[#E7E2DE] hover:border-[#690B1B]/30 hover:text-[#690B1B]"
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-[#E7E2DE] shrink-0" />

            {/* Funding Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-[#A5A5A5] font-extrabold uppercase tracking-wider mr-1">Funding:</span>
              {fundingOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFundingFilter(opt)}
                  className={`px-3.5 h-[34px] rounded-full text-[12px] font-bold transition-all duration-300 cursor-pointer border shrink-0 ${
                    fundingFilter === opt
                      ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_4px_12px_rgba(105,11,27,0.18)]"
                      : "bg-[#F9F8F6] text-[#555] border-[#E7E2DE] hover:border-[#690B1B]/30 hover:text-[#690B1B]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-[#E7E2DE] shrink-0" />

            {/* Level Selector */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-[#A5A5A5] font-extrabold uppercase tracking-wider mr-1">Level:</span>
              {levelOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setLevelFilter(opt)}
                  className={`px-3.5 h-[34px] rounded-full text-[12px] font-bold transition-all duration-300 cursor-pointer border shrink-0 ${
                    levelFilter === opt
                      ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_4px_12px_rgba(105,11,27,0.18)]"
                      : "bg-[#F9F8F6] text-[#555] border-[#E7E2DE] hover:border-[#690B1B]/30 hover:text-[#690B1B]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║            CARDS GRID SECTION          ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-12 sm:py-16 min-h-[600px] bg-[#F6F4F2]" aria-label="Scholarships Results">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Counter Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E2DE]">
            <div>
              <h2 className="text-[22px] font-black text-[#111] tracking-tight">
                Available Opportunities
              </h2>
              <p className="text-[13px] text-[#777] font-semibold mt-0.5">
                Showing <span className="text-[#690B1B] font-extrabold">{filtered.length}</span> of {scholarships.length} scholarships
              </p>
            </div>

            {(countryFilter !== "All" || fundingFilter !== "All" || levelFilter !== "All" || searchQuery) && (
              <button
                onClick={() => { setCountryFilter("All"); setFundingFilter("All"); setLevelFilter("All"); setSearchQuery(""); }}
                className="text-[12.5px] font-extrabold text-[#690B1B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-20 px-6 bg-white rounded-3xl border border-[#E7E2DE] max-w-lg mx-auto shadow-sm">
              <div className="w-[64px] h-[64px] rounded-full bg-[#690B1B]/[0.06] text-[#690B1B] flex items-center justify-center mx-auto mb-4 text-[26px]">
                🔍
              </div>
              <h3 className="text-[20px] font-extrabold text-[#111]">No matching scholarships found</h3>
              <p className="mt-2 text-[13.5px] text-[#666] leading-relaxed">
                Try adjusting your search criteria or clearing your filters to view all available funding opportunities.
              </p>
              <button
                onClick={() => { setCountryFilter("All"); setFundingFilter("All"); setLevelFilter("All"); setSearchQuery(""); }}
                className="mt-6 px-7 py-3 rounded-full bg-[#690B1B] text-white text-[13.5px] font-extrabold hover:bg-[#7A1022] transition-colors cursor-pointer shadow-md"
              >
                View All Scholarships
              </button>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filtered.map((s) => {
              const fieldsStr = Array.isArray(s.fields) ? s.fields.join(", ") : (s.fields || "All Fields");

              return (
                <article
                  key={s.id}
                  id={`scholarship-${s.id}`}
                  className="bg-white border border-[#EBEBEB] hover:border-[#690B1B]/30 hover-lift shadow-[0_4px_16px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  onClick={() => setActiveModalScholarship({
                    id: s.id,
                    name: s.name,
                    country: s.country,
                    countrySlug: s.countrySlug,
                    countryFlag: s.countryFlag,
                    funding: s.funding,
                    deadline: s.deadline,
                    amount: s.amount,
                    fields: Array.isArray(s.fields) ? s.fields : [s.fields || "All Fields"],
                    level: s.level,
                    tag: s.tag,
                    color: s.color,
                    overview: s.overview,
                    highlights: Array.isArray(s.highlights) ? s.highlights : [],
                    url: s.url,
                  })}
                >
                  <div>
                    {/* Top Accent Line */}
                    <div className="h-[4px]" style={{ background: `linear-gradient(90deg, ${s.color || "#690B1B"}, ${(s.color || "#690B1B")}80, transparent)` }} />

                    {/* Card Header */}
                    <div className="h-[56px] border-b border-[#F5F3F1] flex items-center justify-between px-6">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[22px]" aria-label={`${s.country} flag`}>{s.countryFlag || "🌐"}</span>
                        <span className="text-[12.5px] text-[#888] font-bold">{s.country}</span>
                      </div>
                      <span
                        className="text-[9.5px] uppercase tracking-[0.14em] font-black px-3 py-1.5 rounded-full"
                        style={{ color: s.color || "#690B1B", backgroundColor: `${s.color || "#690B1B"}10`, border: `1px solid ${s.color || "#690B1B"}20` }}
                      >
                        {s.tag || "Scholarship"}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 pb-4">
                      <h3 className="text-[18.5px] font-extrabold text-[#111] group-hover:text-[#690B1B] transition-colors duration-300 leading-snug">
                        {s.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-[#888] font-semibold">{s.level}</p>

                      {/* Details Table */}
                      <div className="mt-5 space-y-0">
                        {[
                          { label: "Funding", value: s.amount, hl: false },
                          { label: "Deadline", value: s.deadline, hl: true },
                          { label: "Fields", value: fieldsStr, hl: false },
                        ].map((row, ri) => (
                          <div key={ri}>
                            <div className="flex items-center justify-between py-3">
                              <span className="text-[11.5px] text-[#A5A09A] font-bold uppercase tracking-wider">{row.label}</span>
                              <span className={`text-[13.5px] font-extrabold ${row.hl ? "text-[#690B1B]" : "text-[#222]"}`}>{row.value}</span>
                            </div>
                            {ri < 2 && <div className="h-px bg-gradient-to-r from-[#F5F3F1] via-[#EDEBE8] to-[#F5F3F1]" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0">
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${
                        s.funding === "Fully Funded"
                          ? "bg-[#E8F8F0] text-[#0F8A43] border border-[#0F8A43]/15"
                          : "bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/15"
                      }`}>
                        {s.funding}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalScholarship({
                            id: s.id,
                            name: s.name,
                            country: s.country,
                            countrySlug: s.countrySlug,
                            countryFlag: s.countryFlag,
                            funding: s.funding,
                            deadline: s.deadline,
                            amount: s.amount,
                            fields: Array.isArray(s.fields) ? s.fields : [s.fields || "All Fields"],
                            level: s.level,
                            tag: s.tag,
                            color: s.color,
                            overview: s.overview,
                            highlights: Array.isArray(s.highlights) ? s.highlights : [],
                            url: s.url,
                          });
                        }}
                        className="text-[12.5px] font-black text-[#690B1B] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
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
        </div>
      </section>

      {/* Modal Popup */}
      <ScholarshipDetailModal
        scholarship={activeModalScholarship}
        onClose={() => setActiveModalScholarship(null)}
      />
    </>
  );
}
