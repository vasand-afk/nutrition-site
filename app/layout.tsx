import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FNSM Research | Nutrition for Microbiome Health & Longevity",
  description:
    "Evidence-based nutrition guidance for microbiome optimization, GI disease management, and longevity. Science-backed resources for patients and clinicians.",
  keywords:
    "microbiome nutrition, GI disease, IBS, IBD, SIBO, Crohn's, longevity, gut health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF7] text-[#1B2A4A] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
