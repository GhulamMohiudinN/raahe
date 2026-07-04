"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const ADMIN_EMAIL = "raahefragrances@gmail.com";
const ADMIN_PASSWORD = "raahe@123";

export const useAdminStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: (email, password) => {
        const success =
          email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
        if (success) {
          set({ isAuthenticated: true });
        }
        return success;
      },

      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "raahe-admin-session",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
