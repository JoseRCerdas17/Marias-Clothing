import Header from "@/components/Header";
import HomeClient from "./HomeClient";
import { getProducts, getUpcomingProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [productsResult, upcomingResult] = await Promise.allSettled([
    getProducts(),
    getUpcomingProducts(),
  ]);

  if (productsResult.status === "rejected") {
    console.error("Failed to fetch homepage products", productsResult.reason);
  }
  if (upcomingResult.status === "rejected") {
    console.error("Failed to fetch upcoming products", upcomingResult.reason);
  }

  const products = productsResult.status === "fulfilled" ? productsResult.value : [];
  const upcomingProducts = upcomingResult.status === "fulfilled" ? upcomingResult.value.slice(0, 3) : [];
  const availableProducts = products.filter((product) => product.is_active && !product.is_sold);

  const featuredProducts = availableProducts.slice(0, 4);
  const fallbackProducts = availableProducts.slice(0, 4);
  const displayProducts = featuredProducts;
  const newArrivalProducts = availableProducts
    .filter((product) => !displayProducts.some((featured) => featured.id === product.id))
    .slice(0, 4);

  return (
    <main className="bg-carbon-canvas min-h-screen pb-16 md:pb-0">
      <Header />
      <HomeClient
        products={displayProducts}
        allProducts={newArrivalProducts.length > 0 ? newArrivalProducts : fallbackProducts}
        upcomingProducts={upcomingProducts}
      />
    </main>
  );
}
