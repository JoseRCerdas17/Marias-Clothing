'use client';

import { useState } from "react";
import type { ReactNode } from "react";
import ProductImage from "@/components/ProductImage";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}

export default function ImageCarousel({ images, alt, className = "", imageClassName = "object-cover", children }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1));
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex === images.length - 1 ? 0 : currentIndex + 1));
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {activeImage ? (
        <ProductImage
          src={activeImage}
          alt={`${alt} - Image ${activeIndex + 1}`}
          className={imageClassName}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-iron-gray">
          No image
        </div>
      )}

      {children}

      {hasMultipleImages && (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-[24px] text-white backdrop-blur-sm transition-all duration-300 hover:bg-gold-accent active:scale-95"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-[24px] text-white backdrop-blur-sm transition-all duration-300 hover:bg-gold-accent active:scale-95"
            onClick={showNext}
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/55 px-3 py-2 backdrop-blur-sm">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-5 bg-gold-accent" : "w-2 bg-white/60"}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
