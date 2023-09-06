import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useSelectChatMessagesQuery, useSelectOpponent } from "~/states/server/chat";
import { useSelectProfileQuery } from "~/states/server/profile";

export const useRoom = () => {
  const router = useRouter();
  const user = useUser() as User;

  const roomId = router.query.roomId as string;

  const { data: profile } = useSelectProfileQuery(user.id);
  const { data: opponent } = useSelectOpponent({ userId: user.id, roomId });
  const { data: messages } = useSelectChatMessagesQuery(Number(roomId));

  const values = {
    roomId,
    profile,
    opponent,
    messages
  };

  return {
    profile,
    values
  };
};
