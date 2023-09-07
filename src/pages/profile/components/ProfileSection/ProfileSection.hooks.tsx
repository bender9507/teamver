import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useSelectProfileQuery } from "~/states/server/profile";

export const useProfileSection = () => {
  const user = useUser() as User;
  const router = useRouter();

  const userId = router.query.userId as string;

  const { data: profile } = useSelectProfileQuery(userId);

  const isMine = userId === user.id;

  return { profile, isMine };
};
