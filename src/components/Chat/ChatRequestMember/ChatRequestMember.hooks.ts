import {
  useInsertChatRoomWithMemberMutate,
  useSelectChatRequestMemberQuery,
  useUpdateChatRequestStateMemberMutate
} from "~/states/server/chat";

export const useChatRequestMember = (receiverId: string) => {
  const { data: chatRequests, refetch } = useSelectChatRequestMemberQuery({
    receiverId,
    state: "PENDING"
  });

  const { mutateAsync: UpdateChatRequestStateMemberMutateAsync } =
    useUpdateChatRequestStateMemberMutate();

  const { mutateAsync: InsertChatRoomWithMemberMutateAsync } = useInsertChatRoomWithMemberMutate();

  const requests =
    chatRequests?.map((requeste) => ({
      ...(requeste || ""),
      requesterId: requeste.requesterProfile?.id || "",
      name: requeste.requesterProfile?.name || "",
      imageUrl: requeste.requesterProfile?.imageUrl || ""
    })) ?? [];

  const handleDenyClick = async (id: number) => {
    UpdateChatRequestStateMemberMutateAsync({ id, state: "DENIED" });
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
      UpdateChatRequestStateMemberMutateAsync({ id, state: "GRANT" }),
      InsertChatRoomWithMemberMutateAsync({ requesterId, receiverId })
    ]);
    refetch();
  };

  return { requests, handleDenyClick, handleAcceptClick };
};
