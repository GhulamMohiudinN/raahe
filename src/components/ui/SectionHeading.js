"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const ref = useScrollReveal({ y: 30 });

  return (
    <div
      ref={ref}
      className={`max-w-xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="heading-serif text-4xl sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
