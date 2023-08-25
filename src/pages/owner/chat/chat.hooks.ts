import { useSelectChatRoomsQuery } from "~/states/server/chat";

export const useSelectChatRooms = (userId: string) => {
  const data = useSelectChatRoomsQuery(userId);

  const rooms = data?.map((room) => ({
    id: room.id,
    memberName: room.members[0]?.name,
    memberImageUrl: room.members[0]?.imageUrl,
    firstMessage: room.messages[0]?.message,
    firstMessageSenderName: room.messages[0]?.sender.name,
    firstMessageCreatedAt: room.messages[0]?.createdAt
  }));

  return { ...data, rooms };
};
