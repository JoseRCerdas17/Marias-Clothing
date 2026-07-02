import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-primary-container/20 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-primary">search</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-on-surface mb-2">Page not found</h2>
          <p className="text-on-surface-variant text-sm max-w-[280px] mx-auto">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-primary-container text-white rounded-full font-semibold active:scale-95 transition-transform"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
