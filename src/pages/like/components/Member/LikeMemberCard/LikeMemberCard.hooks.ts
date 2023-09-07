import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useMount } from "react-use";
import { useDialog, useModal } from "~/components/Commons";
import {
  useDeleteChatRequestsMemberMutate,
  useInsertChatRequestsMemberMutate
} from "~/states/server/chat";
import { supabase } from "~/states/server/config";
import { useSelectProfileQuery } from "~/states/server/profile";
import { projectsKey, useDeleteFollowProjectStateMutate } from "~/states/server/project";
import type { LikeMemberCard } from ".";

export const useLikeMemberCard = ({ data, userId }: Parameters<typeof LikeMemberCard>[0]) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("like");

  const { confirm, toast } = useDialog();
  const { mount } = useModal();

  const requestData = data.chatRequest[data.chatRequest.length - 1];

  const { data: profile } = useSelectProfileQuery(userId);

  const { mutate: insertChatRequestMemberMutate } = useInsertChatRequestsMemberMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));
      toast({ type: "success", message: t("채팅을 성공적으로 요청했습니다") });
    },

    onError: () => {
      toast({ type: "error", message: t("채팅 요청을 실패했습니다") });
    }
  });

  const { mutate: deleteChatRequestMemberMutate } = useDeleteChatRequestsMemberMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));
    },
    onError: () => {
      toast({ type: "error", message: t("채팅요청 취소에 실패했습니다") });
    }
  });

  const { mutate: deleteFollowProjectMutate } = useDeleteFollowProjectStateMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));
      toast({ type: "success", message: t("찜 해제 완료") });
    },
    onError: () => {
      toast({ type: "error", message: t("찜 해제에 실패했습니다") });
    }
  });

  useMount(() => {
    const requestSubscription = supabase
      .channel("chatRequestMember")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "chatRequestMember" },
        () => {
          queryClient.invalidateQueries(projectsKey.selectFollowProjects(userId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(requestSubscription);
    };
  });

  const handleDeleteFollowProject = async () => {
    if (!(await confirm({ title: t("정말 찜 해제하시겠어요") }))) return;
    deleteFollowProjectMutate(data.id);
  };

  const handleRequest = async () => {
    if (requestData?.state === "PENDING") {
      deleteChatRequestMemberMutate(requestData?.id);
    } else {
      if (!(await confirm({ title: t("채팅을 요청할까요") }))) return;
      insertChatRequestMemberMutate({
        requesterId: userId,
        receiverId: data.project.ownerId,
        followProjectId: data.id
      });
    }
  };

  const requestState = () => {
    switch (requestData?.state) {
      case "GRANT":
        return t("수락됨");

      case "PENDING":
        return t("요청 취소");

      default:
        return t("채팅 요청");
    }
  };

  return { profile, queryClient, mount, handleDeleteFollowProject, handleRequest, requestState };
};
