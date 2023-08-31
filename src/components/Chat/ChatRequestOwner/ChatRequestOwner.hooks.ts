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
