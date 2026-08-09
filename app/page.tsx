"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const scholarships = [
  {
    id: 1, name: "Chevening Scholarship", country: "United Kingdom", flag: "🇬🇧",
    funding: "Fully Funded", deadline: "Nov 2025", amount: "Full tuition + living",
    fields: ["All Fields"], level: "Masters", tag: "Most Popular", color: "#690B1B",
  },
  {
    id: 2, name: "Fulbright Program", country: "United States", flag: "🇺🇸",
    funding: "Fully Funded", deadline: "Oct 2025", amount: "$40,000+ per year",
    fields: ["All Fields"], level: "Masters / PhD", tag: "Prestigious", color: "#1B3A5C",
  },
  {
    id: 3, name: "DAAD Scholarship", country: "Germany", flag: "🇩🇪",
    funding: "Fully Funded", deadline: "Sep 2025", amount: "€934–1,300/month",
    fields: ["All Fields"], level: "Masters / PhD", tag: "Top Rated", color: "#2D5016",
  },
  {
    id: 4, name: "Erasmus Mundus", country: "Europe", flag: "🇪🇺",
    funding: "Fully Funded", deadline: "Jan 2026", amount: "€1,400/mo + tuition",
    fields: ["Joint Programs"], level: "Masters", tag: "EU Flagship", color: "#1A3B6E",
  },
  {
    id: 5, name: "Australia Awards", country: "Australia", flag: "🇦🇺",
    funding: "Fully Funded", deadline: "Apr 2026", amount: "Full tuition + stipend",
    fields: ["Development Focus"], level: "Masters / PhD", tag: "Government", color: "#6B3A0A",
  },
  {
    id: 6, name: "Gates Cambridge", country: "United Kingdom", flag: "🇬🇧",
    funding: "Fully Funded", deadline: "Dec 2025", amount: "Full cost of study",
    fields: ["All Fields"], level: "PhD / Masters", tag: "Elite", color: "#3D0B69",
  },
];

const categories = ["All", "Fully Funded", "Masters", "PhD", "Europe", "USA"];

const steps = [
  {
    num: "01", title: "Discover Opportunities",
    desc: "Browse our curated database of 2,500+ scholarships across 80+ countries, filtered by your profile.",
    icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>),
  },
  {
    num: "02", title: "AI Profile Matching",
    desc: "Our AI engine analyzes your academic background and eligibility to recommend best-fit scholarships.",
    icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>),
  },
  {
    num: "03", title: "Craft Applications",
    desc: "Use AI-powered SOP builder, recommendation letter templates, and document checklists to create winning applications.",
    icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
  },
  {
    num: "04", title: "Win & Celebrate",
    desc: "Track applications, receive interview prep, and join our 15,000+ scholarship winners community.",
    icon: (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 7 7 7 7M18 9h1.5a2.5 2.5 0 000-5C17 4 17 7 17 7" /><path d="M4 22h16M10 14.66V18M14 14.66V18" /><path d="M18 2H6v7a6 6 0 0012 0V2z" /></svg>),
  },
];

const testimonials = [
  {
    name: "Ayesha Rahman", scholarship: "Chevening Scholar 2024", country: "🇬🇧 United Kingdom",
    quote: "Abroad Simplified's AI profile matcher found scholarships I didn't even know existed. The SOP builder was a game-changer for my Chevening application.",
    avatar: "A", color: "#690B1B",
  },
  {
    name: "Carlos Mendoza", scholarship: "Fulbright Fellow 2024", country: "🇺🇸 United States",
    quote: "The step-by-step guidance and document checklist kept me organized through the entire Fulbright process. This platform gave me confidence I could actually win.",
    avatar: "C", color: "#1B3A5C",
  },
  {
    name: "Priya Sharma", scholarship: "DAAD Scholar 2024", country: "🇩🇪 Germany",
    quote: "From finding the right DAAD program to crafting my research proposal, Abroad Simplified was my constant companion. Now I'm pursuing my PhD in Berlin!",
    avatar: "P", color: "#2D5016",
  },
];

