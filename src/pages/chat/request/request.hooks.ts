import {
  useInsertChatRoomWithMemberMutate,
  useSelectChatRequestsQuery,
  useUpdateChatRequestStateMutate
} from "~/states/server/chat";

export const useChatRequest = (receiverId: string) => {
  const { data: chatRequests, refetch } = useSelectChatRequestsQuery({
    receiverId,
    state: "PENDING"
  });

  const { mutateAsync: updateChatRequestStateMutateAsync } = useUpdateChatRequestStateMutate();

  const { mutateAsync: InsertChatRoomWithMemberMutateAsync } = useInsertChatRoomWithMemberMutate();

  const requests =
    chatRequests?.map((requeste) => ({
      ...(requeste || ""),
      requesterId: requeste.requesterProfile?.id || "",
      name: requeste.requesterProfile?.name || "",
      imageUrl: requeste.requesterProfile?.imageUrl || ""
    })) ?? [];

  const handleDenyClick = async (id: number) => {
    updateChatRequestStateMutateAsync({ id, state: "DENIED" });
    refetch();
  };

  const handleAcceptClick = async ({
    id,
    requesterId,
    receiverId
  }: {
    id: number;
    requesterId: string;
    receiverId: string;
  }) => {
    await Promise.all([
      updateChatRequestStateMutateAsync({ id, state: "GRANT" }),
      InsertChatRoomWithMemberMutateAsync({ requesterId, receiverId })
    ]);
    refetch();
  };

  return { requests, handleDenyClick, handleAcceptClick };
};
