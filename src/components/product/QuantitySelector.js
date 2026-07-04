"use client";

import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center border border-teal/20">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-12 w-12 items-center justify-center text-teal transition-colors hover:bg-cream-dark disabled:cursor-not-allowed disabled:opacity-30"
      >
        <HiOutlineMinus className="h-4 w-4" />
      </button>
      <span className="flex h-12 w-12 items-center justify-center font-body text-sm text-ink">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="flex h-12 w-12 items-center justify-center text-teal transition-colors hover:bg-cream-dark"
      >
        <HiOutlinePlus className="h-4 w-4" />
      </button>
    </div>
  );
}
