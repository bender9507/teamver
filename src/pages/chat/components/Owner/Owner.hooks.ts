import { useUser } from "@supabase/auth-helpers-react";
import type { User } from "@supabase/supabase-js";
import { useSelectChatRequestMemberQuery, useSelectChatRoomsQuery } from "~/states/server/chat";

export const useChatOwner = () => {
  const user = useUser() as User;
  const { data: rooms } = useSelectChatRoomsQuery(user.id);
  const { data: requests } = useSelectChatRequestMemberQuery({
    receiverId: user.id,
    state: "PENDING"
  });

  return {
    user,
    rooms,
    requests
  };
};
