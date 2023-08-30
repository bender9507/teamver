import type { User } from "@supabase/supabase-js";

export interface ProjectMembersProps {
  projectId: number;
  user: User;
}
