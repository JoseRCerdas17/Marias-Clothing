'use client';

import { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/api";
import { formatPrice } from "@/lib/format";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" />

      <div
        className="relative bg-carbon-canvas w-full md:max-w-[900px] md:max-h-[90vh] md:rounded-[24px] overflow-hidden animate-slide-up rounded-t-3xl md:rounded-b-3xl max-h-[85vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
      >
        <style jsx>{`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
            }
            to {
              transform: translateY(0);
            }
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full glass flex items-center justify-center hover:glass-light transition-all duration-300 active:scale-95"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[400px] bg-white/5">
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover md:rounded-tl-[24px] md:rounded-bl-[24px]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-iron-gray">
                No image
              </div>
            )}
          </div>

          <div className="p-6 md:p-10 flex flex-col">
            {product.category_name && (
              <p
                className="text-[12px] md:text-[13px] tracking-[0.15em] uppercase text-gold-accent mb-2 md:mb-3"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {product.category_name}
              </p>
            )}

            <h2
              className="text-[26px] md:text-[32px] lg:text-[36px] tracking-[-0.02em] text-white mb-3 md:mb-4"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              {product.name}
            </h2>

            <p
              className="text-[20px] md:text-[24px] tracking-[-0.30px] text-gold-accent mb-4 md:mb-6"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600 }}
            >
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p
                className="text-[14px] md:text-[15px] leading-relaxed text-iron-gray mb-4 md:mb-6"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                {product.description}
              </p>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4 md:mb-6">
                <p
                  className="text-[12px] md:text-[13px] tracking-[0.1em] uppercase text-bone-white mb-3"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className="min-w-[44px] min-h-[44px] px-4 py-2 rounded-full border border-white/20 text-[13px] text-bone-white hover:border-gold-accent hover:text-gold-accent transition-colors duration-300 active:scale-95"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-4 flex flex-col gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="w-full py-4 rounded-full bg-white text-black text-center text-[14px] md:text-[15px] tracking-[-0.30px] hover:bg-gold-accent hover:text-white transition-all duration-300 active:scale-[0.98]"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              >
                View Full Details
              </Link>
              <button
                className="w-full py-4 rounded-full border border-white/20 text-bone-white text-[14px] md:text-[15px] tracking-[-0.30px] hover:border-gold-accent hover:text-gold-accent transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
