import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useDialog, useModal } from "~/components/Commons";
import {
  useDeleteChatRequestsMemberMutate,
  useInsertChatRequestsMemberMutate
} from "~/states/server/chat";
import { useSelectProfileQuery } from "~/states/server/profile";
import { projectsKey, useDeleteFollowProjectStateMutate } from "~/states/server/project";
import type { LikeCardMemberProps } from "./LikeCardMember.types";

export const useLikeCardMember = ({ data, userId }: LikeCardMemberProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("like");

  const { confirm, toast } = useDialog();
  const { mount } = useModal();

  const { data: profile } = useSelectProfileQuery(userId);

  const { mutate: insertChatRequestMemberMutate } = useInsertChatRequestsMemberMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));
      toast({ type: "success", message: t("채팅을 성공적으로 요청했습니다!") });
    },
    onError: () => {
      toast({ type: "error", message: t("채팅 요청을 실패했습니다.") });
    }
  });

  const { mutate: deleteChatRequestMemberMutate } = useDeleteChatRequestsMemberMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));
    }
  });

  const { mutate: deleteFollowProjectMutate } = useDeleteFollowProjectStateMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));
      toast({ type: "success", message: t("찜 해제 완료") });
    }
  });

  const handleDeleteFollowProject = async () => {
    if (!(await confirm({ title: t("정말 찜 해제하시겠어요?") }))) return;
    deleteFollowProjectMutate(data.id);
  };

  const handleRequest = async () => {
    if (data.chatRequest[data.chatRequest.length - 1]?.state === "PENDING") {
      deleteChatRequestMemberMutate(data.chatRequest[data.chatRequest.length - 1]?.id);
    } else {
      if (!(await confirm({ title: t("채팅을 요청할까요?") }))) return;
      insertChatRequestMemberMutate({
        requesterId: userId,
        receiverId: data.project.ownerId,
        followProjectId: data.id
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

  return { mount, profile, queryClient, handleDeleteFollowProject, handleRequest, requestState };
};
