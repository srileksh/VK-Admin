import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginApi, logoutApi } from "@/services/apiAuth";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      loading: false,
      error: null,

      login: async (phone, password) => {
        try {
          set({ loading: true, error: null });

          const data = await loginApi(phone, password);

          set({
            user: data.data.user,
            accessToken: data.data.accessToken,
            loading: false,
          });

          return true;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Login failed",
            loading: false,
          });
          return false;
        }
      },

      logout: async () => {
        try {
          await logoutApi(); // 🔹 backend logout
        } catch (error) {
          console.error("Logout error", error);
        } finally {
          set({
            user: null,
            accessToken: null,
            error: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
