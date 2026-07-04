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
    tagline: "Crafted for presence, not attention.",
    price: 2499,
    currency: "PKR",
    size: "50ml EXTRAIT DE PARFUM",
    notes: {
      top: ["Bergamot", "Grapefruit", "Crisp Apple"],
      heart: ["Levender", "Clary Sage", "Violet Leaf", "Geranium"],
      base: ["Cedarwood", "Sandalwood", "Amberwood", "Tonka Bean", "Oakmoss"],
    },
    description:
      "Created for those who value confidence and refined style, AXIS by RAAHE blends premium craftsmanship with modern elegance. A fragrance that becomes part of your identity.Find Your Axis. Wear It with Confidence.",
    images: {
      front: "/images/axis.png",
      back: "/images/axis-back.png",
    },
    featured: true,
  },
  {
    id: "02",
    slug: "7Degree",
    name: "7°",
    tagline: "A Fragrance beyond words.",
    price: 2999,
    currency: "PKR",
    size: "50ml EXTRAIT DE PARFUM",
    notes: {
      top: ["Bergamot", "Lemon", "Ginger", "Apple"],
      heart: ["Levender", "Sage", "Geranium", "Violet Leaf"],
      base: ["Musk", "Amberwood", "Sandalwood", "Vanilla", "Patchouli"],
    },
    description:
      "7 degree is the perfect harmony of freshness and sophistication. A captivating blend that opens with vibrant energy, flows into a refined aromatic heart, and settles into a warm, sensual base.",
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
    tagline: "Softness with Presence",
    price: 2999,
    currency: "PKR",
    size: "50ml EXTRAIT DE PARFUM",
    notes: {
      top: ["Peer", "Bergamot", "Orange Blossom", "Raspberry"],
      heart: ["Tuberose", "Jasmine", "Rose", "Gardenia"],
      base: ["Vanilla", "Tonka Bean", "Amber", "Musk", "Sandalwood"],
    },
    description:
      "Endless is a gracefull blend of speed floral and warm gourmand notes. A fragrance that lingers like a memory, soft yet unforgettable.",
    images: {
      front: "/images/endless.png",
      back: "/images/endless-back.png",
    },
    featured: true,
  },
];

export const heroImage = "/images/banner.png";
export const bannerMobile = "/images/banner-mobile.png";
export const ourStoryImage = "/images/home-story.jpeg";
export const aboutImage = "/images/about-pic.jpeg";
export const icon = "/images/icon.ico";

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(price, currency = "PKR") {
  return `${currency} ${price.toLocaleString("en-PK")}`;
}
