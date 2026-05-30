import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  FlaskConical,
  Clock,
  Activity,
  Dna,
  Brain,
  Leaf,
  Pill,
  BookOpen,
  Mail,
  TrendingUp,
  Shield,
} from "lucide-react";

const longevityTopics = [
  {
    icon: <Activity size={22} />,
    title: "Healthspan & Lifespan",
    description: "Why living longer only matters if you're living well — and what science says about compressing morbidity.",
    href: "/longevity/healthspan",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: <Dna size={22} />,
    title: "Biology of Aging",
    description: "The 12 hallmarks of aging — from genomic instability and cellular senescence to mitochondrial dysfunction.",
    href: "/longevity/aging-biology",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: <Clock size={22} />,
    title: "Aging Clocks",
    description: "Epigenetic methylation clocks, glycan age tests, and how to measure your biological vs. chronological age.",
    href: "/longevity/aging-clocks",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: <FlaskConical size={22} />,
    title: "Lab Tests & Biomarkers",
    description: "The blood tests, scans, and functional assessments that reveal how fast you are actually aging.",
    href: "/longevity/lab-tests",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: <Leaf size={22} />,
    title: "Diet, Exercise & Sleep",
    description: "The lifestyle factors with the strongest evidence — zone 2 cardio, protein, sleep architecture, and more.",
    href: "/longevity/lifestyle",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: <Pill size={22} />,
    title: "Supplements",
    description: "Evidence grades for NMN, NR, spermidine, berberine, omega-3, and the rest — what works, what doesn't.",
    href: "/longevity/supplements",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: <Brain size={22} />,
    title: "Therapies",
    description: "From proven interventions (caloric restriction, senolytics) to experimental (rapamycin, young plasma, gene therapy).",
    href: "/longevity/therapies",
    color: "bg-indigo-50 text-indigo-700",
  },
];

const featuredArticles = [
  {
    slug: "epigenetic-clocks-explained",
    title: "Epigenetic Clocks Explained: What Your DNA Methylation Reveals About Your Age",
    excerpt:
      "Horvath, GrimAge, DunedinPACE — these clocks predict disease and mortality better than your birth certificate. Here's how they work.",
    category: "Aging Clocks",
    readTime: "10 min",
    date: "May 2026",
  },
  {
    slug: "zone2-longevity",
    title: "Zone 2 Cardio and Longevity: The Science Behind the Hype",
    excerpt:
      "VO₂max is the single strongest predictor of all-cause mortality. We explain why and how to actually train it.",
    category: "Lifestyle",
    readTime: "8 min",
    date: "April 2026",
  },
  {
    slug: "senolytics-2025",
    title: "Senolytics in 2025: What the Human Trials Now Tell Us",
    excerpt:
      "Dasatinib + quercetin cleared senescent cells in the first human trials. The results are more nuanced than the headlines suggest.",
    category: "Therapies",
    readTime: "9 min",
    date: "March 2026",
  },
];

