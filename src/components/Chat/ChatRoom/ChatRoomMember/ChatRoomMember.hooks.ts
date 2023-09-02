import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useSelectChatRoomQuery } from "~/states/server/chat";
import type { ChatRoomMember } from "./ChatRoomMember";

export const useChatRoomMember = ({ user }: ComponentProps<typeof ChatRoomMember>) => {
  const router = useRouter();

  const roomId = router.query.roomId as string;

  const { data: chatRoom } = useSelectChatRoomQuery({ roomId, userId: user.id });

  return { chatRoom, opponent: chatRoom.members[0] };
};
