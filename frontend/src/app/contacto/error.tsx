"use client";

import { useEffect } from "react";

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-primary-container/20 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-primary">error</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-on-surface mb-2">Something went wrong</h2>
          <p className="text-on-surface-variant text-sm max-w-[280px] mx-auto">
            We couldn&apos;t load the contact page. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary-container text-white rounded-full font-semibold active:scale-95 transition-transform"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
