import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BookOpen,
  FlaskConical,
  Mail,
  Calculator,
  ArrowRight,
  CheckCircle,
  Quote,
} from "lucide-react";

const featuredArticles = [
  {
    slug: "gut-microbiome-ibs",
    title: "How Dietary Fibre Reshapes the Gut Microbiome in IBS",
    excerpt:
      "New meta-analyses show specific soluble fibres can reduce symptom severity by up to 40% — here's what the evidence actually says.",
    category: "Microbiome",
    readTime: "8 min",
    date: "May 2026",
  },
  {
    slug: "sibo-low-fodmap",
    title: "SIBO & Low-FODMAP: What the Latest Trials Tell Us",
    excerpt:
      "The low-FODMAP diet remains the gold standard for symptom control, but emerging research challenges its long-term microbiome impact.",
    category: "SIBO",
    readTime: "6 min",
    date: "April 2026",
  },
  {
    slug: "longevity-nutrition",
    title: "Longevity Nutrition: Lessons from the Blue Zones Revisited",
    excerpt:
      "A 2025 re-analysis of Blue Zone dietary data reveals the microbiome-longevity connection is stronger than previously understood.",
    category: "Longevity",
    readTime: "10 min",
    date: "March 2026",
  },
];

const trustSignals = [
  "Peer-reviewed research citations",
  "Evidence graded by quality (RCTs, systematic reviews)",
  "No supplement sales — unbiased analysis",
  "Written for patients and clinicians alike",
];

const conditions = [
  "IBS", "IBD", "Crohn's Disease", "Ulcerative Colitis",
  "SIBO", "Leaky Gut", "Coeliac Disease", "Functional Dyspepsia",
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold rounded-full uppercase tracking-wider mb-6">
                Evidence-Based Nutrition Science
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Nutrition Rooted in Science,<br />
                <span className="text-[#C9A84C]">Built for Your Gut.</span>
              </h1>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                Cutting-edge research translated into practical nutrition guidance for people living
                with GI conditions — and for anyone optimising their microbiome for long-term health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/newsletter"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#D4B96B] transition-colors"
                >
                  <Mail size={18} /> Get the Free Newsletter
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors"
                >
                  Explore the Research <ArrowRight size={16} />
                </Link>
              </div>

              {/* Trust bar */}
              <div className="mt-10 flex flex-wrap gap-4">
                {trustSignals.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm text-white/60">
                    <CheckCircle size={14} className="text-[#2D6A4F]" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conditions we cover */}
        <section className="bg-[#2D6A4F]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center gap-3">
            <span className="text-white/60 text-xs uppercase tracking-widest mr-2">Covering:</span>
            {conditions.map((c) => (
              <span key={c} className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#2D6A4F] text-sm font-semibold uppercase tracking-wider mb-1">Latest Research</p>
              <h2 className="font-serif text-3xl font-bold text-[#1B2A4A]">From the Lab to Your Plate</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-1 text-sm text-[#2D6A4F] font-semibold hover:underline">
              All articles <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <article
                key={article.slug}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-xs">{article.readTime} read</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2 leading-snug group-hover:text-[#2D6A4F] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-[#2D6A4F] font-semibold hover:underline"
                >
                  Read more <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-6 sm:hidden text-center">
            <Link href="/blog" className="text-sm text-[#2D6A4F] font-semibold hover:underline">
              View all articles →
            </Link>
          </div>
        </section>

        {/* Feature blocks */}
        <section className="bg-white border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <BookOpen size={24} className="text-[#C9A84C]" />,
                  title: "Books & Guides",
                  desc: "In-depth nutrition guides written for patients, carers, and clinicians — available as instant digital downloads.",
                  href: "/shop",
                  cta: "Browse books",
                },
                {
                  icon: <FlaskConical size={24} className="text-[#C9A84C]" />,
                  title: "Research Blog",
                  desc: "Weekly deep-dives into the latest microbiome, GI disease, and longevity studies — no paywalls, no fluff.",
                  href: "/blog",
                  cta: "Read the blog",
                },
                {
                  icon: <Calculator size={24} className="text-[#C9A84C]" />,
                  title: "Interactive Tools",
                  desc: "Calorie calculators, fibre intake trackers, and personalised meal-planning tools built on clinical guidelines.",
                  href: "/tools",
                  cta: "Try the tools",
                },
                {
                  icon: <Mail size={24} className="text-[#C9A84C]" />,
                  title: "Free Newsletter",
                  desc: "Research summaries, practical tips, and new tools — delivered fortnightly, unsubscribe any time.",
                  href: "/newsletter",
                  cta: "Subscribe free",
                },
              ].map((block) => (
                <div
                  key={block.title}
                  className="bg-[#FAFAF7] rounded-xl p-6 border border-gray-100 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1B2A4A] flex items-center justify-center mb-4">
                    {block.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2">{block.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{block.desc}</p>
                  <Link
                    href={block.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm text-[#2D6A4F] font-semibold hover:underline"
                  >
                    {block.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial / Pull quote */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="bg-[#1B2A4A] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-6 left-8 opacity-10">
              <Quote size={80} />
            </div>
            <div className="relative max-w-2xl">
              <p className="font-serif text-xl md:text-2xl leading-relaxed mb-6 text-white/90">
                "Finally — a nutrition resource that cites its sources and doesn't try to sell me
                supplements. The gut health articles are better than anything I found from my
                gastroenterologist's pamphlets."
              </p>
              <div>
                <p className="font-semibold text-[#C9A84C]">Sarah T.</p>
                <p className="text-sm text-white/50">Living with Crohn's Disease, 6-year subscriber</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-[#2D6A4F]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Science in Your Inbox, Fortnightly.
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              Join 4,200+ patients and clinicians who rely on FNSM Research for evidence-based
              nutrition updates.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#D4B96B] transition-colors text-base"
            >
              <Mail size={18} /> Subscribe Free — No Spam
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
