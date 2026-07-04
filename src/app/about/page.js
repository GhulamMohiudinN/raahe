"use client";

import Image from "next/image";
import {
  HiOutlineEye,
  HiOutlineFlag,
  HiOutlineHeart,
} from "react-icons/hi2";
import { aboutImage } from "@/data/products";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const VALUES = [
  {
    icon: HiOutlineFlag,
    title: "Mission",
    text: "To compose fragrances of uncompromising quality, released only when they are ready — never rushed to meet a season.",
  },
  {
    icon: HiOutlineEye,
    title: "Vision",
    text: "To become the region's most trusted name in niche perfumery, known for restraint as much as for craft.",
  },
  {
    icon: HiOutlineHeart,
    title: "Values",
    text: "Honesty in ingredients, patience in process, and generosity in how we treat every client who wears RAAHE.",
  },
];

const TIMELINE = [
  {
    year: "2023",
    title: "The First Formula",
    text: "A single oud accord, blended in a small home studio, became the seed of what RAAHE would become.",
  },
  {
    year: "2024",
    title: "Refining the Craft",
    text: "Two years of testing, discarding, and rebuilding — until three fragrances finally felt complete.",
  },
  {
    year: "2025",
    title: "RAAHE is Born",
    text: "AXIS, Endless, and 7° were released as the founding collection.",
  },
  {
    year: "Today",
    title: "A Growing House",
    text: "RAAHE now reaches clients nationwide, one considered bottle at a time.",
  },
];

export default function AboutPage() {
  const heroRef = useScrollReveal({ y: 30 });

  return (
    <div className="bg-cream pb-24 pt-32 sm:pt-36">
      {/* Hero */}
      <section className="container-lux">
        <div ref={heroRef} className="max-w-2xl">
          <p className="eyebrow mb-4">Our Story</p>
          <h1 className="heading-serif text-5xl sm:text-6xl">
            A House Built on
            <br />
            <span className="italic text-gold-dark">Restraint.</span>
          </h1>
          <p className="mt-6 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            RAAHE FRAGRANCES was never meant to be many things. It was meant
            to be three things, done exceptionally well.
          </p>
        </div>
      </section>

      {/* Story image + text */}
      <StorySection />

      {/* Mission / Vision / Values */}
      <section className="bg-cream-dark/40 py-24 sm:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Mission, Vision & Values"
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {VALUES.map((value, i) => (
              <ValueCard key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 sm:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Our Journey"
            title="From Studio to House"
            align="center"
          />
          <div className="mx-auto mt-16 max-w-2xl">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} isLast={i === TIMELINE.length - 1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StorySection() {
  const imgRef = useScrollReveal({ y: 40 });
  const textRef = useScrollReveal({ y: 40, delay: 0.15 });

  return (
    <section className="container-lux mt-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
      <div ref={imgRef} className="relative aspect-[4/5] w-full overflow-hidden border border-teal/10">
        <Image
          src={aboutImage}
          alt="RAAHE Fragrances atelier"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div ref={textRef}>
        <p className="eyebrow mb-4">The Beginning</p>
        <h2 className="heading-serif text-4xl sm:text-5xl">
          Three Fragrances.
          <br />
          <span className="italic text-gold-dark">One Standard.</span>
        </h2>
        <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-ink/70 sm:text-base">
          We chose to launch with three fragrances instead of thirty, because
          we believe a house is defined by what it refuses to compromise on —
          not by how much it produces. Every RAAHE bottle carries years of
          quiet iteration behind a single, deliberate spray.
        </p>
        <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-ink/70 sm:text-base">
          Our perfumers work in small batches, testing each accord across
          seasons and skin types before it ever reaches a shelf. What remains
          is not the loudest scent in the room — it&apos;s the one people
          remember.
        </p>
      </div>
    </section>
  );
}

function ValueCard({ value, index }) {
  const ref = useScrollReveal({ y: 30, delay: index * 0.1 });
  const Icon = value.icon;
  return (
    <div ref={ref} className="card-lux p-8 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-cream">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-2xl text-teal-dark">{value.title}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink/60">
        {value.text}
      </p>
    </div>
  );
}

function TimelineItem({ item, index, isLast }) {
  const ref = useScrollReveal({ y: 20, delay: index * 0.05 });
  return (
    <div ref={ref} className="relative flex gap-8 pb-12">
      {!isLast && (
        <span className="absolute left-[27px] top-14 h-full w-px bg-teal/15" />
      )}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold bg-cream-light font-display text-sm text-teal-dark">
        {item.year}
      </div>
      <div className="pt-2">
        <h3 className="font-display text-xl text-teal-dark">{item.title}</h3>
        <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-ink/60">
          {item.text}
        </p>
      </div>
    </div>
  );
}
