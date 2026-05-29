import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, Download, Star, ShieldCheck } from "lucide-react";

const books = [
  {
    id: 1,
    title: "The Microbiome Blueprint",
    subtitle: "A Clinical Guide to Nutrition for IBS, IBD & SIBO",
    description:
      "200+ pages covering the science of gut microbiome modulation through diet. Includes evidence-graded protocols for IBS, IBD, SIBO, and general gut optimisation. Written for patients and clinicians.",
    price: "$29",
    pages: "214 pages",
    format: "PDF + ePub",
    tags: ["IBS", "IBD", "SIBO", "Microbiome"],
    rating: 4.9,
    reviews: 87,
    featured: true,
  },
  {
    id: 2,
    title: "Eat for Longevity",
    subtitle: "Evidence-Based Nutrition Strategies for a Longer, Healthier Life",
    description:
      "A comprehensive look at longevity nutrition — from calorie restriction and time-restricted eating to polyphenol-rich diets — with actionable meal strategies.",
    price: "$24",
    pages: "168 pages",
    format: "PDF + ePub",
    tags: ["Longevity", "Anti-Aging", "Nutrition Science"],
    rating: 4.8,
    reviews: 52,
    featured: false,
  },
  {
    id: 3,
    title: "The Low-FODMAP Kitchen",
    subtitle: "Science, Strategy & 60 Gut-Friendly Recipes",
    description:
      "Beyond just a recipe book — understand the science behind FODMAPs, navigate reintroduction, and build a sustainable low-FODMAP lifestyle.",
    price: "$19",
    pages: "132 pages",
    format: "PDF",
    tags: ["IBS", "Low-FODMAP", "Recipes"],
    rating: 4.7,
    reviews: 118,
    featured: false,
  },
];

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
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-2">Books & Resources</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Nutrition Guides Written by Researchers
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Instant digital downloads. Every claim referenced. No filler, no sales pitches for supplements.
            </p>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-[#2D6A4F]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-6">
            {[
              { icon: <Download size={14} />, text: "Instant download after purchase" },
              { icon: <ShieldCheck size={14} />, text: "Secure payment via Stripe" },
              { icon: <BookOpen size={14} />, text: "PDF & ePub formats included" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-white/80">
                <span className="text-[#C9A84C]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Books */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="space-y-8">
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
                    {/* Book cover placeholder */}
                    <div className="w-full md:w-36 h-48 md:h-48 bg-gradient-to-br from-[#1B2A4A] to-[#2D6A4F] rounded-lg flex items-center justify-center shrink-0">
                      <BookOpen size={36} className="text-[#C9A84C]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {book.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-semibold rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-1">{book.title}</h2>
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
                        <Link
                          href="/newsletter"
                          className="px-6 py-2.5 bg-[#1B2A4A] text-white font-semibold rounded-md hover:bg-[#2D6A4F] transition-colors text-sm"
                        >
                          Buy Now — Instant Download
                        </Link>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Stripe payments coming soon. Subscribe to be notified at launch.
                      </p>
                    </div>
                  </div>
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
