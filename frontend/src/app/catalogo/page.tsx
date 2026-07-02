"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getProducts, getCategories, Product, Category } from "@/lib/api";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Header } from "@/components/Header";

function CatalogoContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("category") || null
  );

  useEffect(() => {
    Promise.all([getCategories()])
      .then(([cats]) => setCategories(cats))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(activeCategory ? { category: activeCategory } : {})
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <>
      <h2 className="text-2xl font-bold text-on-surface mb-6">All Pieces</h2>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="grid grid-cols-2 gap-3">
        {loading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : products.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-on-surface-variant">
            <p>No products found.</p>
          </div>
        ) : (
          products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              style={{ animationDelay: `${idx * 0.05}s` }}
            />
          ))
        )}
      </div>
    </>
  );
}

function CatalogoLoading() {
  return (
    <div className="grid grid-cols-2 gap-3">
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
      <Header title="CATALOGO" showBack showCart />

      <main className="pt-20 pb-24 px-5 max-w-lg mx-auto">
        <Suspense fallback={<CatalogoLoading />}>
          <CatalogoContent />
        </Suspense>
      </main>
    </div>
  );
}
