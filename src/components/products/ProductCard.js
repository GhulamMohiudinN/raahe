"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlinePlus } from "react-icons/hi";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="card-lux group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-dark">
        <Image
          src={product.images.front}
          alt={`${product.name} — front`}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className={`object-cover transition-all duration-700 ease-luxury ${
            hovered ? "scale-105 opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={product.images.back}
          alt={`${product.name} — back`}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className={`object-cover transition-all duration-700 ease-luxury ${
            hovered ? "scale-105 opacity-100" : "opacity-0"
          }`}
        />

        <button
          onClick={handleQuickAdd}
          aria-label={`Quick add ${product.name} to cart`}
          className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-teal text-cream opacity-0 shadow-soft transition-all duration-500 ease-luxury group-hover:translate-y-0 group-hover:opacity-100 hover:bg-teal-dark"
        >
          <HiOutlinePlus className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <p className="eyebrow mb-1">{product.size}</p>
        <h3 className="font-display text-2xl text-teal-dark">
          {product.name}
        </h3>
        <p className="mt-1 font-body text-sm text-ink/60">
          {product.tagline}
        </p>
        <p className="mt-4 font-body text-sm tracking-wide text-teal">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
