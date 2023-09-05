import type { User } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { useSelectChatRequestOwnerQuery, useSelectChatRoomsQuery } from "~/states/server/chat";
import { useSelectProjectInvitesQuery } from "~/states/server/project";

export const useChatMember = () => {
  const user = useUser() as User;
  const { data: invites } = useSelectProjectInvitesQuery(user.id);
  const { data: rooms } = useSelectChatRoomsQuery(user.id);
  const { data: requests } = useSelectChatRequestOwnerQuery({
    receiverId: user.id,
    state: "PENDING"
  });

  return {
    user,
    invites,
    rooms,
    requests
  };
};
