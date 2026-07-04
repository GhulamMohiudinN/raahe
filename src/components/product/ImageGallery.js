"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageGallery({ product }) {
  const [activeView, setActiveView] = useState("front");
  const views = [
    { key: "front", label: "Front", src: product.images.front },
    { key: "back", label: "Back", src: product.images.back },
  ];
  const active = views.find((v) => v.key === activeView);

  return (
    <div>
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-teal/10 bg-cream-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={active.src}
              alt={`${product.name} — ${active.label}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute left-6 top-6 border border-gold/40 bg-cream-light/90 px-3 py-1">
          <span className="font-body text-[10px] uppercase tracking-widest2 text-teal-dark">
            {product.size}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        {views.map((view) => (
          <button
            key={view.key}
            onClick={() => setActiveView(view.key)}
            className={`relative h-24 w-20 overflow-hidden border transition-colors duration-300 ${
              activeView === view.key
                ? "border-teal"
                : "border-teal/15 hover:border-teal/40"
            }`}
          >
            <Image
              src={view.src}
              alt={`${product.name} — ${view.label} thumbnail`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
