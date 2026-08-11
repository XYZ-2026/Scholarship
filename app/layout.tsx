import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://scholarship.abroadsimplified.com"),
  title: "Scholarships & Financial Aid — Abroad Simplified",
  description:
    "Discover fully-funded scholarships, grants, and financial aid opportunities for international students. Abroad Simplified helps you find and apply for the best study-abroad funding worldwide.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/logo-icon.png",
  },
  keywords: [
    "scholarships abroad",
    "financial aid international students",
    "fully funded scholarships",
    "study abroad scholarships",
    "abroad simplified scholarships",
    "international student grants",
    "merit scholarships",
    "need based financial aid",
    "scholarship finder",
    "global scholarships 2025",
  ],
  openGraph: {
    type: "website",
    title: "Scholarships & Financial Aid — Abroad Simplified",
    description:
      "Find fully-funded scholarships and financial aid for studying abroad. Powered by Abroad Simplified.",
    siteName: "Abroad Simplified",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F4F2" },
    { media: "(prefers-color-scheme: dark)", color: "#111217" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F6F4F2] text-[#111111] min-h-full flex flex-col font-[Poppins] overflow-x-hidden">
        <AuthProvider>
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
