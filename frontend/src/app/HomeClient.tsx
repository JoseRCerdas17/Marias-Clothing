'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import QuickViewModal from "@/components/QuickViewModal";
import LazyLoad from "@/components/LazyLoad";
import BottomNav from "@/components/BottomNav";

function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * speed;
    const y = (e.clientY - rect.top - rect.height / 2) * speed;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

function SectionTitle({ label, title, light = false }: { label: string; title: string; light?: boolean }) {
  return (
    <div className="text-center space-y-[12px] mb-[80px]">
      <p
        className={`text-[21px] tracking-[-0.61px] ${light ? "text-iron-gray" : "text-ash-veil"}`}
        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, lineHeight: 1.15 }}
      >
        {label}
      </p>
      <h2
        className={`text-[53px] tracking-[-3.18px] ${light ? "text-black" : "text-white"}`}
        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 0.8 }}
      >
        {title}
      </h2>
    </div>
  );
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={`animate-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function MagneticButton({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    buttonRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block bg-white text-black text-[15px] tracking-[-0.30px] px-[32px] py-[16px] rounded-[9999px] hover:bg-gold-accent hover:text-white transition-all duration-300 ${className}`}
      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
    >
      {children}
    </Link>
  );
}

function ProductHero({ products }: { products: Product[] }) {
  const heroProduct = products[0];
  const floatingProducts = products.slice(1, 5);
  const { ref: heroRef, handleMouseMove, handleMouseLeave } = useParallax(0.03);
  const float1Ref = useRef<HTMLDivElement>(null);
  const float2Ref = useRef<HTMLDivElement>(null);
  const float3Ref = useRef<HTMLDivElement>(null);
  const float4Ref = useRef<HTMLDivElement>(null);
  const floatRefs = [float1Ref, float2Ref, float3Ref, float4Ref];

  const handleFloatMouseMove = (index: number) => (e: React.MouseEvent) => {
    const ref = floatRefs[index];
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${[-15, 12, -8, 18][index]}deg)`;
  };

  const handleFloatMouseLeave = (index: number) => () => {
    const ref = floatRefs[index];
    if (ref.current) {
      ref.current.style.transform = `translate3d(0, 0, 0) rotate(${[-15, 12, -8, 18][index]}deg)`;
    }
  };

  const rotations = [-15, 12, -8, 18];
  const positions = [
    { top: "10%", left: "5%" },
    { top: "15%", right: "8%" },
    { bottom: "20%", left: "10%" },
    { bottom: "15%", right: "5%" },
  ];

  return (
    <section
      className="min-h-screen bg-carbon-canvas flex flex-col items-center justify-center pt-[100px] pb-[120px] px-6 relative overflow-hidden gradient-mesh"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={heroRef}
        className="relative w-full max-w-[800px] aspect-square flex items-center justify-center parallax-layer"
      >
        {heroProduct && (
          <div className="relative w-[65%] h-[75%] z-10 animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/20 to-transparent rounded-full blur-3xl opacity-30" />
            <Image
              src={heroProduct.images[0]}
              alt={heroProduct.name}
              fill
              className="object-contain drop-shadow-[0_10px_40px_rgba(201,169,98,0.2)]"
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
        )}

        {floatingProducts.map((product, index) => {
          const pos = positions[index] || positions[0];
          return (
            <div
              key={product.id}
              ref={floatRefs[index]}
              className="absolute w-[15%] aspect-[3/4] parallax-layer transition-transform duration-500 ease-out"
              style={{
                transform: `rotate(${rotations[index]}deg)`,
                ...pos,
              }}
              onMouseMove={handleFloatMouseMove(index)}
              onMouseLeave={handleFloatMouseLeave(index)}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                sizes="15vw"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-[47px] text-center relative z-10">
        <AnimatedSection delay={100}>
          <p
            className="text-[21px] tracking-[-0.61px] text-ash-veil"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400, lineHeight: 1.15 }}
          >
            Maria&apos;s Clothing
          </p>
        </AnimatedSection>
        <AnimatedSection delay={250}>
          <h1
            className="text-[47px] md:text-[72px] tracking-[-2.35px] md:tracking-[-4px] text-white mt-[12px]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, lineHeight: 1 }}
          >
            New Collection
          </h1>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={400} className="mt-[41px]">
        <MagneticButton href="/products">View All Products</MagneticButton>
      </AnimatedSection>

      <AnimatedSection delay={550}>
        <p
          className="mt-[18px] text-[15px] tracking-[-0.30px] text-iron-gray"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
        >
          Entrega gratis en el parque 
        </p>
      </AnimatedSection>

      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-carbon-canvas to-transparent pointer-events-none" />
    </section>
  );
}

interface ProductShowcaseProps {
  products: Product[];
  title: string;
  subtitle: string;
  imageIndex?: number;
  reverse?: boolean;
  onQuickView?: (product: Product) => void;
}

function ProductShowcase({ products, title, subtitle, imageIndex = 0, reverse = false, onQuickView }: ProductShowcaseProps) {
  return (
    <section className={`bg-ash-veil py-[100px] px-6 relative ${reverse ? 'diagonal-clip' : ''}`}>
      {reverse && <div className="absolute top-0 left-0 right-0 h-[100px] bg-carbon-canvas" />}
      <div className="max-w-[1400px] mx-auto">
        <AnimatedSection>
          <SectionTitle label={subtitle} title={title} light />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {products.map((product, index) => {
            const displayImage = product.images[imageIndex] || product.images[0];

            return (
              <AnimatedSection
                key={product.id}
                delay={index * 100}
                className={`
                  group relative
                  ${reverse && index === 1 ? 'md:translate-y-12' : ''}
                  ${reverse && index === 2 ? 'md:-translate-y-8' : ''}
                `}
              >
                <div className="glass-light rounded-[20px] p-[20px] md:p-[26px] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <div className="relative aspect-[3/4] mb-[18px] overflow-hidden rounded-[12px] bg-white/50">
                    {displayImage ? (
                      <Image
                        src={displayImage}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-iron-gray text-sm">
                        No image
                      </div>
                    )}
                    {product.is_sold && (
                      <span className="absolute top-4 left-4 rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                        Sold
                      </span>
                    )}
                    {product.availability_note && (
                      <span className="absolute top-4 right-4 rounded-full bg-white/85 px-3 py-1 text-[10px] font-medium tracking-[-0.02em] text-black backdrop-blur-sm">
                        {product.availability_note}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:opacity-0 opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 md:opacity-0 opacity-100 transition-all duration-300 md:translate-y-2 translate-y-0 group-hover:md:translate-y-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onQuickView?.(product);
                        }}
                        className="flex-1 py-2 rounded-full bg-black/80 backdrop-blur-sm text-white text-[12px] tracking-wide hover:bg-gold-accent transition-colors"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  <div className="space-y-[6px]">
                    {product.category_name && (
                      <p
                        className="text-[13px] tracking-[-0.26px] text-iron-gray"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                      >
                        {product.category_name}
                      </p>
                    )}
                    <h3
                      className="text-[16px] tracking-[-0.02em] text-black"
                      style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="text-[15px] tracking-[-0.30px] text-black"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 600 }}
                    >
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="absolute bottom-[20px] right-[20px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gold-accent transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={500} className="mt-[60px] text-center">
          <MagneticButton href="/products" className="bg-black text-white hover:bg-gold-accent">Shop Now</MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-carbon-canvas border-t border-white/5 py-[60px] px-6 relative">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        <AnimatedSection>
          <p
            className="text-[15px] tracking-[-0.30px] text-iron-gray"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            © 2026 Maria&apos;s Clothing. All rights reserved.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={150}>
          <p
            className="text-[13px] tracking-[-0.26px] text-iron-gray/60 mt-[12px]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Luxury fashion for the discerning.
          </p>
        </AnimatedSection>
      </div>
    </footer>
  );
}

interface HomeClientProps {
  products: Product[];
  allProducts: Product[];
}

export default function HomeClient({ products, allProducts }: HomeClientProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <ScrollProgress />
      <BackToTop />

      <ProductHero products={products} />

      <ProductShowcase
        products={products}
        title="Featured"
        subtitle="Curated Selection"
        onQuickView={handleQuickView}
      />

      <LazyLoad>
        <ProductShowcase
          products={[...allProducts].reverse()}
          title="New Arrivals"
          subtitle="Just In"
          imageIndex={1}
          reverse
          onQuickView={handleQuickView}
        />
      </LazyLoad>

      <Footer />
      <BottomNav />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
