
import { create } from "zustand";
import { getActivePromoApi, createPromoApi } from "@/services/promoApi";

const usePromoStore = create((set, get) => ({
  activePromo: null,
  loading: false,
  saving: false,
  error: null,

  fetchActivePromo: async () => {
    try {
      set({ loading: true, error: null });

      const data = await getActivePromoApi();

      set({
        activePromo: data?.data ?? data ?? null,
      });

      return data?.data ?? data ?? null;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to fetch active promo",
      });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  savePromo: async (payload) => {
    try {
      set({ saving: true, error: null });

      const data = await createPromoApi(payload);

      const savedPromo = data?.data ?? data ?? null;

      set({
        activePromo: savedPromo,
      });

      return { success: true, data: savedPromo };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to save promo";
      set({ error: message });
      return { success: false, error: message };
    } finally {
      set({ saving: false });
    }
  },

  clearPromo: () => {
    set({
      activePromo: null,
      error: null,
    });
  },
}));

export default usePromoStore;