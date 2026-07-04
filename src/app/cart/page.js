"use client";

import { useState } from "react";
import Link from "next/link";
import { HiOutlineShoppingBag, HiArrowLeft } from "react-icons/hi";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/data/products";
import CartItem from "@/components/cart/CartItem";
import CheckoutModal from "@/components/cart/CheckoutModal";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalItems = useCartStore((state) => state.totalItems());
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <div className="min-h-[70vh] bg-cream pb-24 pt-32 sm:pt-36">
      <div className="container-lux">
        <p className="eyebrow mb-4">Your Selection</p>
        <h1 className="heading-serif text-5xl sm:text-6xl">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="mt-20 flex flex-col items-center py-16 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-teal/20 text-teal">
              <HiOutlineShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl text-teal-dark">
              Your cart is empty
            </h2>
            <p className="mt-2 max-w-sm font-body text-sm text-ink/50">
              Discover a fragrance worth carrying with you.
            </p>
            <Link href="/products" className="btn-primary mt-8">
              <HiArrowLeft className="h-4 w-4" />
              Browse Fragrances
            </Link>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between border-b border-teal/10 pb-4">
                <p className="font-body text-xs uppercase tracking-widest2 text-ink/50">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={clearCart}
                  className="font-body text-xs uppercase tracking-widest2 text-ink/50 underline underline-offset-4 hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="h-fit border border-teal/10 bg-cream-light p-8">
              <h2 className="font-display text-2xl text-teal-dark">
                Order Summary
              </h2>
              <div className="mt-6 space-y-3 border-b border-teal/10 pb-6 font-body text-sm">
                <div className="flex justify-between text-ink/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-ink/60">
                  <span>Shipping</span>
                  <span>Calculated at delivery</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between font-body text-base font-semibold text-teal-dark">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <button
                onClick={() => setCheckoutOpen(true)}
                className="btn-primary mt-8 w-full"
              >
                Proceed to Checkout
              </button>
              <Link
                href="/products"
                className="mt-4 flex items-center justify-center gap-2 font-body text-xs uppercase tracking-widest2 text-teal/70 hover:text-teal"
              >
                <HiArrowLeft className="h-3.5 w-3.5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
