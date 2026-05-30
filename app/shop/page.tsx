import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Download, Star, ShieldCheck, Pill, Package, ArrowRight, FlaskConical } from "lucide-react";

const books = [
  {
    id: 1,
    title: "The Longevity Blueprint",
    subtitle: "A Science-Based Guide to Extending Healthspan — Not Just Lifespan",
    description:
      "240 pages covering biological aging, the hallmarks framework, aging clocks, evidence-based lifestyle strategies, and an honest assessment of current and emerging therapies. Written for both patients and clinicians.",
    price: "$34",
    pages: "240 pages",
    format: "PDF + ePub",
    tags: ["Longevity", "Healthspan", "Aging Biology"],
    rating: 4.9,
    reviews: 113,
    featured: true,
  },
  {
    id: 2,
    title: "Eat for Longevity",
    subtitle: "Evidence-Based Nutrition Strategies for a Longer, Healthier Life",
    description:
      "A comprehensive look at longevity nutrition — from caloric restriction and time-restricted eating to polyphenol-rich diets and optimal protein intake for muscle preservation. Actionable meal strategies included.",
    price: "$24",
    pages: "168 pages",
    format: "PDF + ePub",
    tags: ["Longevity Diet", "Nutrition", "Anti-Aging"],
    rating: 4.8,
    reviews: 87,
    featured: false,
  },
  {
    id: 3,
    title: "The Microbiome Blueprint",
    subtitle: "A Clinical Guide to Nutrition for IBS, IBD & SIBO",
    description:
      "200+ pages covering the science of gut microbiome modulation through diet. Includes evidence-graded protocols for IBS, IBD, SIBO, and general gut optimisation — the gut-longevity connection explored in detail.",
    price: "$29",
    pages: "214 pages",
    format: "PDF + ePub",
    tags: ["Microbiome", "Gut Health", "IBS/IBD"],
    rating: 4.9,
    reviews: 142,
    featured: false,
  },
  {
    id: 4,
    title: "Understanding Your Aging Biomarkers",
    subtitle: "A Practical Guide to Lab Tests, Aging Clocks & What to Do About the Results",
    description:
      "The lab tests that actually matter for longevity — from ApoB and hsCRP to epigenetic clocks and DEXA scans. Explains what optimal levels look like, not just normal ranges, and what to do when results are off.",
    price: "$19",
    pages: "128 pages",
    format: "PDF",
    tags: ["Biomarkers", "Lab Tests", "Aging Clocks"],
    rating: 4.7,
    reviews: 61,
    featured: false,
  },
];

