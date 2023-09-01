import type { ComponentProps } from "react";
import { useSelectChatRequestMemberQuery } from "~/states/server/chat";
import type { ChatRequestOwner } from "./ChatRequestOwner";

export const useChatRequestOwner = ({ user }: ComponentProps<typeof ChatRequestOwner>) => {
  const { data: requests } = useSelectChatRequestMemberQuery({
    receiverId: user.id,
    state: "PENDING"
  });

  return {
    requests
  };
};
