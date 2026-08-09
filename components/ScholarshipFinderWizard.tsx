"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { countryScholarshipsMap, Scholarship } from "@/data/countryScholarships";

interface MatchedScholarship extends Scholarship {
  countryName: string;
  countryFlag: string;
  countrySlug: string;
  matchScore: number;
  matchReasons: string[];
}

const DEGREE_LEVELS = [
  { id: "Masters", label: "Master's Degree", icon: "🎓", desc: "1-2 year postgraduate study" },
  { id: "PhD", label: "PhD / Doctorate", icon: "🔬", desc: "3-5 year advanced research degree" },
  { id: "Bachelors", label: "Bachelor's Degree", icon: "🏛️", desc: "3-4 year undergraduate degree" },
  { id: "Postdoctoral", label: "Postdoctoral Research", icon: "🧪", desc: "Advanced post-PhD research fellowship" },
  { id: "Non-Degree", label: "Exchange / Certificate", icon: "🌍", desc: "Short course or exchange program" },
];

const FIELD_CATEGORIES = [
  { id: "All Fields", label: "All Fields / Any Discipline", icon: "⚡" },
  { id: "STEM", label: "Engineering, Tech & Computer Science", icon: "💻" },
  { id: "Health", label: "Health, Medicine & Life Sciences", icon: "🩺" },
  { id: "Business", label: "Business, MBA & Economics", icon: "📊" },
  { id: "Social Sciences", label: "Social Sciences & Law", icon: "⚖️" },
  { id: "Development Focus", label: "Public Policy & International Development", icon: "🌱" },
  { id: "Peace Focus", label: "Peace & Conflict Studies", icon: "🕊️" },
];

const COUNTRY_OPTIONS = [
  { slug: "all", name: "Any Country / Global", flag: "🌐" },
  { slug: "united-kingdom", name: "United Kingdom", flag: "🇬🇧" },
  { slug: "united-states", name: "United States", flag: "🇺🇸" },
  { slug: "germany", name: "Germany", flag: "🇩🇪" },
  { slug: "canada", name: "Canada", flag: "🇨🇦" },
  { slug: "australia", name: "Australia", flag: "🇦🇺" },
  { slug: "netherlands", name: "Netherlands", flag: "🇳🇱" },
  { slug: "sweden", name: "Sweden", flag: "🇸🇪" },
  { slug: "japan", name: "Japan", flag: "🇯🇵" },
];

const FUNDING_PREFERENCES = [
  { id: "All", label: "Show All Funding Options", desc: "Include both full & partial financial aid" },
  { id: "Fully Funded", label: "Fully Funded Only", desc: "Covers 100% tuition + living stipend + travel" },
  { id: "Partially Funded", label: "Tuition Reduction / Partial Aid", desc: "Covers tuition fees or partial grants" },
];

const EXTRA_TAGS = [
  "Government",
  "Merit-Based",
  "Women Only",
  "Leadership",
  "Research",
  "Elite",
  "University",
];

