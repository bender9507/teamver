import { useQueryClient } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { useDialog } from "~/components/Commons";
import {
  projectsKey,
  useInsertMemberToProjectMutate,
  useUpdateProjectInviteStateMutate
} from "~/states/server/project";
import type { Card } from "./Card";

export const useCard = ({ invite }: ComponentProps<typeof Card>) => {
  const queryClient = useQueryClient();

  const { confirm } = useDialog();
  const { toast } = useDialog();

  const { mutate: updateProjectStateMutate } = useUpdateProjectInviteStateMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectProjectInvites(invite.receiverId));
    }
  });

  const { mutate: insertMemberToProject } = useInsertMemberToProjectMutate();

  const handleStateChange = async (state: "GRANT" | "DENIED") => {
    const confirmMessages = {
      GRANT: "팀원 요청을 수락할까요?",
      DENIED: "팀원 요청을 거절할까요?"
    } as const;

    if (!(await confirm({ title: confirmMessages[state] }))) return;

    updateProjectStateMutate({ id: invite.id, state });

    if (state === "GRANT") {
      insertMemberToProject({
        memberId: invite.receiverId,
        projectId: invite.projectId
      });
    }

    toast({ type: "success", message: "프로젝트 팀원 합류에 성공했어요!" });
  };

  return { handleStateChange };
};
