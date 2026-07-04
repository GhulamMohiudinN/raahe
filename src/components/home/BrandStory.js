"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ourStoryImage } from "@/data/products";
import { useScrollReveal } from "@/hooks/useScrollReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandStory() {
  const imageWrapRef = useRef(null);
  const textRef = useScrollReveal({ y: 40 });

  useEffect(() => {
    const el = imageWrapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(15% 15% 15% 15%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-teal-dark py-24 text-cream sm:py-32">
      <div className="container-lux grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div
          ref={imageWrapRef}
          className="relative aspect-[4/5] w-full overflow-hidden border border-gold/20"
        >
          <Image
            src={ourStoryImage}
            alt="RAAHE Fragrances brand story"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-teal-dark/30" />
          <div className="absolute bottom-6 left-6 right-6 border border-cream/20 bg-teal-dark/70 p-5 backdrop-blur-sm">
            <p className="font-display text-xl italic text-gold-light">
              &ldquo;Fragrance is memory, worn.&rdquo;
            </p>
          </div>
        </div>

        <div ref={textRef}>
          <p className="eyebrow mb-4 text-gold-light">Our Story</p>
          <h2 className="heading-serif text-4xl text-cream sm:text-5xl">
            Composed in Silence,
            <br />
            <span className="italic text-gold-light">Worn with Intent.</span>
          </h2>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-cream/70 sm:text-base">
            RAAHE began as a private atelier project — three fragrances,
            refined over years, released only when each was ready. We do not
            chase trends. We build compositions meant to outlast them.
          </p>
          <Link href="/about" className="btn-outline mt-8 border-gold/40 text-gold-light hover:bg-gold hover:text-teal-dark hover:border-gold">
            Read Our Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}
