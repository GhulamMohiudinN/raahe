"use client";

import { useMemo, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const NOTE_FILTERS = ["All", "Oud", "Sandalwood", "Citrus", "Floral"];

const NOTE_MAP = {
  Oud: ["Oud"],
  Sandalwood: ["Sandalwood", "Cedarwood"],
  Citrus: ["Bergamot", "Blood Orange", "Neroli"],
  Floral: ["Rose", "Jasmine", "Orange Blossom"],
};

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const headingRef = useScrollReveal({ y: 20 });

  const filtered = useMemo(() => {
    let list = products;

    if (activeFilter !== "All") {
      const notesToMatch = NOTE_MAP[activeFilter] || [];
      list = list.filter((p) => {
        const allNotes = [...p.notes.top, ...p.notes.heart, ...p.notes.base];
        return allNotes.some((note) => notesToMatch.includes(note));
      });
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [query, activeFilter]);

  return (
    <div className="bg-cream pb-24 pt-36 sm:pt-40">
      <div className="container-lux">
        <div ref={headingRef} className="max-w-2xl">
          <p className="eyebrow mb-4">The Full Collection</p>
          <h1 className="heading-serif text-5xl sm:text-6xl">
            Fragrances, Composed
            <br />
            <span className="italic text-gold-dark">Without Compromise.</span>
          </h1>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-b border-teal/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            {NOTE_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2 font-body text-xs uppercase tracking-widest2 transition-colors duration-300 ${
                  activeFilter === filter
                    ? "border-teal bg-teal text-cream"
                    : "border-teal/20 text-teal/70 hover:border-teal hover:text-teal"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <HiOutlineSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-teal/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fragrances..."
              className="w-full border border-teal/20 bg-cream-light py-3 pl-11 pr-4 font-body text-sm text-ink placeholder:text-ink/40 focus:border-teal focus:outline-none"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-2xl text-teal-dark">
              No fragrances match your search.
            </p>
            <p className="mt-2 font-body text-sm text-ink/50">
              Try a different note or clear your filters.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