const faqs = [
  { q: "Is Abroad Simplified's scholarship finder free?", a: "Yes! Our scholarship discovery tool is completely free. You can browse, filter, and save scholarships without any charges. Premium features like AI-powered SOP reviews and mock interviews are available with a subscription." },
  { q: "How many scholarships are in the database?", a: "We maintain a curated database of over 2,500 active scholarships from 80+ countries. Our team updates the database weekly to ensure deadlines and eligibility criteria are always accurate." },
  { q: "Can I get help with my scholarship application?", a: "Absolutely. Our AI-powered tools help you write SOPs, prepare for interviews, and organize documents. You also get access to mentors who are past scholarship winners from top programs." },
  { q: "What types of scholarships do you cover?", a: "We cover fully funded, partially funded, merit-based, need-based, government-sponsored, university-specific, and organization-funded scholarships for undergraduate, masters, and PhD levels." },
  { q: "How does the AI profile matching work?", a: "You create a profile with your academic background, test scores, research interests, and preferred countries. Our AI analyzes your profile against scholarship eligibility criteria and ranks the best matches for you." },
];

const popularCountries = [
  { flag: "🇬🇧", name: "United Kingdom", count: "420+", label: "scholarships", slug: "united-kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" },
  { flag: "🇺🇸", name: "United States", count: "380+", label: "scholarships", slug: "united-states", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80" },
  { flag: "🇩🇪", name: "Germany", count: "310+", label: "scholarships", slug: "germany", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80" },
  { flag: "🇨🇦", name: "Canada", count: "280+", label: "scholarships", slug: "canada", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80" },
  { flag: "🇦🇺", name: "Australia", count: "240+", label: "scholarships", slug: "australia", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80" },
  { flag: "🇳🇱", name: "Netherlands", count: "180+", label: "scholarships", slug: "netherlands", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80" },
  { flag: "🇸🇪", name: "Sweden", count: "150+", label: "scholarships", slug: "sweden", image: "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&q=80" },
  { flag: "🇯🇵", name: "Japan", count: "130+", label: "scholarships", slug: "japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
];

const tools = [
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" /></svg>),
    title: "Scholarship Finder",
    desc: "Search & filter 2,500+ scholarships by country, level, funding type, and deadline.",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>),
    title: "AI Profile Matcher",
    desc: "Get personalized scholarship recommendations based on your academic background.",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>),
    title: "SOP Builder",
    desc: "AI-powered Statement of Purpose writer with university-specific templates.",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>),
    title: "Mentor Connect",
    desc: "Connect with past scholarship winners for guidance and interview preparation.",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>),
    title: "Deadline Tracker",
    desc: "Never miss a deadline with smart reminders and application timeline management.",
  },
  {
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>),
    title: "Document Checklist",
    desc: "Organized checklists for every scholarship so you never miss a required document.",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPONENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function ScholarshipLanding() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <div className="bg-[#F6F4F2] text-[#111111] overflow-x-hidden font-[Poppins]">
      <Navbar />

      {/* ╔══════════════════════════════════════╗
         ║        HERO — LEFT/RIGHT GRID        ║
         ╚══════════════════════════════════════╝ */}
      <section className="relative overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute top-16 right-[8%] w-[380px] h-[380px] bg-gradient-to-br from-[#690B1B]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none animate-orb" />
        <div className="absolute bottom-20 left-[3%] w-[280px] h-[280px] bg-gradient-to-tr from-[#C4A15F]/[0.06] to-transparent rounded-full blur-3xl pointer-events-none animate-orb-2" />
        <div className="absolute inset-0 hero-pattern opacity-50" />

        {/* Decorative rings */}
        <div className="absolute top-28 right-[48%] w-[100px] h-[100px] border border-[#690B1B]/[0.05] rounded-full pointer-events-none animate-float-slow hidden xl:block" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT ── */}
          <div className="max-w-[540px]">
            {/* Badge */}
            <div className="flex items-center gap-2.5 mb-7 animate-fadeInDown">
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-[#E7E2DE]/80 rounded-full pl-3 pr-4 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <span className="w-2 h-2 rounded-full bg-[#C4A15F] animate-pulse" />
                <span className="text-[11px] tracking-[0.16em] font-bold text-[#8B7A5E] uppercase">
                  Scholarships & Financial Aid
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] leading-[1.02] tracking-[-0.05em] font-extrabold text-[#0D0D0D] animate-fadeInUp">
              Fund Your Dream
              <br />
              <span className="gradient-text">Study Abroad</span>
              <br />
              Journey.
            </h1>

            {/* Subtext */}
            <p className="mt-7 text-[15px] md:text-[16px] leading-[1.9] text-[#727272] max-w-[500px] animate-fadeInUp delay-200">
              Discover 2,500+ fully-funded scholarships across 80+ countries.
              Our AI-powered platform matches your profile to the perfect
              funding opportunities — from application to acceptance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3.5 mt-9 animate-fadeInUp delay-400">
              <a
                href="#scholarships"
                className="group relative h-[52px] sm:h-[56px] px-8 sm:px-9 rounded-full overflow-hidden bg-[#690B1B] text-white text-[14.5px] sm:text-[15px] font-bold shadow-[0_12px_36px_rgba(105,11,27,0.28)] hover:shadow-[0_16px_48px_rgba(105,11,27,0.35)] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center cursor-pointer btn-glow animate-pulse-glow"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1200ms] ease-out" />
                <span className="relative flex items-center gap-2">
                  Find Your Scholarship
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </a>
              <a
                href="#how-it-works"
                className="group h-[52px] sm:h-[56px] px-8 sm:px-9 rounded-full border border-[#E7E2DE] bg-white/80 backdrop-blur-sm text-[#444] text-[14.5px] sm:text-[15px] font-semibold hover:border-[#690B1B]/30 hover:text-[#690B1B] transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[#C4A15F] mr-2"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" /></svg>
                How It Works
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 border-t border-[#E8E8E8] pt-7 mt-10 text-[13px] text-[#8B8B8B] animate-fadeInUp delay-600">
              <div><strong className="text-[#111] font-bold">2,500+</strong> scholarships</div>
              <div><strong className="text-[#111] font-bold">80+</strong> countries</div>
              <div><strong className="text-[#111] font-bold">$2.4B+</strong> in aid</div>
            </div>
          </div>

          {/* ── RIGHT — Scholarship Preview Card ── */}
          <div className="w-full max-w-[500px] lg:ml-auto animate-fadeInUp delay-300">
            <div className="bg-white border border-[#EBEBEB] rounded-[22px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

              {/* Card Top Bar */}
              <div className="h-14 border-b border-[#F2F0EE] flex items-center gap-4 px-6">
                <div className="flex gap-1.5">
                  <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]" />
                  <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
                  <span className="w-[10px] h-[10px] rounded-full bg-[#27CA40]" />
                </div>
                <div className="flex-1 h-[30px] rounded-lg bg-[#F6F4F2] flex items-center justify-center">
                  <span className="text-[11px] text-[#B5B0AA] font-medium">abroadsimplified.com/scholarships</span>
                </div>
              </div>

              {/* Card Content — Mini Scholarship Dashboard */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-[11px] text-[#C4A15F] font-bold tracking-[0.12em] uppercase">Your Matches</div>
                    <div className="text-[20px] font-extrabold text-[#111] mt-0.5 tracking-[-0.02em]">Top Scholarships</div>
                  </div>
                  <div className="w-[38px] h-[38px] rounded-xl bg-[#690B1B]/[0.06] flex items-center justify-center text-[#690B1B]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                  </div>
                </div>

                {/* Mini scholarship items */}
                <div className="space-y-3">
                  {[
                    { flag: "🇬🇧", name: "Chevening Scholarship", match: "98%", status: "Open", color: "#0F8A43" },
                    { flag: "🇺🇸", name: "Fulbright Program", match: "94%", status: "Open", color: "#0F8A43" },
                    { flag: "🇩🇪", name: "DAAD Scholarship", match: "91%", status: "Closing Soon", color: "#D97706" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-[14px] bg-[#F6F4F2]/80 border border-[#EBEBEB]/60 hover:border-[#690B1B]/15 hover:shadow-[0_4px_16px_rgba(105,11,27,0.04)] transition-all duration-300">
                      <span className="text-[20px]">{item.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13.5px] font-bold text-[#111] truncate">{item.name}</div>
                        <div className="text-[11px] text-[#999] font-medium mt-0.5">
                          <span style={{ color: item.color }}>● </span>{item.status}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[14px] font-extrabold text-[#690B1B]">{item.match}</div>
                        <div className="text-[10px] text-[#B5B0AA] font-medium">match</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Match bar */}
                <div className="mt-5 p-4 rounded-[14px] bg-gradient-to-r from-[#690B1B]/[0.04] to-[#C4A15F]/[0.04] border border-[#690B1B]/[0.06]">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[12px] font-bold text-[#690B1B] flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>
                      AI Profile Match Score
                    </span>
                    <span className="text-[13px] font-extrabold text-[#690B1B]">94%</span>
                  </div>
                  <div className="w-full h-[6px] rounded-full bg-[#E7E2DE]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#690B1B] to-[#C4A15F] w-[94%] transition-all duration-1000" />
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { value: "47", label: "Matches" },
                    { value: "12", label: "Saved" },
                    { value: "3", label: "Applied" },
                  ].map((s, i) => (
                    <div key={i} className="text-center p-3 rounded-[12px] bg-[#F6F4F2]/80 border border-[#EBEBEB]/60">
                      <div className="text-[18px] font-extrabold text-[#111] tracking-[-0.02em]">{s.value}</div>
                      <div className="text-[10px] text-[#B5B0AA] font-medium mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║       POPULAR COUNTRIES SECTION       ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-8 h-px bg-[#C4A15F]" />
              <span className="text-[#C4A15F] text-[11px] tracking-[0.2em] font-bold uppercase">Popular Destinations</span>
              <div className="w-8 h-px bg-[#C4A15F]" />
            </div>
            <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
              Explore by <span className="gradient-text-static">Country</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#727272] max-w-lg mx-auto">
              Browse scholarships by your dream study destination. Each country offers unique opportunities.
            </p>
          </div>

          {/* Country Cards Grid — 4 columns top row, 4 columns bottom row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {popularCountries.map((c, i) => (
              <Link
                key={i}
                href={`/country/${c.slug}`}
                className="group relative rounded-[20px] overflow-hidden cursor-pointer hover-lift aspect-[4/3]"
              >
                {/* Image */}
                <Image
                  src={c.image}
                  alt={`Study in ${c.name}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-500" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#690B1B]/0 group-hover:bg-[#690B1B]/20 transition-all duration-500" />

                {/* Top badge */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 shadow-sm">
                    <span className="text-[14px]">{c.flag}</span>
                    <span className="text-[10px] font-bold text-[#690B1B]">{c.count}</span>
                  </div>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-[16px] sm:text-[18px] font-bold leading-tight drop-shadow-lg">
                    {c.name}
                  </h3>
                  <p className="text-white/70 text-[11px] font-medium mt-1">
                    {c.count} {c.label} available
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 w-[32px] h-[32px] rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-400 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#690B1B" strokeWidth="2.5" strokeLinecap="round"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║       SCHOLARSHIPS SECTION           ║
         ╚══════════════════════════════════════╝ */}
      <section id="scholarships" className="py-24 lg:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-8 h-px bg-[#C4A15F]" />
              <span className="text-[#C4A15F] text-[11px] tracking-[0.2em] font-bold uppercase">Featured Opportunities</span>
              <div className="w-8 h-px bg-[#C4A15F]" />
            </div>
            <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
              Top Scholarships for <span className="gradient-text-static">2025–26</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#727272] max-w-lg mx-auto">
              Hand-picked, verified scholarship opportunities updated weekly by our research team.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 sm:px-6 h-[40px] rounded-full text-[13px] font-semibold transition-all duration-400 cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_6px_20px_rgba(105,11,27,0.2)]"
                    : "bg-white/80 backdrop-blur-sm text-[#5F5F5F] border-[#E7E2DE] hover:border-[#690B1B]/40 hover:text-[#690B1B] hover:shadow-[0_2px_12px_rgba(105,11,27,0.06)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {filtered.map((s) => (
              <div key={s.id} className="card-premium hover-lift cursor-pointer group">
                <div className="h-[4px] rounded-t-[24px]" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}80, transparent)` }} />
                <div className="h-[56px] border-b border-[#F5F3F1] flex items-center justify-between px-6">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[22px]">{s.flag}</span>
                    <span className="text-[12px] text-[#999] font-medium">{s.country}</span>
                  </div>
                  <span className="text-[9.5px] uppercase tracking-[0.12em] font-extrabold px-3 py-1.5 rounded-full" style={{ color: s.color, backgroundColor: `${s.color}08`, border: `1px solid ${s.color}15` }}>{s.tag}</span>
                </div>
                <div className="p-6 pb-7">
                  <h3 className="text-[18px] font-bold text-[#111] group-hover:text-[#690B1B] transition-colors duration-300 leading-snug">{s.name}</h3>
                  <p className="mt-1.5 text-[13px] text-[#999] font-medium">{s.level}</p>
                  <div className="mt-6 space-y-0">
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
                  <div className="mt-7 flex gap-3">
                    <button className="flex-1 h-[44px] rounded-xl bg-[#690B1B] text-white text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-[#7A1022] hover:shadow-[0_6px_20px_rgba(105,11,27,0.18)] transition-all duration-300 cursor-pointer">
                      Apply Now
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                    <button className="h-[44px] w-[44px] shrink-0 rounded-xl border border-[#E7E2DE] bg-[#FAFAF9] flex items-center justify-center text-[#B5B0AA] hover:text-[#690B1B] hover:border-[#690B1B]/30 transition-all duration-300 cursor-pointer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All */}
          <div className="text-center mt-14">
            <a href="#" className="group inline-flex items-center gap-2.5 text-[15px] font-bold text-[#690B1B] hover:text-[#7A1022] transition-colors duration-300 bg-[#690B1B]/[0.04] hover:bg-[#690B1B]/[0.08] px-7 py-3.5 rounded-full">
              View All 2,500+ Scholarships
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║        HOW IT WORKS                  ║
         ╚══════════════════════════════════════╝ */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E7E2DE] to-transparent" />
        <div className="absolute top-20 right-[5%] w-[200px] h-[200px] bg-[#690B1B]/[0.02] rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-8 h-px bg-[#C4A15F]" /><span className="text-[#C4A15F] text-[11px] tracking-[0.2em] font-bold uppercase">Your Journey</span><div className="w-8 h-px bg-[#C4A15F]" />
            </div>
            <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
              Four Steps to Your <span className="gradient-text-static">Scholarship</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#727272] max-w-lg mx-auto">
              From discovery to acceptance — we guide you at every stage with AI-powered tools and expert mentorship.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
            {steps.map((step, i) => (
              <div key={step.num} className="group relative bg-[#F6F4F2] border border-[#EBEBEB] rounded-[24px] p-7 hover-glow cursor-default transition-all duration-500">
                <div className="absolute top-5 right-6 text-[52px] font-black text-[#690B1B]/[0.04] leading-none select-none tracking-[-0.05em]">{step.num}</div>
                <div className="w-[58px] h-[58px] rounded-2xl bg-gradient-to-br from-[#690B1B]/[0.08] to-[#690B1B]/[0.03] flex items-center justify-center text-[#690B1B] mb-6 group-hover:bg-[#690B1B] group-hover:text-white group-hover:shadow-[0_8px_24px_rgba(105,11,27,0.2)] transition-all duration-500">{step.icon}</div>
                <h3 className="text-[16px] font-bold text-[#111] mb-3 leading-snug">{step.title}</h3>
                <p className="text-[13.5px] leading-[1.85] text-[#999]">{step.desc}</p>
                <div className="mt-6 flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((dot) => (<div key={dot} className={`h-1 rounded-full transition-all duration-300 ${dot <= i ? "bg-[#690B1B]/30 w-3" : "bg-[#E7E2DE] w-1.5"}`} />))}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-[14px] w-[28px] items-center justify-center -translate-y-1/2 z-10">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#D5CFC9]"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║        AI TOOLS SECTION              ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-24 lg:py-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left description */}
            <div className="lg:col-span-2 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2.5 mb-6">
                <div className="w-8 h-px bg-[#C4A15F]" />
                <span className="text-[#C4A15F] text-[11px] tracking-[0.2em] font-bold uppercase">Platform Tools</span>
              </div>
              <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
                Everything you need to{" "}
                <span className="gradient-text-static">win your scholarship</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.85] text-[#727272]">
                Our AI-powered toolkit handles every step of the scholarship journey — from discovery to application submission.
              </p>
              <a
                href="#scholarships"
                className="group inline-flex items-center gap-2 mt-8 text-[14px] font-bold text-[#690B1B] hover:text-[#7A1022] transition-colors"
              >
                Explore all tools
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>

            {/* Right grid */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool, i) => (
                <div
                  key={i}
                  className="group bg-white border border-[#EBEBEB] rounded-[20px] p-6 hover-glow cursor-default transition-all duration-400"
                >
                  <div className="w-[48px] h-[48px] rounded-xl bg-[#690B1B]/[0.06] flex items-center justify-center text-[#690B1B] mb-4 group-hover:bg-[#690B1B] group-hover:text-white transition-all duration-400">
                    {tool.icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-[#111] mb-2">{tool.title}</h3>
                  <p className="text-[13px] leading-[1.8] text-[#999]">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║        VALUE BANNER                  ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="relative bg-[#0A0A0A] rounded-[32px] overflow-hidden px-8 md:px-16 lg:px-20 py-20 md:py-24 noise-overlay">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#690B1B]/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#C4A15F]/12 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4A15F]" />
                <span className="text-[#C4A15F] text-[10px] tracking-[0.2em] uppercase font-bold">Why Students Choose Us</span>
              </div>
              <h2 className="text-[30px] sm:text-[42px] md:text-[54px] font-extrabold tracking-[-0.04em] leading-[1.08] text-white max-w-3xl mx-auto">
                We&apos;ve connected students to over <span className="gradient-text-gold">$2.4 billion</span> in scholarship funding
              </h2>
              <p className="mt-7 text-[15px] md:text-[16px] leading-[1.9] text-[#6B6F78] max-w-xl mx-auto">
                Join 15,000+ scholars who turned their study-abroad dreams into reality with our AI-powered guidance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                <a href="#scholarships" className="group relative h-[56px] px-9 rounded-full overflow-hidden bg-[#690B1B] text-white text-[15px] font-bold shadow-[0_12px_30px_rgba(105,11,27,0.35)] hover:scale-[1.03] transition-all duration-300 flex items-center justify-center cursor-pointer">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1200ms] ease-out" />
                  <span className="relative flex items-center gap-2.5">Start Your Journey <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>
                </a>
                <a href="#testimonials" className="h-[56px] px-9 rounded-full border border-white/[0.08] text-white/70 text-[15px] font-semibold hover:border-white/20 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer hover:bg-white/[0.03]">Read Success Stories</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║         TESTIMONIALS                 ║
         ╚══════════════════════════════════════╝ */}
      <section id="testimonials" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E7E2DE] to-transparent" />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-8 h-px bg-[#C4A15F]" /><span className="text-[#C4A15F] text-[11px] tracking-[0.2em] font-bold uppercase">Success Stories</span><div className="w-8 h-px bg-[#C4A15F]" />
            </div>
            <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
              Real Students, Real <span className="gradient-text-static">Scholarships</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-[#727272] max-w-lg mx-auto">
              Hear from students who secured life-changing scholarships with Abroad Simplified.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
            {testimonials.map((t, i) => (
              <div key={i} className="group bg-[#F6F4F2] border border-[#EBEBEB] rounded-[24px] p-7 pb-8 hover-glow cursor-default relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${t.color}, ${t.color}60, transparent)` }} />
                <div className="absolute top-5 right-7 text-[56px] font-serif leading-none select-none" style={{ color: `${t.color}08` }}>&ldquo;</div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center text-white text-[16px] font-extrabold shadow-[0_4px_12px_rgba(0,0,0,0.1)] shrink-0" style={{ backgroundColor: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="text-[15px] font-bold text-[#111]">{t.name}</div>
                    <div className="text-[11.5px] text-[#999] font-medium mt-0.5">{t.scholarship}</div>
                    <div className="text-[11px] text-[#B5B0AA] font-medium mt-0.5">{t.country}</div>
                  </div>
                </div>
                <p className="text-[14px] leading-[1.9] text-[#666] italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="14" height="14" viewBox="0 0 24 24" fill="#C4A15F" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#C4A15F] font-bold">5.0</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║              FAQ                     ║
         ╚══════════════════════════════════════╝ */}
      <section id="faq" className="py-24 lg:py-32 mesh-gradient">
        <div className="max-w-3xl mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-8 h-px bg-[#C4A15F]" /><span className="text-[#C4A15F] text-[11px] tracking-[0.2em] font-bold uppercase">Common Questions</span><div className="w-8 h-px bg-[#C4A15F]" />
            </div>
            <h2 className="text-[34px] sm:text-[44px] md:text-[54px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
              Frequently Asked <span className="gradient-text-static">Questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`bg-white border rounded-[20px] overflow-hidden transition-all duration-500 ${openFaq === i ? "border-[#690B1B]/15 shadow-[0_8px_32px_rgba(105,11,27,0.06)]" : "border-[#EBEBEB] hover:border-[#D5CFC9]"}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-7 py-6 flex items-center justify-between text-left cursor-pointer group">
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
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║          FINAL CTA                   ║
         ╚══════════════════════════════════════╝ */}
      <section className="py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#690B1B]/[0.02] rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-xl border border-[#E7E2DE]/80 rounded-full px-4 py-2 mb-6 shadow-sm">
            <span className="text-[16px]">🎓</span>
            <span className="text-[11px] tracking-[0.14em] font-bold text-[#8B7A5E] uppercase">Start Today</span>
          </div>
          <h2 className="text-[34px] sm:text-[46px] md:text-[58px] font-extrabold tracking-[-0.04em] leading-[1.06] text-[#0D0D0D]">
            Your scholarship is <span className="gradient-text">waiting</span>.
            <br />Let&apos;s find it together.
          </h2>
          <p className="mt-5 text-[15px] md:text-[16px] leading-[1.9] text-[#727272] max-w-xl mx-auto">
            Join 15,000+ students who&apos;ve secured fully-funded scholarships through Abroad Simplified. Start your journey today — it&apos;s free.
          </p>
          <div className="mt-8">
            <a href="#scholarships" className="group relative h-[60px] px-11 rounded-full overflow-hidden bg-[#690B1B] text-white text-[16px] font-bold shadow-[0_12px_36px_rgba(105,11,27,0.28)] hover:shadow-[0_16px_48px_rgba(105,11,27,0.38)] hover:scale-[1.03] transition-all duration-300 inline-flex items-center justify-center cursor-pointer btn-glow">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1200ms] ease-out" />
              <span className="relative flex items-center gap-2.5">Get Started Free <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>
            </a>
          </div>
          <div className="mt-7 flex items-center justify-center gap-5 text-[12px] text-[#B5B0AA] font-medium flex-wrap">
            <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>No credit card</span>
            <span className="w-1 h-1 rounded-full bg-[#D5CFC9]" />
            <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>2-minute setup</span>
            <span className="w-1 h-1 rounded-full bg-[#D5CFC9]" />
            <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>2,500+ scholarships</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
