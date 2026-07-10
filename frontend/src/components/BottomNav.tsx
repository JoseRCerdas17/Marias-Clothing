'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
      </svg>
    )
  },
  {
    href: "/products",
    label: "Shop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
    )
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-50
        md:hidden
        glass border-t border-white/10
        transition-transform duration-300 ease-out
        ${isVisible ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex flex-col items-center justify-center
              min-w-[64px] min-h-[56px]
              px-3 py-2
              rounded-xl
              transition-all duration-200
              active:scale-95
              ${isActive(item.href)
                ? "text-gold-accent bg-gold-accent/10"
                : "text-iron-gray hover:text-bone-white"
              }
            `}
          >
            <div className="mb-1">
              {item.icon}
            </div>
            <span
              className="text-[10px] font-medium tracking-wide"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
