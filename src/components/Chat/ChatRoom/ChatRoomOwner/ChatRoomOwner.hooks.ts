import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useSelectChatRoomQuery } from "~/states/server/chat";
import type { ChatRoomOwner } from "./ChatRoomOwner";

export const useChatRoomOwner = ({ user }: ComponentProps<typeof ChatRoomOwner>) => {
  const router = useRouter();

  const roomId = router.query.roomId as string;

  const { data: chatRoom } = useSelectChatRoomQuery({ roomId, userId: user.id });

  return { chatRoom, opponent: chatRoom.members[0] };
};
