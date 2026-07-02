import { ProductCardSkeleton } from "@/components/ProductCard";

export default function Loading() {
  return (
    <div className="pt-20 pb-24 px-5 max-w-lg mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-6 bg-surface-container rounded w-1/4" />

        <div className="flex gap-3 overflow-hidden">
          <div className="h-8 w-16 bg-surface-container rounded-full" />
          <div className="h-8 w-20 bg-surface-container rounded-full" />
          <div className="h-8 w-24 bg-surface-container rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-4 bg-surface-container rounded w-16" />
          <div className="h-4 bg-surface-container rounded w-20" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </div>
  );
}
