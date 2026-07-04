import { supabase } from "@/lib/supabaseClient";

/**
 * Creates a new contact message in Supabase.
 * @param {{ name: string, email: string, phone?: string, message: string }} data
 */
export async function createContactMessage(data) {
    const { data: inserted, error } = await supabase
        .from("contact_messages")
        .insert([
            {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                message: data.message,
            },
        ])
        .select()
        .single();

    if (error) throw error;
    return inserted;
}

/**
 * Fetches all contact messages, newest first. Used by the admin dashboard.
 */
export async function fetchContactMessages() {
    const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
}