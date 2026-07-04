import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ToasterProvider from "@/components/ui/ToasterProvider";
import { icon } from "@/data/products";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata = {
  title: "RAAHE FRAGRANCES | Luxury Perfumes",
  description:
    "RAAHE FRAGRANCES — an editorial house of luxury perfumery. Discover Noir Oud, Velvet Santal, and Golden Neroli, crafted for those who move quietly and are remembered loudly.",
  keywords: [
    "luxury perfume",
    "RAAHE FRAGRANCES",
    "eau de parfum",
    "niche fragrance",
    "oud perfume",
    "Axis",
    "Endless",
    "7 Degree",
    "perfume house",
    "exclusive scents",
    "artisan fragrance",
    "premium perfume",
    "signature scent",
    "luxury fragrance",
    "perfume collection",
    "fragrance for men",
    "fragrance for women",
  ],
  openGraph: {
    title: "RAAHE FRAGRANCES | Luxury Perfumes",
    description:
      "An editorial house of luxury perfumery. Discover our signature collection.",
    siteName: "RAAHE FRAGRANCES",
    type: "website",
  },
  icons: {
    icon,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">
        <SmoothScroll>
          <ToasterProvider />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
