import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsClient from "../terms/TermsClient";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Security — Abroad Simplified",
  description:
    "Learn how Abroad Simplified collects, uses, and protects your personal and academic data. GDPR and CCPA compliant data privacy policy.",
  keywords: [
    "privacy policy",
    "abroad simplified data privacy",
    "user data protection",
    "gdpr compliance",
    "scholarship app privacy",
  ],
  alternates: {
    canonical: "https://scholarship.abroadsimplified.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy & Data Protection — Abroad Simplified",
    description:
      "Our commitments to protecting your data, profile privacy, and personal information at Abroad Simplified.",
    url: "https://scholarship.abroadsimplified.com/privacy",
    siteName: "Abroad Simplified",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F6F4F2] text-[#111111] font-[Poppins] flex flex-col justify-between selection:bg-[#690B1B] selection:text-white">
      <div>
        <Navbar />
        <TermsClient initialTab="privacy" />
      </div>
      <Footer />
    </div>
  );
}
