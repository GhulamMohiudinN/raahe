# RAAHE FRAGRANCES

A production-ready luxury fragrance eCommerce site built with Next.js (App Router, JavaScript), Tailwind CSS, Supabase, GSAP, Framer Motion, Lenis smooth scroll, React Icons, Zustand, React Hot Toast, and SweetAlert2.

Palette: cream background `#F7F2EA`, teal primary `#014958`, gold accents `#C6A46A` / `#E8D3A7`.

---

## 1. Folder Structure

```
raahe-fragrances/
├── public/
│   └── images/                  # 7 image assets (placeholders included — replace with yours)
│       ├── hero-banner.jpg
│       ├── perfume-1-front.jpg
│       ├── perfume-1-back.jpg
│       ├── perfume-2-front.jpg
│       ├── perfume-2-back.jpg
│       ├── perfume-3-front.jpg
│       └── perfume-3-back.jpg
├── src/
│   ├── app/
│   │   ├── layout.js             # Root layout — fonts, Header, Footer, providers
│   │   ├── globals.css           # Tailwind base + design tokens
│   │   ├── page.js               # Home page
│   │   ├── not-found.js          # Custom 404
│   │   ├── favicon.ico
│   │   ├── products/
│   │   │   ├── page.js           # Products listing (search + filters)
│   │   │   └── [slug]/page.js    # Product detail page
│   │   ├── about/page.js         # About Us
│   │   ├── contact/page.js       # Contact Us
│   │   ├── cart/page.js          # Cart page
│   │   └── admin/
│   │       ├── page.js           # Admin login
│   │       └── dashboard/page.js # Admin dashboard (orders table)
│   ├── components/
│   │   ├── layout/                Header.js, Footer.js
│   │   ├── home/                  Hero, FeaturedProducts, BrandStory, WhyChooseUs, Testimonials
│   │   ├── products/               ProductCard.js
│   │   ├── product/                ImageGallery.js, QuantitySelector.js, ProductDetailClient.js
│   │   ├── cart/                   CartItem.js, CheckoutModal.js
│   │   └── ui/                     SmoothScroll.js, ToasterProvider.js, SectionHeading.js
│   ├── data/products.js          # Product catalogue (3 fragrances)
│   ├── lib/
│   │   ├── supabaseClient.js     # Supabase client
│   │   └── orders.js             # createOrder / fetchOrders / updateOrderStatus
│   ├── store/
│   │   ├── useCartStore.js       # Zustand cart (localStorage persisted)
│   │   └── useAdminStore.js      # Zustand admin auth (sessionStorage persisted)
│   └── hooks/useScrollReveal.js  # Reusable GSAP scroll-reveal hook
├── supabase/schema.sql           # SQL to create the orders table + RLS policies
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── jsconfig.json
├── .env.local.example
├── package.json
└── README.md (this file)
```

---

## 2. Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy the env example and add your Supabase credentials
cp .env.local.example .env.local

# 3. Run the SQL script in supabase/schema.sql inside your Supabase project's
#    SQL Editor (see step 4 below)

# 4. Start the dev server
npm run dev
```

The site runs at `http://localhost:3000`.

---

## 3. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**.
3. Open `.env.local` (created from `.env.local.example`) and paste them in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. In your Supabase project, open **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql`, and run it. This creates:
   - The `orders` table (`id`, `customer_name`, `email`, `phone`, `address`, `products` JSON, `total_items`, `status`, `created_at`)
   - Row Level Security policies allowing the public anon key to `INSERT` new orders (checkout) and `SELECT` orders (admin dashboard)
   - An index on `created_at` for fast dashboard sorting

5. Restart `npm run dev` after adding your `.env.local` values.

> Note: the admin dashboard read policy is intentionally public because the admin login in this project is a **frontend-only** demo check (see below), not real Supabase Auth. For a production deployment, replace the admin login with Supabase Auth and scope the `SELECT` policy to authenticated admins only.

---

## 4. Admin Access

- URL: `/admin`
- Email: `admin@raahe.com`
- Password: `raahe123`

This is a frontend-only credential check (see `src/store/useAdminStore.js`) intended for a simple, self-contained admin panel. It is **not** secure authentication — anyone who reads the client bundle can see the hardcoded credentials. Swap in Supabase Auth (email/password or magic link) before using this in production with real customer data.

---

## 5. Replacing the Placeholder Images

`public/images/` ships with 7 generated placeholder images so the project runs immediately. Replace them with your real photography using the **same file names**:

| File | Used for |
|---|---|
| `hero-banner.jpg` | Home page hero + About page story section |
| `perfume-1-front.jpg` / `perfume-1-back.jpg` | Noir Oud |
| `perfume-2-front.jpg` / `perfume-2-back.jpg` | Velvet Santal |
| `perfume-3-front.jpg` / `perfume-3-back.jpg` | Golden Neroli |

To rename products, edit `src/data/products.js`.

---

## 6. Key Features

- **Home**: full-screen hero (GSAP entrance + parallax), featured products, brand story, why-choose-us, testimonials carousel
- **Products**: search + note-based filters, quick add-to-cart
- **Product Detail**: front/back gallery with animated switching, quantity selector, related products
- **Cart**: Zustand store persisted to `localStorage` — add, remove, increase/decrease quantity, clear cart
- **Checkout**: modal collecting name/email/phone/address, order review, submits to Supabase, SweetAlert2 success/error popup
- **Admin Dashboard**: fetches all orders from Supabase into a searchable, filterable, status-editable table
- **Smooth scroll**: Lenis, wired into GSAP's ticker + ScrollTrigger
- **Toasts**: React Hot Toast for cart/checkout feedback
- **Fully responsive**: mobile, tablet, desktop

---

## 7. Build for Production

```bash
npm run build
npm run start
```
