"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineShoppingBag, HiChevronRight } from "react-icons/hi";
import ImageGallery from "@/components/product/ImageGallery";
import QuantitySelector from "@/components/product/QuantitySelector";
import ProductCard from "@/components/products/ProductCard";
import { formatPrice, products } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

export default function ProductDetailClient({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const relatedProducts = products.filter((p) => p.id !== product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  return (
    <div className="bg-cream pb-24 pt-32 sm:pt-36">
      <div className="container-lux">
        <div className="mb-10 flex items-center gap-2 font-body text-xs text-ink/50">
          <Link href="/" className="hover:text-teal">
            Home
          </Link>
          <HiChevronRight className="h-3 w-3" />
          <Link href="/products" className="hover:text-teal">
            Fragrances
          </Link>
          <HiChevronRight className="h-3 w-3" />
          <span className="text-teal">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <ImageGallery product={product} />

          <div>
            <p className="eyebrow mb-3">{product.size}</p>
            <h1 className="heading-serif text-5xl sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-3 font-body text-base italic text-ink/60">
              {product.tagline}
            </p>

            <p className="mt-6 font-display text-2xl text-teal">
              {formatPrice(product.price, product.currency)}
            </p>

            <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-ink/70">
              {product.description}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-teal/10 py-6">
              <NoteColumn label="Top" notes={product.notes.top} />
              <NoteColumn label="Heart" notes={product.notes.heart} />
              <NoteColumn label="Base" notes={product.notes.base} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
              <button onClick={handleAddToCart} className="btn-primary flex-1 sm:flex-none">
                <HiOutlineShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>

            <div className="mt-10 space-y-2 font-body text-xs text-ink/50">
              <p>Free nationwide delivery on orders over PKR 15,000</p>
              <p>Discreet packaging &middot; Insured shipping</p>
            </div>
          </div>
        </div>

        <div className="mt-28">
          <p className="eyebrow mb-4">You May Also Like</p>
          <h2 className="heading-serif mb-10 text-3xl sm:text-4xl">
            Complete the Collection
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NoteColumn({ label, notes }) {
  return (
    <div>
      <p className="eyebrow mb-2 text-[10px] text-gold-dark">{label}</p>
      <ul className="space-y-1">
        {notes.map((note) => (
          <li key={note} className="font-body text-xs text-ink/70">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
