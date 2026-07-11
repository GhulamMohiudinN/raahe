"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import {
  fetchProductReviews,
  createReview,
  getBrowserId,
} from "@/lib/reviews";

export default function ReviewsSection({ productSlug }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductReviews(productSlug);
      setReviews(data || []);

      const browserId = getBrowserId();
      setAlreadyReviewed(
        (data || []).some((r) => r.browser_id === browserId)
      );
    } catch (err) {
      setError(err?.message || "Could not load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Please enter your name");
    if (stars < 1) return toast.error("Please select a star rating");
    if (!comment.trim()) return toast.error("Please write a comment");

    setSubmitting(true);
    try {
      await createReview({
        product_slug: productSlug,
        name: name.trim(),
        stars,
        comment: comment.trim(),
      });
      toast.success("Thank you for your review!");
      setName("");
      setStars(0);
      setComment("");
      setAlreadyReviewed(true);
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err?.message || "Could not submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const average =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mt-28">
      <p className="eyebrow mb-4">Customer Reviews</p>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="heading-serif text-3xl sm:text-4xl">
          What People Are Saying
        </h2>
        {average && (
          <div className="flex items-center gap-2">
            <StarDisplay stars={Math.round(Number(average))} size="h-5 w-5" />
            <span className="font-body text-sm text-ink/60">
              {average} out of 5 ({reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Review form */}
        <div className="border border-teal/10 bg-cream-light p-6 sm:p-8">
          {alreadyReviewed ? (
            <p className="font-body text-sm text-ink/60">
              You've already submitted a review for this product from this
              browser. Thank you!
            </p>
          ) : !showForm ? (
            <div className="flex flex-col items-start gap-3">
              <p className="font-body text-sm text-ink/60">
                Already tried this fragrance? Let others know what you think.
              </p>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                Write a Review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between">
                <label className="eyebrow block text-[10px]">
                  Your Rating
                </label>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="font-body text-[11px] uppercase tracking-widest2 text-ink/40 hover:text-teal"
                >
                  Cancel
                </button>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setStars(n)}
                    onMouseEnter={() => setHoverStars(n)}
                    onMouseLeave={() => setHoverStars(0)}
                    className="text-gold-dark"
                  >
                    {(hoverStars || stars) >= n ? (
                      <HiStar className="h-6 w-6" />
                    ) : (
                      <HiOutlineStar className="h-6 w-6" />
                    )}
                  </button>
                ))}
              </div>

              <div>
                <label className="eyebrow mb-2 block text-[10px]">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-teal/20 bg-cream px-4 py-3 font-body text-sm outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="eyebrow mb-2 block text-[10px]">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this fragrance..."
                  rows={4}
                  className="w-full resize-none border border-teal/20 bg-cream px-4 py-3 font-body text-sm outline-none focus:border-teal"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          )}
        </div>

        {/* Reviews list */}
        <div className="space-y-6">
          {loading ? (
            <p className="font-body text-sm text-ink/50">Loading reviews...</p>
          ) : error ? (
            <p className="font-body text-sm text-red-500">{error}</p>
          ) : reviews.length === 0 ? (
            <p className="font-body text-sm text-ink/50">
              No reviews yet. Be the first to review this fragrance.
            </p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="border-b border-teal/10 pb-6">
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
              </div>
            ))
          )}
        </div>
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