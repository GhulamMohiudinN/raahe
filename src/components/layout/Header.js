"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useCartStore } from "@/store/useCartStore";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Fragrances", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isAdminRoute = pathname?.startsWith("/admin");
  if (isAdminRoute) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-luxury ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(1,73,88,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-lux flex items-center justify-between py-5">
        <Link href="/" className="group flex flex-col items-start">
          <span className="font-display text-2xl tracking-[0.15em] text-teal-dark">
            RAAHE
          </span>
          <span className="eyebrow -mt-1 text-[10px] tracking-widest2">
            Fragrances
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-xs uppercase tracking-widest2 transition-colors duration-300 hover:text-teal ${
                pathname === link.href ? "text-teal" : "text-ink/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            className="relative flex items-center text-teal-dark transition-transform duration-300 hover:scale-110"
            aria-label="View cart"
          >
            <HiOutlineShoppingBag className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-teal-dark">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="text-teal-dark md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-teal-dark/98 md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl tracking-[0.15em] text-cream">
                RAAHE
              </span>
              <button
                className="text-cream"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <HiOutlineX className="h-7 w-7" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 pt-16">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-3xl text-cream/90 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
