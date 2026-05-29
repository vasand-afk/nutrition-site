import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, Tag } from "lucide-react";

const categories = ["All", "Microbiome", "IBS", "IBD", "SIBO", "Longevity", "Nutrition Science", "Clinical"];

const posts = [
  {
    slug: "gut-microbiome-ibs",
    title: "How Dietary Fibre Reshapes the Gut Microbiome in IBS",
    excerpt:
      "New meta-analyses show specific soluble fibres can reduce symptom severity by up to 40%. We examine the evidence, the mechanisms, and practical fibre strategies for IBS patients.",
    category: "IBS",
    readTime: "8 min",
    date: "May 15, 2026",
    featured: true,
  },
  {
    slug: "sibo-low-fodmap",
    title: "SIBO & Low-FODMAP: What the Latest Trials Tell Us",
    excerpt:
      "The low-FODMAP diet remains the gold standard for SIBO symptom control, but emerging research challenges its long-term microbiome impact.",
    category: "SIBO",
    readTime: "6 min",
    date: "April 28, 2026",
    featured: false,
  },
  {
    slug: "longevity-nutrition",
    title: "Longevity Nutrition: Lessons from the Blue Zones Revisited",
    excerpt:
      "A 2025 re-analysis of Blue Zone dietary data reveals the microbiome-longevity connection is stronger than previously understood.",
    category: "Longevity",
    readTime: "10 min",
    date: "March 20, 2026",
    featured: false,
  },
  {
    slug: "crohns-exclusive-enteral",
    title: "Exclusive Enteral Nutrition in Crohn's: A Practical Guide",
    excerpt:
      "EEN achieves remission in up to 80% of paediatric Crohn's cases. New data extends these findings to adults — here's what clinicians need to know.",
    category: "IBD",
    readTime: "9 min",
    date: "March 5, 2026",
    featured: false,
  },
  {
    slug: "short-chain-fatty-acids",
    title: "Short-Chain Fatty Acids: The Microbiome's Most Powerful Output",
    excerpt:
      "Butyrate, propionate, and acetate regulate immunity, inflammation, and even brain health. We explore how dietary choices shape SCFA production.",
    category: "Microbiome",
    readTime: "7 min",
    date: "February 14, 2026",
    featured: false,
  },
  {
    slug: "polyphenols-microbiome",
    title: "Polyphenols and the Microbiome: Beyond Antioxidants",
    excerpt:
      "Polyphenols are fermented by gut bacteria into metabolites that may do more for GI health than the polyphenols themselves.",
    category: "Nutrition Science",
    readTime: "5 min",
    date: "January 30, 2026",
    featured: false,
  },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <div className="mb-10">
          <p className="text-[#2D6A4F] text-sm font-semibold uppercase tracking-wider mb-1">Research Blog</p>
          <h1 className="font-serif text-4xl font-bold text-[#1B2A4A]">Evidence-Based Nutrition Insights</h1>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl">
            Deep dives into microbiome science, GI disease nutrition, and longevity research — every claim backed by a citation.
          </p>
        </div>

        {/* Category filter (visual only — full filtering would need state) */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-[#1B2A4A] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#2D6A4F] hover:text-[#2D6A4F]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        <article className="bg-[#1B2A4A] text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D6A4F]/20 rounded-full translate-x-20 -translate-y-20" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#C9A84C] text-[#1B2A4A] text-xs font-bold rounded-full uppercase">
                Featured
              </span>
              <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full">{featured.category}</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 leading-snug">{featured.title}</h2>
            <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
              <span className="flex items-center gap-1"><Clock size={13} /> {featured.readTime} read</span>
              <span>{featured.date}</span>
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#D4B96B] transition-colors text-sm"
            >
              Read Article <ArrowRight size={14} />
            </Link>
          </div>
        </article>

        {/* Post grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1 text-xs text-[#2D6A4F] font-semibold">
                  <Tag size={11} /> {post.category}
                </span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-400 text-xs flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
              </div>
              <h2 className="font-serif text-lg font-bold text-[#1B2A4A] mb-2 leading-snug group-hover:text-[#2D6A4F] transition-colors flex-1">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <span className="text-xs text-gray-400">{post.date}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm text-[#2D6A4F] font-semibold hover:underline flex items-center gap-1"
                >
                  Read <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
