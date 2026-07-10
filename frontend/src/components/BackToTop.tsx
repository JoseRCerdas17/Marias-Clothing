'use client';

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsClicked(false), 500);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-24 right-4 md:bottom-8 z-50
        w-12 h-12 rounded-full
        glass flex items-center justify-center
        transition-all duration-300 ease-out
        hover:glass-light hover:-translate-y-1
        ${isClicked ? "scale-90" : "scale-100"}
        hidden md:flex
      `}
      aria-label="Back to top"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-bone-white"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
