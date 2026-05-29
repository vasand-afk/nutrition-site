import Link from "next/link";
import { Microscope } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1B2A4A] text-white/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[#C9A84C] flex items-center justify-center">
                <Microscope size={14} className="text-[#1B2A4A]" />
              </div>
              <span className="font-serif text-white font-bold">FNSM Research</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Evidence-based nutrition science for microbiome optimization, GI disease management,
              and healthy longevity.
            </p>
            <p className="text-xs mt-4 text-white/40">
              © {new Date().getFullYear()} FNSMresearch.org. All rights reserved.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Books & Resources", href: "/shop" },
                { label: "Interactive Tools", href: "/tools" },
                { label: "Newsletter", href: "/newsletter" },
                { label: "About", href: "/about" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[#C9A84C] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Disclaimer</h3>
            <p className="text-xs leading-relaxed">
              Information on this site is for educational purposes only and does not constitute
              medical advice. Always consult a qualified healthcare provider for personalised
              dietary guidance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
