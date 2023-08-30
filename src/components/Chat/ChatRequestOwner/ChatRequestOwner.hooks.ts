import {
  useInsertChatRoomWithMemberMutate,
  useSelectChatRequestOwnerQuery,
  useUpdateChatRequestStateOwnerMutate
} from "~/states/server/chat";

export const useChatRequestOwner = (receiverId: string) => {
  const { data: chatRequests, refetch } = useSelectChatRequestOwnerQuery({
    receiverId,
    state: "PENDING"
  });

  const { mutateAsync: UpdateChatRequestStateOwnerMutateAsync } =
    useUpdateChatRequestStateOwnerMutate();

  const { mutateAsync: InsertChatRoomWithMemberMutateAsync } = useInsertChatRoomWithMemberMutate();

  const requests =
    chatRequests?.map((requeste) => ({
      ...(requeste || ""),
      requesterId: requeste.requesterProfile?.id || "",
      name: requeste.requesterProfile?.name || "",
      imageUrl: requeste.requesterProfile?.imageUrl || ""
    })) ?? [];

  const handleDenyClick = async (id: number) => {
    UpdateChatRequestStateOwnerMutateAsync({ id, state: "DENIED" });
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
      UpdateChatRequestStateOwnerMutateAsync({ id, state: "GRANT" }),
      InsertChatRoomWithMemberMutateAsync({ requesterId, receiverId })
    ]);
    refetch();
  };

  return { requests, handleDenyClick, handleAcceptClick };
};
