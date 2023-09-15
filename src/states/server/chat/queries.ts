import { useQuery } from "@tanstack/react-query";
import { useSuspendedQuery } from "~/hooks";
import {
  selectChatMessages,
  selectChatRequestMember,
  selectChatRequestOwner,
  selectChatRoom,
  selectChatRooms,
  selectOpponent,
  selectUnreadMessageCount
} from "./apis";
import { chatKeys } from "./keys";

export const useSelectChatRoomQuery = (params: Parameters<typeof selectChatRoom>[0]) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRoom(params),
    queryFn: () => selectChatRoom(params)
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
  return useQuery({
    queryKey: chatKeys.selectChatMessages(roomId),
    queryFn: () => selectChatMessages(roomId),
    initialData: []
  });
};

export const useSelectChatRoomsQuery = (userId: string) => {
  return useQuery({
    queryKey: chatKeys.selectChatRooms(userId),
    queryFn: () => selectChatRooms(userId),
    initialData: []
  });
};

export const useSelectOpponent = (params: Parameters<typeof selectOpponent>[0]) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectOpponent(params),
    queryFn: () => selectOpponent(params)
  });
};

export const useSelectUnreadMessageCountQuery = (userId: string) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectUnreadMessageCount(userId),
    queryFn: () => selectUnreadMessageCount(userId)
  });
};
