"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} ($${product.price.toFixed(2)}). Is it available in my size?`
  );

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative aspect-[3/4] overflow-hidden rounded-2xl transition-all duration-500 ease-out"
        style={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(184, 16, 89, 0.25)"
            : "0 8px 30px rgba(0, 0, 0, 0.2)",
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        {product.images[0] && !imageError ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out"
            style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
            priority={priority}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-outline">favorite</span>
          </div>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />

        {product.is_featured && (
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300"
            style={{
              backgroundColor: "rgba(184, 16, 89, 0.9)",
              color: "white",
              transform: isHovered ? "translateY(0)" : "translateY(-10px)",
              opacity: isHovered ? 1 : 0.8,
            }}
          >
            New
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isFavorite
              ? "rgba(184, 16, 89, 0.9)"
              : "rgba(67, 53, 88, 0.8)",
            transform: isHovered ? "scale(1)" : "scale(0.8)",
            opacity: isHovered ? 1 : 0,
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span
            className="material-symbols-outlined text-lg transition-all duration-300"
            style={{
              fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0",
              color: isFavorite ? "white" : "#ffb1c3",
            }}
          >
            favorite
          </span>
        </button>

        <div
          className="absolute bottom-3 left-3 right-3 transition-all duration-300"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(20px)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, "_blank");
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl backdrop-blur-md text-white text-sm font-medium transition-colors"
            style={{
              backgroundColor: "rgba(184, 16, 89, 0.9)",
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Inquire
          </button>
        </div>
      </div>

      <div className="pt-3 px-1">
        <h3 className="text-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-primary mt-0.5">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col animate-pulse">
      <div className="aspect-[3/4] rounded-2xl bg-surface-container" />
      <div className="pt-3 space-y-2 px-1">
        <div className="h-4 bg-surface-container rounded w-3/4" />
        <div className="h-5 bg-surface-container rounded w-1/3" />
      </div>
    </div>
  );
}
