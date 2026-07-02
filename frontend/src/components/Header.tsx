"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
}

export function Header({ title, showBack = false, showCart = true }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface-dim/80 border-b border-outline-variant/20">
      <div className="flex items-center justify-between px-5 h-16 max-w-lg mx-auto">
        {showBack ? (
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
        ) : (
          <div className="w-10" />
        )}

        <h1 className="text-lg tracking-[0.2em] text-primary font-semibold truncate max-w-[180px]">
          {title}
        </h1>

        {showCart ? (
          <Link
            href="/cart"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high active:scale-95 transition-all duration-200 relative"
          >
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary-container text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </Link>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </header>
  );
}
