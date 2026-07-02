"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, getCategories, Product, Category } from "@/lib/api";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { AnimatedSection } from "@/components/AnimatedSection";

function CatalogoContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc">("newest");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const [prods, cats] = await Promise.all([
        getProducts(activeCategory ? { category: activeCategory } : {}),
        getCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        <button
          onClick={() => setActiveCategory(null)}
          className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            activeCategory === null
              ? "bg-primary-container text-white shadow-lg shadow-primary-container/30"
              : "bg-surface-container text-on-surface hover:bg-surface-container-high"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
              activeCategory === cat.slug
                ? "bg-primary-container text-white shadow-lg shadow-primary-container/30"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-on-surface-variant">
          {loading ? "..." : `${sortedProducts.length} pieces`}
        </p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="text-xs text-on-surface-variant bg-transparent border-none outline-none cursor-pointer focus:ring-0"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {loading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : sortedProducts.length === 0 ? (
          <div className="col-span-2 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-outline">search</span>
            </div>
            <p className="text-on-surface-variant text-sm">No products found</p>
            <button
              onClick={() => setActiveCategory(null)}
              className="mt-3 text-primary text-sm font-medium underline underline-offset-4"
            >
              View all products
            </button>
          </div>
        ) : (
          sortedProducts.map((product, idx) => (
            <AnimatedSection key={product.id} delay={idx * 50}>
              <ProductCard product={product} />
            </AnimatedSection>
          ))
        )}
      </div>
    </>
  );
}

function CatalogoLoading() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}

export default function Catalogo() {
  return (
    <div className="min-h-screen bg-background">
      <Header title="CATALOGO" showBack />

      <main className="pt-20 pb-28 px-5 max-w-lg mx-auto">
        <AnimatedSection>
          <h2 className="text-xl font-bold text-on-background mb-4">All Pieces</h2>
        </AnimatedSection>

        <Suspense fallback={<CatalogoLoading />}>
          <CatalogoContent />
        </Suspense>
      </main>
    </div>
  );
}