const supplements = [
  {
    id: "omega3",
    name: "Ultra-Pure Omega-3 (EPA + DHA)",
    subtitle: "Triglyceride-form fish oil — the most bioavailable",
    description: "Third-party tested for heavy metals and oxidation. Each capsule provides 1g EPA + 0.5g DHA in re-esterified triglyceride form — the most bioavailable format. Target: raise your omega-3 index above 8%.",
    price: "$35",
    servings: "90 capsules · 90 day supply",
    evidenceGrade: "A",
    evidenceText: "Grade A: Strong RCT evidence (REDUCE-IT trial, VITAL trial)",
    tags: ["Cardiovascular", "Anti-inflammatory", "Brain"],
    featured: true,
  },
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    subtitle: "Pure micronised creatine — muscle, brain, and longevity",
    description: "5g per serving of pure micronised creatine monohydrate. One of the most studied supplements with consistent evidence for muscle preservation, strength, and — increasingly — cognitive function in older adults.",
    price: "$25",
    servings: "500g · ~100 day supply",
    evidenceGrade: "A",
    evidenceText: "Grade A: Extensive RCT evidence for muscle and brain",
    tags: ["Muscle", "Brain", "Anti-sarcopenia"],
    featured: false,
  },
  {
    id: "magnesium",
    name: "Magnesium Glycinate",
    subtitle: "High-absorption form for sleep, metabolism & recovery",
    description: "200mg elemental magnesium as glycinate — the best-tolerated and most bioavailable form. Taken before bed, supports sleep quality, muscle recovery, and insulin sensitivity. No laxative effect at standard doses.",
    price: "$28",
    servings: "120 capsules · 60 day supply",
    evidenceGrade: "B",
    evidenceText: "Grade B: Multiple RCTs for sleep and insulin sensitivity",
    tags: ["Sleep", "Metabolic", "Recovery"],
    featured: false,
  },
  {
    id: "nmn",
    name: "NMN 500 (Stabilised)",
    subtitle: "NAD+ precursor — cellular energy and DNA repair",
    description: "500mg stabilised NMN per capsule with verified purity. NAD+ declines ~50% from age 20 to 60. NMN supplementation raises NAD+ levels and shows early RCT evidence for muscle endurance and insulin sensitivity in older adults.",
    price: "$55",
    servings: "60 capsules · 60 day supply",
    evidenceGrade: "C",
    evidenceText: "Grade C: Early human RCTs — promising, awaiting larger trials",
    tags: ["NAD+", "Mitochondria", "DNA Repair"],
    featured: true,
  },
  {
    id: "spermidine",
    name: "Spermidine (Wheat Germ Extract)",
    subtitle: "Autophagy activator — cellular renewal",
    description: "3.3mg spermidine from standardised wheat germ extract per serving. Spermidine activates autophagy — the cell's internal recycling system that declines with age. The PRELONG trial showed slowing of cognitive decline at this dose.",
    price: "$45",
    servings: "60 capsules · 60 day supply",
    evidenceGrade: "C",
    evidenceText: "Grade C: Small RCT (PRELONG); strong observational data",
    tags: ["Autophagy", "Brain", "Cellular Health"],
    featured: false,
  },
  {
    id: "berberine",
    name: "Berberine HCl 500mg",
    subtitle: "AMPK activator — metabolic health and glucose control",
    description: "500mg berberine HCl. Activates AMPK — the same pathway as metformin. Multiple RCTs show glucose lowering comparable to standard diabetes medication, plus lipid improvement. Take with meals.",
    price: "$32",
    servings: "120 capsules · 40 day supply",
    evidenceGrade: "B",
    evidenceText: "Grade B: Multiple RCTs vs. diabetes drugs",
    tags: ["Metabolic", "Glucose", "Anti-aging"],
    featured: false,
  },
  {
    id: "vitd3k2",
    name: "Vitamin D3 5000 IU + K2 MK-7",
    subtitle: "Immune health, bone density, and cardiovascular protection",
    description: "5000 IU D3 (cholecalciferol) + 100mcg K2 MK-7 per serving. D3 deficiency affects 70%+ of northern-latitude adults. K2 ensures calcium goes to bone, not arteries. VITAL trial: 2000 IU D3 reduced cancer mortality by 25%.",
    price: "$22",
    servings: "120 softgels · 120 day supply",
    evidenceGrade: "B",
    evidenceText: "Grade B: VITAL trial + observational data",
    tags: ["Immune", "Bone", "Cardiovascular"],
    featured: false,
  },
  {
    id: "taurine",
    name: "Taurine 1000mg",
    subtitle: "Emerging longevity amino acid — declines with age",
    description: "1g taurine per capsule. Taurine declines with age and was shown in a landmark 2023 Science paper to extend healthy lifespan in multiple model organisms. Early human data (3g/day) shows improvement in multiple aging biomarkers.",
    price: "$20",
    servings: "180 capsules · 60 day supply",
    evidenceGrade: "C",
    evidenceText: "Grade C: 2023 Science paper; early human trial data",
    tags: ["Cellular Health", "Antioxidant", "Emerging"],
    featured: false,
  },
];

