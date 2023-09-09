import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import { useSelectNoticeMemberQuery } from "~/states/server/notice/queries";

export const useNoticeMember = () => {
  const user = useUser() as User;

  const { data: noticeData } = useSelectNoticeMemberQuery(user.id);

  return { noticeData };
};
