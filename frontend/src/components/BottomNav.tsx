"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Shop",
    icon: "storefront",
    iconFilled: "storefront",
  },
  {
    href: "/catalogo",
    label: "Catalog",
    icon: "grid_view",
    iconFilled: "grid_view",
  },
  {
    href: "/contacto",
    label: "Contact",
    icon: "person",
    iconFilled: "person",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[-8px_0_30px_rgba(0,0,0,0.3)] h-20 px-4 pb-safe flex justify-around items-center rounded-t-xl">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all duration-300 ${
              isActive
                ? "text-primary font-bold"
                : "text-outline hover:text-primary active:scale-90"
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isActive ? item.iconFilled : item.icon}
            </span>
            <span className="text-[10px] uppercase tracking-wider mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
