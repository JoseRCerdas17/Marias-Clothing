const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_BASE_URL = API_URL.replace(/\/$/, "");

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: number | null;
  category_name: string | null;
  sizes: string[];
  colors: string[];
  images: string[];
  availability_note: string | null;
  is_featured: boolean;
  is_sold: boolean;
  is_active: boolean;
  created_at: string;
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    images: product.images.map((image) =>
      image.startsWith("/product-images/") ? `${API_BASE_URL}${image}` : image,
    ),
  };
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProducts(options?: {
  category?: string;
  featured?: boolean;
}): Promise<Product[]> {
  const params = new URLSearchParams();
  if (options?.category) params.set("category", options.category);
  if (options?.featured !== undefined) params.set("featured", String(options.featured));

  const url = `${API_BASE_URL}/products${params.toString() ? `?${params}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  const products: Product[] = await res.json();
  return products.map(normalizeProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE_URL}/products/${slug}`, { cache: "no-store" });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch product");
  }
  const product: Product = await res.json();
  return normalizeProduct(product);
}
