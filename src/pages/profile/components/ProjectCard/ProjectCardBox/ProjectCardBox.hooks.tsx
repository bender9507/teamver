import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";

export const useProjectCardBox = () => {
  const user = useUser() as User;
  const router = useRouter();

  const userId = router.query.userId as string;
  const isMine = userId === user.id;

  return { isMine };
};
