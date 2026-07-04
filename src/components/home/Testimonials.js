"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { HiOutlineStar } from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "I was looking for an everyday perfume that feels luxurious without being too strong, and Endless is exactly that. It's fresh, graceful, and perfect for both daytime and evening wear. Highly recommended.",
    name: "Ayesha Khan",
    role: "Verified Buyer",
  },
  {
    quote:
      "I've tried a lot of men's fragrances, but AXIS really stands out. It has a fresh opening with a rich, masculine finish that lasts all day. I received several compliments at work and even after hours, the scent was still noticeable. Definitely one of my favorites.",
    name: "Hamza Rauf",
    role: "Verified Buyer",
  },
  {
    quote:
      "I love how balanced this perfume is. It's neither too masculine nor too feminine, making it perfect for daily wear. The longevity is impressive, and the fragrance stays fresh throughout the day.",
    name: "Kamran Ali",
    role: "Verified Buyer",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const current = TESTIMONIALS[index];

  return (
    <section className="bg-teal py-24 text-cream sm:py-32">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Client Words"
          title="From Those Who Wear It"
          align="center"
        />

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="mb-6 flex justify-center gap-1 text-gold-light">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiOutlineStar key={i} className="h-5 w-5 fill-gold-light" />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="font-display text-2xl italic leading-relaxed text-cream/95 sm:text-3xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <p className="mt-6 font-body text-xs uppercase tracking-widest2 text-gold-light">
                {current.name} &middot; {current.role}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold-light"
            >
              <HiChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    i === index ? "bg-gold-light" : "bg-cream/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold-light"
            >
              <HiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
