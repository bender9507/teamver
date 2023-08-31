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
    chatRequests?.map((request) => ({
      ...(request || ""),
      requesterId: request.requesterProfile?.id || "",
      name: request.requesterProfile?.name || "",
      imageUrl: request.requesterProfile?.imageUrl || "",
      requesterProfile: request.requesterProfile,
      filteredProfiles: {
        positions: request.requesterProfile.positions.map((p) => p.id),
        languages: request.requesterProfile.languages.map((l) => l.id),
        skills: request.requesterProfile.skills.map((s) => s.id),
        areas: request.requesterProfile.areas.map((a) => a.id)
      }
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
