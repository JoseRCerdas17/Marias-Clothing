"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/api";
import { Header } from "@/components/Header";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const whatsappMessage = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} ($${product.price.toFixed(2)}). Is it available?`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title={product.name} />

      <main className="pt-16 pb-28">
        <div className="space-y-4">
          <div
            ref={imageRef}
            className="relative aspect-[3/4] overflow-hidden cursor-zoom-in bg-surface-container"
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            style={{
              backgroundColor: "#2c2040",
            }}
          >
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300"
                style={
                  isZoomed
                    ? {
                        transform: "scale(2)",
                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                      }
                    : undefined
                }
                sizes="100vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-outline">image</span>
              </div>
            )}

            {isZoomed && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="text-white/80 text-xs uppercase tracking-wider backdrop-blur-md px-3 py-1.5 rounded-full">
                  Tap to zoom out
                </span>
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md bg-surface-container-lowest/80 flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-xl">
                {isZoomed ? "zoom_out" : "zoom_in"}
              </span>
            </button>
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 px-5 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-16 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                    selectedImage === idx
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-95"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 py-6 space-y-6">
          <div className="space-y-2">
            {product.category_name && (
              <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-primary font-medium">
                {product.category_name}
              </span>
            )}
            <h1 className="text-2xl font-bold text-on-background">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          </div>

          {product.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-on-background uppercase tracking-wider">
                Description
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-on-background uppercase tracking-wider">
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="min-w-[48px] px-4 py-2.5 rounded-xl bg-surface-container text-on-surface text-sm font-medium hover:bg-surface-container-high active:scale-95 transition-all duration-200 border border-transparent hover:border-primary/30"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-on-background uppercase tracking-wider">
                Colors
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant text-sm"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <a
              href={`https://wa.me/1234567890?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-primary-container text-white font-semibold active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary-container/30 hover:bg-primary-container/90"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Request via WhatsApp
            </a>

            <button className="w-full py-4 rounded-2xl border border-primary/30 text-primary font-semibold hover:bg-primary/5 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">favorite</span>
              Add to Favorites
            </button>
          </div>

          <div className="pt-6 border-t border-outline-variant/20">
            <div className="flex items-center gap-3 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              <span>Free shipping on orders over $200</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-2">
              <span className="material-symbols-outlined text-primary">autorenew</span>
              <span>Easy returns within 14 days</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
