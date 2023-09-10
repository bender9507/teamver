import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelectNoticeOwnerQuery } from "~/states/server/notice/queries";

export const useNoticeOwner = () => {
  const user = useUser() as User;

  const { data: noticeData } = useSelectNoticeOwnerQuery(user.id);

  return { noticeData };
};
