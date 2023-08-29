import { useSelectChatRequestsQuery } from "~/states/server/chat";

export const useChatRequest = (requesterId: string) => {
  const { data: chatRequests } = useSelectChatRequestsQuery({
    requesterId,
    state: "PENDING"
  });

  return { chatRequests };
};
