import Header from "@/components/Header";
import HomeClient from "./HomeClient";
import { getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [productsResult] = await Promise.allSettled([
    getProducts(),
  ]);

  if (productsResult.status === "rejected") {
    console.error("Failed to fetch homepage products", productsResult.reason);
  }

  const products = productsResult.status === "fulfilled" ? productsResult.value : [];

  const featuredProducts = products.filter((p) => p.is_featured).slice(0, 4);
  const fallbackProducts = products.slice(0, 4);
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : fallbackProducts;
  const newArrivalProducts = products
    .filter((product) => !displayProducts.some((featured) => featured.id === product.id))
    .slice(0, 4);

  return (
    <main className="bg-carbon-canvas min-h-screen pb-16 md:pb-0">
      <Header />
      <HomeClient
        products={displayProducts}
        allProducts={newArrivalProducts.length > 0 ? newArrivalProducts : fallbackProducts}
      />
    </main>
  );
}
