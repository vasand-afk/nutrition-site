"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, CheckCircle, BookOpen, FlaskConical, Rss } from "lucide-react";

const benefits = [
  {
    icon: <FlaskConical size={20} className="text-[#C9A84C]" />,
    title: "Research Summaries",
    desc: "The most important GI and microbiome studies — translated into plain English.",
  },
  {
    icon: <BookOpen size={20} className="text-[#C9A84C]" />,
    title: "Practical Guides",
    desc: "Actionable nutrition strategies you can discuss with your healthcare provider.",
  },
  {
    icon: <Rss size={20} className="text-[#C9A84C]" />,
    title: "Early Access",
    desc: "New tools, books, and resources sent to subscribers before public release.",
  },
];

const pastIssues = [
  { num: "31", title: "The Microbiome After Antibiotics: Rebuilding Strategically", date: "May 2026" },
  { num: "30", title: "Fermented Foods vs. Fibre: Which Builds a Better Microbiome?", date: "April 2026" },
  { num: "29", title: "Butyrate Supplements: Do They Actually Work?", date: "March 2026" },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setError("");
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="max-w-xl">
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center mb-6">
                <Mail size={24} className="text-[#C9A84C]" />
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-5 leading-tight">
                Nutrition Research,<br />
                <span className="text-[#C9A84C]">Delivered Fortnightly.</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Join 4,200+ patients, carers, and clinicians who rely on the FNSM Research
                newsletter for evidence-based gut health and longevity updates.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#C9A84C] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#D4B96B] transition-colors whitespace-nowrap"
                    >
                      Subscribe Free
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <p className="text-white/40 text-xs">No spam. Unsubscribe anytime. Your email stays private.</p>
                </form>
              ) : (
                <div className="flex items-start gap-3 bg-[#2D6A4F]/30 border border-[#2D6A4F]/40 rounded-xl p-5">
                  <CheckCircle size={20} className="text-[#2D6A4F] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-white">You're subscribed!</p>
                    <p className="text-white/60 text-sm mt-1">
                      Welcome to the FNSM Research community. Check your inbox for a confirmation email.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-8">What You'll Get</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#1B2A4A] flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Past issues */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-6">Recent Issues</h2>
          <div className="space-y-4">
            {pastIssues.map((issue) => (
              <div
                key={issue.num}
                className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#1B2A4A] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  #{issue.num}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1B2A4A]">{issue.title}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{issue.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
