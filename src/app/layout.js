import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ToasterProvider from "@/components/ui/ToasterProvider";
import { icon } from "@/data/products";
import Script from "next/script";

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
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D9ADVCBC77U7PB56PMN0');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
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
