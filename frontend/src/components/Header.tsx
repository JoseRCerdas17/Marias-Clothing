'use client';

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navGroups = [
  {
    label: "Shop",
    links: [
      { name: "All Products", href: "/products" },
    ],
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/majoaccountt?igsh=MWp0YXJ3Mzlvbmp6bg==";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        } ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className={`transition-all duration-500 ${scrolled ? 'glass' : ''}`}>
          <nav className="flex items-center justify-between px-4 md:px-6 max-w-[1400px] mx-auto">
            <Link
              href="/"
              className="text-[28px] md:text-[32px] font-light tracking-[-0.02em] text-white hover:text-gold-accent transition-colors duration-300"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              M
            </Link>

            <div className="hidden md:flex items-center gap-[40px]">
              {navGroups.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col items-center gap-[4px] px-[20px]"
                >
                  <span
                    className="text-[11px] text-iron-gray tracking-[0.15em] uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                  >
                    {group.label}
                  </span>
                  <div className="flex gap-[24px]">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-[14px] tracking-[-0.30px] transition-all duration-300 link-underline ${
                          pathname === link.href ? "text-gold-accent" : "text-bone-white hover:text-gold-accent"
                        }`}
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full glass hover:glass-light transition-all duration-300 active:scale-95"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <button
                className="md:hidden w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full glass hover:glass-light transition-all duration-300 active:scale-95"
                aria-label="Menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-white"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-lg"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-carbon-canvas transform transition-transform duration-500 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span
                className="text-[24px] text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Menu
              </span>
              <button
                className="w-11 h-11 rounded-full glass flex items-center justify-center active:scale-95 transition-transform"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
              {navGroups.map((group) => (
                <div key={group.label} className="mb-8">
                  <p
                    className="px-6 mb-4 text-[11px] text-iron-gray tracking-[0.2em] uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center px-6 py-4 text-[16px] transition-colors duration-300 active:bg-white/5 ${
                          pathname === link.href ? "text-gold-accent" : "text-bone-white"
                        }`}
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/10">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-full glass text-bone-white text-[14px] active:scale-[0.98] transition-transform"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                </svg>
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
