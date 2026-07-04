import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Fragrance Not Found | RAAHE FRAGRANCES" };

  return {
    title: `${product.name} | RAAHE FRAGRANCES`,
    description: product.description,
    openGraph: {
      title: `${product.name} | RAAHE FRAGRANCES`,
      description: product.tagline,
    },
  };
}

export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
