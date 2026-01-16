// store/useAuthStore.js
import { create } from "zustand";
import { loginApi } from "@/services/apiAuth";

const useAuthStore = create((set) => ({
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

  logout: () => {
    set({
      user: null,
      accessToken: null,
    });
  },
}));

export default useAuthStore;
