import Link from "next/link";
import Image from "next/image";
import { getProducts, getCategories } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { AnimatedSection } from "@/components/AnimatedSection";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-surface-dim/80 border-b border-outline-variant/20">
        <div className="flex items-center justify-between px-5 h-16 max-w-lg mx-auto">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high active:scale-95 transition-all duration-200">
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
          <h1 className="text-xl tracking-[0.3em] text-primary font-semibold">MARIA`S</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high active:scale-95 transition-all duration-200 relative">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary-container text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </header>

      <main className="pt-16 pb-24 px-5 max-w-lg mx-auto">
        <AnimatedSection className="relative py-12" delay={0}>
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 via-transparent to-tertiary-container/10" />
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 space-y-4">
            <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-primary font-medium px-4 py-1.5 rounded-full bg-primary-container/20">
              Spring Summer 2026
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-on-background leading-[1.1] tracking-tight">
              The Ethereal{" "}
              <span className="italic font-normal text-primary">Collection</span>
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Curated pieces that blend timeless luxury with a modern, airy feminine silhouette.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex gap-3 overflow-x-auto pb-6 -mx-5 px-5 scrollbar-hide">
            <Link
              href="/catalogo"
              className="flex-shrink-0 px-6 py-2.5 rounded-full bg-primary-container text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-container/80 active:scale-95 transition-all duration-200 shadow-lg shadow-primary-container/30"
            >
              All Pieces
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo?category=${cat.slug}`}
                className="flex-shrink-0 px-6 py-2.5 rounded-full bg-surface-container text-on-surface text-xs font-medium uppercase tracking-wider hover:bg-surface-container-high transition-all duration-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-on-background">Featured</h3>
            <span className="h-px flex-1 mx-4 bg-gradient-to-r from-outline-variant to-transparent" />
          </div>
        </AnimatedSection>

        <AnimatedSection className="grid grid-cols-2 gap-4" delay={300}>
          {products.length === 0 ? (
            <div className="col-span-2 py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-outline">favorite</span>
              </div>
              <p className="text-on-surface-variant text-sm">No featured products yet</p>
              <Link
                href="/catalogo"
                className="inline-block mt-3 text-primary text-sm font-medium underline underline-offset-4"
              >
                Browse all products
              </Link>
            </div>
          ) : (
            products.map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 2} />
            ))
          )}
        </AnimatedSection>

        <AnimatedSection delay={400} className="mt-12">
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-outline-variant to-transparent" />
            <Link
              href="/catalogo"
              className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-200">
                arrow_forward
              </span>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500} className="mt-4">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-primary to-tertiary" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iNSIvPjxjaXJjbGUgY3g9IjU1IiBjeT0iNSIgcj0iNSIvPjxjaXJjbGUgY3g9IjU1IiBjeT0iNTUiIHI9IjUiLz48Y2lyY2xlIGN4PSIxNSIgY3k9IjE1IiByPSI1Ii8+PGNpcmNsZSBjeD0iMzUiIGN5PSIzNSIgcj0iNSIvPjxjaXJjbGUgY3g9IjU1IiBjeT0iMzUiIHI9IjUiLz48Y2lyY2xlIGN4PSIxNSIgY3k9IjU1IiByPSI1Ii8+PGNpcmNsZSBjeD0iMzUiIGN5PSIxNSIgcj0iNSIvPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4yIj48Y2lyY2xlIGN4PSIzNSIgY3k9IjM1IiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative px-6 py-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Follow Our Journey</h3>
              <p className="text-white/80 text-sm mb-4">Curated looks, behind the scenes & more</p>
              <a
                href="https://instagram.com/mariasclothing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium hover:bg-white/30 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @mariasclothing
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600} className="mt-12">
          <div className="text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-outline">Made with</p>
            <div className="flex items-center justify-center gap-1 text-outline">
              <span className="material-symbols-outlined text-sm text-primary">favorite</span>
              <span className="text-[10px] uppercase tracking-wider">in Miami</span>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
