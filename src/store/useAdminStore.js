"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const ADMIN_EMAIL = "admin@raahe.com";
const ADMIN_PASSWORD = "raahe123";

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
