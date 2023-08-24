import { useSuspendedQuery } from "~/hooks";
import { chatKeys, selectChatRequests } from ".";

export const useSelectChatRequestsQuery = (requests: Parameters<typeof selectChatRequests>[0]) => {
  return useSuspendedQuery({
    queryKey: chatKeys.selectChatRequests(requests),
    queryFn: () => selectChatRequests(requests)
  });
};
