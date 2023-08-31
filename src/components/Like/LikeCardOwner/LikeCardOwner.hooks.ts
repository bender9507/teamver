import { useQueryClient } from "@tanstack/react-query";
import { useDialog, useModal } from "~/components/Commons";
import { profileKeys, useDeleteFollowMutate } from "~/states/server/profile";

export const useLikeCardOwner = ({ followId, userId }: { followId: number; userId: string }) => {
  const queryClient = useQueryClient();

  const { mount } = useModal();
  const { confirm, toast } = useDialog();

  const { mutate: deleteFollowMutate } = useDeleteFollowMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(profileKeys.selectFollows(userId));
      toast({ type: "success", message: "찜 해제 완료!" });
    }
  });

  const handleDeleteFollow = async () => {
    if (!(await confirm({ title: "정말 찜 해제하시겠어요?" }))) return;
    deleteFollowMutate({ followId });
  };

  const filteredData = {
    positions: [],
    languages: [],
    skills: [],
    areas: []
  };

  return { mount, filteredData, handleDeleteFollow };
};
