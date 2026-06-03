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
  title: "FNSM Research | Gut Health & Microbiome Nutrition",
  description:
    "Evidence-based nutrition science for gut microbiome optimisation, IBS, IBD, SIBO, and Crohn's disease. Research-backed dietary guidance, clinical tools, and expert analysis for patients and clinicians.",
  keywords:
    "gut microbiome, IBS, IBD, SIBO, Crohn's disease, FODMAP, gut health nutrition, microbiome diet, probiotics, prebiotics, fibre intake, GI nutrition, evidence-based nutrition",
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
