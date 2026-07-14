'use client';

import { FormEvent, useEffect, useState } from "react";
import ProductImage from "@/components/ProductImage";
import { Category, Product } from "@/lib/api";
import { formatPrice } from "@/lib/format";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");

const welcomeMessages = [
  "Hola bella",
  "Hola guapa",
  "Te amo",
  "Te amo demasiado",
  "Mi princesa",
  "Mi reina",
  "Mi amor bonito",
  "Hola mi vida",
  "Mi cielo",
  "Mi corazón",
];

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeMessage] = useState(() => welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);

  const activeProducts = products.filter((product) => product.is_active).length;
  const soldProducts = products.filter((product) => product.is_sold && product.is_active).length;

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
    <main className="relative min-h-screen overflow-hidden bg-carbon-canvas px-5 py-8 text-bone-white md:px-8 md:py-12">
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-80" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold-accent/10 blur-[140px]" />

      {showWelcome && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-carbon-canvas/95 px-8 py-10 text-center shadow-[0_30px_120px_rgba(0,0,0,0.65)] animate-scale-in md:px-12 md:py-14">
            <button
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-smoke transition-all duration-300 hover:border-gold-accent/60 hover:text-gold-accent"
              onClick={() => setShowWelcome(false)}
              aria-label="Close welcome message"
            >
              ×
            </button>
            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-gold-accent/30 bg-gold-accent/10 text-[28px] text-gold-accent">
              ♥
            </div>
            <p className="text-[13px] uppercase tracking-[0.28em] text-gold-accent">Bienvenida</p>
            <h2 className="mt-4 text-[48px] tracking-[-2.35px] text-white md:text-[64px]" style={{ fontFamily: "var(--font-cormorant)", lineHeight: 0.9 }}>
              {welcomeMessage}
            </h2>
            <p className="mx-auto mt-5 max-w-[360px] text-[15px] leading-relaxed text-iron-gray">
              Tu panel está listo para cuidar cada pieza del catálogo con amor.
            </p>
            <button
              className="mt-8 rounded-full bg-white px-8 py-4 text-[14px] font-medium text-black transition-all duration-300 hover:bg-gold-accent hover:text-white hover:shadow-[0_12px_40px_rgba(201,169,98,0.25)] active:scale-[0.98]"
              onClick={() => setShowWelcome(false)}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1240px] space-y-8">
        <header className="glass rounded-[30px] px-6 py-7 md:px-8 md:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] uppercase tracking-[0.28em] text-gold-accent">Maria&apos;s Clothing Admin</p>
            <h1 className="mt-3 text-[44px] tracking-[-2.35px] md:text-[58px]" style={{ fontFamily: "var(--font-cormorant)", lineHeight: 0.92 }}>
              Product Management
            </h1>
            <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-iron-gray">
              A quiet workspace for editing prices, availability, and new catalog pieces.
            </p>
          </div>

          {token && (
            <button className="rounded-full border border-white/15 px-5 py-3 text-[13px] text-smoke transition-all duration-300 hover:border-gold-accent/50 hover:text-gold-accent" onClick={handleLogout}>
              Log out
            </button>
          )}
          </div>

          {token && (
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-iron-gray">Total</p>
                <p className="mt-2 text-[28px] tracking-[-0.78px] text-white">{products.length}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-iron-gray">Active</p>
                <p className="mt-2 text-[28px] tracking-[-0.78px] text-white">{activeProducts}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-iron-gray">Sold</p>
                <p className="mt-2 text-[28px] tracking-[-0.78px] text-gold-accent">{soldProducts}</p>
              </div>
            </div>
          )}
        </header>

        {!token ? (
          <section className="glass mx-auto max-w-[540px] rounded-[28px] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-8">
            <h2 className="text-[30px] tracking-[-0.78px]" style={{ fontFamily: "var(--font-cormorant)" }}>Protected Access</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-iron-gray">Enter the admin token configured on the backend.</p>
            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
              <input
                className="admin-input w-full"
                type="password"
                value={tokenInput}
                onChange={(event) => setTokenInput(event.target.value)}
                placeholder="Admin token"
              />
              <button className="rounded-full bg-white px-7 py-3.5 text-[14px] font-medium text-black transition-all duration-300 hover:bg-gold-accent hover:text-white hover:shadow-[0_12px_40px_rgba(201,169,98,0.2)] active:scale-[0.98]">
                Unlock Admin
              </button>
            </form>
          </section>
        ) : (
          <>
            {feedback && (
              <div className={`rounded-[18px] border px-5 py-4 text-[14px] shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${feedback.type === "success" ? "border-gold-accent/50 bg-gold-accent/5 text-gold-accent" : "border-red-400/50 bg-red-400/5 text-red-300"}`}>
                {feedback.message}
              </div>
            )}

            <section className="glass rounded-[30px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)] md:p-8">
              <div className="flex flex-col gap-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold-accent">Create</p>
                <h2 className="text-[34px] tracking-[-1.16px]" style={{ fontFamily: "var(--font-cormorant)" }}>Add Product</h2>
              </div>
              <form className="mt-7 grid gap-4 md:grid-cols-2" onSubmit={handleAddProduct}>
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

                <button className="w-fit rounded-full bg-white px-7 py-3.5 text-[14px] font-medium text-black transition-all duration-300 hover:bg-gold-accent hover:text-white hover:shadow-[0_12px_40px_rgba(201,169,98,0.2)] active:scale-[0.98] md:col-span-2">
                  Add Product
                </button>
              </form>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold-accent">Inventory</p>
                  <h2 className="mt-1 text-[34px] tracking-[-1.16px]" style={{ fontFamily: "var(--font-cormorant)" }}>Products</h2>
                </div>
                <button className="rounded-full border border-white/15 px-5 py-3 text-[13px] text-smoke transition-all duration-300 hover:border-gold-accent/50 hover:text-gold-accent disabled:opacity-50" onClick={() => loadProducts()} disabled={loading}>
                  {loading ? "Loading..." : "Refresh"}
                </button>
              </div>

              <div className="grid gap-4">
                {products.map((product) => (
                  <article key={product.id} className={`glass group grid gap-5 rounded-[24px] p-4 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.045] hover:shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:grid-cols-[112px_1fr_auto] ${!product.is_active ? "opacity-50" : ""}`}>
                    <div className="relative h-[138px] overflow-hidden rounded-[16px] bg-white/5 md:h-[132px]">
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
                        <h3 className="text-[20px] tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-cormorant)" }}>{product.name}</h3>
                        {product.is_sold && <span className="rounded-full bg-gold-accent/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-gold-accent">Sold</span>}
                        {!product.is_active && <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-smoke">Removed</span>}
                      </div>
                      <p className="text-[14px] text-smoke">{product.category_name || "No category"} · {formatPrice(product.price)}</p>
                      {product.availability_note && <p className="text-[13px] text-gold-accent">{product.availability_note}</p>}
                    </div>
                    <div className="flex flex-col gap-2 md:min-w-[230px]">
                      <div className="flex gap-2">
                        <input
                          className="admin-input min-w-0 flex-1"
                          value={priceDrafts[product.id] || ""}
                          onChange={(event) => setPriceDrafts({ ...priceDrafts, [product.id]: event.target.value })}
                          type="number"
                          min="1"
                        />
                        <button className="rounded-full bg-white px-4 py-2 text-[13px] text-black transition-all duration-300 hover:bg-gold-accent hover:text-white" onClick={() => handlePriceUpdate(product)}>
                          Save
                        </button>
                      </div>
                      <button className="rounded-full border border-white/15 px-4 py-2 text-[13px] text-smoke transition-all duration-300 hover:border-gold-accent/50 hover:text-gold-accent" onClick={() => updateProduct(product.id, { is_sold: !product.is_sold }, product.is_sold ? "Product marked available" : "Product marked sold") }>
                        {product.is_sold ? "Mark available" : "Mark sold"}
                      </button>
                      <button className="rounded-full border border-red-400/30 px-4 py-2 text-[13px] text-red-300 transition-all duration-300 hover:border-red-300/70 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-40" onClick={() => handleDelete(product)} disabled={!product.is_active}>
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
