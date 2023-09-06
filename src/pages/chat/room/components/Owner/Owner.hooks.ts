import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useModal } from "~/components/Commons";
import { useSelectChatRoomQuery } from "~/states/server/chat";

export const useChatRoomOwner = () => {
  const user = useUser() as User;
  const router = useRouter();

  const roomId = router.query.roomId as string;

  const { mount } = useModal();

  const { data: chatRoom } = useSelectChatRoomQuery({ roomId, userId: user.id });

  return {
    user,
    chatRoom,
    opponent: chatRoom.members[0],
    mount
  };
};
