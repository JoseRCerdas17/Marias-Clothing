import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const min_price = searchParams.get("min_price");
  const max_price = searchParams.get("max_price");
  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit") || "50";

  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (min_price) params.set("min_price", min_price);
  if (max_price) params.set("max_price", max_price);
  if (featured) params.set("featured", featured);
  params.set("limit", limit);

  try {
    const res = await fetch(`${API_URL}/products?${params}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
