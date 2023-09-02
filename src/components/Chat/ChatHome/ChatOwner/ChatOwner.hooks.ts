import type { ComponentProps } from "react";
import { useSelectChatRequestMemberQuery, useSelectChatRoomsQuery } from "~/states/server/chat";
import type { ChatOwner } from "./ChatOwner";

export const useChatOwner = ({ user }: ComponentProps<typeof ChatOwner>) => {
  const { data: rooms } = useSelectChatRoomsQuery(user.id);
  const { data: requests } = useSelectChatRequestMemberQuery({
    receiverId: user.id,
    state: "PENDING"
  });

  return {
    rooms,
    requests
  };
};
