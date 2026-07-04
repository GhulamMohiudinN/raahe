"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { HiArrowDown } from "react-icons/hi";
import { heroImage } from "@/data/products";

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const lineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.25, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }
      )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power2.inOut" },
          "-=1.1"
        )
        .fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          titleRef.current.children,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
          "-=0.5"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );

      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-teal-dark"
    >
      <div ref={imageRef} className="absolute inset-0 h-[115%] w-full">
        <Image
          src={heroImage}
          alt="RAAHE Fragrances — signature banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-dark via-teal-dark/30 to-teal-dark/10" />
        <div className="absolute inset-0 bg-teal-dark/20" />
      </div>

      <div className="container-lux relative z-10 pb-20 pt-40 sm:pb-28">
        <div
          ref={lineRef}
          className="mb-6 h-px w-24 origin-left bg-gold-line"
        />
        <p
          ref={eyebrowRef}
          className="eyebrow mb-5 text-gold-light"
        >
          The Signature Collection
        </p>
        <div ref={titleRef} className="max-w-3xl overflow-hidden">
          <h1 className="heading-serif text-cream text-[13vw] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <span className="block">Scent as</span>
            <span className="block italic text-gold-light">Signature.</span>
          </h1>
        </div>
        <p
          ref={subRef}
          className="mt-8 max-w-md font-body text-sm leading-relaxed text-cream/75 sm:text-base"
        >
          Three fragrances, composed without compromise. RAAHE is a study in
          restraint — for those who prefer to be remembered rather than
          recognized.
        </p>
        <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-5">
          <Link href="/products" className="btn-gold">
            Discover the Collection
          </Link>
          <Link
            href="/about"
            className="font-body text-xs uppercase tracking-widest2 text-cream/80 underline underline-offset-4 hover:text-gold-light"
          >
            Our Story
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden animate-bounce items-center gap-2 text-cream/60 sm:flex">
        <HiArrowDown className="h-4 w-4" />
        <span className="font-body text-[10px] uppercase tracking-widest2">
          Scroll
        </span>
      </div>
    </section>
  );
}
