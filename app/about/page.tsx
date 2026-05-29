import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FlaskConical, BookOpen, Users, Globe, Mail, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: <FlaskConical size={20} className="text-[#C9A84C]" />,
    title: "Research First",
    desc: "Every article cites peer-reviewed sources. We grade evidence by study quality — RCTs rank higher than observational studies.",
  },
  {
    icon: <Users size={20} className="text-[#C9A84C]" />,
    title: "Patient-Centred",
    desc: "Written for people navigating real conditions — not athletes or general wellness seekers. We speak to patients, carers, and clinicians.",
  },
  {
    icon: <Globe size={20} className="text-[#C9A84C]" />,
    title: "No Conflicts of Interest",
    desc: "FNSM Research does not accept sponsored content, affiliate supplement links, or industry funding. Our only revenue is books and newsletter subscriptions.",
  },
  {
    icon: <BookOpen size={20} className="text-[#C9A84C]" />,
    title: "Clinical Accuracy",
    desc: "Content is reviewed against current NICE, ACG, and BSG clinical guidelines. We update articles when the evidence changes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="max-w-3xl">
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-3">About FNSM Research</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6">
                The Bridge Between the Lab<br />and the Dinner Table.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                FNSM Research exists because the gap between cutting-edge microbiome science and
                practical nutrition advice for patients is too wide. We translate complex research
                into clear, actionable guidance — always with citations, always without agenda.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#1B2A4A] mb-5">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Millions of people with IBS, IBD, SIBO, and other GI conditions are navigating a
                landscape of contradictory advice — wellness influencers promoting elimination
                diets, supplement companies overstating probiotic benefits, and academic papers
                locked behind paywalls.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                FNSM Research was founded to provide a trusted alternative: a resource that holds
                itself to the same standards as a peer-reviewed journal, while remaining readable
                by patients and their families.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We cover the intersection of food, the gut microbiome, GI disease management,
                and healthy ageing — the four pillars of what we call
                <strong className="text-[#1B2A4A]"> Functional Nutritional Science of the Microbiome (FNSM)</strong>.
              </p>
            </div>

            <div className="space-y-4">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-4 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#1B2A4A] flex items-center justify-center shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1B2A4A] mb-1">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What FNSM stands for */}
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="text-5xl font-serif font-bold text-[#C9A84C] leading-none tracking-tight shrink-0">
                F<br />N<br />S<br />M
              </div>
              <div className="space-y-3 text-white/80">
                <p><strong className="text-[#C9A84C]">F</strong>unctional — focused on how nutrition actually affects bodily systems</p>
                <p><strong className="text-[#C9A84C]">N</strong>utritional — evidence-based dietary science, not supplements or fads</p>
                <p><strong className="text-[#C9A84C]">S</strong>cience — peer-reviewed, cited, and clinically grounded</p>
                <p><strong className="text-[#C9A84C]">M</strong>icrobiome — the gut microbiome as the central lens for GI health and longevity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="bg-[#FAFAF7] border border-gray-200 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1B2A4A] mb-2">Get in Touch</h2>
              <p className="text-gray-500 max-w-md">
                Questions about content, collaboration, or media enquiries? We'd love to hear from you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:hello@fnsmresearch.org"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2A4A] text-white font-semibold rounded-md hover:bg-[#2D6A4F] transition-colors text-sm"
              >
                <Mail size={16} /> Email Us
              </a>
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1B2A4A] text-[#1B2A4A] font-semibold rounded-md hover:bg-[#1B2A4A] hover:text-white transition-colors text-sm"
              >
                Subscribe to Newsletter <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
