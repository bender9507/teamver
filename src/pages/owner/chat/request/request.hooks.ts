import { useSelectChatRequestsQuery } from "~/states/server/chat";

export const useChatRequest = (receiverId: string) => {
  const { data: chatRequests } = useSelectChatRequestsQuery({
    receiverId,
    state: "PENDING"
  });

  const requesters = chatRequests?.map((requester) => ({
    ...requester,
    name: requester.requesterProfile?.name || "",
    imageUrl: requester.requesterProfile?.imageUrl || ""
  }));

  return { chatRequests, requesters };
};
