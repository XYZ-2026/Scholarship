import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountryScholarshipExplorer from "@/components/CountryScholarshipExplorer";
import { countryScholarshipsMap } from "@/data/countryScholarships";
import { getWixScholarshipsByCountry, getWixDeadlines } from "@/lib/wixCms";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DYNAMIC METADATA (SSR SEO WITH WIX CMS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const country = countryScholarshipsMap[slug];

  if (!country) {
    return {
      title: "Country Not Found — Abroad Simplified",
      description: "Scholarship opportunities by country.",
    };
  }

  const wixScholarships = await getWixScholarshipsByCountry(slug);
  const countDisplay = wixScholarships.length > 0 ? `${wixScholarships.length}+ verified` : country.scholarshipCount;

  const title = `Fully Funded Scholarships in ${country.name} (2025-2026) — Abroad Simplified`;
  const description = `Discover ${countDisplay} scholarships in ${country.name}. Apply for fully funded government, university, and merit-based grants for Master's, PhD, and Bachelor's degrees.`;
  const url = `https://scholarship.abroadsimplified.com/country/${slug}`;

  return {
    title,
    description,
    keywords: [
      `scholarships in ${country.name}`,
      `study in ${country.name} financial aid`,
      `fully funded scholarships ${country.name}`,
      `master scholarships ${country.name}`,
      `phd grants ${country.name}`,
      `undergraduate financial aid ${country.name}`,
      `international student grants ${country.name}`
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Abroad Simplified",
      type: "website",
      images: [
        {
          url: country.heroImage,
          width: 1200,
          height: 630,
          alt: `Study in ${country.name} Scholarships`,
        },
      ],
    },
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SERVER COMPONENT (100% SSR WITH WIX CMS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const country = countryScholarshipsMap[slug];

  if (!country) {
    return (
      <div className="bg-[#F6F4F2] text-[#111111] min-h-screen font-[Poppins]">
        <Navbar />
        <main className="max-w-4xl mx-auto px-5 py-32 text-center">
          <div className="w-[80px] h-[80px] mx-auto mb-6 rounded-2xl bg-[#690B1B]/[0.06] flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#690B1B" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
          </div>
          <h1 className="text-[36px] font-extrabold text-[#0D0D0D] tracking-[-0.03em]">Country Not Found</h1>
          <p className="mt-4 text-[15px] text-[#727272] leading-[1.8]">We couldn&apos;t find scholarship data for this country.</p>
          <Link href="/" className="inline-flex items-center gap-2 mt-8 h-[48px] px-8 rounded-full bg-[#690B1B] text-white text-[14px] font-bold hover:bg-[#7A1022] shadow-[0_8px_24px_rgba(105,11,27,0.2)] transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Fetch live CMS scholarships and deadlines
  const wixScholarships = await getWixScholarshipsByCountry(slug);
  const wixDeadlines = await getWixDeadlines(slug);

  const scholarshipsList = wixScholarships.length > 0
    ? wixScholarships.map((s, idx) => ({
        id: typeof s.id === "number" ? s.id : idx + 1,
        name: s.name,
        funding: s.funding,
        deadline: s.deadline,
        amount: s.amount,
        fields: s.fields,
        level: s.level,
        tag: s.tag,
        color: s.color,
        overview: s.overview,
        highlights: s.highlights,
        url: s.url,
      }))
    : country.scholarships;

  // JSON-LD Breadcrumbs
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
        "name": "Countries",
        "item": "https://scholarship.abroadsimplified.com/#countries"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": country.name,
        "item": `https://scholarship.abroadsimplified.com/country/${slug}`
      }
    ]
  };

  // JSON-LD ItemList Schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Scholarships in ${country.name}`,
    "description": country.description,
    "itemListElement": scholarshipsList.map((s, index) => ({
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
    <div className="bg-[#F6F4F2] text-[#111111] overflow-x-hidden font-[Poppins]">
      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <Navbar />

      <main id="main-content">
        {/* ╔══════════════════════════════════════╗
           ║          HERO SECTION                ║
           ╚══════════════════════════════════════╝ */}
        <section className="relative h-[340px] sm:h-[400px] md:h-[440px] overflow-hidden" aria-label={`Study in ${country.name}`}>
          {/* Hero image */}
          <Image
            src={country.heroImage}
            alt={`Study in ${country.name} scholarships and financial aid opportunities`}
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
            {/* Breadcrumb navigation */}
            <nav className="flex items-center gap-2 text-[12px] text-white/60 font-medium mb-5 animate-fadeInDown" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
              <span className="text-white/40">Countries</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
              <span className="text-white/90">{country.name}</span>
            </nav>

            <div className="animate-fadeInUp">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[32px] sm:text-[40px] drop-shadow-md" aria-label={`${country.name} flag`}>{country.flag}</span>
              </div>
              <h1 className="text-[32px] sm:text-[46px] md:text-[54px] font-extrabold text-white tracking-[-0.03em] leading-[1.08]">
                Scholarships in {country.name}
              </h1>
              <p className="mt-3 text-[14px] sm:text-[15.5px] text-white/80 max-w-2xl font-normal leading-[1.7]">
                {country.description}
              </p>
            </div>
          </div>
        </section>

        {/* Client Interactive Explorer */}
        <CountryScholarshipExplorer
          countryName={country.name}
          countryFlag={country.flag}
          scholarships={country.scholarships}
        />

        {/* ╔══════════════════════════════════════╗
           ║         EXPLORE MORE COUNTRIES       ║
           ╚══════════════════════════════════════╝ */}
        <section className="py-16 lg:py-20 border-t border-[#E7E2DE]/80" aria-label="Explore More Countries">
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
                    <span className="text-[18px]" aria-label={`${c.name} flag`}>{c.flag}</span>
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
      </main>

      <Footer />
    </div>
  );
}