const gradeColors: Record<string, string> = {
  A: "bg-green-100 text-green-800 border-green-200",
  B: "bg-blue-100 text-blue-800 border-blue-200",
  C: "bg-amber-100 text-amber-800 border-amber-200",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? "fill-[#C9A84C] text-[#C9A84C]" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <Header />
      <main>
        {/* Header */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-2">Shop</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Books & Supplements
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Evidence-based longevity resources — books you can trust and supplements backed by human data.
              No filler, no marketing spin.
            </p>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-[#2D6A4F]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-6">
            {[
              { icon: <Download size={14} />, text: "Books: instant digital download" },
              { icon: <ShieldCheck size={14} />, text: "Secure checkout via Stripe" },
              { icon: <FlaskConical size={14} />, text: "Supplements: third-party tested" },
              { icon: <Package size={14} />, text: "Evidence grade shown on every product" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-[#C9A84C]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Jump links */}
        <div className="border-b border-gray-100 bg-white sticky top-16 z-40 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-6 py-3">
            <a href="#books" className="text-sm font-semibold text-[#1B2A4A] hover:text-[#2D6A4F] flex items-center gap-1.5">
              <BookOpen size={14} /> Books
            </a>
            <a href="#supplements" className="text-sm font-semibold text-[#1B2A4A] hover:text-[#2D6A4F] flex items-center gap-1.5">
              <Pill size={14} /> Supplements
            </a>
            <Link href="/longevity/supplements" className="ml-auto text-xs text-[#2D6A4F] hover:underline hidden sm:flex items-center gap-1">
              Evidence guide <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Books */}
        <section id="books" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#1B2A4A] rounded-lg flex items-center justify-center">
              <BookOpen size={20} className="text-[#C9A84C]" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#1B2A4A]">Books & Guides</h2>
              <p className="text-gray-500 text-sm">Instant digital download · PDF & ePub · Every claim referenced</p>
            </div>
          </div>
          <div className="space-y-6">
            {books.map((book) => (
              <div
                key={book.id}
                className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                  book.featured ? "border-[#C9A84C]/40 shadow-md" : "border-gray-100"
                }`}
              >
                {book.featured && (
                  <div className="bg-[#C9A84C] text-[#1B2A4A] text-xs font-bold px-4 py-1.5 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="w-full md:w-32 h-44 bg-gradient-to-br from-[#1B2A4A] to-[#2D6A4F] rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen size={32} className="text-[#C9A84C]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {book.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-semibold rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-1">{book.title}</h3>
                      <p className="text-[#2D6A4F] font-medium mb-3">{book.subtitle}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{book.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <span>{book.pages}</span>
                        <span>·</span>
                        <span>{book.format}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-5">
                        <StarRating rating={book.rating} />
                        <span className="text-sm font-semibold text-[#1B2A4A]">{book.rating}</span>
                        <span className="text-sm text-gray-400">({book.reviews} reviews)</span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <span className="font-serif text-3xl font-bold text-[#1B2A4A]">{book.price}</span>
                        <button className="px-6 py-2.5 bg-[#1B2A4A] text-white font-semibold rounded-md hover:bg-[#2D6A4F] transition-colors text-sm">
                          Buy Now — Instant Download
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Stripe payments coming soon. Subscribe to the newsletter to be notified.</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supplements */}
        <section id="supplements" className="bg-[#FAFAF7] border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#2D6A4F] rounded-lg flex items-center justify-center">
                <Pill size={20} className="text-white" />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold text-[#1B2A4A]">Supplements</h2>
                <p className="text-gray-500 text-sm">Only Grade A, B, or C evidence · Third-party tested · No proprietary blends</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 mb-8 flex items-start gap-3 shadow-sm">
              <FlaskConical size={16} className="text-[#2D6A4F] mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">
                Every supplement we stock has an evidence grade (A–C) based on human trial data.
                We do not stock supplements graded D (no meaningful human evidence).{" "}
                <Link href="/longevity/supplements" className="text-[#2D6A4F] font-semibold hover:underline">
                  Read the full evidence guide →
                </Link>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {supplements.map((supp) => (
                <div
                  key={supp.id}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col ${
                    supp.featured ? "border-[#C9A84C]/40" : "border-gray-100"
                  }`}
                >
                  {supp.featured && (
                    <div className="bg-[#C9A84C] text-[#1B2A4A] text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      Best Seller
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1B2A4A] to-[#2D6A4F] rounded-lg flex items-center justify-center mb-3">
                      <Pill size={22} className="text-[#C9A84C]" />
                    </div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {supp.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif font-bold text-[#1B2A4A] text-base mb-0.5">{supp.name}</h3>
                    <p className="text-[#2D6A4F] text-xs font-medium mb-2">{supp.subtitle}</p>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{supp.description}</p>
                    <p className="text-gray-400 text-xs mb-3">{supp.servings}</p>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs font-semibold mb-4 ${gradeColors[supp.evidenceGrade]}`}>
                      <span>Grade {supp.evidenceGrade}</span>
                      <span className="font-normal opacity-70">·</span>
                      <span className="font-normal text-xs">{supp.evidenceText.split(":")[1].trim()}</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-serif text-2xl font-bold text-[#1B2A4A]">{supp.price}</span>
                      <button className="px-4 py-2 bg-[#2D6A4F] text-white text-sm font-semibold rounded-md hover:bg-[#1B2A4A] transition-colors">
                        Add to Cart
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Payments via Stripe — coming soon</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-sm text-amber-800">
            <strong>Supplement Disclaimer:</strong> Dietary supplements are not medicines and are not intended to diagnose, treat, cure, or prevent any disease. Evidence grades reflect published research quality. Individual results vary. Consult a qualified healthcare provider before starting any new supplement, particularly if you are pregnant, nursing, have a medical condition, or take prescription medications.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
