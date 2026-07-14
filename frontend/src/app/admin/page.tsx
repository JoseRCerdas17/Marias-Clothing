'use client';

import { FormEvent, useEffect, useState } from "react";
import ProductImage from "@/components/ProductImage";
import { Category, Product } from "@/lib/api";
import { formatPrice } from "@/lib/format";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  category_id: string;
  images: string;
  sizes: string;
  colors: string;
  availability_note: string;
  is_featured: boolean;
  is_sold: boolean;
  is_active: boolean;
}

const emptyForm: ProductFormState = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  images: "",
  sizes: "",
  colors: "",
  availability_note: "",
  is_featured: false,
  is_sold: false,
  is_active: true,
};

function parseList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function imageSrc(image?: string) {
  if (!image) return "";
  return image.startsWith("/product-images/") ? `${API_URL}${image}` : image;
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [priceDrafts, setPriceDrafts] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  async function adminRequest<T>(path: string, options: RequestInit = {}, authToken = token): Promise<T> {
    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.detail || "Admin request failed");
    }

    return res.json();
  }

  async function loadProducts(authToken = token) {
    setLoading(true);
    setFeedback(null);

    try {
      const data = await adminRequest<Product[]>("/admin/products", {}, authToken);
      setProducts(data);
      setPriceDrafts(Object.fromEntries(data.map((product) => [product.id, String(product.price)])));
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error ? error.message : "Unable to load products" });
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextToken = tokenInput.trim();

    if (!nextToken) {
      setFeedback({ type: "error", message: "Admin token is required" });
      return;
    }

    window.localStorage.setItem("marias-admin-token", nextToken);
    setToken(nextToken);
    void loadProducts(nextToken);
  }

  function handleLogout() {
    window.localStorage.removeItem("marias-admin-token");
    setToken("");
    setTokenInput("");
    setProducts([]);
  }

  async function handleAddProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(form.price);

    if (!form.name.trim()) {
      setFeedback({ type: "error", message: "Product name is required" });
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setFeedback({ type: "error", message: "Price must be a positive number" });
      return;
    }

    try {
      await adminRequest<Product>("/admin/products", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim() || null,
          price,
          category_id: form.category_id ? Number(form.category_id) : null,
          images: parseList(form.images),
          sizes: parseList(form.sizes),
          colors: parseList(form.colors),
          availability_note: form.availability_note.trim() || null,
          is_featured: form.is_featured,
          is_sold: form.is_sold,
          is_active: form.is_active,
        }),
      });

      setForm(emptyForm);
      setFeedback({ type: "success", message: "Product added successfully" });
      await loadProducts();
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error ? error.message : "Unable to add product" });
    }
  }

  async function updateProduct(productId: number, payload: Record<string, unknown>, message: string) {
    try {
      await adminRequest<Product>(`/admin/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      setFeedback({ type: "success", message });
      await loadProducts();
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error ? error.message : "Unable to update product" });
    }
  }

  async function handlePriceUpdate(product: Product) {
    const nextPrice = Number(priceDrafts[product.id]);

    if (!Number.isFinite(nextPrice) || nextPrice <= 0) {
      setFeedback({ type: "error", message: "Price must be a positive number" });
      return;
    }

    await updateProduct(product.id, { price: nextPrice }, "Price updated successfully");
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(`Remove "${product.name}" from the catalog?`);
    if (!confirmed) return;

    try {
      await adminRequest<Product>(`/admin/products/${product.id}`, { method: "DELETE" });
      setFeedback({ type: "success", message: "Product removed from catalog" });
      await loadProducts();
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error ? error.message : "Unable to delete product" });
    }
  }

  return (
    <main className="min-h-screen bg-carbon-canvas px-5 py-10 text-bone-white md:px-8">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-gold-accent">Admin</p>
            <h1 className="mt-2 text-[47px] tracking-[-2.35px]" style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1 }}>
              Product Management
            </h1>
          </div>

          {token && (
            <button className="rounded-full border border-white/15 px-5 py-3 text-[13px] text-smoke hover:text-white" onClick={handleLogout}>
              Log out
            </button>
          )}
        </header>

        {!token ? (
          <section className="glass max-w-[520px] rounded-[24px] p-6">
            <h2 className="text-[26px] tracking-[-0.78px]">Protected Access</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-iron-gray">Enter the admin token configured on the backend.</p>
            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              <input
                className="w-full rounded-[14px] border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-gold-accent"
                type="password"
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                placeholder="Admin token"
              />
              <button className="rounded-full bg-white px-6 py-3 text-[14px] font-medium text-black hover:bg-gold-accent hover:text-white">
                Unlock Admin
              </button>
            </form>
          </section>
        ) : (
          <>
            {feedback && (
              <div className={`rounded-[16px] border px-4 py-3 text-[14px] ${feedback.type === "success" ? "border-gold-accent/50 text-gold-accent" : "border-red-400/50 text-red-300"}`}>
                {feedback.message}
              </div>
            )}

            <section className="glass rounded-[24px] p-6">
              <h2 className="text-[26px] tracking-[-0.78px]">Add Product</h2>
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleAddProduct}>
                <input className="admin-input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name *" />
                <input className="admin-input" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Price *" type="number" min="1" step="1" />
                <select className="admin-input" value={form.category_id} onChange={(event) => setForm({ ...form, category_id: event.target.value })}>
                  <option value="">No category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <input className="admin-input" value={form.availability_note} onChange={(event) => setForm({ ...form, availability_note: event.target.value })} placeholder="Availability note" />
                <textarea className="admin-input min-h-[110px] md:col-span-2" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" />
                <textarea className="admin-input min-h-[90px]" value={form.images} onChange={(event) => setForm({ ...form, images: event.target.value })} placeholder="Image URLs or /product-images/file.jpeg, one per line" />
                <textarea className="admin-input min-h-[90px]" value={form.sizes} onChange={(event) => setForm({ ...form, sizes: event.target.value })} placeholder="Sizes, comma or line separated" />
                <textarea className="admin-input min-h-[90px]" value={form.colors} onChange={(event) => setForm({ ...form, colors: event.target.value })} placeholder="Colors, comma or line separated" />

                <div className="flex flex-wrap gap-4 md:col-span-2">
                  {["is_featured", "is_sold", "is_active"].map((field) => (
                    <label key={field} className="flex items-center gap-2 text-[14px] text-smoke">
                      <input
                        type="checkbox"
                        checked={Boolean(form[field as keyof ProductFormState])}
                        onChange={(event) => setForm({ ...form, [field]: event.target.checked })}
                      />
                      {field.replace("is_", "").replace("_", " ")}
                    </label>
                  ))}
                </div>

                <button className="w-fit rounded-full bg-white px-6 py-3 text-[14px] font-medium text-black hover:bg-gold-accent hover:text-white md:col-span-2">
                  Add Product
                </button>
              </form>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[26px] tracking-[-0.78px]">Products</h2>
                <button className="rounded-full border border-white/15 px-5 py-3 text-[13px] text-smoke hover:text-white" onClick={() => loadProducts()} disabled={loading}>
                  {loading ? "Loading..." : "Refresh"}
                </button>
              </div>

              <div className="grid gap-4">
                {products.map((product) => (
                  <article key={product.id} className={`glass grid gap-4 rounded-[20px] p-4 md:grid-cols-[96px_1fr_auto] ${!product.is_active ? "opacity-50" : ""}`}>
                    <div className="relative h-[128px] overflow-hidden rounded-[14px] bg-white/5 md:h-[120px]">
                      {product.images[0] ? (
                        <ProductImage
                          src={imageSrc(product.images[0])}
                          alt={product.name}
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[18px] text-white">{product.name}</h3>
                        {product.is_sold && <span className="rounded-full bg-gold-accent/20 px-2 py-1 text-[11px] uppercase tracking-[0.15em] text-gold-accent">Sold</span>}
                        {!product.is_active && <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] uppercase tracking-[0.15em] text-smoke">Removed</span>}
                      </div>
                      <p className="text-[14px] text-smoke">{product.category_name || "No category"} · {formatPrice(product.price)}</p>
                      {product.availability_note && <p className="text-[13px] text-gold-accent">{product.availability_note}</p>}
                    </div>
                    <div className="flex flex-col gap-2 md:min-w-[220px]">
                      <div className="flex gap-2">
                        <input
                          className="admin-input min-w-0 flex-1"
                          value={priceDrafts[product.id] || ""}
                          onChange={(event) => setPriceDrafts({ ...priceDrafts, [product.id]: event.target.value })}
                          type="number"
                          min="1"
                        />
                        <button className="rounded-full bg-white px-4 py-2 text-[13px] text-black" onClick={() => handlePriceUpdate(product)}>
                          Save
                        </button>
                      </div>
                      <button className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-smoke hover:text-white" onClick={() => updateProduct(product.id, { is_sold: !product.is_sold }, product.is_sold ? "Product marked available" : "Product marked sold") }>
                        {product.is_sold ? "Mark available" : "Mark sold"}
                      </button>
                      <button className="rounded-full border border-red-400/40 px-4 py-2 text-[13px] text-red-300 hover:text-red-200" onClick={() => handleDelete(product)} disabled={!product.is_active}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
