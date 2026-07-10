function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-iron-gray/20 via-smoke/30 to-iron-gray/20 bg-[length:200%_100%] rounded-full ${className}`}
    />
  );
}

export function ProductCardSkeleton({ light = false }: { light?: boolean }) {
  const bgClass = light ? "bg-white/50" : "bg-ash-veil/10";
  const textClass = light ? "bg-iron-gray/20" : "bg-smoke/20";

  return (
    <div className={`rounded-[20px] p-[20px] glass ${light ? "glass-light" : ""}`}>
      <div className={`aspect-[3/4] ${bgClass} rounded-[14px] mb-[18px]`}>
        <Skeleton className="w-full h-full rounded-[14px]" />
      </div>
      <div className="space-y-[8px]">
        <Skeleton className={`h-[13px] w-[60%] ${textClass} rounded`} />
        <Skeleton className={`h-[16px] w-[80%] ${textClass} rounded`} />
        <Skeleton className={`h-[15px] w-[40%] ${textClass} rounded`} />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4, light = false }: { count?: number; light?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} light={light} />
      ))}
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="glass rounded-[20px] p-[32px] md:p-[40px] text-center">
      <Skeleton className="h-[22px] w-[70%] mx-auto bg-white/20 rounded mb-[12px]" />
      <Skeleton className="h-[15px] w-[50%] mx-auto bg-smoke/20 rounded" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="min-h-screen bg-carbon-canvas flex flex-col items-center justify-center pt-[100px] pb-[120px] px-6">
      <div className="relative w-full max-w-[800px] aspect-square flex items-center justify-center">
        <div className="relative w-[65%] h-[75%] animate-pulse">
          <div className="absolute inset-0 bg-ash-veil/10 rounded-full blur-3xl" />
          <Skeleton className="w-full h-full rounded-[20px] bg-white/10" />
        </div>
      </div>

      <div className="mt-[47px] text-center space-y-[12px]">
        <Skeleton className="h-[21px] w-[180px] mx-auto bg-ash-veil/20 rounded" />
        <Skeleton className="h-[72px] w-[320px] mx-auto bg-white/20 rounded" />
      </div>

      <Skeleton className="mt-[41px] h-[54px] w-[180px] bg-white/20 rounded-full" />
    </section>
  );
}
