import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScholarshipFinderWizard from "@/components/ScholarshipFinderWizard";
import { getAllWixScholarships } from "@/lib/wixCms";

export const metadata: Metadata = {
  title: "Interactive Scholarship Finder & Profile Matcher — Abroad Simplified",
  description:
    "Answer a few quick questions about your degree level, study field, target countries, and funding needs. Abroad Simplified's AI-assisted finder will calculate your best matching scholarships worldwide.",
  keywords: [
    "scholarship finder",
    "personalized scholarship search",
    "study abroad grant finder",
    "fully funded scholarship matcher",
    "international student financial aid",
    "masters scholarship finder",
    "phd funding search",
  ],
  alternates: {
    canonical: "https://scholarship.abroadsimplified.com/finder",
  },
  openGraph: {
    title: "Find Your Best Study Abroad Scholarships — Abroad Simplified",
    description:
      "Matches your profile with 2,500+ fully-funded scholarships, government grants, and university financial aid across 80+ countries.",
    url: "https://scholarship.abroadsimplified.com/finder",
    siteName: "Abroad Simplified",
    type: "website",
  },
};

export default async function FinderPage() {
  const cmsScholarships = await getAllWixScholarships();

  return (
    <div className="min-h-screen bg-[#F6F4F2] text-[#111111] font-[Poppins] flex flex-col justify-between selection:bg-[#690B1B] selection:text-white">
      <div>
        {/* Navigation */}
        <Navbar />

        {/* Hero Banner Section */}
        <header className="relative pt-12 pb-8 overflow-hidden border-b border-[#E7E2DE]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#690B1B]/[0.03] blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-[#E7E2DE] rounded-full px-4 py-1.5 mb-5 shadow-xs">
              <span className="text-[14px]">🎯</span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#690B1B]">
                Personalized Profile Matcher ({cmsScholarships.length} Awards)
              </span>
            </div>

            <h1 className="text-[32px] sm:text-[46px] md:text-[54px] font-extrabold tracking-[-0.04em] leading-[1.08] text-[#0D0D0D]">
              Find Your <span className="gradient-text">Perfect Scholarship</span> Match
            </h1>

            <p className="mt-4 text-[15px] sm:text-[16.5px] leading-[1.8] text-[#666] max-w-2xl mx-auto">
              Tell us your academic goals and preferences. Our intelligent matching engine scans verified international grants and displays customized scholarship cards with compatibility scores.
            </p>
          </div>
        </header>

        {/* Wizard Container */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <ScholarshipFinderWizard initialScholarships={cmsScholarships} />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
