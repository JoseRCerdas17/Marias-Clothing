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
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProducts(params?: {
  category?: string;
  min_price?: number;
  max_price?: number;
  featured?: boolean;
}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.min_price) searchParams.set("min_price", params.min_price.toString());
  if (params?.max_price) searchParams.set("max_price", params.max_price.toString());
  if (params?.featured !== undefined) searchParams.set("featured", params.featured.toString());

  const res = await fetch(`${API_URL}/products?${searchParams}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(slug: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
