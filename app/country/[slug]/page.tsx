"use client";

import React, { useState, use, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { countryScholarshipsMap } from "@/data/countryScholarships";
import type { Scholarship } from "@/data/countryScholarships";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COUNTRY DETAIL PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const country = countryScholarshipsMap[slug];

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [fundingFilter, setFundingFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  if (!country) {
    return (
      <div className="bg-[#F6F4F2] text-[#111111] min-h-screen font-[Poppins]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-5 py-32 text-center">
          <div className="w-[80px] h-[80px] mx-auto mb-6 rounded-2xl bg-[#690B1B]/[0.06] flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#690B1B" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
          </div>
          <h1 className="text-[36px] font-extrabold text-[#0D0D0D] tracking-[-0.03em]">Country Not Found</h1>
          <p className="mt-4 text-[15px] text-[#727272] leading-[1.8]">We couldn&apos;t find scholarship data for this country.</p>
          <Link href="/" className="inline-flex items-center gap-2 mt-8 h-[48px] px-8 rounded-full bg-[#690B1B] text-white text-[14px] font-bold hover:bg-[#7A1022] shadow-[0_8px_24px_rgba(105,11,27,0.2)] transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const fundingOptions = ["All", "Fully Funded", "Partially Funded"];
  const levelOptions = ["All", "Bachelors", "Masters", "PhD", "Postdoctoral"];

  const filtered = country.scholarships.filter((s: Scholarship) => {
    const matchFunding = fundingFilter === "All" || s.funding === fundingFilter;
    const matchLevel = levelFilter === "All" || s.level.includes(levelFilter);
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || [
      s.name, s.tag, s.funding, s.level, s.overview,
      ...s.fields, ...s.highlights,
    ].some((text) => text.toLowerCase().includes(q));
    return matchFunding && matchLevel && matchSearch;
  });

  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleCard = useCallback((id: number) => {
    // Clear any pending scroll
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);

    const isCollapsing = expandedId === id;

    if (isCollapsing) {
      // Simply collapse — no scroll needed
      setExpandedId(null);
      return;
    }

    const wasSomethingExpanded = expandedId !== null;

    if (wasSomethingExpanded) {
      // Step 1: Collapse the currently expanded card first
      setExpandedId(null);

      // Step 2: After the collapse settles, expand the new card and scroll
      scrollTimerRef.current = setTimeout(() => {
        setExpandedId(id);
        scrollTimerRef.current = setTimeout(() => {
          cardRefs.current[id]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }, 350);
    } else {
      // Nothing was expanded — just expand and scroll
      setExpandedId(id);
      scrollTimerRef.current = setTimeout(() => {
        cardRefs.current[id]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [expandedId]);

  return (
    <div className="bg-[#F6F4F2] text-[#111111] overflow-x-hidden font-[Poppins]">
      <Navbar />

      {/* ╔══════════════════════════════════════╗
         ║          HERO SECTION                ║
         ╚══════════════════════════════════════╝ */}
      <section className="relative h-[340px] sm:h-[400px] md:h-[440px] overflow-hidden">
        {/* Hero image */}
        <Image
          src={country.heroImage}
          alt={`Study in ${country.name}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#690B1B]/20 to-transparent" />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-5 md:px-10 flex flex-col justify-end pb-10 md:pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-white/60 font-medium mb-5 animate-fadeInDown">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
            <span className="text-white/40">Countries</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
            <span className="text-white/90">{country.name}</span>
          </nav>

          {/* Country info */}
          <div className="flex items-end gap-5 animate-fadeInUp">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[40px] sm:text-[48px] drop-shadow-lg">{country.flag}</span>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4A15F]" />
                  <span className="text-[11px] text-[#C4A15F] font-bold tracking-[0.12em] uppercase">{country.scholarshipCount} Scholarships</span>
                </div>
              </div>
              <h1 className="text-[32px] sm:text-[42px] md:text-[52px] font-extrabold text-white tracking-[-0.04em] leading-[1.08] drop-shadow-lg">
                Study in {country.name}
              </h1>
              <p className="mt-3 text-[14px] sm:text-[15px] text-white/60 leading-[1.8] max-w-2xl">
                {country.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║    BACK · FILTERS · SEARCH (1 ROW)  ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-5 border-b border-[#E7E2DE]/80">
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

            <div className="w-px h-5 bg-[#E7E2DE] shrink-0 hidden md:block" />

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

            {/* Search bar — pushed to the right */}
            <div className="relative w-full sm:w-auto sm:min-w-[200px] lg:min-w-[240px] sm:ml-auto shrink-0">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B5B0AA] pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-[34px] pl-9 pr-8 rounded-full bg-white border border-[#E7E2DE] text-[12px] text-[#333] font-medium placeholder:text-[#C5C0BA] focus:outline-none focus:border-[#690B1B]/40 focus:shadow-[0_0_0_3px_rgba(105,11,27,0.06)] transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full bg-[#F6F4F2] flex items-center justify-center text-[#999] hover:bg-[#690B1B]/[0.08] hover:text-[#690B1B] transition-all duration-200 cursor-pointer"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║        SCHOLARSHIP CARDS GRID        ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Section header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-px bg-[#C4A15F]" />
              <span className="text-[#C4A15F] text-[11px] tracking-[0.2em] font-bold uppercase">Available Opportunities</span>
              <div className="w-8 h-px bg-[#C4A15F]" />
            </div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
              Scholarships in <span className="gradient-text">{country.name}</span>
            </h2>
            <p className="mt-3 text-[14px] text-[#727272] leading-[1.8]">
              {filtered.length} scholarship{filtered.length !== 1 ? "s" : ""} found{searchQuery ? ` for "${searchQuery}"` : " matching your filters"}
            </p>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white border border-[#EBEBEB] rounded-[24px]">
              <div className="w-[64px] h-[64px] mx-auto mb-5 rounded-xl bg-[#F6F4F2] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#B5B0AA" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              </div>
              <h3 className="text-[18px] font-bold text-[#333]">No scholarships match your {searchQuery ? "search" : "filters"}</h3>
              <p className="mt-2 text-[14px] text-[#999]">
                {searchQuery ? `No results found for "${searchQuery}". Try a different keyword.` : "Try adjusting your funding or level filters"}
              </p>
              <button
                onClick={() => { setFundingFilter("All"); setLevelFilter("All"); setSearchQuery(""); }}
                className="mt-5 px-6 h-[40px] rounded-full bg-[#690B1B]/[0.06] text-[#690B1B] text-[13px] font-bold hover:bg-[#690B1B]/[0.1] transition-all duration-300 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Scholarship cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filtered.map((s: Scholarship) => {
              const isExpanded = expandedId === s.id;
              return (
                <div
                  key={s.id}
                  id={`scholarship-${s.id}`}
                  ref={(el) => { cardRefs.current[s.id] = el; }}
                  className={`bg-white border rounded-[24px] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group scroll-mt-[100px] ${
                    isExpanded
                      ? "border-[#690B1B]/20 shadow-[0_16px_48px_rgba(105,11,27,0.1)] col-span-full"
                      : "border-[#EBEBEB] hover:border-[#690B1B]/15 hover-lift shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                  }`}
                  onClick={() => toggleCard(s.id)}
                >
                  {/* Color accent bar */}
                  <div className="h-[4px]" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}80, transparent)` }} />

                  {/* Card header */}
                  <div className="h-[56px] border-b border-[#F5F3F1] flex items-center justify-between px-6">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[22px]">{country.flag}</span>
                      <span className="text-[12px] text-[#999] font-medium">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[9.5px] uppercase tracking-[0.12em] font-extrabold px-3 py-1.5 rounded-full"
                        style={{ color: s.color, backgroundColor: `${s.color}08`, border: `1px solid ${s.color}15` }}
                      >
                        {s.tag}
                      </span>
                      {/* Expand indicator */}
                      <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center transition-all duration-500 ${
                        isExpanded
                          ? "bg-[#690B1B] text-white rotate-180"
                          : "bg-[#F6F4F2] text-[#B5B0AA] group-hover:text-[#690B1B]"
                      }`}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Card body — uses 2-column layout when expanded full-width */}
                  <div className={`p-6 pb-7 ${isExpanded ? "md:grid md:grid-cols-[1fr_1.2fr] md:gap-8" : ""}`}>
                   <div>
                    <h3 className={`text-[18px] font-bold leading-snug transition-colors duration-300 ${isExpanded ? "text-[#690B1B]" : "text-[#111] group-hover:text-[#690B1B]"}`}>
                      {s.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-[#999] font-medium">{s.level}</p>

                    {/* Details rows */}
                    <div className="mt-5 space-y-0">
                      {[
                        { label: "Funding", value: s.amount, hl: false },
                        { label: "Deadline", value: s.deadline, hl: true },
                        { label: "Fields", value: s.fields.join(", "), hl: false },
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

                    {/* Funding type badge */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                        s.funding === "Fully Funded"
                          ? "bg-[#0F8A43]/[0.08] text-[#0F8A43] border border-[#0F8A43]/15"
                          : "bg-[#D97706]/[0.08] text-[#D97706] border border-[#D97706]/15"
                      }`}>
                        {s.funding}
                      </span>
                    </div>

                   </div>

                    {/* ── EXPANDED CONTENT (right column on desktop when expanded) ── */}
                    <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                      isExpanded ? "max-h-[800px] opacity-100 mt-6 md:mt-0" : "max-h-0 opacity-0 mt-0"
                    }`}>
                      {/* Divider — only on mobile (on desktop the 2-col layout separates visually) */}
                      <div className="h-px bg-gradient-to-r from-[#690B1B]/10 via-[#E7E2DE] to-transparent mb-6 md:hidden" />

                      {/* Overview */}
                      <div className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-[28px] h-[28px] rounded-lg bg-[#690B1B]/[0.06] flex items-center justify-center">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#690B1B" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
                          </div>
                          <span className="text-[13px] font-bold text-[#690B1B] uppercase tracking-[0.1em]">Overview</span>
                        </div>
                        <p className="text-[13.5px] leading-[2] text-[#666]">{s.overview}</p>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-[28px] h-[28px] rounded-lg bg-[#C4A15F]/[0.08] flex items-center justify-center">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4A15F" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                          </div>
                          <span className="text-[13px] font-bold text-[#8B7A5E] uppercase tracking-[0.1em]">Key Benefits</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {s.highlights.map((h: string, hi: number) => (
                            <div key={hi} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#F6F4F2]/80 border border-[#EBEBEB]/60">
                              <div className="w-[18px] h-[18px] rounded-full bg-[#690B1B]/[0.06] flex items-center justify-center shrink-0 mt-0.5">
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#690B1B" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                              </div>
                              <span className="text-[12.5px] text-[#555] leading-[1.6] font-medium">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA button */}
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/btn relative w-full h-[48px] rounded-xl overflow-hidden bg-[#690B1B] text-white text-[14px] font-bold flex items-center justify-center gap-2.5 hover:bg-[#7A1022] hover:shadow-[0_8px_24px_rgba(105,11,27,0.2)] transition-all duration-300 cursor-pointer"
                      >
                        <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1200ms] ease-out" />
                        <span className="relative flex items-center gap-2">
                          Visit Official Website
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║         EXPLORE MORE COUNTRIES       ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-16 lg:py-20 border-t border-[#E7E2DE]/80">
        <div className="max-w-7xl mx-auto px-5 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-[#E7E2DE]/80 rounded-full px-4 py-2 mb-6 shadow-sm">
            <span className="text-[16px]">🌍</span>
            <span className="text-[11px] tracking-[0.14em] font-bold text-[#8B7A5E] uppercase">Explore More</span>
          </div>
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
            Discover scholarships in <span className="gradient-text">other countries</span>
          </h2>
          <p className="mt-4 text-[14px] text-[#727272] leading-[1.8] max-w-lg mx-auto">
            Browse our curated database of scholarships across 80+ countries worldwide.
          </p>

          {/* Other country chips */}
          <div className="flex items-center justify-center gap-3 flex-wrap mt-8">
            {Object.entries(countryScholarshipsMap)
              .filter(([key]) => key !== slug)
              .map(([key, c]) => (
                <Link
                  key={key}
                  href={`/country/${key}`}
                  className="group flex items-center gap-2 px-5 h-[44px] rounded-full bg-white border border-[#EBEBEB] hover:border-[#690B1B]/25 hover:shadow-[0_4px_16px_rgba(105,11,27,0.06)] transition-all duration-300"
                >
                  <span className="text-[18px]">{c.flag}</span>
                  <span className="text-[13px] font-semibold text-[#555] group-hover:text-[#690B1B] transition-colors duration-300">{c.name}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[#D5CFC9] group-hover:text-[#690B1B] transition-colors duration-300"><path d="M9 6l6 6-6 6" /></svg>
                </Link>
              ))}
          </div>

          {/* Back to home */}
          <div className="mt-10">
            <Link href="/" className="group inline-flex items-center gap-2.5 text-[14px] font-bold text-[#690B1B] hover:text-[#7A1022] transition-colors duration-300 bg-[#690B1B]/[0.04] hover:bg-[#690B1B]/[0.08] px-7 py-3.5 rounded-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
