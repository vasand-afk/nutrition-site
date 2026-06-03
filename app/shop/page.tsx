import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Download, Star, ShieldCheck, Pill, Package, ArrowRight, FlaskConical } from "lucide-react";

const books = [
  {
    id: 1,
    title: "The Microbiome Blueprint",
    subtitle: "A Clinical Guide to Nutrition for IBS, IBD & SIBO",
    description:
      "200+ pages covering the science of gut microbiome modulation through diet. Includes evidence-graded dietary protocols for IBS, IBD, SIBO, and general gut optimisation — with a full guide to the three-phase FODMAP protocol and how to personalise it.",
    price: "$29",
    pages: "214 pages",
    format: "PDF + ePub",
    tags: ["Microbiome", "Gut Health", "IBS / IBD"],
    rating: 4.9,
    reviews: 142,
    featured: true,
  },
  {
    id: 2,
    title: "Protein Paradox",
    subtitle: "More Is Not Always Good",
    description:
      "Explores the history of protein, individual protein requirements depending on your goals, and how to fix protein overload. Evidence-based guidance for optimal protein intake at every life stage — including the gut health implications of high-protein diets.",
    price: "$18.99",
    pages: "160 pages",
    format: "eBook + Soft Cover",
    tags: ["Protein", "Nutrition", "Gut Health"],
    rating: 4.8,
    reviews: 24,
    featured: false,
  },
  {
    id: 3,
    title: "Eat for Your Gut",
    subtitle: "Evidence-Based Nutrition Strategies for a Healthier Microbiome",
    description:
      "A comprehensive look at nutrition for gut health — from fibre diversity and fermented foods to anti-inflammatory eating and time-restricted feeding. Includes 30+ practical meal strategies backed by microbiome research.",
    price: "$24",
    pages: "168 pages",
    format: "PDF + ePub",
    tags: ["Microbiome Diet", "Nutrition", "Gut Health"],
    rating: 4.8,
    reviews: 87,
    featured: false,
  },
];

