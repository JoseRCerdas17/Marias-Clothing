import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ featured: true }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full z-50 bg-surface-container-low/90 backdrop-blur-md shadow-sm flex justify-between items-center px-5 h-16">
        <button className="active:scale-95 transition-transform duration-200 text-primary hover:opacity-70">
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <h1 className="text-xl tracking-widest text-primary font-bold">ELARA</h1>
        <button className="active:scale-95 transition-transform duration-200 text-primary hover:opacity-70 relative">
          <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
          <span className="absolute -top-1 -right-1 bg-primary-container text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </button>
      </header>

      <main className="pt-20 pb-24 px-5 max-w-lg mx-auto">
        <section className="mb-10 fade-in">
          <div className="space-y-2">
            <span className="text-xs text-primary uppercase tracking-[0.2em]">Spring Summer 2024</span>
            <h2 className="text-4xl font-bold text-on-surface leading-tight">
              The Ethereal <br /><span className="text-2xl italic font-normal">Collection</span>
            </h2>
            <p className="text-on-surface-variant max-w-[80%]">
              Curated pieces that blend timeless luxury with a modern, airy feminine silhouette.
            </p>
          </div>
        </section>

        <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar -mx-5 px-5 fade-in">
          <Link
            href="/catalogo"
            className="bg-primary-container text-white text-sm px-6 py-2 rounded-full whitespace-nowrap active:scale-95 transition-all"
          >
            All Pieces
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogo?category=${cat.slug}`}
              className="bg-surface-container-high text-on-surface text-sm px-6 py-2 rounded-full whitespace-nowrap hover:bg-surface-container-highest transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.length === 0 ? (
            <div className="col-span-2 text-center py-10 text-on-surface-variant">
              <p>No featured products yet.</p>
              <Link href="/catalogo" className="text-primary underline mt-2 inline-block">
                Browse all products
              </Link>
            </div>
          ) : (
            products.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                style={{ animationDelay: `${idx * 0.1}s` }}
              />
            ))
          )}
        </div>

        <div className="mt-10 flex flex-col items-center space-y-4 fade-in">
          <div className="h-px w-20 bg-outline-variant" />
          <Link
            href="/catalogo"
            className="text-sm text-on-surface-variant hover:text-primary transition-colors tracking-widest uppercase"
          >
            Explore More
          </Link>
        </div>
      </main>
    </div>
  );
}
