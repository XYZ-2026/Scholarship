"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Scholarship } from "@/data/countryScholarships";
import ScholarshipDetailModal, { ModalScholarship } from "./ScholarshipDetailModal";

interface Props {
  countryName: string;
  countryFlag: string;
  scholarships: Scholarship[];
  deadlines?: any[];
}

export default function CountryScholarshipExplorer({ countryName, countryFlag, scholarships, deadlines }: Props) {
  const [activeModalScholarship, setActiveModalScholarship] = useState<ModalScholarship | null>(null);
  const [fundingFilter, setFundingFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fundingOptions = ["All", "Fully Funded", "Partially Funded"];
  const levelOptions = ["All", "Bachelors", "Masters", "PhD", "Postdoctoral"];

  const filtered = scholarships.filter((s: Scholarship) => {
    const matchFunding = fundingFilter === "All" || s.funding === fundingFilter;
    const matchLevel = levelFilter === "All" || (s.level || "").includes(levelFilter);
    const q = searchQuery.toLowerCase().trim();
    const fieldsList = Array.isArray(s.fields) ? s.fields : [s.fields || ""];
    const highlightsList = Array.isArray(s.highlights) ? s.highlights : [s.highlights || ""];
    
    const matchSearch = !q || [
      s.name, s.tag, s.funding, s.level, s.overview,
      ...fieldsList, ...highlightsList,
    ].some((text) => text && String(text).toLowerCase().includes(q));

    return matchFunding && matchLevel && matchSearch;
  });

  return (
    <>
      {/* ╔══════════════════════════════════════╗
         ║    BACK · FILTERS · SEARCH (1 ROW)  ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-5 border-b border-[#E7E2DE]/80" aria-label="Filters and Search">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Back button */}
            <Link href="/" className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#666] hover:text-[#690B1B] transition-colors duration-300 shrink-0 mr-1">
              <div className="w-[34px] h-[34px] rounded-full border border-[#E7E2DE] bg-white flex items-center justify-center group-hover:border-[#690B1B]/30 group-hover:bg-[#690B1B]/[0.04] transition-all duration-300">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              </div>
              <span className="hidden sm:inline">Back</span>
            </Link>

            <div className="w-px h-5 bg-[#E7E2DE] shrink-0 hidden sm:block" />

            {/* Funding filter pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-[#B5B0AA] font-semibold uppercase tracking-wide mr-0.5 hidden lg:inline">Funding:</span>
              {fundingOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFundingFilter(opt)}
                  className={`px-3 lg:px-4 h-[32px] rounded-full text-[11px] lg:text-[12px] font-semibold transition-all duration-300 cursor-pointer border ${
                    fundingFilter === opt
                      ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_4px_12px_rgba(105,11,27,0.15)]"
                      : "bg-white/80 text-[#777] border-[#E7E2DE] hover:border-[#690B1B]/30 hover:text-[#690B1B]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-[#E7E2DE] shrink-0 hidden xl:block" />

            {/* Level filter pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-[#B5B0AA] font-semibold uppercase tracking-wide mr-0.5 hidden lg:inline">Level:</span>
              {levelOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setLevelFilter(opt)}
                  className={`px-3 lg:px-4 h-[32px] rounded-full text-[11px] lg:text-[12px] font-semibold transition-all duration-300 cursor-pointer border ${
                    levelFilter === opt
                      ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_4px_12px_rgba(105,11,27,0.15)]"
                      : "bg-white/80 text-[#777] border-[#E7E2DE] hover:border-[#690B1B]/30 hover:text-[#690B1B]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative flex-1 min-w-[200px] ml-auto">
              <input
                type="text"
                placeholder="Search by scholarship, field, degree..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[36px] pl-9 pr-8 rounded-full bg-white border border-[#E7E2DE] text-[12.5px] text-[#111] placeholder:text-[#AAA] focus:outline-none focus:border-[#690B1B]/50 focus:ring-2 focus:ring-[#690B1B]/10 transition-all duration-300"
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="2.5" strokeLinecap="round" className="absolute left-3 top-1/2 -translate-y-1/2">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAA] hover:text-[#690B1B] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║         SCHOLARSHIPS GRID              ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-12 sm:py-16" aria-label="Scholarship Opportunities">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Results count indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E7E2DE]/60">
            <div>
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#111] tracking-tight">
                Available Opportunities
              </h2>
              <p className="text-[13px] text-[#888] mt-0.5 font-medium">
                Showing <span className="font-bold text-[#690B1B]">{filtered.length}</span> of {scholarships.length} scholarships in {countryName}
              </p>
            </div>

            {(fundingFilter !== "All" || levelFilter !== "All" || searchQuery) && (
              <button
                onClick={() => { setFundingFilter("All"); setLevelFilter("All"); setSearchQuery(""); }}
                className="text-[12px] font-semibold text-[#690B1B] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-16 px-6 bg-white rounded-3xl border border-[#E7E2DE] max-w-xl mx-auto">
              <div className="w-[60px] h-[60px] rounded-full bg-[#690B1B]/[0.06] text-[#690B1B] flex items-center justify-center mx-auto mb-4 text-[24px]">
                🔍
              </div>
              <h3 className="text-[18px] font-bold text-[#111]">No matching scholarships found</h3>
              <p className="mt-2 text-[13.5px] text-[#666] leading-relaxed">
                Try adjusting your search criteria or clearing your filters to view all available funding opportunities.
              </p>
              <button
                onClick={() => { setFundingFilter("All"); setLevelFilter("All"); setSearchQuery(""); }}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#690B1B] text-white text-[13px] font-bold hover:bg-[#7A1022] transition-colors cursor-pointer"
              >
                View All Scholarships
              </button>
            </div>
          )}

          {/* Scholarship cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filtered.map((s: Scholarship) => {
              const fieldsStr = Array.isArray(s.fields) ? s.fields.join(", ") : (s.fields || "All Fields");

              return (
                <article
                  key={s.id}
                  id={`scholarship-${s.id}`}
                  className="bg-white border border-[#EBEBEB] hover:border-[#690B1B]/25 hover-lift shadow-[0_2px_12px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                  onClick={() => setActiveModalScholarship({
                    ...s,
                    country: countryName,
                    countryFlag: countryFlag,
                    fields: Array.isArray(s.fields) ? s.fields : [s.fields || "All Fields"],
                    highlights: Array.isArray(s.highlights) ? s.highlights : [],
                  })}
                >
                  <div>
                    {/* Color accent bar */}
                    <div className="h-[4px]" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}80, transparent)` }} />

                    {/* Card header */}
                    <div className="h-[56px] border-b border-[#F5F3F1] flex items-center justify-between px-6">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[22px]" aria-label={`${countryName} flag`}>{countryFlag}</span>
                        <span className="text-[12px] text-[#999] font-medium">{countryName}</span>
                      </div>
                      <span
                        className="text-[9.5px] uppercase tracking-[0.12em] font-extrabold px-3 py-1.5 rounded-full"
                        style={{ color: s.color, backgroundColor: `${s.color}08`, border: `1px solid ${s.color}15` }}
                      >
                        {s.tag}
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
                            country: countryName,
                            countryFlag: countryFlag,
                            fields: Array.isArray(s.fields) ? s.fields : [s.fields || "All Fields"],
                            highlights: Array.isArray(s.highlights) ? s.highlights : [],
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
        </div>
      </section>

      {/* Modal Popup Component */}
      <ScholarshipDetailModal
        scholarship={activeModalScholarship}
        onClose={() => setActiveModalScholarship(null)}
      />
    </>
  );
}
