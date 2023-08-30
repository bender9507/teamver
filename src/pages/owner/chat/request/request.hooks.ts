import { useSelectChatRequestsQuery, useUpdateChatRequestStateMutate } from "~/states/server/chat";

export const useChatRequest = (receiverId: string) => {
  const { data: chatRequests, refetch } = useSelectChatRequestsQuery({
    receiverId,
    state: "PENDING"
  });

  const { mutateAsync: updateChatRequestState } = useUpdateChatRequestStateMutate();

  const requesters =
    chatRequests?.map((requester) => ({
      ...(requester || ""),
      name: requester.requesterProfile?.name || "",
      imageUrl: requester.requesterProfile?.imageUrl || ""
    })) ?? [];

  const handleDenyClick = async (id: number) => {
    updateChatRequestState({ id, state: "DENIED" });
    refetch();
  };

  return { chatRequests, requesters, handleDenyClick };
};
