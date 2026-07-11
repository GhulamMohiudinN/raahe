"use client";

import { useEffect, useState } from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import { fetchAllReviews } from "@/lib/reviews";
import { products } from "@/data/products";

export default function OverallReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllReviews();
        setReviews(data || []);
      } catch (err) {
        setError(err?.message || "Could not load reviews.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || error || reviews.length === 0) return null;

  const average = (
    reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
  ).toFixed(1);

  const productName = (slug) =>
    products.find((p) => p.slug === slug)?.name || slug;

  return (
    <div className="mt-24 border-t border-teal/10 pt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-4">Loved By Our Customers</p>
          <h2 className="heading-serif text-3xl sm:text-4xl">
            All Reviews, In One Place
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <StarDisplay stars={Math.round(Number(average))} size="h-5 w-5" />
          <span className="font-body text-sm text-ink/60">
            {average} out of 5 ({reviews.length}{" "}
            {reviews.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="border border-teal/10 bg-cream-light p-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-teal-dark">{r.name}</p>
              <span className="font-body text-xs text-ink/40">
                {r.created_at
                  ? new Date(r.created_at).toLocaleDateString()
                  : ""}
              </span>
            </div>
            <StarDisplay stars={r.stars} size="h-4 w-4" className="mt-1" />
            <p className="mt-3 font-body text-sm leading-relaxed text-ink/70">
              {r.comment}
            </p>
            <p className="mt-4 font-body text-[11px] uppercase tracking-widest2 text-gold-dark">
              {productName(r.product_slug)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StarDisplay({ stars, size = "h-4 w-4", className = "" }) {
  return (
    <div className={`flex gap-0.5 text-gold-dark ${className}`}>
      {[1, 2, 3, 4, 5].map((n) =>
        n <= stars ? (
          <HiStar key={n} className={size} />
        ) : (
          <HiOutlineStar key={n} className={size} />
        )
      )}
    </div>
  );
}