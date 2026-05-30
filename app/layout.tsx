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
  title: "FNSM Research | Evidence-Based Longevity Science",
  description:
    "Evidence-based longevity science: biological aging, aging clocks, healthspan optimisation, lab tests, lifestyle interventions, supplements, and emerging therapies. Written for clinicians and longevity-focused individuals.",
  keywords:
    "longevity, healthspan, lifespan, biological aging, aging clocks, epigenetic clock, glycan age, hallmarks of aging, NMN, senolytics, rapamycin, longevity supplements, lab tests aging",
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
