"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Props {
  initialTab?: "terms" | "privacy" | "cookies" | "disclaimer";
}

export default function TermsClient({ initialTab = "terms" }: Props) {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "cookies" | "disclaimer">(initialTab);
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main id="main-content" className="pb-16 sm:pb-20 lg:pb-24">
      {/* ╔══════════════════════════════════════╗
         ║           HERO HEADER                  ║
         ╚══════════════════════════════════════╝ */}
      <section className="relative pt-10 sm:pt-14 pb-8 sm:pb-12 bg-white border-b border-[#E7E2DE] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#690B1B]/[0.03] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F6F4F2] border border-[#E7E2DE] rounded-full px-3.5 py-1.5 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#C4A15F] animate-pulse" />
            <span className="text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#8B7A5E]">
              Legal &amp; Compliance Hub
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[40px] md:text-[50px] font-extrabold tracking-[-0.04em] leading-[1.1] text-[#0D0D0D]">
            Terms, Privacy &amp; <span className="gradient-text">Policies</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[15.5px] leading-[1.8] text-[#727272] max-w-2xl mx-auto">
            Please read these terms carefully before using Abroad Simplified. Transparent guidelines designed to protect your rights, personal data, and scholarship search experience.
          </p>

          <div className="mt-4 text-[11.5px] sm:text-[12px] text-[#A5A09A] font-medium">
            Last Updated: <strong className="text-[#333]">August 10, 2026</strong> • Effective Date: <strong className="text-[#333]">January 1, 2025</strong>
          </div>

          {/* TAB SELECTOR PILLS */}
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-hide py-2 px-1 mt-7 sm:mt-8">
            {[
              { id: "terms", label: "Terms of Service", icon: "📜" },
              { id: "privacy", label: "Privacy Policy", icon: "🔒" },
              { id: "cookies", label: "Cookie Policy", icon: "🍪" },
              { id: "disclaimer", label: "Financial Aid Disclaimer", icon: "⚖️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 sm:px-5 h-[42px] sm:h-[44px] rounded-full text-[13px] sm:text-[14px] font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                  activeTab === tab.id
                    ? "bg-[#690B1B] text-white border-[#690B1B] shadow-[0_6px_20px_rgba(105,11,27,0.22)]"
                    : "bg-[#F6F4F2] text-[#555] border-[#E7E2DE] hover:border-[#690B1B]/30 hover:text-[#690B1B]"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════╗
         ║       MAIN CONTENT CONTAINER           ║
         ╚══════════════════════════════════════╝ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT STICKY TABLE OF CONTENTS (Desktop) ── */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 hidden lg:block">
            <div className="bg-white border border-[#EBEBEB] rounded-[22px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="text-[11px] font-bold text-[#C4A15F] uppercase tracking-[0.16em] mb-3">
                {activeTab === "terms" && "Terms Outline"}
                {activeTab === "privacy" && "Privacy Sections"}
                {activeTab === "cookies" && "Cookie Topics"}
                {activeTab === "disclaimer" && "Disclaimer Index"}
              </div>

              <div className="space-y-1 text-[13px] font-medium text-[#666]">
                {activeTab === "terms" && (
                  <>
                    <button onClick={() => scrollToSection("terms-1")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">1. Acceptance of Terms</button>
                    <button onClick={() => scrollToSection("terms-2")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">2. Services &amp; AI Profile Matcher</button>
                    <button onClick={() => scrollToSection("terms-3")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">3. Account Eligibility &amp; Security</button>
                    <button onClick={() => scrollToSection("terms-4")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">4. Accuracy of Scholarship Data</button>
                    <button onClick={() => scrollToSection("terms-5")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">5. Intellectual Property Rights</button>
                    <button onClick={() => scrollToSection("terms-6")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">6. Prohibited Activities</button>
                    <button onClick={() => scrollToSection("terms-7")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">7. Limitation of Liability</button>
                    <button onClick={() => scrollToSection("terms-8")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">8. Termination &amp; Suspension</button>
                    <button onClick={() => scrollToSection("terms-9")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">9. Governing Law</button>
                  </>
                )}

                {activeTab === "privacy" && (
                  <>
                    <button onClick={() => scrollToSection("priv-1")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">1. Information We Collect</button>
                    <button onClick={() => scrollToSection("priv-2")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">2. How We Use Your Information</button>
                    <button onClick={() => scrollToSection("priv-3")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">3. Data Sharing &amp; Third Parties</button>
                    <button onClick={() => scrollToSection("priv-4")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">4. Security &amp; Storage</button>
                    <button onClick={() => scrollToSection("priv-5")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">5. Your GDPR &amp; CCPA Rights</button>
                    <button onClick={() => scrollToSection("priv-6")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">6. Children&apos;s Privacy</button>
                    <button onClick={() => scrollToSection("priv-7")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">7. Contact DPO</button>
                  </>
                )}

                {activeTab === "cookies" && (
                  <>
                    <button onClick={() => scrollToSection("cook-1")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">1. What Are Cookies</button>
                    <button onClick={() => scrollToSection("cook-2")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">2. Types of Cookies Used</button>
                    <button onClick={() => scrollToSection("cook-3")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">3. Managing Cookie Preferences</button>
                  </>
                )}

                {activeTab === "disclaimer" && (
                  <>
                    <button onClick={() => scrollToSection("disc-1")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">1. No Award Guarantees</button>
                    <button onClick={() => scrollToSection("disc-2")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">2. External Provider Links</button>
                    <button onClick={() => scrollToSection("disc-3")} className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F6F4F2] hover:text-[#690B1B] transition-colors truncate">3. Verification Responsibility</button>
                  </>
                )}
              </div>

              {/* Help box */}
              <div className="mt-6 p-4 rounded-xl bg-[#F6F4F2] border border-[#E7E2DE]">
                <div className="text-[12.5px] font-bold text-[#111]">Questions about legal terms?</div>
                <p className="text-[11.5px] text-[#777] leading-[1.6] mt-1">
                  Our compliance team is ready to assist you.
                </p>
                <a
                  href="mailto:legal@abroadsimplified.com"
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#690B1B] hover:underline"
                >
                  ✉️ legal@abroadsimplified.com
                </a>
              </div>
            </div>
          </aside>

          {/* ── RIGHT ARTICLE CONTENT (Mobile / Tab / Desktop) ── */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">

            {/* 📜 TAB 1: TERMS OF SERVICE */}
            {activeTab === "terms" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Notice Card */}
                <div className="p-5 sm:p-6 rounded-[20px] bg-gradient-to-r from-[#690B1B]/[0.05] to-[#C4A15F]/[0.05] border border-[#690B1B]/15">
                  <div className="flex items-start gap-3">
                    <span className="text-[22px]">💡</span>
                    <div>
                      <h3 className="text-[15px] sm:text-[16px] font-bold text-[#690B1B]">Summary for Students</h3>
                      <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[#555] mt-1">
                        Abroad Simplified provides a free scholarship discovery and AI guidance platform. We connect you directly to official university and government scholarship programs, but we do not issue scholarships ourselves nor guarantee selection.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 1 */}
                <article id="terms-1" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 01</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    1. Acceptance of Terms &amp; Eligibility
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      By accessing, browsing, or registering an account on Abroad Simplified (&quot;Platform&quot;, &quot;Website&quot;, &quot;We&quot;, &quot;Us&quot;), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service.
                    </p>
                    <p>
                      <strong>Eligibility:</strong> You must be at least 16 years of age (or legal age in your jurisdiction) to create an account or use our AI profile matching features. If you are under 18, you confirm that you have obtained permission from a parent or legal guardian.
                    </p>
                  </div>
                </article>

                {/* Section 2 */}
                <article id="terms-2" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 02</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    2. Services &amp; AI Profile Matching Engine
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      Abroad Simplified provides software tools including:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-[#444]">
                      <li>Curated directory of 2,500+ verified international scholarships and grants.</li>
                      <li>AI Profile Matcher calculating compatibility scores based on user-entered GPA, degree level, target countries, and fields of study.</li>
                      <li>Statement of Purpose (SOP) drafting guidance and document checklists.</li>
                      <li>Country-specific financial aid guides and deadline trackers.</li>
                    </ul>
                    <p className="text-[13.5px] text-[#777] bg-[#F6F4F2] p-4 rounded-xl border border-[#E7E2DE] mt-3">
                      <strong>Note:</strong> AI match scores are algorithmic estimations designed to help you prioritize applications. A high match score does not imply endorsement or pre-approval by the scholarship awarding body.
                    </p>
                  </div>
                </article>

                {/* Section 3 */}
                <article id="terms-3" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 03</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    3. User Accounts &amp; Security
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      When creating an account, you agree to provide truthful, accurate, and current information. You are solely responsible for safeguarding your login credentials and for any activities performed under your account.
                    </p>
                    <p>
                      If you suspect unauthorized access to your account, notify us immediately at <a href="mailto:support@abroadsimplified.com" className="text-[#690B1B] font-semibold underline">support@abroadsimplified.com</a>.
                    </p>
                  </div>
                </article>

                {/* Section 4 */}
                <article id="terms-4" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 04</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    4. Accuracy of Scholarship Data &amp; External Links
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      Our research team updates scholarship requirements, deadlines, and funding figures weekly. However, funding bodies, embassies, and universities reserve the right to alter scholarship deadlines or terms without prior notice.
                    </p>
                    <p>
                      Abroad Simplified contains outbound links to external third-party websites (e.g. Chevening, Fulbright, DAAD, university portals). We are not responsible for the content, privacy practices, or availability of external sites.
                    </p>
                  </div>
                </article>

                {/* Section 5 */}
                <article id="terms-5" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 05</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    5. Intellectual Property Rights
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      All platform content, logos, custom illustrations, UI designs, code, database compilations, and SOP templates are the exclusive property of Abroad Simplified.
                    </p>
                    <p>
                      You are granted a limited, non-exclusive, non-transferable license to use the Platform for your personal, non-commercial education planning. Automated scraping or commercial redistribution of our database is strictly prohibited.
                    </p>
                  </div>
                </article>

                {/* Section 6 */}
                <article id="terms-6" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 06</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    6. Prohibited Activities
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555]">
                    <p className="mb-3">Users agree NOT to engaged in any of the following activities:</p>
                    <ul className="list-disc pl-5 space-y-2 text-[#444]">
                      <li>Attempting to bypass platform security or reverse engineer source code.</li>
                      <li>Submitting fraudulent, deceptive, or misleading academic information.</li>
                      <li>Using automated web bots or scrapers to extract scholarship lists.</li>
                      <li>Harassing community members, mentors, or support staff.</li>
                    </ul>
                  </div>
                </article>

                {/* Section 7 */}
                <article id="terms-7" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 07</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    7. Limitation of Liability
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      To the maximum extent permitted by applicable law, Abroad Simplified and its officers, directors, employees, or partners shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use the Platform.
                    </p>
                  </div>
                </article>

                {/* Section 8 & 9 */}
                <article id="terms-8" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Section 08 &amp; 09</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    8. Termination &amp; 9. Governing Law
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      We reserve the right to suspend or terminate accounts that violate these terms. These Terms shall be governed by and construed in accordance with applicable federal and state laws.
                    </p>
                  </div>
                </article>
              </div>
            )}

            {/* 🔒 TAB 2: PRIVACY POLICY */}
            {activeTab === "privacy" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Privacy Badge Card */}
                <div className="p-5 sm:p-6 rounded-[20px] bg-[#690B1B]/[0.04] border border-[#690B1B]/15 flex items-start gap-3">
                  <span className="text-[24px]">🛡️</span>
                  <div>
                    <h3 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#690B1B]">Your Privacy Comes First</h3>
                    <p className="text-[13px] sm:text-[14px] leading-[1.75] text-[#555] mt-1">
                      Abroad Simplified is GDPR and CCPA compliant. We never sell your personal data, academic records, or contact information to third-party brokers.
                    </p>
                  </div>
                </div>

                {/* Priv Section 1 */}
                <article id="priv-1" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Privacy Section 01</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    1. Information We Collect
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>We collect information in the following ways:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div className="p-4 rounded-xl bg-[#F6F4F2] border border-[#E7E2DE]">
                        <div className="font-bold text-[#111] text-[14px] mb-1">Directly Provided Data</div>
                        <p className="text-[12.5px] text-[#666]">Name, email address, nationality, GPA, academic field, target study destinations, and saved scholarship preferences.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F6F4F2] border border-[#E7E2DE]">
                        <div className="font-bold text-[#111] text-[14px] mb-1">Automated Usage Data</div>
                        <p className="text-[12.5px] text-[#666]">IP address, browser type, operating system, pages viewed, time spent, and referral URLs.</p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Priv Section 2 */}
                <article id="priv-2" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Privacy Section 02</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    2. How We Use Your Data
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-2">
                    <p>Your information is used strictly to:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#444]">
                      <li>Calculate personalized AI scholarship match scores and recommended grants.</li>
                      <li>Send deadline reminders for your saved scholarships (if enabled).</li>
                      <li>Power AI SOP generation and application document drafting.</li>
                      <li>Improve website performance, usability, and security.</li>
                    </ul>
                  </div>
                </article>

                {/* Priv Section 3 & 4 */}
                <article id="priv-3" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Privacy Section 03 &amp; 04</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    3. Data Protection &amp; 4. Storage Security
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      All network traffic is encrypted using 256-bit SSL/TLS protocol. Sensitive user profiles are stored in secure cloud databases with restricted access controls.
                    </p>
                  </div>
                </article>

                {/* Priv Section 5 */}
                <article id="priv-5" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Privacy Section 05</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    5. Your GDPR &amp; CCPA Rights
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>You have the right to:</p>
                    <ul className="list-disc pl-5 space-y-1.5 text-[#444]">
                      <li><strong>Access &amp; Export:</strong> Request a copy of all personal data we hold about you.</li>
                      <li><strong>Correction:</strong> Request updates to inaccurate profile details.</li>
                      <li><strong>Deletion (Right to be Forgotten):</strong> Request full deletion of your account and stored data.</li>
                      <li><strong>Opt-Out:</strong> Unsubscribe from marketing or notification emails at any time.</li>
                    </ul>
                    <p className="pt-2">
                      To exercise any of these rights, email <a href="mailto:privacy@abroadsimplified.com" className="text-[#690B1B] font-bold underline">privacy@abroadsimplified.com</a>.
                    </p>
                  </div>
                </article>
              </div>
            )}

            {/* 🍪 TAB 3: COOKIE POLICY */}
            {activeTab === "cookies" && (
              <div className="space-y-8 animate-fadeIn">
                <article id="cook-1" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Cookie Policy</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    1. Understanding Cookies &amp; Local Storage
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      Cookies are small text files placed on your device to ensure smooth website navigation, save your filter preferences (e.g. selected study level), and remember your active session.
                    </p>
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full text-left text-[13px] border-collapse">
                        <thead>
                          <tr className="border-b border-[#E7E2DE] text-[#111] bg-[#F6F4F2]">
                            <th className="p-3 rounded-tl-lg font-bold">Category</th>
                            <th className="p-3 font-bold">Purpose</th>
                            <th className="p-3 rounded-tr-lg font-bold">Required</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBEBEB] text-[#555]">
                          <tr>
                            <td className="p-3 font-semibold text-[#111]">Essential</td>
                            <td className="p-3">Session authentication &amp; security tokens</td>
                            <td className="p-3 text-[#0F8A43] font-bold">Yes</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-[#111]">Preferences</td>
                            <td className="p-3">Remembers saved scholarships &amp; search filters</td>
                            <td className="p-3 text-[#690B1B] font-bold">Optional</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-[#111]">Analytics</td>
                            <td className="p-3">Anonymous visitor usage statistics</td>
                            <td className="p-3 text-[#690B1B] font-bold">Optional</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* ⚖️ TAB 4: FINANCIAL AID DISCLAIMER */}
            {activeTab === "disclaimer" && (
              <div className="space-y-8 animate-fadeIn">
                <article id="disc-1" className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-8 shadow-xs">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C4A15F]">Official Disclaimer</span>
                  <h2 className="text-[20px] sm:text-[24px] font-extrabold text-[#111] mt-1 mb-4">
                    Financial Aid &amp; Scholarship Guarantees
                  </h2>
                  <div className="text-[14px] sm:text-[15px] leading-[1.85] text-[#555] space-y-3">
                    <p>
                      <strong>1. Independent Information Platform:</strong> Abroad Simplified is an independent educational platform. We are not affiliated with, authorized by, or endorsed by government agencies (such as FCDO Chevening, US Department of State Fulbright, or DAAD Germany) unless explicitly stated.
                    </p>
                    <p>
                      <strong>2. Zero Application Fees:</strong> Abroad Simplified does NOT charge students to apply for government or public university scholarships. Beware of fraudulent agencies asking for payment to guarantee scholarship selection.
                    </p>
                    <p>
                      <strong>3. Always Verify Directly:</strong> Always verify deadlines, eligibility criteria, and required application paperwork directly on the awarding university or government website before submitting your final application.
                    </p>
                  </div>
                </article>
              </div>
            )}

            {/* Contact Footer Box */}
            <div className="bg-white border border-[#EBEBEB] rounded-[22px] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div>
                <h4 className="text-[16px] font-bold text-[#111]">Have questions or feedback?</h4>
                <p className="text-[13px] text-[#777] mt-0.5">Reach out to our legal and support team anytime.</p>
              </div>
              <Link
                href="/finder"
                className="h-[44px] px-6 rounded-full bg-[#690B1B] text-white text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-[#7A1022] transition-colors whitespace-nowrap"
              >
                Go to Scholarship Finder →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
