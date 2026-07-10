import { HeroSkeleton, ProductGridSkeleton, CategoryCardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="bg-carbon-canvas min-h-screen">
      <HeroSkeleton />

      <section className="bg-carbon-canvas py-[100px] px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-[80px]">
            <div className="h-[21px] w-[200px] mx-auto bg-ash-veil/20 rounded animate-pulse mb-[12px]" />
            <div className="h-[53px] w-[300px] mx-auto bg-white/20 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[20px]">
            {Array.from({ length: 4 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ash-veil py-[100px] px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-[80px]">
            <div className="h-[21px] w-[200px] mx-auto bg-iron-gray/30 rounded animate-pulse mb-[12px]" />
            <div className="h-[53px] w-[300px] mx-auto bg-black/10 rounded animate-pulse" />
          </div>

          <ProductGridSkeleton count={4} light />
        </div>
      </section>
    </main>
  );
}
