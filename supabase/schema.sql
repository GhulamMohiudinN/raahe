-- RAAHE FRAGRANCES — Supabase schema
-- Run this entire script in the Supabase SQL editor (Project -> SQL Editor -> New query)

-- 1. Create the orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  products jsonb not null,
  total_items integer not null default 0,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.orders enable row level security;

-- 3. Allow anyone (anon key) to INSERT a new order — needed for checkout
create policy "Public can insert orders"
on public.orders
for insert
to anon
with check (true);

-- 4. Allow anyone (anon key) to SELECT orders — needed for the frontend-only admin dashboard
--    Note: because the admin login in this project is a frontend-only demo check,
--    the read policy is intentionally permissive so the dashboard can fetch orders
--    with the public anon key. For a production app, replace this with real
--    Supabase Auth + a policy scoped to authenticated admins.
create policy "Public can read orders"
on public.orders
for select
to anon
using (true);

-- 5. Helpful index for sorting the dashboard by newest first
create index if not exists orders_created_at_idx on public.orders (created_at desc);
