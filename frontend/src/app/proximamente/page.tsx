import Header from "@/components/Header";
import ImageCarousel from "@/components/ImageCarousel";
import { getUpcomingProducts } from "@/lib/api";
import { formatArrivalMonth, formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-[80px] space-y-[12px] text-center">
      <p className="text-[21px] tracking-[-0.61px] text-ash-veil" style={{ fontWeight: 400, lineHeight: 1.15 }}>
        {label}
      </p>
      <h1 className="text-[53px] tracking-[-3.18px] text-white" style={{ fontWeight: 450, lineHeight: 0.8 }}>
        {title}
      </h1>
      <p className="mx-auto max-w-[520px] text-[15px] leading-relaxed tracking-[-0.30px] text-iron-gray">
        Nuevas piezas están por llegar. Guarda tus favoritas y vuelve pronto para verlas disponibles.
      </p>
    </div>
  );
}

export default async function UpcomingProductsPage() {
  const products = await getUpcomingProducts();

  return (
    <main className="min-h-screen bg-carbon-canvas">
      <Header />

      <section className="px-6 pb-[80px] pt-[140px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionTitle label="Coming Soon" title="Próximamente" />

          {products.length === 0 ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-[80px] text-center">
              <p className="text-[16px] tracking-[-0.30px] text-bone-white" style={{ fontWeight: 450 }}>
                No hay próximos ingresos publicados por ahora.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-iron-gray">
                Estamos preparando nuevas piezas bonitas para enseñarte pronto.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group rounded-[17.6px] border border-white/10 bg-transparent p-[26px] transition-colors hover:border-white/30"
                >
                  <ImageCarousel
                    images={product.images}
                    alt={product.name}
                    className="mb-[18px] aspect-[3/4] rounded-[12px] bg-ash-veil/10"
                    imageClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                    <span className="absolute left-3 top-3 rounded-full bg-gold-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-black backdrop-blur-sm">
                      Próximamente
                    </span>
                  </ImageCarousel>

                  <div className="space-y-[7px]">
                    <p className="text-[13px] tracking-[-0.26px] text-smoke" style={{ fontWeight: 400 }}>
                      {product.category_name || "Nueva pieza"}
                    </p>
                    <h2 className="text-[18px] tracking-[-0.02em] text-white" style={{ fontWeight: 450 }}>
                      {product.name}
                    </h2>
                    <p className="text-[14px] tracking-[-0.30px] text-gold-accent" style={{ fontWeight: 500 }}>
                      {formatArrivalMonth(product.expected_arrival_date)}
                    </p>
                    {product.price ? (
                      <p className="text-[15px] tracking-[-0.30px] text-bone-white" style={{ fontWeight: 500 }}>
                        {formatPrice(product.price)}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
