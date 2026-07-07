"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Swal from "sweetalert2";
import { HiX } from "react-icons/hi";
import { formatPrice } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { createOrder } from "@/lib/orders";

const initialForm = { fullName: "", email: "", phone: "", address: "" };

export default function CheckoutModal({ open, onClose }) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalItems = useCartStore((state) => state.totalItems());

  const shippingFee = 300;
  const orderTotal = totalPrice + shippingFee;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) newErrors.phone = "Enter a valid phone number";
    if (!form.address.trim()) newErrors.address = "Delivery address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createOrder({
        customer_name: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        products: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total_items: totalItems,
      });

      clearCart();
      setForm(initialForm);
      onClose();

      await Swal.fire({
        title: "Order Confirmed",
        text: "Thank you for choosing RAAHE FRAGRANCES. We'll be in touch to confirm delivery.",
        icon: "success",
        confirmButtonColor: "#014958",
        background: "#F7F2EA",
        color: "#0E1512",
      });
    } catch (error) {
      await Swal.fire({
        title: "Something Went Wrong",
        text:
          error?.message ||
          "We couldn't place your order. Please check your Supabase setup and try again.",
        icon: "error",
        confirmButtonColor: "#014958",
        background: "#F7F2EA",
        color: "#0E1512",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-teal-dark/60 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-gold/30 bg-cream-light p-8 shadow-soft sm:p-10"
          >
            <div className="mb-8 flex items-start justify-between">
              <div>
                <p className="eyebrow mb-2">Secure Checkout</p>
                <h2 className="heading-serif text-3xl">Complete Your Order</h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close checkout"
                className="text-teal/60 hover:text-teal"
              >
                <HiX className="h-6 w-6" />
              </button>
            </div>

            {/* Order review */}
            <div className="mb-8 border border-teal/10 bg-cream/60 p-5">
              <p className="eyebrow mb-4 text-[10px]">
                Order Summary &middot; {totalItems} item{totalItems !== 1 ? "s" : ""}
              </p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between font-body text-sm"
                  >
                    <span className="text-ink/70">
                      {item.name} <span className="text-ink/40">× {item.quantity}</span>
                    </span>
                    <span className="text-teal">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-teal/10 pt-4 font-body text-sm">
                <div className="flex items-center justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-ink/70">
                  <span>Shipping</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 font-semibold text-teal-dark">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Field
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </div>
              <div>
                <label className="eyebrow mb-2 block text-[10px]">
                  Complete Delivery Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  className="w-full resize-none border border-teal/20 bg-transparent px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-teal"
                  placeholder="House no, street, city, postal code"
                />
                {errors.address && (
                  <p className="mt-1 font-body text-xs text-red-500">
                    {errors.address}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="btn-primary w-full disabled:opacity-60"
              >
                {submitting ? "Placing Order..." : "Confirm Order"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, name, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="eyebrow mb-2 block text-[10px]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-teal/20 bg-transparent px-4 py-3 font-body text-sm text-ink outline-none transition-colors focus:border-teal"
        placeholder={label}
      />
      {error && <p className="mt-1 font-body text-xs text-red-500">{error}</p>}
    </div>
  );
}
