import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AllScholarshipsExplorer from "@/components/AllScholarshipsExplorer";
import { getAllWixScholarships } from "@/lib/wixCms";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "2,500+ Verified Scholarships & Grants — Abroad Simplified",
  description:
    "Explore 2,500+ fully-funded scholarships, government grants, and university financial aid for international students worldwide. Filter by country, degree level, and funding type.",
  openGraph: {
    title: "2,500+ Verified Scholarships & Grants — Abroad Simplified",
    description:
      "Find fully-funded scholarships and merit grants across UK, USA, Germany, Canada, Australia, Japan, and more.",
    url: "https://scholarship.abroadsimplified.com/scholarships",
    siteName: "Abroad Simplified",
  },
};

export default async function ScholarshipsPage() {
  const scholarships = await getAllWixScholarships();

  // JSON-LD Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://scholarship.abroadsimplified.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Scholarships Directory",
        "item": "https://scholarship.abroadsimplified.com/scholarships"
      }
    ]
  };

  // JSON-LD ItemList Schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "2,500+ Verified Scholarships Directory",
    "description": "Comprehensive database of fully funded scholarships and study-abroad grants.",
    "itemListElement": scholarships.slice(0, 30).map((s, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "EducationalOccupationalCredential",
        "name": s.name,
        "credentialCategory": s.funding,
        "educationalLevel": s.level,
        "description": s.overview,
        "url": s.url
      }
    }))
  };

  return (
    <div className="bg-[#F6F4F2] text-[#111111] min-h-screen flex flex-col font-[Poppins] overflow-x-hidden">
      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Navbar />

      <main id="main-content" className="flex-1">
        <AllScholarshipsExplorer scholarships={scholarships} />
      </main>

      <Footer />
    </div>
  );
}
