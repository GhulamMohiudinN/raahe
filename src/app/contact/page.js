"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { createContactMessage } from "@/lib/contactMessages";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const headingRef = useScrollReveal({ y: 30 });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    setSubmitting(true);
    try {
      await createContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      toast.success("Thank you — we'll be in touch shortly.");
      setForm(initialForm);
    } catch (error) {
      toast.error(
        error?.message ||
        "Could not send your message. Please check your Supabase setup and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
  ];

  return (
    <div className="bg-cream pb-24 pt-32 sm:pt-36">
      <div className="container-lux">
        <div ref={headingRef} className="max-w-2xl">
          <p className="eyebrow mb-4">Get in Touch</p>
          <h1 className="heading-serif text-5xl sm:text-6xl">
            We&apos;d Love to
            <br />
            <span className="italic text-gold-dark">Hear From You.</span>
          </h1>
          <p className="mt-6 font-body text-sm leading-relaxed text-ink/60 sm:text-base">
            Questions about a fragrance, an order, or a bespoke request —
            reach out and our team will respond within one business day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {fields.map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className={field.name === "phone" ? "sm:col-span-2" : ""}
                >
                  <label className="eyebrow mb-2 block text-[10px]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full border-b border-teal/20 bg-transparent py-3 font-body text-sm text-ink outline-none transition-colors focus:border-teal"
                    placeholder={field.label}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="mt-8"
            >
              <label className="eyebrow mb-2 block text-[10px]">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none border-b border-teal/20 bg-transparent py-3 font-body text-sm text-ink outline-none transition-colors focus:border-teal"
                placeholder="Tell us how we can help..."
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32, duration: 0.6 }}
              type="submit"
              disabled={submitting}
              className="btn-primary mt-10 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>

          <div className="lg:col-span-2">
            <div className="card-lux space-y-8 p-8">
              <ContactRow
                icon={HiOutlineMail}
                label="Email"
                value="raahefragrances@gmail.com"
              />
              <ContactRow
                icon={HiOutlinePhone}
                label="Phone"
                value="+92 336 888 3767"
              />
              <ContactRow
                icon={HiOutlineLocationMarker}
                label="Studio"
                value="Lahore, Pakistan"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-cream">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="eyebrow text-[10px]">{label}</p>
        <p className="mt-1 font-body text-sm text-ink/80">{value}</p>
      </div>
    </div>
  );
}