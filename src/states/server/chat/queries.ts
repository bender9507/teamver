import { useQuery } from "@tanstack/react-query";
import { useSuspendedQuery } from "~/hooks";
import {
  selectChatMessages,
  selectChatRequestMember,
  selectChatRequestOwner,
  selectChatRequestsMember,
  selectChatRequestsOwner,
  selectChatRooms,
  selectUnreadMessageCount
} from "./apis";
import { chatKeys } from "./keys";

export const useSelectChatRequestsOwnerQuery = (
  requests: Parameters<typeof selectChatRequestsOwner>[0]
) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequestsOwner(requests),
    queryFn: () => selectChatRequestsOwner(requests)
  });
};

export const useSelectChatRequestsMemberQuery = (
  requests: Parameters<typeof selectChatRequestsMember>[0]
) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequestsMember(requests),
    queryFn: () => selectChatRequestsMember(requests)
  });
};

export const useSelectChatRequestOwnerQuery = (
  requests: Parameters<typeof selectChatRequestOwner>[0]
) => {
  return useQuery({
    queryKey: chatKeys.selectChatRequestOwner(requests),
    queryFn: () => selectChatRequestOwner(requests),
    initialData: []
  });
};

export const useSelectChatRequestMemberQuery = (
  requests: Parameters<typeof selectChatRequestMember>[0]
) => {
  return useQuery({
    queryKey: chatKeys.selectChatRequestMember(requests),
    queryFn: () => selectChatRequestMember(requests),
    initialData: []
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

export const useSelectUnreadMessageCountQuery = (requests: { userId: string; roomId: number }) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectUnreadMessageCount(requests),
    queryFn: () => selectUnreadMessageCount(requests)
  });
};
