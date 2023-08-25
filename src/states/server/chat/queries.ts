import { useSuspendedQuery } from "~/hooks";
import { selectChatMessages, selectChatRequests } from "./apis";
import { chatKeys } from "./keys";

export const useSelectChatRequestsQuery = (requests: Parameters<typeof selectChatRequests>[0]) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequests(requests),
    queryFn: () => selectChatRequests(requests)
  });
};

export const useSelectChatMessagesQuery = (roomId: number) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatMessages(roomId),
    queryFn: () => selectChatMessages(roomId)
  });
};
