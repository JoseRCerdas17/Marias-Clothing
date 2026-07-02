"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Shop",
    icon: "storefront",
  },
  {
    href: "/catalogo",
    label: "Catalog",
    icon: "grid_view",
  },
  {
    href: "/contacto",
    label: "Contact",
    icon: "mode_comment",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-inset-bottom">
      <div className="mx-5 mb-2 rounded-2xl backdrop-blur-xl bg-surface-container-lowest/95 shadow-[0_-8px_30px_rgba(0,0,0,0.3)] border border-outline-variant/10">
        <div className="flex items-center justify-around px-2 py-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-outline hover:text-on-surface-variant"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-xl" />
                )}
                <span
                  className="relative material-symbols-outlined text-[22px] transition-all duration-300"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 300",
                  }}
                >
                  {item.icon}
                </span>
                <span
                  className={`relative text-[9px] uppercase tracking-wider transition-all duration-300 ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
