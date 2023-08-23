import { create } from "zustand";
import type { AuthStore } from "./types";

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: true,
  user: null,
  updateSession: (session) => set((prevSession) => ({ ...prevSession, ...session }))
}));
