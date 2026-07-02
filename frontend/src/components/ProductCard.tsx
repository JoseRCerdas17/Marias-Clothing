"use client";

import Link from "next/link";
import { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  style?: React.CSSProperties;
}

export function ProductCard({ product, style }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col space-y-3"
      style={style}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg bg-surface-container transition-transform duration-500 group-hover:scale-[1.02]">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-4xl">image</span>
          </div>
        )}
        {product.is_featured && (
          <span className="absolute top-3 left-3 bg-primary-container px-3 py-1 rounded-full text-[10px] text-white uppercase tracking-wider">
            New
          </span>
        )}
        <button
          className="absolute bottom-3 right-3 bg-surface-container-highest/90 backdrop-blur-md p-2 rounded-full shadow-sm text-primary active:scale-90 transition-all"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label="Add to favorites"
        >
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
      </div>
      <div className="px-1">
        <h3 className="text-sm text-on-surface truncate">{product.name}</h3>
        <p className="text-base font-semibold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 animate-pulse">
      <div className="aspect-[3/4] rounded-xl bg-surface-container" />
      <div className="space-y-2 px-1">
        <div className="h-4 bg-surface-container rounded w-3/4" />
        <div className="h-5 bg-surface-container rounded w-1/3" />
      </div>
    </div>
  );
}
