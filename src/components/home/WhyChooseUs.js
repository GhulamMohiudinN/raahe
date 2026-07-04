"use client";

import {
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineHandRaised,
  HiOutlineGift,
} from "react-icons/hi2";
import SectionHeading from "@/components/ui/SectionHeading";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FEATURES = [
  {
    icon: HiOutlineSparkles,
    title: "Rare Ingredients",
    description:
      " sandalwood, and orange blossom from the world's most respected growers.",
  },
  {
    icon: HiOutlineHandRaised,
    title: "Small-Batch Crafted",
    description:
      "Every bottle is blended and finished by hand in limited quantities.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Nationwide Delivery",
    description:
      "Discreet, insured shipping to every corner of the country.",
  },
  {
    icon: HiOutlineGift,
    title: "Gift-Ready Presentation",
    description:
      "Each order arrives in signature packaging, ready to gift or keep.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-cream-dark/40 py-24 sm:py-32">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Why RAAHE"
          title="Details Others Overlook"
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  const ref = useScrollReveal({ y: 30, delay: index * 0.08 });
  const Icon = feature.icon;

  return (
    <div ref={ref} className="group text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-teal/20 text-teal transition-colors duration-500 group-hover:border-gold group-hover:bg-teal group-hover:text-cream">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-display text-xl text-teal-dark">{feature.title}</h3>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink/60">
        {feature.description}
      </p>
    </div>
  );
}
