import { supabase } from "@/lib/supabaseClient";

/**
 * Creates a new order in Supabase.
 * @param {{
 *  customer_name: string,
 *  email: string,
 *  phone: string,
 *  address: string,
 *  products: Array<{id: string, name: string, price: number, quantity: number}>,
 *  total_items: number
 * }} order
 */
export async function createOrder(order) {
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: order.customer_name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        products: order.products,
        total_items: order.total_items,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Fetches all orders, newest first. Used by the admin dashboard.
 */
export async function fetchOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Updates the status of an order (e.g. pending -> fulfilled).
 */
export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
