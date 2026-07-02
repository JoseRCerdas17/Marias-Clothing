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
    <header className="fixed top-0 w-full z-50 bg-surface-container-low/90 backdrop-blur-md shadow-sm flex justify-between items-center px-5 h-16">
      {showBack ? (
        <Link
          href="/"
          className="text-primary active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </Link>
      ) : (
        <div className="w-10" />
      )}

      <h1 className="text-xl tracking-widest text-primary font-bold truncate max-w-[200px]">
        {title}
      </h1>

      {showCart ? (
        <button className="active:scale-95 transition-transform text-primary relative">
          <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
          <span className="absolute -top-1 -right-1 bg-primary-container text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>
      ) : (
        <div className="w-10" />
      )}
    </header>
  );
}
