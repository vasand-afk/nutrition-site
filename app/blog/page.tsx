import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Clock, Tag } from "lucide-react";

const categories = ["All", "Aging Clocks", "Aging Biology", "Lifestyle", "Supplements", "Therapies", "Nutrition", "Microbiome"];

const posts = [
  {
    slug: "epigenetic-clocks-explained",
    title: "Epigenetic Clocks Explained: What Your DNA Methylation Reveals About Your Age",
    excerpt:
      "Horvath, GrimAge, DunedinPACE — these clocks predict disease and mortality better than your birth certificate. We explain how methylation patterns encode your biological age and which clock you should actually care about.",
    category: "Aging Clocks",
    readTime: "10 min",
    date: "May 20, 2026",
    featured: true,
  },
  {
    slug: "zone2-longevity",
    title: "Zone 2 Cardio and Longevity: The Science Behind the Hype",
    excerpt:
      "VO₂max is the single strongest predictor of all-cause mortality. We explain the physiology of zone 2 training, how to find your zone, and why 150 minutes per week may be the most powerful thing you can do for healthspan.",
    category: "Lifestyle",
    readTime: "8 min",
    date: "May 8, 2026",
    featured: false,
  },
  {
    slug: "senolytics-2025",
    title: "Senolytics in 2025: What the Human Trials Now Tell Us",
    excerpt:
      "Dasatinib + quercetin cleared senescent cells in the first human trials at Mayo Clinic. The results are more nuanced than the headlines suggest — here's what actually happened and what it means.",
    category: "Therapies",
    readTime: "9 min",
    date: "April 25, 2026",
    featured: false,
  },
  {
    slug: "hallmarks-aging-practical",
    title: "The 12 Hallmarks of Aging: A Practical Breakdown",
    excerpt:
      "López-Otín's hallmarks framework is the foundation of modern longevity medicine. But what does it actually mean for how you live? We translate the molecular biology into actionable priorities.",
    category: "Aging Biology",
    readTime: "12 min",
    date: "April 12, 2026",
    featured: false,
  },
  {
    slug: "nmn-evidence-review",
    title: "NMN in 2025: Reviewing Every Human Trial",
    excerpt:
      "NMN is one of the most hyped supplements on the market. We review every published human RCT — including the disappointing ones — and give you an honest evidence grade.",
    category: "Supplements",
    readTime: "11 min",
    date: "March 30, 2026",
    featured: false,
  },
  {
    slug: "rapamycin-longevity",
    title: "Rapamycin for Longevity: What the Dog Aging Project Tells Us",
    excerpt:
      "Rapamycin extends lifespan in every model organism tested. The Dog Aging Project is providing the first large-scale mammalian longevity trial data. Here's what's been found so far.",
    category: "Therapies",
    readTime: "8 min",
    date: "March 15, 2026",
    featured: false,
  },
  {
    slug: "sleep-dementia",
    title: "Sleep and Dementia Risk: The Glymphatic System Explained",
    excerpt:
      "During deep sleep, the brain's glymphatic system clears amyloid-beta and tau proteins. Chronic sleep deprivation may be the single most modifiable risk factor for Alzheimer's disease.",
    category: "Lifestyle",
    readTime: "7 min",
    date: "March 1, 2026",
    featured: false,
  },
  {
    slug: "longevity-nutrition-microbiome",
    title: "Longevity Nutrition: Why Your Gut Microbiome Is the Missing Link",
    excerpt:
      "A 2025 re-analysis of Blue Zone dietary data reveals the microbiome-longevity connection is stronger than previously understood. The microbiome may mediate most of the longevity benefit of plant-rich diets.",
    category: "Nutrition",
    readTime: "10 min",
    date: "February 20, 2026",
    featured: false,
  },
  {
    slug: "glycan-age-test",
    title: "GlycanAge: The Aging Test That Responds to Lifestyle Faster Than Any Other",
    excerpt:
      "While epigenetic clocks change slowly over years, GlycanAge — which measures immune system glycosylation — can change by 5–10 years within months of lifestyle intervention. Here's the science.",
    category: "Aging Clocks",
    readTime: "7 min",
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
          <h1 className="font-serif text-4xl font-bold text-[#1B2A4A]">Longevity Science Explained</h1>
          <p className="mt-3 text-gray-500 text-lg max-w-2xl">
            Deep dives into biological aging, clinical trials, supplements, and lifestyle interventions — every claim backed by a citation.
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
