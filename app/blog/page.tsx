import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, Tag } from "lucide-react";

const categories = ["All", "FODMAP", "Microbiome", "IBS", "IBD / Crohn's", "SIBO", "Fermented Foods", "Nutrition Science"];

const posts = [
  {
    slug: "fodmap-reintroduction-guide",
    title: "The FODMAP Reintroduction Protocol: A Step-by-Step Clinical Guide",
    excerpt:
      "The elimination phase is only half the story. We walk through all 8 reintroduction challenges — the exact test food, protocol, timing, and how to interpret your personal results to build a long-term sustainable diet.",
    category: "FODMAP",
    readTime: "11 min",
    date: "May 20, 2026",
    featured: true,
  },
  {
    slug: "microbiome-diversity-30-plants",
    title: "30 Plants a Week: The Evidence Behind the Microbiome Diversity Target",
    excerpt:
      "The American Gut Project found that eating 30+ plant varieties per week predicted microbiome diversity better than any other single dietary variable. Here is exactly how to hit that target practically.",
    category: "Microbiome",
    readTime: "9 min",
    date: "May 8, 2026",
    featured: false,
  },
  {
    slug: "ibd-nutrition-flare",
    title: "Eating During an IBD Flare: What the Evidence Actually Supports",
    excerpt:
      "Low-residue, elemental, or exclusive enteral nutrition? We review the clinical data on nutritional management during active Crohn's disease and ulcerative colitis — and what the guidelines actually say.",
    category: "IBD / Crohn's",
    readTime: "10 min",
    date: "April 25, 2026",
    featured: false,
  },
  {
    slug: "sibo-breath-test-interpretation",
    title: "SIBO Breath Test Results Explained: H₂, CH₄, and What the Numbers Mean",
    excerpt:
      "Hydrogen SIBO, methane-dominant IMO, or hydrogen sulfide? We explain the positive criteria, the false-positive traps, and how to interpret a lactulose or glucose breath test result alongside your symptoms.",
    category: "SIBO",
    readTime: "9 min",
    date: "April 12, 2026",
    featured: false,
  },
  {
    slug: "fermented-foods-microbiome",
    title: "Fermented Foods vs. Fibre: Which Builds a Better Microbiome?",
    excerpt:
      "A 2021 Stanford RCT directly compared high-fibre and high-fermented-food diets head-to-head. The results surprised most researchers — and changed clinical recommendations. Here is what they found.",
    category: "Fermented Foods",
    readTime: "8 min",
    date: "March 30, 2026",
    featured: false,
  },
  {
    slug: "calprotectin-ibs-vs-ibd",
    title: "Fecal Calprotectin: The One Test That Separates IBS from IBD",
    excerpt:
      "A single stool biomarker can save patients years of diagnostic limbo. We explain what calprotectin measures, what the thresholds mean, and why it should be the first test ordered when GI inflammation is suspected.",
    category: "IBD / Crohn's",
    readTime: "7 min",
    date: "March 15, 2026",
    featured: false,
  },
  {
    slug: "prebiotic-fibre-guide",
    title: "Prebiotic Fibre: The Complete Guide to Feeding Your Microbiome",
    excerpt:
      "Inulin, FOS, pectin, beta-glucan, resistant starch — each feeds different bacterial communities. We explain the science of prebiotic fibre, which foods contain the most, and how to increase intake without triggering IBS symptoms.",
    category: "Nutrition Science",
    readTime: "10 min",
    date: "March 1, 2026",
    featured: false,
  },
  {
    slug: "ibs-gut-brain-axis",
    title: "IBS and the Gut–Brain Axis: Why Stress Triggers Your Gut",
    excerpt:
      "IBS is not 'all in the head' — but the brain genuinely changes gut physiology via the enteric nervous system, vagus nerve, and microbiota signalling. Understanding this explains why stress, sleep, and anxiety management are part of IBS treatment.",
    category: "IBS",
    readTime: "9 min",
    date: "February 20, 2026",
    featured: false,
  },
  {
    slug: "probiotic-evidence-grades",
    title: "Probiotics for IBS and IBD: An Evidence-Graded Review of Every Major Strain",
    excerpt:
      "Lactobacillus, Bifidobacterium, Saccharomyces boulardii — the evidence quality varies enormously by strain and condition. We review the published RCTs and give each strain an honest evidence grade.",
    category: "Microbiome",
    readTime: "12 min",
    date: "February 5, 2026",
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
          <h1 className="font-serif text-4xl font-bold text-[#1B2A4A]">Gut Health Science Explained</h1>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl">
            Deep dives into microbiome nutrition, FODMAP protocols, IBS, IBD, and SIBO management —
            every claim backed by a citation.
          </p>
        </div>

        {/* Category filter */}
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
