import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getProduct, getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

function ActionPill({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`inline-block bg-white text-black text-[15px] tracking-[-0.30px] px-[32px] py-[16px] rounded-[9999px] hover:bg-ash-veil transition-colors ${className}`}
      style={{ fontWeight: 500 }}
    >
      {children}
    </Link>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProducts({ category: product.category_name?.toLowerCase().replace(" ", "-") });
  const filteredRelated = relatedProducts.filter((p) => p.slug !== slug).slice(0, 4);

  const productImageUrl = product.images[0];
  const message = encodeURIComponent(
    [
      `Hola, estoy interesado/a en ${product.name} (${formatPrice(product.price)}).`,
      productImageUrl ? `Imagen del producto: ${productImageUrl}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  const whatsappUrl = `https://wa.me/50663385129?text=${message}`;

  return (
    <main className="bg-carbon-canvas min-h-screen">
      <Header />

      <section className="pt-[120px] pb-[80px] px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[47px] items-start">
            <div className="space-y-[18px]">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] rounded-[17.6px] overflow-hidden bg-ash-veil/10 border border-white/10"
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  {product.is_sold && index === 0 && (
                    <span className="absolute top-4 left-4 rounded-full bg-black/80 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      Sold
                    </span>
                  )}
                  {product.availability_note && index === 0 && (
                    <span className="absolute top-4 right-4 rounded-full bg-white/85 px-4 py-2 text-[11px] font-medium tracking-[-0.02em] text-black backdrop-blur-sm">
                      {product.availability_note}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-[120px] space-y-[26px]">
              {product.category_name && (
                <p
                  className="text-[13px] tracking-[-0.26px] text-smoke"
                  style={{ fontWeight: 400 }}
                >
                  {product.category_name}
                </p>
              )}

              <h1
                className="text-[35px] tracking-[-1.16px] text-white"
                style={{ fontWeight: 450, lineHeight: 1.11 }}
              >
                {product.name}
              </h1>

              <p
                className="text-[26px] tracking-[-0.78px] text-white"
                style={{ fontWeight: 450, lineHeight: 1.14 }}
              >
                {formatPrice(product.price)}
              </p>

              {product.is_sold && (
                <p className="inline-flex w-fit rounded-full border border-gold-accent/50 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-gold-accent">
                  Sold
                </p>
              )}

              {product.availability_note && (
                <p className="inline-flex w-fit rounded-full border border-white/20 px-4 py-2 text-[12px] font-medium tracking-[-0.02em] text-bone-white">
                  {product.availability_note}
                </p>
              )}

              {product.description && (
                <p
                  className="text-[15px] tracking-[-0.30px] text-ash-veil leading-[1.5]"
                  style={{ fontWeight: 400 }}
                >
                  {product.description}
                </p>
              )}

              {product.sizes.length > 0 && (
                <div className="space-y-[12px]">
                  <p
                    className="text-[15px] tracking-[-0.30px] text-bone-white"
                    style={{ fontWeight: 450 }}
                  >
                    Available Sizes
                  </p>
                  <div className="flex flex-wrap gap-[12px]">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="px-[16px] py-[8px] border border-white/20 rounded-[9999px] text-[15px] tracking-[-0.30px] text-white"
                        style={{ fontWeight: 400 }}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.colors.length > 0 && (
                <div className="space-y-[12px]">
                  <p
                    className="text-[15px] tracking-[-0.30px] text-bone-white"
                    style={{ fontWeight: 450 }}
                  >
                    Available Colors
                  </p>
                  <div className="flex flex-wrap gap-[12px]">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="px-[16px] py-[8px] border border-white/20 rounded-[9999px] text-[15px] tracking-[-0.30px] text-white"
                        style={{ fontWeight: 400 }}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-[18px] space-y-[16px]">
                {product.is_sold ? (
                  <span
                    className="inline-block cursor-not-allowed rounded-[9999px] bg-iron-gray/40 px-[32px] py-[16px] text-[15px] tracking-[-0.30px] text-white"
                    style={{ fontWeight: 500 }}
                  >
                    Sold
                  </span>
                ) : (
                  <ActionPill href={whatsappUrl}>
                    Enquire on WhatsApp
                  </ActionPill>
                )}

                <p
                  className="text-center text-[15px] tracking-[-0.30px] text-iron-gray"
                  style={{ fontWeight: 400 }}
                >

                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {filteredRelated.length > 0 && (
        <section className="bg-ash-veil py-[80px] px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-[47px]">
              <p
                className="text-[21px] tracking-[-0.61px] text-iron-gray"
                style={{ fontWeight: 400, lineHeight: 1.15 }}
              >
                You May Also Like
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[18px]">
              {filteredRelated.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="bg-white rounded-[17.6px] p-[26px] hover:opacity-90 transition-opacity"
                >
                  <div className="relative aspect-[3/4] mb-[18px] overflow-hidden rounded-[12px] bg-ash-veil/20">
                    {related.images[0] ? (
                      <Image
                        src={related.images[0]}
                        alt={related.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-iron-gray text-sm">
                          No image
                        </div>
                      )}
                      {related.is_sold && (
                        <span className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                          Sold
                        </span>
                      )}
                      {related.availability_note && (
                        <span className="absolute top-3 right-3 rounded-full bg-white/85 px-3 py-1 text-[10px] font-medium tracking-[-0.02em] text-black backdrop-blur-sm">
                          {related.availability_note}
                        </span>
                      )}
                    </div>
                  <h3 className="text-[16px] tracking-[-0.02em] text-black" style={{ fontWeight: 450 }}>
                    {related.name}
                  </h3>
                  <p className="text-[15px] tracking-[-0.30px] text-black mt-[6px]" style={{ fontWeight: 500 }}>
                    {formatPrice(related.price)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
