import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  FlaskConical,
  Activity,
  Leaf,
  BookOpen,
  Mail,
  Shield,
  TrendingUp,
  Brain,
  Microscope,
  HeartPulse,
  Salad,
} from "lucide-react";

const gutTopics = [
  {
    icon: <Activity size={22} />,
    title: "IBS & Gut Motility",
    description: "FODMAP protocols, gut-brain axis, visceral hypersensitivity, and evidence-based dietary interventions for IBS-D, IBS-C, and IBS-M.",
    href: "/blog",
    color: "bg-green-50 text-green-700",
  },
  {
    icon: <FlaskConical size={22} />,
    title: "IBD — Crohn's & UC",
    description: "Dietary strategies during remission and flares, nutritional deficiencies in IBD, enteral nutrition, and the microbiome in disease activity.",
    href: "/blog",
    color: "bg-blue-50 text-blue-700",
  },
  {
    icon: <Microscope size={22} />,
    title: "SIBO & Dysbiosis",
    description: "Breath testing interpretation, antibiotic protocols, elemental diets, and the low-fermentation approach to intestinal methanogen overgrowth.",
    href: "/blog",
    color: "bg-purple-50 text-purple-700",
  },
  {
    icon: <Leaf size={22} />,
    title: "Microbiome Nutrition",
    description: "Prebiotic fibre, fermented foods, polyphenols, and diversity-first dietary strategies backed by microbiome sequencing research.",
    href: "/blog",
    color: "bg-teal-50 text-teal-700",
  },
  {
    icon: <Salad size={22} />,
    title: "FODMAP Protocol",
    description: "The three-phase low-FODMAP elimination and reintroduction protocol — with a personalised tool to track your own trigger profile.",
    href: "/tools/fodmap-guide",
    color: "bg-amber-50 text-amber-700",
  },
  {
    icon: <HeartPulse size={22} />,
    title: "GI Lab Markers",
    description: "Interpreting fecal calprotectin, SIBO breath tests, nutrient deficiency panels, and stool microbiome reports in clinical context.",
    href: "/tools/fodmap-guide",
    color: "bg-rose-50 text-rose-700",
  },
  {
    icon: <Brain size={22} />,
    title: "Gut–Brain Axis",
    description: "How the enteric nervous system, vagus nerve, and microbiota-gut-brain signalling influence mood, cognition, and pain perception.",
    href: "/blog",
    color: "bg-indigo-50 text-indigo-700",
  },
];

const featuredArticles = [
  {
    slug: "fodmap-reintroduction-guide",
    title: "The FODMAP Reintroduction Protocol: A Step-by-Step Clinical Guide",
    excerpt:
      "The elimination phase is only half the story. We walk through every reintroduction challenge — protocol, test food, timing, and how to interpret your results.",
    category: "FODMAP",
    readTime: "11 min",
    date: "May 2026",
  },
  {
    slug: "microbiome-diversity-diet",
    title: "30 Plants a Week: The Evidence Behind the Microbiome Diversity Target",
    excerpt:
      "The American Gut Project found 30+ plant varieties per week predicted microbiome diversity better than any other dietary variable. Here's exactly how to hit that target.",
    category: "Microbiome",
    readTime: "9 min",
    date: "April 2026",
  },
  {
    slug: "ibd-nutrition-flare",
    title: "Eating During an IBD Flare: What the Evidence Actually Supports",
    excerpt:
      "Low-residue, elemental, or exclusion diet? We review the clinical data on nutritional management during active Crohn's and UC — and what to avoid.",
    category: "IBD",
    readTime: "10 min",
    date: "March 2026",
  },
];

