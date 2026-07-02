import { ProductCardSkeleton } from "@/components/ProductCard";

export default function Loading() {
  return (
    <div className="pt-20 pb-24 px-5 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-on-surface mb-6">All Pieces</h2>
      <div className="flex gap-2 overflow-x-auto pb-6">
        <div className="h-8 w-16 bg-surface-container-high rounded-full animate-pulse" />
        <div className="h-8 w-20 bg-surface-container-high rounded-full animate-pulse" />
        <div className="h-8 w-24 bg-surface-container-high rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
