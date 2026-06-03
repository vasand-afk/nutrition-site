import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calculator, Salad, ClipboardList, ArrowRight, Activity, FlaskConical } from "lucide-react";

const tools = [
  {
    icon: <Calculator size={28} className="text-[#C9A84C]" />,
    title: "Calorie & Macro Calculator",
    description:
      "Calculate your personalised daily calorie needs and macronutrient targets based on age, weight, height, activity level, and health goal.",
    href: "/tools/calorie-calculator",
    status: "Live",
    color: "from-[#1B2A4A] to-[#2D3B5E]",
  },
  {
    icon: <Activity size={28} className="text-[#C9A84C]" />,
    title: "Gut Health Food Tracker",
    description:
      "Log your meals and get AI-powered gut health analysis — fiber, FODMAP flags, microbiome impact scores, and personalised clinical insights powered by Claude AI.",
    href: "/tools/gut-tracker",
    status: "Live",
    color: "from-[#1E4A36] to-[#2D6A4F]",
  },
  {
    icon: <FlaskConical size={28} className="text-[#C9A84C]" />,
    title: "FODMAP Protocol Companion",
    description:
      "Navigate the three-phase FODMAP protocol, track your reintroduction results, get a personalised trigger profile, and log your GI lab markers — calprotectin, SIBO breath test, microbiome and more.",
    href: "/tools/fodmap-guide",
    status: "Live",
    color: "from-[#3D2A6A] to-[#2A1B4A]",
  },
  {
    icon: <Salad size={28} className="text-[#C9A84C]" />,
    title: "Fibre Intake Tracker",
    description:
      "Estimate your daily fibre intake and see how it compares to clinical targets for IBS, microbiome health, and general gut function.",
    href: "/tools/fibre-tracker",
    status: "Coming soon",
    color: "from-[#2D6A4F] to-[#1E4A36]",
  },
  {
    icon: <ClipboardList size={28} className="text-[#C9A84C]" />,
    title: "Gut Health Quiz",
    description:
      "Answer 12 questions about your symptoms and diet to get a personalised gut health snapshot with evidence-based improvement suggestions.",
    href: "/tools/gut-quiz",
    status: "Coming soon",
    color: "from-[#3D2A6A] to-[#2A1B4A]",
  },
];

export default function ToolsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[#1B2A4A] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-2">Interactive Tools</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Personalised Nutrition,<br />Grounded in Evidence
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Free tools built on clinical guidelines — no account required, no data stored.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid md:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className={`bg-gradient-to-br ${tool.color} p-8 flex items-start`}>
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    {tool.icon}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                        tool.status === "Live"
                          ? "bg-[#2D6A4F]/10 text-[#2D6A4F]"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#1B2A4A] mb-2">{tool.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{tool.description}</p>
                  {tool.status === "Live" ? (
                    <Link
                      href={tool.href}
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2A4A] text-white font-semibold rounded-md hover:bg-[#2D6A4F] transition-colors text-sm"
                    >
                      Launch Tool <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link
                      href="/newsletter"
                      className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAFAF7] border border-gray-200 text-gray-500 font-semibold rounded-md hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors text-sm"
                    >
                      Notify me when live
                    </Link>
                  )}
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
