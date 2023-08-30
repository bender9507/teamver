import { useSuspendedQuery } from "~/hooks";
import {
  selectChatMessages,
  selectChatRequestMember,
  selectChatRequestOwner,
  selectChatRooms
} from "./apis";
import { chatKeys } from "./keys";

export const useSelectChatRequestOwnerQuery = (
  requests: Parameters<typeof selectChatRequestOwner>[0]
) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequestOwner(requests),
    queryFn: () => selectChatRequestOwner(requests)
  });
};

export const useSelectChatRequestMemberQuery = (
  requests: Parameters<typeof selectChatRequestMember>[0]
) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequestMember(requests),
    queryFn: () => selectChatRequestMember(requests)
  });
};

export const useSelectChatMessagesQuery = (roomId: number) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatMessages(roomId),
    queryFn: () => selectChatMessages(roomId)
  });
};

export const useSelectChatRoomsQuery = (userId: string) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRooms(userId),
    queryFn: () => selectChatRooms(userId)
  });
};
