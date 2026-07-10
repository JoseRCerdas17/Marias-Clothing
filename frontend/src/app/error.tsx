'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-carbon-canvas min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-[500px]">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/20 to-transparent rounded-full blur-3xl opacity-30 mx-auto w-[200px] h-[200px]" />
          <span
            className="relative text-[120px] md:text-[180px] font-light text-white/10 leading-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            !
          </span>
        </div>

        <h1
          className="text-[32px] md:text-[42px] tracking-[-0.02em] text-white mb-4"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Something went wrong
        </h1>

        <p
          className="text-[15px] leading-relaxed text-iron-gray mb-8"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          We encountered an unexpected error. Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 rounded-full bg-white text-black text-[15px] tracking-[-0.30px] hover:bg-gold-accent hover:text-white transition-all duration-300"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-8 py-4 rounded-full border border-white/20 text-bone-white text-[15px] tracking-[-0.30px] hover:border-gold-accent hover:text-gold-accent transition-all duration-300 flex items-center justify-center gap-2"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-[11px] text-iron-gray/50">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
