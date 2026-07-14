import Link from "next/link";
import Header from "@/components/Header";
import ProductImage from "@/components/ProductImage";
import { getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center space-y-[12px] mb-[80px]">
      <p
        className="text-[21px] tracking-[-0.61px] text-ash-veil"
        style={{ fontWeight: 400, lineHeight: 1.15 }}
      >
        {label}
      </p>
      <h2
        className="text-[53px] tracking-[-3.18px] text-white"
        style={{ fontWeight: 450, lineHeight: 0.8 }}
      >
        {title}
      </h2>
    </div>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="bg-carbon-canvas min-h-screen">
      <Header />

      <section className="pt-[140px] pb-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <SectionTitle label="All Products" title="Collection" />

          {products.length === 0 ? (
            <div className="text-center py-[80px]">
              <p
                className="text-[15px] tracking-[-0.30px] text-iron-gray"
                style={{ fontWeight: 400 }}
              >
                No products available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[18px]">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-transparent border border-white/10 rounded-[17.6px] p-[26px] hover:border-white/30 transition-colors group"
                >
                  <div className="relative aspect-[3/4] mb-[18px] overflow-hidden rounded-[12px] bg-ash-veil/10">
                    {product.images[0] ? (
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-iron-gray text-sm">
                        No image
                      </div>
                    )}
                    {product.is_sold && (
                      <span className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                        Sold
                      </span>
                    )}
                    {product.availability_note && (
                      <span className="absolute top-3 right-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-medium tracking-[-0.02em] text-black backdrop-blur-sm">
                        {product.availability_note}
                      </span>
                    )}
                  </div>

                  <div className="space-y-[6px]">
                    {product.category_name && (
                      <p className="text-[13px] tracking-[-0.26px] text-smoke" style={{ fontWeight: 400 }}>
                        {product.category_name}
                      </p>
                    )}
                    <h3 className="text-[16px] tracking-[-0.02em] text-white" style={{ fontWeight: 450 }}>
                      {product.name}
                    </h3>
                    <p className="text-[15px] tracking-[-0.30px] text-bone-white" style={{ fontWeight: 500 }}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
