import { supabase } from "@/lib/supabaseClient";

/**
 * Returns a stable per-browser id, creating one in localStorage if needed.
 * Used to enforce "one review per browser" on both the client and the DB
 * (see the unique index in supabase/reviews.sql).
 */
export function getBrowserId() {
  if (typeof window === "undefined") return null;

  const STORAGE_KEY = "raahe_browser_id";
  let id = localStorage.getItem(STORAGE_KEY);

  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(STORAGE_KEY, id);
  }

  return id;
}

/**
 * Fetches all reviews for a given product, newest first.
 */
export async function fetchProductReviews(productSlug) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_slug", productSlug)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Fetches all reviews across all products, newest first. Used by the admin dashboard.
 */
export async function fetchAllReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Creates a new review.
 * @param {{ product_slug: string, name: string, stars: number, comment: string }} review
 */
export async function createReview(review) {
  const browser_id = getBrowserId();

  const { data, error } = await supabase
    .from("reviews")
    .insert([
      {
        product_slug: review.product_slug,
        name: review.name,
        stars: review.stars,
        comment: review.comment,
        browser_id,
      },
    ])
    .select()
    .single();

  if (error) {
    // Postgres unique_violation — this browser already reviewed this product
    if (error.code === "23505") {
      throw new Error("You've already reviewed this product from this browser.");
    }
    throw error;
  }

  return data;
}

/**
 * Deletes a review by id. Used by the admin dashboard only.
 */
export async function deleteReview(id) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw error;
}