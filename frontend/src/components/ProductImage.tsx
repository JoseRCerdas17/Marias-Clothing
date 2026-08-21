'use client';

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

function cloudinaryOptimizedUrl(src: string) {
  return src.includes("res.cloudinary.com/") && src.includes("/image/upload/")
    ? src.replace("/image/upload/", "/image/upload/f_auto,q_auto/")
    : src;
}

function ImageFile({ src, alt, className }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/5 px-4 text-center text-sm text-iron-gray">
        Imagen no disponible
      </div>
    );
  }

  return (
    // Product images can be added from arbitrary admin URLs, so avoid Next/Image host allowlists here.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={cloudinaryOptimizedUrl(src)} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} loading="lazy" onError={() => setHasError(true)} />
  );
}

export default function ProductImage({ src, alt, className = "object-cover" }: ProductImageProps) {
  // Remount when the carousel changes image so a prior failed image does not hide the next one.
  return <ImageFile key={src} src={src} alt={alt} className={className} />;
}
