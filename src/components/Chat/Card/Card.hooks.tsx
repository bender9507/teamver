import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import type { ComponentProps } from "react";
import { PROJECT_DETAIL_MODAL, ProjectDetail, useDialog, useModal } from "~/components/Commons";
import { useSelectProfileQuery } from "~/states/server/profile";
import {
  projectsKey,
  useInsertMemberToProjectMutate,
  useUpdateProjectInviteStateMutate
} from "~/states/server/project";
import type { Card } from "./Card";

export const useCard = ({ invite }: ComponentProps<typeof Card>) => {
  const queryClient = useQueryClient();

  const { confirm, toast } = useDialog();
  const { mount } = useModal();

  const { t } = useTranslation("chat");

  const { data: profile } = useSelectProfileQuery(invite.receiverId);

  const { mutate: updateProjectStateMutate } = useUpdateProjectInviteStateMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectProjectInvites(invite.receiverId));
    },

    onError: () => toast({ type: "error", message: t("팀원 합류에 실패했습니다") })
  });

  const { mutate: insertMemberToProject } = useInsertMemberToProjectMutate();

  const handleStateChange = async (state: "GRANT" | "DENIED") => {
    const confirmMessages = {
      GRANT: t("팀원 요청을 수락할까요"),
      DENIED: t("팀원 요청을 거절할까요")
    } as const;

    if (!(await confirm({ title: confirmMessages[state] }))) return;

    updateProjectStateMutate({ id: invite.id, state });

    if (state === "GRANT") {
      insertMemberToProject({
        memberId: invite.receiverId,
        projectId: invite.projectId
      });
    }

    toast({ type: "success", message: t("프로젝트 팀원 합류에 성공했어요") });
  };

  const handleOpenProjectDetail = () => {
    mount(<ProjectDetail project={invite.project} profile={profile} />, {
      id: PROJECT_DETAIL_MODAL,
      type: "bottom"
    });
  };

  return { mount, handleStateChange, handleOpenProjectDetail };
};
