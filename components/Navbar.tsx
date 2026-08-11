"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userData, logout, setShowAuthModal, setAuthModalView } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Find Scholarship", href: "/finder" },
    { label: "Scholarships", href: "/#scholarships" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full font-[Poppins] transition-all duration-500 ${scrolled
          ? "bg-[#F6F4F2]/95 backdrop-blur-xl shadow-[0_1px_16px_rgba(0,0,0,0.05)] border-b border-[#E7E2DE]"
          : "bg-[#F6F4F2] border-b border-[#E7E2DE]"
        }`}
    >
      <div className="w-full h-[84px] md:h-[92px] px-4 sm:px-5 md:px-8 lg:px-12 flex items-center justify-between">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="cursor-pointer hover:opacity-90 transition-opacity">
            <Image
              src="/logo-square-cropped.png"
              alt="Abroad Simplified"
              width={52}
              height={52}
              className="w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] rounded-[10px] sm:rounded-[14px] shadow-[0_4px_16px_rgba(105,11,27,0.18)] shrink-0"
              priority
            />
          </Link>
          <div>
            <div className="text-[14px] min-[375px]:text-[16px] sm:text-[18px] xl:text-[20px] font-bold tracking-[-0.04em] leading-none text-[#111111] whitespace-nowrap">
              Abroad Simplified
            </div>
            <div className="mt-0.5 sm:mt-1 flex items-center">
              <span className="text-[8.5px] min-[375px]:text-[10px] sm:text-[11px] font-semibold text-[#5B5B5B] whitespace-nowrap">
                Think Beyond Your Boundaries
              </span>
            </div>
          </div>
        </div>

        {/* CENTER - Links */}
        <div className="hidden lg:flex items-center flex-1 justify-center mx-2 xl:mx-0 xl:absolute xl:left-1/2 xl:-translate-x-1/2">
          <div className="flex items-center gap-1 xl:gap-2 bg-white/80 border border-[#E7E1DD] rounded-full px-2 py-1.5 xl:px-3 xl:py-2 shadow-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 xl:px-5 h-[36px] xl:h-[42px] rounded-full flex items-center justify-center text-[13px] xl:text-[15px] whitespace-nowrap transition-all duration-300 font-medium text-[#5F5F5F] hover:bg-[#690B1B] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT - Sign In & Sign Up Auth Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[13px] font-bold text-[#111]">
                {userData?.fullName || user.displayName || user.email?.split("@")[0]}
              </span>
              <button
                onClick={() => logout()}
                className="h-[40px] px-4 rounded-full border border-[#E7E2DE] bg-white text-[#690B1B] text-[13px] font-bold hover:bg-[#690B1B] hover:text-white transition-all cursor-pointer shadow-xs"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthModalView("login");
                  setShowAuthModal(true);
                }}
                className="hidden lg:flex text-[14.5px] font-bold text-[#555] hover:text-[#690B1B] transition-colors cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  setAuthModalView("register");
                  setShowAuthModal(true);
                }}
                className="group relative h-[42px] sm:h-[48px] px-5 sm:px-7 rounded-full overflow-hidden bg-[#690B1B] text-white text-[13.5px] sm:text-[14.5px] font-bold shadow-[0_10px_25px_rgba(105,11,27,0.22)] hover:scale-[1.02] transition-all hidden lg:flex items-center justify-center cursor-pointer"
              >
                {/* SHINE */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
                <span className="relative flex items-center gap-1.5 sm:gap-2">
                  Sign Up
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </button>
            </>
          )}

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden w-[42px] h-[42px] rounded-full border border-[#E7E2DE] bg-white items-center justify-center text-[#6B6B6B] hover:bg-[#690B1B] hover:text-white hover:border-[#690B1B] transition-all cursor-pointer shrink-0"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      <div
        className={`lg:hidden fixed top-[84px] left-0 w-full h-[calc(100vh-84px)] bg-[#F6F4F2]/95 backdrop-blur-xl border-t border-[#E7E2DE] py-6 px-5 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto scrollbar-hide transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-[#A5A5A5] font-extrabold uppercase tracking-widest pl-2 mb-1">
            Navigation
          </span>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="h-[52px] px-4 rounded-xl flex items-center justify-between transition-all duration-300 font-semibold text-[#444] hover:bg-[#690B1B]/5 hover:text-[#690B1B] bg-white/40 border border-[#E7E2DE]/30"
            >
              <span className="text-[15px]">{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60 text-[#A5A5A5]"><path d="M9 6l6 6-6 6" /></svg>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <div className="bg-white/80 border border-[#E7E2DE] rounded-[24px] p-5 shadow-sm backdrop-blur-md flex flex-col gap-3">
            {user ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="h-[48px] rounded-xl bg-[#690B1B] text-white text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-[#7A1022] transition-all"
              >
                Sign Out ({userData?.fullName || user.displayName || user.email?.split("@")[0]})
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthModalView("register");
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="h-[48px] rounded-xl bg-[#690B1B] text-white text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-[#7A1022] shadow-[0_4px_12px_rgba(105,11,27,0.15)] transition-all cursor-pointer"
                >
                  Sign Up →
                </button>
                <button
                  onClick={() => {
                    setAuthModalView("login");
                    setShowAuthModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="h-[48px] rounded-xl border border-[#E7E2DE] bg-white text-[#444] text-[13.5px] font-bold flex items-center justify-center gap-2 hover:bg-neutral-50 transition-all cursor-pointer"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
