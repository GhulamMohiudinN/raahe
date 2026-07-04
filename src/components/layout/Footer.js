"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-teal/10 bg-teal-dark text-cream">
      <div className="container-lux grid grid-cols-1 gap-12 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-3xl tracking-[0.15em]">
            RAAHE
          </span>
          <p className="eyebrow mt-1 text-gold-light/80">Fragrances</p>
          <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-cream/70">
            An editorial house of luxury perfumery, composed for those who
            move quietly and are remembered loudly. Each bottle is a chapter;
            every wearer, the author.
          </p>
          <div className="mt-8 flex gap-4">
            {[FaInstagram, FaFacebookF, FaPinterestP, FaTiktok].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              )
            )}
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-5 text-cream/90">Explore</h4>
          <ul className="space-y-3 font-body text-sm text-cream/70">
            <li>
              <Link href="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gold">
                Fragrances
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-5 text-cream/90">Client Care</h4>
          <ul className="space-y-3 font-body text-sm text-cream/70">
            <li>
              <Link href="/cart" className="hover:text-gold">
                Your Cart
              </Link>
            </li>
            <li>
              <a href="mailto:hello@raahefragrances.com" className="hover:text-gold">
                hello@raahefragrances.com
              </a>
            </li>
            <li>
              <a href="tel:+920000000000" className="hover:text-gold">
                +92 000 0000000
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-lux flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} RAAHE FRAGRANCES. All rights reserved.</p>
          <p className="tracking-widest2">CRAFTED WITH INTENTION</p>
        </div>
      </div>
    </footer>
  );
}
