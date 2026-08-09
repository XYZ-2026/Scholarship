import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#030303] px-5 md:px-10 lg:px-16 pt-16 md:pt-20 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* TOP */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* BRAND */}
          <div className="max-w-[300px]">
            <Link
              href="/"
              className="text-white text-[22px] sm:text-[28px] leading-none font-bold hover:opacity-90 transition-opacity"
            >
              Abroad Simplified
            </Link>
            <p className="mt-6 text-[#5E6168] text-[14px] sm:text-[15px] leading-[2]">
              Empowering students worldwide with scholarships, financial aid, and academic publishing support.
            </p>
          </div>

          {/* SCHOLARSHIPS */}
          <div>
            <div className="text-[#C8A15D] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
              Scholarships
            </div>
            <div className="space-y-4">
              {[
                { label: "Merit-Based", href: "/#scholarships" },
                { label: "Need-Based", href: "/#scholarships" },
                { label: "Fully Funded", href: "/#scholarships" },
                { label: "Country Specific", href: "/#destinations" },
                { label: "Scholarship Finder", href: "/finder" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-[#6B6F78] text-[15px] hover:text-white transition cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RESOURCES */}
          <div>
            <div className="text-[#C8A15D] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
              Resources
            </div>
            <div className="space-y-4">
              {[
                { label: "Application Tips", href: "#" },
                { label: "SOP Writing Guide", href: "#" },
                { label: "Interview Prep", href: "#" },
                { label: "Visa Guidance", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-[#6B6F78] text-[15px] hover:text-white transition cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <div className="text-[#C8A15D] text-[11px] tracking-[0.24em] uppercase font-bold mb-6">
              Company
            </div>
            <div className="space-y-4">
              {[
                { label: "About", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Community", href: "#" },
                { label: "Contact", href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-[#6B6F78] text-[15px] hover:text-white transition cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-white/5 mt-16 md:mt-20 mb-6" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[#5E6168] text-[14px] text-center md:text-left">
            © 2025 Abroad Simplified. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[#5E6168] text-[14px]">
            <a href="#" className="hover:text-white transition cursor-pointer">Privacy</a>
            <a href="#" className="hover:text-white transition cursor-pointer">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
