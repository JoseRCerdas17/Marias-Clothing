import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-carbon-canvas min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-[500px]">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/20 to-transparent rounded-full blur-3xl opacity-30 mx-auto w-[200px] h-[200px]" />
          <span
            className="relative text-[120px] md:text-[180px] font-light text-white/10 leading-none"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            404
          </span>
        </div>

        <h1
          className="text-[32px] md:text-[42px] tracking-[-0.02em] text-white mb-4"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Page not found
        </h1>

        <p
          className="text-[15px] leading-relaxed text-iron-gray mb-8"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-4 rounded-full bg-white text-black text-[15px] tracking-[-0.30px] hover:bg-gold-accent hover:text-white transition-all duration-300"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
