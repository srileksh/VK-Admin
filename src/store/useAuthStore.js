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
            error: null,
          });

          return { success: true, message: data.message || "Login successful" };
        } catch (err) {
          const message =
            err.response?.data?.message || "Invalid credentials";

          set({
            error: message,
            loading: false,
          });

          return { success: false, message };
        }
      },

      logout: async () => {
        try {
          await logoutApi();
        } catch (error) {
          console.error("Logout error", error);
        } finally {
          set({
            user: null,
            accessToken: null,
            error: null,
            loading: false,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useAuthStore;