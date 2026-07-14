interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = "object-cover" }: ProductImageProps) {
  return (
    // Product images can be added from arbitrary admin URLs, so avoid Next/Image host allowlists here.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${className}`} loading="lazy" />
  );
}