const trustSignals = [
  { icon: <Shield size={15} />, text: "Every claim cited from peer-reviewed research" },
  { icon: <FlaskConical size={15} />, text: "Evidence graded: RCTs, systematic reviews, observational" },
  { icon: <TrendingUp size={15} />, text: "Updated as new GI nutrition trials publish" },
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
                Evidence-Based Nutrition Science
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Better Gut Health.<br />
                <span className="text-[#C9A84C]">Grounded in Evidence.</span>
              </h1>
              <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                The science of gut microbiome nutrition is advancing faster than most clinicians
                can follow. We translate cutting-edge research on IBS, IBD, SIBO, FODMAP,
                and microbiome optimisation into evidence-graded guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/tools/fodmap-guide"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#D4B96B] transition-colors"
                >
                  Try the FODMAP Tool <ArrowRight size={16} />
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

        {/* Core Topics */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10">
            <p className="text-[#2D6A4F] text-sm font-semibold uppercase tracking-wider mb-2">Core Topics</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1B2A4A]">
              Everything You Need to Know About Gut Health
            </h2>
            <p className="mt-3 text-gray-500 text-lg max-w-2xl">
              Seven evidence-based pillars — from the microbiome science of IBS to practical dietary
              protocols for IBD and SIBO.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {gutTopics.map((topic) => (
              <Link
                key={topic.title}
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
              href="/tools"
              className="group bg-[#1B2A4A] rounded-xl border border-[#1B2A4A] p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/20 flex items-center justify-center mb-3">
                <ArrowRight size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-serif font-bold text-white mb-1.5">All Interactive Tools</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Gut tracker, FODMAP guide, calorie calculator, and more — free to use.
              </p>
            </Link>
          </div>
        </section>

        {/* Stat strip */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "1 in 5", label: "Adults affected by IBS", sub: "most underdiagnosed GI condition" },
              { stat: "~38T", label: "Microbes in the gut", sub: "outnumber human cells nearly 1:1" },
              { stat: "75%", label: "IBS symptom improvement", sub: "on low-FODMAP in clinical trials" },
              { stat: "30+", label: "Plant varieties per week", sub: "targets optimal microbiome diversity" },
            ].map((item) => (
              <div key={item.stat} className="text-center">
                <div className="font-serif text-4xl font-bold text-[#C9A84C] mb-1">{item.stat}</div>
                <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
                <div className="text-white/50 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Tools CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#2D6A4F] text-sm font-semibold uppercase tracking-wider mb-2">Interactive Tools</p>
              <h2 className="font-serif text-3xl font-bold text-[#1B2A4A]">Free Clinical Tools</h2>
            </div>
            <Link href="/tools" className="hidden sm:flex items-center gap-1 text-[#2D6A4F] font-semibold text-sm hover:underline">
              All tools <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#2D6A4F] rounded-xl flex items-center justify-center mb-4">
                <Activity size={22} className="text-white" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-2">Gut Health Food Tracker</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Log your meals and get instant AI-powered analysis — fiber, FODMAP flags,
                microbiome impact scores, and personalised clinical insights. Tailored for IBS, IBD, and SIBO.
              </p>
              <Link
                href="/tools/gut-tracker"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D6A4F] text-white font-semibold rounded-md hover:bg-[#1B2A4A] transition-colors text-sm w-fit"
              >
                Launch Tracker <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center mb-4">
                <FlaskConical size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-2">FODMAP Protocol Companion</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Navigate the three-phase FODMAP protocol, track your personal reintroduction results,
                and log GI lab markers — calprotectin, SIBO breath test, nutrient deficiencies, and more.
              </p>
              <Link
                href="/tools/fodmap-guide"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2A4A] text-white font-semibold rounded-md hover:bg-[#2D6A4F] transition-colors text-sm w-fit"
              >
                Launch Tool <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="bg-[#FAFAF7] border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
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
          </div>
        </section>

        {/* Shop CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col">
              <div className="w-12 h-12 bg-[#1B2A4A] rounded-xl flex items-center justify-center mb-4">
                <BookOpen size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-2">Nutrition Books</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Evidence-based guides on gut microbiome nutrition, GI disease management,
                and personalised dietary strategies. Every claim referenced.
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
                <Leaf size={22} className="text-white" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-2">Gut Health Supplements</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                Only supplements with meaningful human evidence relevant to GI health —
                probiotics, prebiotics, omega-3, and digestive enzymes. Evidence grade shown on every product.
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
            <h2 className="font-serif text-3xl font-bold mb-3">The Gut Health Research Digest</h2>
            <p className="text-white/70 text-lg mb-6">
              Fortnightly email. New trial results on microbiome nutrition, updated FODMAP guidance,
              and practical GI protocols — no hype, no supplement sales pitch.
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