export default function ScholarshipFinderWizard() {
  const [step, setStep] = useState<number>(1);
  const [selectedLevels, setSelectedLevels] = useState<string[]>(["Masters"]);
  const [selectedFields, setSelectedFields] = useState<string[]>(["All Fields"]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["all"]);
  const [fundingPref, setFundingPref] = useState<string>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"match" | "deadline" | "name">("match");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [activeModalScholarship, setActiveModalScholarship] = useState<MatchedScholarship | null>(null);

  // Toggle selection helpers
  const toggleLevel = (id: string) => {
    setSelectedLevels((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((l) => l !== id) : prev) : [...prev, id]
    );
  };

  const toggleField = (id: string) => {
    if (id === "All Fields") {
      setSelectedFields(["All Fields"]);
      return;
    }
    const filtered = selectedFields.filter((f) => f !== "All Fields");
    if (filtered.includes(id)) {
      const next = filtered.filter((f) => f !== id);
      setSelectedFields(next.length === 0 ? ["All Fields"] : next);
    } else {
      setSelectedFields([...filtered, id]);
    }
  };

  const toggleCountry = (slug: string) => {
    if (slug === "all") {
      setSelectedCountries(["all"]);
      return;
    }
    const filtered = selectedCountries.filter((c) => c !== "all");
    if (filtered.includes(slug)) {
      const next = filtered.filter((c) => c !== slug);
      setSelectedCountries(next.length === 0 ? ["all"] : next);
    } else {
      setSelectedCountries([...filtered, slug]);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleSave = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Match Scoring Algorithm
  const matchedScholarships = useMemo(() => {
    const allMatches: MatchedScholarship[] = [];

    Object.entries(countryScholarshipsMap).forEach(([countrySlug, country]) => {
      // Check country match
      const isCountryMatch =
        selectedCountries.includes("all") || selectedCountries.includes(countrySlug);

      country.scholarships.forEach((s) => {
        let score = 50; // base score for matching any scholarship
        const reasons: string[] = [];

        // 1. Level Match (Weight: 25 points)
        const levelMatch = selectedLevels.some(
          (lvl) => s.level.toLowerCase().includes(lvl.toLowerCase()) || lvl === "Non-Degree"
        );
        if (levelMatch) {
          score += 25;
          reasons.push(`Degree Level (${s.level})`);
        }

        // 2. Country Match (Weight: 20 points)
        if (isCountryMatch) {
          score += 20;
          if (!selectedCountries.includes("all")) {
            reasons.push(`Target Destination (${country.name})`);
          }
        } else {
          score -= 30; // penalize if user specifically chose countries and this isn't one
        }

        // 3. Field Match (Weight: 20 points)
        const isAllFieldsUser = selectedFields.includes("All Fields");
        const sIsAllFields = s.fields.some((f) => f.toLowerCase().includes("all fields"));

        if (isAllFieldsUser || sIsAllFields) {
          score += 15;
          reasons.push("Field Alignment");
        } else {
          const fieldMatch = selectedFields.some((userF) =>
            s.fields.some(
              (sf) =>
                sf.toLowerCase().includes(userF.toLowerCase()) ||
                userF.toLowerCase().includes(sf.toLowerCase())
            )
          );
          if (fieldMatch) {
            score += 20;
            reasons.push("Specific Discipline Match");
          }
        }

        // 4. Funding Match (Weight: 15 points)
        if (fundingPref === "All") {
          score += 10;
        } else if (s.funding === fundingPref) {
          score += 15;
          reasons.push(fundingPref);
        } else if (fundingPref === "Fully Funded" && s.funding === "Partially Funded") {
          score -= 15;
        }

        // 5. Special Tags Match (Weight: up to 10 points)
        if (selectedTags.length > 0) {
          const matchedTagsCount = selectedTags.filter(
            (t) =>
              s.tag.toLowerCase().includes(t.toLowerCase()) ||
              s.overview.toLowerCase().includes(t.toLowerCase())
          ).length;
          if (matchedTagsCount > 0) {
            score += Math.min(10, matchedTagsCount * 5);
            reasons.push("Matched Special Preferences");
          }
        }

        // Clamp score between 60% and 99% for matched ones
        const finalScore = Math.min(99, Math.max(55, score));

        // Include if country is match or score > 60
        if (isCountryMatch || finalScore >= 65) {
          allMatches.push({
            ...s,
            countryName: country.name,
            countryFlag: country.flag,
            countrySlug: countrySlug,
            matchScore: finalScore,
            matchReasons: reasons.length > 0 ? Array.from(new Set(reasons)) : ["General Alignment"],
          });
        }
      });
    });

    return allMatches;
  }, [selectedLevels, selectedFields, selectedCountries, fundingPref, selectedTags]);

  // Filter & Sort Results
  const filteredResults = useMemo(() => {
    let result = [...matchedScholarships];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.countryName.toLowerCase().includes(q) ||
          s.overview.toLowerCase().includes(q) ||
          s.tag.toLowerCase().includes(q) ||
          s.fields.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "match") {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "deadline") {
      result.sort((a, b) => a.deadline.localeCompare(b.deadline));
    }

    return result;
  }, [matchedScholarships, searchQuery, sortBy]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* HEADER BAR & BREADCRUMB */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#666] hover:text-[#690B1B] transition-colors"
        >
          <div className="w-8 h-8 rounded-full border border-[#E7E2DE] bg-white flex items-center justify-center shadow-xs">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </div>
          <span>Back to Home</span>
        </Link>

        {step <= 4 && (
          <button
            onClick={() => setStep(5)}
            className="text-[13px] font-bold text-[#690B1B] hover:underline cursor-pointer flex items-center gap-1"
          >
            Skip to All Results ({matchedScholarships.length})
            <span>→</span>
          </button>
        )}
      </div>

      {/* ── QUESTIONNAIRE STEPS (STEPS 1 to 4) ── */}
      {step <= 4 ? (
        <div className="bg-white border border-[#E7E2DE] rounded-[28px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden transition-all">
          {/* Top Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-[12px] font-bold uppercase tracking-wider text-[#A5A5A5] mb-2.5">
              <span>Step {step} of 4</span>
              <span className="text-[#690B1B] font-extrabold">{step * 25}% Complete</span>
            </div>
            <div className="w-full h-2.5 bg-[#F0ECE8] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#690B1B] via-[#91162C] to-[#C4A15F] transition-all duration-500 rounded-full"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Academic Level */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#690B1B]/[0.06] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-3">
                <span>Degree Level</span>
              </div>
              <h1 className="text-[26px] sm:text-[34px] font-extrabold text-[#111] tracking-[-0.03em]">
                What level of study are you looking for?
              </h1>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#727272]">
                Select your target degree program to filter eligible scholarships.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {DEGREE_LEVELS.map((lvl) => {
                  const active = selectedLevels.includes(lvl.id);
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => toggleLevel(lvl.id)}
                      className={`group p-5 rounded-[20px] border-2 cursor-pointer transition-all duration-300 ${
                        active
                          ? "border-[#690B1B] bg-[#690B1B]/[0.02] shadow-[0_8px_24px_rgba(105,11,27,0.08)]"
                          : "border-[#E7E2DE] bg-white hover:border-[#690B1B]/40 hover:bg-[#FAF9F7]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[32px] mb-2">{lvl.icon}</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            active
                              ? "border-[#690B1B] bg-[#690B1B] text-white"
                              : "border-[#D4CFC9] bg-white"
                          }`}
                        >
                          {active && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <h3 className="text-[17px] font-bold text-[#111] mt-2">{lvl.label}</h3>
                      <p className="text-[13px] text-[#888] mt-1">{lvl.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Field of Study */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#690B1B]/[0.06] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-3">
                <span>Field of Study</span>
              </div>
              <h1 className="text-[26px] sm:text-[34px] font-extrabold text-[#111] tracking-[-0.03em]">
                What field or discipline do you plan to study?
              </h1>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#727272]">
                Choose your discipline so we can match field-specific grants and funding.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {FIELD_CATEGORIES.map((cat) => {
                  const active = selectedFields.includes(cat.id);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => toggleField(cat.id)}
                      className={`group p-5 rounded-[20px] border-2 cursor-pointer transition-all duration-300 ${
                        active
                          ? "border-[#690B1B] bg-[#690B1B]/[0.02] shadow-[0_8px_24px_rgba(105,11,27,0.08)]"
                          : "border-[#E7E2DE] bg-white hover:border-[#690B1B]/40 hover:bg-[#FAF9F7]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[30px]">{cat.icon}</span>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            active
                              ? "border-[#690B1B] bg-[#690B1B] text-white"
                              : "border-[#D4CFC9] bg-white"
                          }`}
                        >
                          {active && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <h3 className="text-[16px] font-bold text-[#111] mt-3">{cat.label}</h3>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Target Countries */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#690B1B]/[0.06] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-3">
                <span>Destinations</span>
              </div>
              <h1 className="text-[26px] sm:text-[34px] font-extrabold text-[#111] tracking-[-0.03em]">
                Which countries are you interested in studying in?
              </h1>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#727272]">
                Select one or multiple destination countries to view tailored opportunities.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
                {COUNTRY_OPTIONS.map((c) => {
                  const active = selectedCountries.includes(c.slug);
                  return (
                    <div
                      key={c.slug}
                      onClick={() => toggleCountry(c.slug)}
                      className={`group p-4 rounded-[20px] border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                        active
                          ? "border-[#690B1B] bg-[#690B1B]/[0.02] shadow-[0_8px_24px_rgba(105,11,27,0.08)]"
                          : "border-[#E7E2DE] bg-white hover:border-[#690B1B]/40 hover:bg-[#FAF9F7]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[28px]">{c.flag}</span>
                        <span className="text-[15px] font-bold text-[#111]">{c.name}</span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          active
                            ? "border-[#690B1B] bg-[#690B1B] text-white"
                            : "border-[#D4CFC9] bg-white"
                        }`}
                      >
                        {active && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Funding & Preferences */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#690B1B]/[0.06] text-[#690B1B] text-[12px] font-bold uppercase tracking-wider mb-3">
                <span>Funding & Preferences</span>
              </div>
              <h1 className="text-[26px] sm:text-[34px] font-extrabold text-[#111] tracking-[-0.03em]">
                What are your financial & application priorities?
              </h1>
              <p className="mt-2 text-[14px] sm:text-[15px] text-[#727272]">
                Specify your funding requirements and select any specialized features.
              </p>

              {/* Funding Type selection */}
              <div className="mt-7">
                <label className="text-[13px] font-extrabold uppercase tracking-wider text-[#999] mb-3 block">
                  Funding Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {FUNDING_PREFERENCES.map((f) => {
                    const active = fundingPref === f.id;
                    return (
                      <div
                        key={f.id}
                        onClick={() => setFundingPref(f.id)}
                        className={`p-4 rounded-[18px] border-2 cursor-pointer transition-all ${
                          active
                            ? "border-[#690B1B] bg-[#690B1B]/[0.02]"
                            : "border-[#E7E2DE] bg-white hover:border-[#690B1B]/30"
                        }`}
                      >
                        <h4 className="text-[15px] font-bold text-[#111]">{f.label}</h4>
                        <p className="text-[12px] text-[#888] mt-1">{f.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Special Focus Tags */}
              <div className="mt-8">
                <label className="text-[13px] font-extrabold uppercase tracking-wider text-[#999] mb-3 block">
                  Special Focus & Preferences (Optional)
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {EXTRA_TAGS.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer border ${
                          active
                            ? "bg-[#690B1B] text-white border-[#690B1B] shadow-sm"
                            : "bg-[#FAF9F7] text-[#555] border-[#E7E2DE] hover:border-[#690B1B]/40 hover:text-[#690B1B]"
                        }`}
                      >
                        {active ? "✓ " : "+ "} {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP CONTROLS (Back / Next / Find) */}
          <div className="mt-10 pt-6 border-t border-[#F0ECE8] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="h-[48px] px-6 rounded-full border border-[#E7E2DE] text-[#444] text-[14px] font-semibold hover:bg-[#FAF9F7] transition-all cursor-pointer"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[13px] text-[#888] font-medium">
                {matchedScholarships.length} scholarships match your current choices
              </span>

              {step < 4 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="h-[50px] px-8 rounded-full bg-[#690B1B] text-white text-[15px] font-bold shadow-[0_10px_25px_rgba(105,11,27,0.25)] hover:scale-[1.02] hover:bg-[#7A1022] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => setStep(5)}
                  className="h-[52px] px-9 rounded-full bg-[#690B1B] text-white text-[15px] font-bold shadow-[0_12px_30px_rgba(105,11,27,0.3)] hover:scale-[1.03] transition-all cursor-pointer flex items-center gap-2 btn-glow"
                >
                  <span>View Best Matches ({matchedScholarships.length})</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── RESULTS DASHBOARD (STEP 5) ── */
        <div>
          {/* TOP RESULTS BAR */}
          <div className="bg-white border border-[#E7E2DE] rounded-[24px] p-6 mb-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#690B1B]/[0.08] text-[#690B1B] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  <span>✨ Personal Matching Results</span>
                </div>
                <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#111]">
                  Found <span className="text-[#690B1B]">{filteredResults.length}</span> Matching Scholarships
                </h1>
                <p className="text-[13.5px] text-[#727272] mt-1">
                  Based on your preferences: {selectedLevels.join(", ")} • {selectedFields.join(", ")} •{" "}
                  {fundingPref}
                </p>
              </div>

              {/* RETAKE / EDIT PREFERENCES BUTTON */}
              <button
                onClick={() => setStep(1)}
                className="h-[44px] px-6 rounded-full border border-[#690B1B]/30 text-[#690B1B] bg-[#690B1B]/[0.04] text-[13.5px] font-bold hover:bg-[#690B1B] hover:text-white transition-all cursor-pointer shrink-0 flex items-center justify-center gap-2"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <span>Edit Search Criteria</span>
              </button>
            </div>

            {/* SEARCH & SORT BAR */}
            <div className="mt-6 pt-5 border-t border-[#F0ECE8] flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search inside matches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[42px] pl-10 pr-4 rounded-full border border-[#E7E2DE] bg-[#FAF9F7] text-[13.5px] text-[#111] focus:outline-none focus:border-[#690B1B] transition-colors"
                />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-[12px] text-[#888] font-bold uppercase tracking-wider">Sort by:</span>
                <div className="flex bg-[#F0ECE8] p-1 rounded-full text-[12.5px] font-semibold text-[#555]">
                  <button
                    onClick={() => setSortBy("match")}
                    className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                      sortBy === "match" ? "bg-white text-[#690B1B] font-extrabold shadow-xs" : ""
                    }`}
                  >
                    Match Score
                  </button>
                  <button
                    onClick={() => setSortBy("deadline")}
                    className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                      sortBy === "deadline" ? "bg-white text-[#690B1B] font-extrabold shadow-xs" : ""
                    }`}
                  >
                    Deadline
                  </button>
                  <button
                    onClick={() => setSortBy("name")}
                    className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                      sortBy === "name" ? "bg-white text-[#690B1B] font-extrabold shadow-xs" : ""
                    }`}
                  >
                    Name
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SCHOLARSHIP CARDS GRID */}
          {filteredResults.length === 0 ? (
            <div className="bg-white border border-[#E7E2DE] rounded-[24px] p-12 text-center">
              <span className="text-[48px]">🔎</span>
              <h3 className="text-[20px] font-bold text-[#111] mt-3">No matching scholarships found</h3>
              <p className="text-[14px] text-[#727272] mt-1 max-w-md mx-auto">
                Try loosening your filters or selecting &quot;All Countries&quot; / &quot;All Fields&quot; to discover more opportunities.
              </p>
              <button
                onClick={() => {
                  setSelectedLevels(["Masters"]);
                  setSelectedFields(["All Fields"]);
                  setSelectedCountries(["all"]);
                  setFundingPref("All");
                  setSearchQuery("");
                }}
                className="mt-5 h-[44px] px-7 rounded-full bg-[#690B1B] text-white text-[13.5px] font-bold shadow-md hover:bg-[#7A1022] transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {filteredResults.map((s) => {
                const isSaved = savedIds.includes(s.id);
                return (
                  <article
                    key={`${s.countrySlug}-${s.id}`}
                    className="bg-white border border-[#EBEBEB] rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(105,11,27,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Top Color Indicator Stripe */}
                    <div
                      className="h-[5px] w-full"
                      style={{
                        background: `linear-gradient(90deg, ${s.color || "#690B1B"}, ${
                          s.color || "#690B1B"
                        }70, transparent)`,
                      }}
                    />

                    {/* Card Top Meta Bar */}
                    <div className="p-6 pb-0">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[22px]">{s.countryFlag}</span>
                          <span className="text-[12px] font-bold text-[#888] uppercase tracking-wider">
                            {s.countryName}
                          </span>
                        </div>

                        {/* MATCH BADGE */}
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#690B1B] text-white text-[11px] font-black shadow-xs">
                          <span>{s.matchScore}% Match</span>
                        </div>
                      </div>

                      {/* Title & Level */}
                      <h2 className="text-[18px] font-extrabold text-[#111] group-hover:text-[#690B1B] transition-colors leading-snug">
                        {s.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-[12px] font-semibold text-[#888]">{s.level}</span>
                        <span className="text-[#DDD]">•</span>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                          style={{
                            color: s.color || "#690B1B",
                            backgroundColor: `${s.color || "#690B1B"}12`,
                          }}
                        >
                          {s.tag}
                        </span>
                      </div>

                      {/* Detail Rows */}
                      <div className="mt-5 pt-4 border-t border-[#F5F3F1] space-y-2.5 text-[13px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#A09B95] font-medium uppercase tracking-wider text-[11px]">
                            Funding
                          </span>
                          <span className="font-bold text-[#690B1B]">{s.amount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#A09B95] font-medium uppercase tracking-wider text-[11px]">
                            Deadline
                          </span>
                          <span className="font-bold text-[#333]">{s.deadline}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#A09B95] font-medium uppercase tracking-wider text-[11px]">
                            Fields
                          </span>
                          <span className="font-bold text-[#444] truncate max-w-[170px]">
                            {s.fields.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Match Reasons pills */}
                      {s.matchReasons.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-[#F5F3F1] flex flex-wrap gap-1">
                          {s.matchReasons.slice(0, 2).map((reason, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-bold text-[#555] bg-[#F6F4F2] px-2 py-0.5 rounded-md"
                            >
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="p-6 pt-5 bg-[#FAF9F7] border-t border-[#F5F3F1] mt-6 flex items-center gap-3">
                      <button
                        onClick={() => setActiveModalScholarship(s)}
                        className="flex-1 h-[44px] rounded-xl bg-[#690B1B] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#7A1022] transition-all cursor-pointer"
                      >
                        <span>View Details</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>

                      <button
                        onClick={(e) => toggleSave(s.id, e)}
                        title={isSaved ? "Saved" : "Save Scholarship"}
                        className={`w-[44px] h-[44px] rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          isSaved
                            ? "border-[#690B1B] bg-[#690B1B]/10 text-[#690B1B]"
                            : "border-[#E7E2DE] bg-white text-[#999] hover:text-[#690B1B] hover:border-[#690B1B]/40"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={isSaved ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                        </svg>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── EXPANDABLE DETAIL MODAL DIALOG ── */}
      {activeModalScholarship && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto scrollbar-hide animate-fadeIn"
          onClick={() => setActiveModalScholarship(null)}
        >
          <div
            className="bg-white border border-[#E7E2DE] rounded-[32px] max-w-4xl w-full p-6 sm:p-9 md:p-10 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalScholarship(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F5F3F1] flex items-center justify-center text-[#666] hover:bg-[#690B1B] hover:text-white transition-all cursor-pointer shadow-xs"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="text-[30px]">{activeModalScholarship.countryFlag}</span>
              <span className="text-[13px] font-bold text-[#888] uppercase tracking-wider">
                {activeModalScholarship.countryName}
              </span>
              <span className="text-[12px] font-black bg-[#690B1B] text-white px-3 py-1 rounded-full ml-auto mr-12 shadow-xs">
                {activeModalScholarship.matchScore}% Match
              </span>
            </div>

            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#111] leading-tight pr-10">
              {activeModalScholarship.name}
            </h2>

            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span className="text-[13.5px] font-semibold text-[#555]">{activeModalScholarship.level}</span>
              <span className="text-[#DDD]">•</span>
              <span className="text-[13.5px] font-bold text-[#690B1B]">{activeModalScholarship.funding}</span>
              <span className="text-[#DDD]">•</span>
              <span className="text-[12.5px] font-extrabold uppercase tracking-wider text-[#C4A15F]">
                Deadline: {activeModalScholarship.deadline}
              </span>
            </div>

            {/* Overview */}
            <div className="mt-6 pt-5 border-t border-[#F0ECE8]">
              <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-[#999]">Overview</h3>
              <p className="mt-2 text-[15px] text-[#444] leading-[1.8]">
                {activeModalScholarship.overview}
              </p>
            </div>

            {/* Key Highlights */}
            {activeModalScholarship.highlights && activeModalScholarship.highlights.length > 0 && (
              <div className="mt-6">
                <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-[#999] mb-3">
                  Key Benefits & Highlights
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeModalScholarship.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#333] bg-[#FAF9F7] p-3 rounded-xl border border-[#E7E2DE]/60">
                      <span className="text-[#690B1B] font-bold text-[15px] shrink-0">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#F0ECE8] flex flex-col sm:flex-row items-center gap-4">
              <a
                href={activeModalScholarship.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 h-[54px] rounded-full bg-[#690B1B] text-white text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-[#7A1022] shadow-md transition-all cursor-pointer"
              >
                <span>Visit Official Application Portal</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <button
                onClick={() => setActiveModalScholarship(null)}
                className="w-full sm:w-auto h-[54px] px-9 rounded-full border border-[#E7E2DE] text-[#555] font-semibold hover:bg-[#FAF9F7] transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
