import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service & Privacy Policy — Abroad Simplified",
  description:
    "Read the Terms of Service, Privacy Policy, Cookie Policy, and User Agreement for Abroad Simplified. Understand your rights, data privacy, and platform rules.",
  keywords: [
    "abroad simplified terms of service",
    "privacy policy",
    "scholarship finder terms",
    "user agreement",
    "data protection",
    "cookie policy",
  ],
  alternates: {
    canonical: "https://scholarship.abroadsimplified.com/terms",
  },
  openGraph: {
    title: "Terms of Service & Privacy Policy — Abroad Simplified",
    description:
      "Comprehensive guidelines, terms of use, privacy policies, and security commitments for Abroad Simplified.",
    url: "https://scholarship.abroadsimplified.com/terms",
    siteName: "Abroad Simplified",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F6F4F2] text-[#111111] font-[Poppins] flex flex-col justify-between selection:bg-[#690B1B] selection:text-white">
      <div>
        <Navbar />
        <TermsClient initialTab="terms" />
      </div>
      <Footer />
    </div>
  );
}
