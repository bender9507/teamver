import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useDialog, useModal } from "~/components/Commons";
import {
  useDeleteChatRequestsOwnerMutate,
  useInsertChatRequestsOwnerMutate
} from "~/states/server/chat";
import { profileKeys, useDeleteFollowMutate } from "~/states/server/profile";
import type { LikeCardOwnerProps } from "./LikeCardOwner.types";

export const useLikeCardOwner = ({ data, userId }: LikeCardOwnerProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("like");

  const { confirm, toast } = useDialog();
  const { mount } = useModal();

  const filteredData = {
    positions: [],
    languages: [],
    skills: [],
    areas: []
  };

  const { mutate: insertChatRequestOwnerMutate } = useInsertChatRequestsOwnerMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(profileKeys.selectFollows(userId));
      toast({ type: "success", message: t("채팅을 성공적으로 요청했습니다") });
    },
    onError: () => {
      toast({ type: "error", message: t("채팅 요청을 실패했습니다") });
    }
  });

  const { mutate: deleteChatRequestOwnerMutate } = useDeleteChatRequestsOwnerMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(profileKeys.selectFollows(userId));
    }
  });

  const { mutate: deleteFollowMutate } = useDeleteFollowMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(profileKeys.selectFollows(userId));
      toast({ type: "success", message: t("찜 해제 완료") });
    }
  });

  const handleDeleteFollow = async () => {
    if (!(await confirm({ title: "정말 찜 해제하시겠어요" }))) return;
    deleteFollowMutate(data.id);
  };

  const handleRequest = async () => {
    if (data.chatRequest[data.chatRequest.length - 1]?.state === "PENDING") {
      deleteChatRequestOwnerMutate(data.chatRequest[data.chatRequest.length - 1]?.id);
    } else {
      if (!(await confirm({ title: t("채팅을 요청할까요") }))) return;
      insertChatRequestOwnerMutate({
        requesterId: userId,
        receiverId: data.follow.id,
        followId: data.id
      });
    }
  };

  const requestState = () => {
    switch (data.chatRequest[data.chatRequest.length - 1]?.state) {
      case "GRANT":
        return t("수락됨");

      case "PENDING":
        return t("요청 취소");

      default:
        return t("채팅 요청");
    }
  };

  return { mount, filteredData, handleDeleteFollow, handleRequest, requestState };
};
