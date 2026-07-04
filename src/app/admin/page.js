"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiOutlineLockClosed, HiOutlineMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useAdminStore } from "@/store/useAdminStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAdminStore((state) => state.login);
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);

  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) router.replace("/admin/dashboard");
  }, [isAuthenticated, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const success = login(form.email, form.password);

    setTimeout(() => {
      setSubmitting(false);
      if (success) {
        toast.success("Welcome back, Admin");
        router.replace("/admin/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-dark px-6">
      <div className="w-full max-w-md border border-gold/25 bg-cream-light p-10 shadow-soft">
        <div className="mb-8 text-center">
          <span className="font-display text-3xl tracking-[0.15em] text-teal-dark">
            RAAHE
          </span>
          <p className="eyebrow mt-1">Admin Console</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="eyebrow mb-2 block text-[10px]">Email</label>
            <div className="flex items-center border border-teal/20 px-4">
              <HiOutlineMail className="h-4 w-4 text-teal/50" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full bg-transparent px-3 py-3 font-body text-sm outline-none"
                placeholder="Enter admin email's"
              />
            </div>
          </div>

          <div>
            <label className="eyebrow mb-2 block text-[10px]">Password</label>
            <div className="flex items-center border border-teal/20 px-4">
              <HiOutlineLockClosed className="h-4 w-4 text-teal/50" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                className="w-full bg-transparent px-3 py-3 font-body text-sm outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 flex items-center justify-center text-teal/50 hover:text-teal focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="h-4 w-4" />
                ) : (
                  <HiOutlineEye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:opacity-60"
          >
            {submitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center font-body text-[11px] text-ink/40">
          {/* Demo credentials — admin@raahe.com / raahe123 */}
        </p>
      </div>
    </div>
  );
}
