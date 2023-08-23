import type { User } from "@supabase/supabase-js";

export interface AuthStore {
  isLoading: boolean;
  user: User | null;
  updateSession: (session: Partial<AuthStore>) => void;
}
