import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { ProductDetail } from "./ProductDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    return {
      title: product.name,
      description: product.description || `View ${product.name} at ELARA`,
      openGraph: {
        title: product.name,
        description: product.description || `View ${product.name} at ELARA`,
        images: product.images.length > 0 ? [{ url: product.images[0] }] : [],
      },
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
