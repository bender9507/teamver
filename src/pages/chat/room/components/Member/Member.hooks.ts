import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useSelectChatRoomQuery } from "~/states/server/chat";

export const useChatRoomMember = () => {
  const user = useUser() as User;
  const router = useRouter();

  const roomId = router.query.roomId as string;

  const { data: chatRoom } = useSelectChatRoomQuery({ roomId, userId: user.id });

  return { user, chatRoom, opponent: chatRoom.members[0] };
};