const supplements = [
  {
    id: "probiotics",
    name: "Multi-Strain Probiotic (50 Billion CFU)",
    subtitle: "Clinically dosed — IBS and post-antibiotic use",
    description:
      "10 well-researched strains including Lactobacillus rhamnosus GG, L. acidophilus, and Bifidobacterium longum. Delayed-release capsule delivers live organisms past stomach acid. Evidence-supported for IBS symptom reduction and antibiotic-associated diarrhoea.",
    price: "$38",
    servings: "60 capsules · 60 day supply",
    evidenceGrade: "A",
    evidenceText: "Grade A: Multiple RCTs for IBS and AAD (Lactobacillus rhamnosus GG)",
    tags: ["IBS", "Gut Flora", "Post-Antibiotic"],
    featured: true,
  },
  {
    id: "psyllium",
    name: "Psyllium Husk (Organic)",
    subtitle: "Soluble fibre for bowel regularity and microbiome diversity",
    description:
      "Pure organic psyllium husk powder — the most studied dietary fibre supplement. Increases stool bulk, slows transit in IBS-D, and acts as a prebiotic for Bifidobacterium. The ACG guidelines recommend it as first-line fibre therapy for IBS.",
    price: "$22",
    servings: "300g powder · 60 day supply",
    evidenceGrade: "A",
    evidenceText: "Grade A: ACG-endorsed first-line therapy; multiple IBS RCTs",
    tags: ["IBS", "Fibre", "Prebiotic"],
    featured: false,
  },
  {
    id: "omega3",
    name: "Ultra-Pure Omega-3 (EPA + DHA)",
    subtitle: "Anti-inflammatory — relevant for IBD and gut barrier",
    description:
      "Third-party tested fish oil, 1g EPA + 0.5g DHA in re-esterified triglyceride form. Omega-3 reduces intestinal inflammation and supports gut barrier integrity — particularly relevant in IBD. Raises omega-3 index above 8% in most patients within 3 months.",
    price: "$35",
    servings: "90 capsules · 90 day supply",
    evidenceGrade: "A",
    evidenceText: "Grade A: Strong RCT evidence (REDUCE-IT; IBD anti-inflammatory data)",
    tags: ["IBD", "Anti-inflammatory", "Gut Barrier"],
    featured: false,
  },
  {
    id: "sacboulardii",
    name: "Saccharomyces boulardii",
    subtitle: "Probiotic yeast — IBS, antibiotic protection, traveller's diarrhoea",
    description:
      "250mg per capsule of S. boulardii CNCM I-745 — the most studied probiotic yeast. Survives antibiotics (it is a yeast, not a bacterium). Evidence for prevention of antibiotic-associated diarrhoea, IBS-D, and Clostridioides difficile recurrence.",
    price: "$28",
    servings: "60 capsules · 30 day supply",
    evidenceGrade: "A",
    evidenceText: "Grade A: Multiple RCTs for AAD and C. diff prevention",
    tags: ["IBS-D", "Antibiotic", "Gut Protection"],
    featured: true,
  },
  {
    id: "magnesium",
    name: "Magnesium Glycinate",
    subtitle: "Constipation relief and gut motility support",
    description:
      "200mg elemental magnesium as glycinate. Magnesium draws water into the colon and supports smooth muscle function — useful for IBS-C and chronic constipation. The glycinate form is the best-tolerated and least likely to cause osmotic diarrhoea at standard doses.",
    price: "$28",
    servings: "120 capsules · 60 day supply",
    evidenceGrade: "B",
    evidenceText: "Grade B: RCTs for constipation; widely used in GI practice",
    tags: ["IBS-C", "Constipation", "Gut Motility"],
    featured: false,
  },
  {
    id: "vitd",
    name: "Vitamin D3 5000 IU + K2 MK-7",
    subtitle: "Critical deficiency in IBD — immune and mucosal support",
    description:
      "5000 IU D3 + 100mcg K2 MK-7. Vitamin D deficiency affects >50% of IBD patients and correlates with disease activity. Supplementation supports mucosal healing and immune regulation. K2 ensures calcium goes to bone, not soft tissue.",
    price: "$22",
    servings: "120 softgels · 120 day supply",
    evidenceGrade: "B",
    evidenceText: "Grade B: IBD deficiency data + VITAL trial + mucosal healing evidence",
    tags: ["IBD", "Immune", "Mucosal Healing"],
    featured: false,
  },
  {
    id: "digestiveenzyme",
    name: "Full-Spectrum Digestive Enzyme Blend",
    subtitle: "Lipase, amylase, protease + lactase — broad digestive support",
    description:
      "Broad-spectrum blend including lipase, amylase, protease, cellulase, and lactase. Supports digestion of fat, carbohydrates, protein, fibre, and lactose. Useful in IBS, post-cholecystectomy, exocrine pancreatic insufficiency, and SIBO recovery.",
    price: "$32",
    servings: "90 capsules · 30–90 day supply",
    evidenceGrade: "B",
    evidenceText: "Grade B: RCT evidence for specific enzyme deficiencies; clinical use in IBS/EPI",
    tags: ["IBS", "Digestion", "SIBO Recovery"],
    featured: false,
  },
  {
    id: "butyrate",
    name: "Sodium Butyrate (Tributyrin)",
    subtitle: "Postbiotic — colonocyte fuel and gut barrier repair",
    description:
      "500mg tributyrin per capsule (the most bioavailable butyrate form). Butyrate is the primary energy source for colonocytes and a key regulator of gut barrier integrity, inflammation, and microbiome composition. Produced naturally from fibre fermentation — this supplement bridges the gap when fibre intake is low.",
    price: "$42",
    servings: "60 capsules · 30–60 day supply",
    evidenceGrade: "C",
    evidenceText: "Grade C: Promising RCT data for IBD and gut permeability; emerging postbiotic",
    tags: ["IBD", "Gut Barrier", "Postbiotic"],
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
              Evidence-based gut health resources — books grounded in microbiome science and
              supplements backed by human clinical data. No filler, no marketing spin.
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
            <Link href="/tools/fodmap-guide" className="ml-auto text-xs text-[#2D6A4F] hover:underline hidden sm:flex items-center gap-1">
              Free FODMAP tool <ArrowRight size={11} />
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
                <h2 className="font-serif text-3xl font-bold text-[#1B2A4A]">Gut Health Supplements</h2>
                <p className="text-gray-500 text-sm">Only Grade A, B, or C evidence · Third-party tested · No proprietary blends</p>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 mb-8 flex items-start gap-3 shadow-sm">
              <FlaskConical size={16} className="text-[#2D6A4F] mt-0.5 shrink-0" />
              <p className="text-sm text-gray-600">
                Every supplement we stock has an evidence grade (A–C) based on human trial data specific to GI health.
                We do not stock supplements graded D (no meaningful human evidence) or with only
                non-GI health claims.
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
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1B2A4A] to-[#2D6A4F] rounded-lg flex items-center justify-center mb-3">
                      <Pill size={22} className="text-[#C9A84C]" />
                    </div>
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
            <strong>Supplement Disclaimer:</strong> Dietary supplements are not medicines and are not intended to diagnose, treat, cure, or prevent any disease. Evidence grades reflect published research quality. Individual results vary. Consult your gastroenterologist or dietitian before starting any new supplement, particularly if you have an active GI condition or take prescription medications.
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
