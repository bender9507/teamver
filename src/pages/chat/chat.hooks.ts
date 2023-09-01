import router from "next/router";
import { routes } from "~/constants/routes";
import { useSelectChatRoomsQuery, useSelectUnreadMessageCountQuery } from "~/states/server/chat";
import { useSelectProjectInvitesQuery } from "~/states/server/project";

export const useSelectChatRooms = (userId: string, roomId: number) => {
  const { data } = useSelectChatRoomsQuery(userId);

  const { data: invites } = useSelectProjectInvitesQuery(userId);

  const { data: unreadMessageCounts } = useSelectUnreadMessageCountQuery({
    userId,
    roomId
  });

  const rooms = data?.map((room) => {
    return {
      roomId: room.id,
      memberName: room.members[0]?.name || "",
      memberImageUrl: room.members[0]?.imageUrl || "",
      lastMessage: room.messages[0]?.message || "",
      unreadMessagesCount: unreadMessageCounts
    };
  });

  const handleRequestClick = () => {
    router.push({
      pathname: routes.chatRequest
    });
  };

  return { rooms, invites, unreadMessageCounts, handleRequestClick };
};
