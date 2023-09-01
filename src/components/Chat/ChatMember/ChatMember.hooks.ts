import type { ComponentProps } from "react";
import { useSelectChatRoomsQuery } from "~/states/server/chat";
import { useSelectProjectInvitesQuery } from "~/states/server/project";
import type { ChatMember } from "./ChatMember";

export const useChatMember = ({ user }: ComponentProps<typeof ChatMember>) => {
  const { data: invites } = useSelectProjectInvitesQuery(user.id);
  const { data: rooms } = useSelectChatRoomsQuery(user.id);

  console.log(rooms);

  return {
    invites,
    rooms
  };
};
