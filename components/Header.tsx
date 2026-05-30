"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Microscope } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#1B2A4A] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center shrink-0">
              <Microscope size={16} className="text-[#1B2A4A]" />
            </div>
            <div className="leading-tight">
              <span className="font-serif text-base font-bold tracking-wide">FNSM</span>
              <span className="text-[#C9A84C] font-serif text-base font-bold tracking-wide"> Research</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Shop", href: "/shop" },
              { label: "Tools", href: "/tools" },
              { label: "Newsletter", href: "/newsletter" },
              { label: "About", href: "/about" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-[#C9A84C] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="ml-2 px-4 py-2 bg-[#C9A84C] text-[#1B2A4A] text-sm font-semibold rounded-md hover:bg-[#D4B96B] transition-colors"
            >
              Subscribe Free
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-1">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Shop", href: "/shop" },
              { label: "Tools", href: "/tools" },
              { label: "Newsletter", href: "/newsletter" },
              { label: "About", href: "/about" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-1.5 text-sm text-white/80 hover:text-[#C9A84C] transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="block mt-2 px-4 py-2 bg-[#C9A84C] text-[#1B2A4A] text-sm font-semibold rounded-md text-center"
              onClick={() => setOpen(false)}
            >
              Subscribe Free
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
