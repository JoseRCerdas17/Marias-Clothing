'use client';

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = "object-cover" }: ProductImageProps) {
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
    <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} loading="lazy" onError={() => setHasError(true)} />
  );
}