const trustSignals = [
  { icon: <Shield size={15} />, text: "Every claim cited from peer-reviewed research" },
  { icon: <FlaskConical size={15} />, text: "Evidence graded: RCTs, systematic reviews, observational" },
  { icon: <TrendingUp size={15} />, text: "Updated as new longevity trials publish" },
  { icon: <Brain size={15} />, text: "Written for both patients and clinicians" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#1B2A4A] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] via-[#1B2A4A] to-[#2D6A4F]/30 pointer-events-none" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold rounded-full uppercase tracking-wider mb-6">
                Evidence-Based Longevity Science
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Extend Your Healthspan.<br />
                <span className="text-[#C9A84C]">Not Just Your Lifespan.</span>
              </h1>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                The science of longevity is advancing faster than most clinicians can follow.
                We translate cutting-edge research on biological aging, aging clocks, lifestyle,
                supplements, and emerging therapies into evidence-graded guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/longevity"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#D4B96B] transition-colors"
                >
                  Explore the Science <ArrowRight size={16} />
                </Link>
                <Link
                  href="/newsletter"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-md hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Mail size={16} /> Get the Research Digest
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-[#2D6A4F]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-x-8 gap-y-2">
            {trustSignals.map((s) => (
              <div key={s.text} className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-[#C9A84C]">{s.icon}</span>
                {s.text}
              </div>
            ))}
          </div>
        </div>

        {/* Longevity Topics */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <p className="text-[#2D6A4F] text-sm font-semibold uppercase tracking-wider mb-2">Core Topics</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B2A4A]">Everything You Need to Know About Aging</h2>
            <p className="mt-3 text-gray-500 text-lg max-w-2xl">
              Seven evidence-based pillars, from the molecular biology of aging to practical daily interventions.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {longevityTopics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${topic.color}`}>
                  {topic.icon}
                </div>
                <h3 className="font-serif font-bold text-[#1B2A4A] mb-1.5 group-hover:text-[#2D6A4F] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{topic.description}</p>
                <div className="mt-3 flex items-center gap-1 text-[#2D6A4F] text-sm font-semibold">
                  Learn more <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
            {/* CTA card */}
            <Link
              href="/longevity"
              className="group bg-[#1B2A4A] rounded-xl border border-[#1B2A4A] p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/20 flex items-center justify-center mb-3">
                <ArrowRight size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-serif font-bold text-white mb-1.5">Full Longevity Hub</h3>
              <p className="text-white/60 text-sm leading-relaxed">See all topics, tools, and the latest research in one place.</p>
            </Link>
          </div>
        </section>

        {/* Stat strip */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "12", label: "Hallmarks of Aging", sub: "identified by research consensus" },
              { stat: "73", label: "Years avg. lifespan", sub: "vs. ~63 years of healthy life" },
              { stat: "30%", label: "VO₂max drop", sub: "per decade after age 50 untrained" },
              { stat: "~20", label: "Aging clocks available", sub: "for biological age testing" },
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <div className="font-serif text-4xl font-bold text-[#C9A84C] mb-1">{item.stat}</div>
                <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
                <div className="text-white/50 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#2D6A4F] text-sm font-semibold uppercase tracking-wider mb-2">Research Blog</p>
              <h2 className="font-serif text-3xl font-bold text-[#1B2A4A]">Latest from the Lab</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-[#2D6A4F] font-semibold text-sm hover:underline">
              All articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
              >
                <span className="px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-semibold rounded-full w-fit mb-3">
                  {article.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2 leading-snug group-hover:text-[#2D6A4F] transition-colors flex-1">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 text-xs text-gray-400">
                  <span>{article.date}</span>
                  <span>{article.readTime} read</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/blog" className="text-[#2D6A4F] font-semibold text-sm hover:underline">
              View all articles →
            </Link>
          </div>
        </section>

        {/* Shop CTA */}
        <section className="bg-[#FAFAF7] border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-2">Longevity Books</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Evidence-based guides on biological aging, longevity nutrition, and personalised healthspan strategies.
                Every claim referenced. No filler.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2A4A] text-white font-semibold rounded-md hover:bg-[#2D6A4F] transition-colors text-sm w-fit"
              >
                Browse Books <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#2D6A4F] rounded-xl flex items-center justify-center mb-4">
                <Pill size={22} className="text-white" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-2">Curated Supplements</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Only supplements with meaningful human evidence. Each product includes an evidence summary
                so you understand exactly what you are buying and why.
              </p>
              <Link
                href="/shop#supplements"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D6A4F] text-white font-semibold rounded-md hover:bg-[#1B2A4A] transition-colors text-sm w-fit"
              >
                Shop Supplements <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
            <Mail size={32} className="text-[#C9A84C] mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold mb-3">The Longevity Research Digest</h2>
            <p className="text-white/70 text-lg mb-6">
              Fortnightly email. New trial results, updated evidence grades, and practical protocols —
              no hype, no supplements sales pitch.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#D4B96B] transition-colors"
            >
              Subscribe Free <ArrowRight size={16} />
            </Link>
            <p className="text-white/40 text-xs mt-4">No spam. Unsubscribe any time.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
