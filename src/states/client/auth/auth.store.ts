import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStore {
  isLoading: boolean;
  user: User | null;
  updateSession: (session: Partial<AuthStore>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoading: false,
  user: null,
  updateSession: (session) => set((prevSession) => ({ ...prevSession, ...session }))
}));
