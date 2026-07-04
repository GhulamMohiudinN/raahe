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
            <i>The Journey of Scents</i>
          </p>
          <div className="mt-8 flex gap-4">
            {[
              { Icon: FaInstagram, href: "https://www.instagram.com/raahefragrances?igsh=M29qNGVydWR1dXlm", label: "Instagram" },
              { Icon: FaFacebookF, href: "https://www.facebook.com/share/1EetEUTK8k/", label: "Facebook" },
              { Icon: FaTiktok, href: "https://www.tiktok.com/@raahefragrances?_r=1&_d=em1876g6e5ah3h&sec_uid=MS4wLjABAAAAguO8S3mI29HUQi6x9X64ahBTUAtXWodqrRb66OFV_XQOOWNDXu_xRoVQKiULBXT2&share_author_id=7643958403224880136&sharer_language=en&source=h5_m&u_code=f3icbk86c669hf&timestamp=1783204486&user_id=7643958403224880136&sec_user_id=MS4wLjABAAAAguO8S3mI29HUQi6x9X64ahBTUAtXWodqrRb66OFV_XQOOWNDXu_xRoVQKiULBXT2&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7658100221599680272&share_link_id=4202eef5-479d-4029-9b6a-7eab9a3b7ec5&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1", label: "TikTok" },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors duration-300 hover:border-gold hover:text-gold"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
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
                raahefragrances@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+923368883767" className="hover:text-gold">
                +92 336 888 3767
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-lux flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} RAAHE FRAGRANCES. All rights reserved.</p>
          <p className="tracking-widest2">THE JOURNEY OF SCENTS</p>
        </div>
      </div>
    </footer>
  );
}
