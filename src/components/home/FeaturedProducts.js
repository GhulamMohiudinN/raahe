"use client";

import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FeaturedProducts() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="The Collection"
            title="Three Fragrances, No Compromise"
            description="Every RAAHE fragrance is composed in small batches, each bottle a complete and deliberate statement."
          />
          <Link
            href="/products"
            className="hidden font-body text-xs uppercase tracking-widest2 text-teal underline underline-offset-4 hover:text-gold-dark sm:block"
          >
            View All
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <RevealCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RevealCard({ product, index }) {
  const ref = useScrollReveal({ y: 50, delay: index * 0.1 });
  return (
    <div ref={ref}>
      <ProductCard product={product} />
    </div>
  );
}
