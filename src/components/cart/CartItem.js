"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

export default function CartItem({ item }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-5 border-b border-teal/10 py-6">
      <Link
        href={`/products/${item.slug}`}
        className="relative h-28 w-24 shrink-0 overflow-hidden bg-cream-dark"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/products/${item.slug}`}
              className="font-display text-lg text-teal-dark hover:text-teal"
            >
              {item.name}
            </Link>
            <p className="mt-1 font-body text-sm text-ink/50">
              {formatPrice(item.price, item.currency)}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="text-ink/40 transition-colors hover:text-red-500"
          >
            <HiOutlineTrash className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-teal/20">
            <button
              onClick={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-9 w-9 items-center justify-center text-teal transition-colors hover:bg-cream-dark disabled:cursor-not-allowed disabled:opacity-30"
            >
              <HiOutlineMinus className="h-3.5 w-3.5" />
            </button>
            <span className="flex h-9 w-9 items-center justify-center font-body text-sm">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(item.id)}
              aria-label="Increase quantity"
              className="flex h-9 w-9 items-center justify-center text-teal transition-colors hover:bg-cream-dark"
            >
              <HiOutlinePlus className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="font-body text-sm font-medium text-teal">
            {formatPrice(item.price * item.quantity, item.currency)}
          </p>
        </div>
      </div>
    </div>
  );
}
