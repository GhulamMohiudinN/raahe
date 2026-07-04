/**
 * RAAHE FRAGRANCES — product catalogue.
 *
 * You only have 7 images available: 3 front shots, 3 back shots, and 1
 * hero/banner image. Drop them into /public/images using the exact file
 * names below (or update the paths here to match your own file names).
 */

export const products = [
  {
    id: "01",
    slug: "AXIS",
    name: "AXIS",
    tagline: "A smoldering oud wrapped in dark amber.",
    price: 12500,
    currency: "PKR",
    size: "100ml Eau de Parfum",
    notes: {
      top: ["Saffron", "Bergamot"],
      heart: ["Oud", "Rose"],
      base: ["Amber", "Sandalwood", "Musk"],
    },
    description:
      "Noir Oud opens with a spark of saffron before settling into a rich, resinous heart of aged oud and velvet rose. A base of warm amber and sandalwood lingers for hours — an ode to quiet power.",
    images: {
      front: "/images/axis.png",
      back: "/images/axis-back.png",
    },
    featured: true,
  },
  {
    id: "02",
    slug: "7 degree",
    name: "7 degree",
    tagline: "Creamy sandalwood layered with white florals.",
    price: 11800,
    currency: "PKR",
    size: "100ml Eau de Parfum",
    notes: {
      top: ["Pink Pepper", "Cardamom"],
      heart: ["Sandalwood", "Jasmine"],
      base: ["Vanilla", "Cedarwood"],
    },
    description:
      "Velvet Santal is a study in softness — creamy sandalwood and jasmine wrapped in a whisper of cardamom, finished with a warm, milky vanilla base. Understated, intimate, unforgettable.",
    images: {
      front: "/images/7degree.png",
      back: "/images/7degree-back.png",
    },
    featured: true,
  },
  {
    id: "03",
    slug: "ENDLESS",
    name: "ENDLESS",
    tagline: "Sunlit citrus and neroli over a honeyed base.",
    price: 10900,
    currency: "PKR",
    size: "100ml Eau de Parfum",
    notes: {
      top: ["Neroli", "Blood Orange"],
      heart: ["Orange Blossom", "Jasmine"],
      base: ["Honey", "Tonka Bean"],
    },
    description:
      "Golden Neroli captures first light — bright citrus and orange blossom over a honeyed, tonka-warmed base. Radiant, optimistic, effortlessly elegant.",
    images: {
      front: "/images/endless.png",
      back: "/images/endless-back.png",
    },
    featured: true,
  },
];

export const heroImage = "/images/banner.png";

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price, currency = "PKR") {
  return `${currency} ${price.toLocaleString("en-PK")}`;
}
