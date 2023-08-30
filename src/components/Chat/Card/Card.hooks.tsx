import { useQueryClient } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { useDialog } from "~/components/Commons";
import { projectsKey, useUpdateProjectInviteStateMutate } from "~/states/server/project";
import type { Card } from "./Card";

export const useCard = ({ invite }: ComponentProps<typeof Card>) => {
  const queryClient = useQueryClient();

  const { confirm } = useDialog();

  const { mutate: updateProjectStateMutate } = useUpdateProjectInviteStateMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(projectsKey.selectProjectInvites(invite.receiverId));
    }
  });

  const handleStateChange = async (state: "GRANT" | "DENIED") => {
    const confirmMessages = {
      GRANT: "팀원 요청을 수락할까요?",
      DENIED: "팀원 요청을 거절할까요?"
    } as const;

    if (!(await confirm({ title: confirmMessages[state] }))) return;

    updateProjectStateMutate({ id: invite.id, state });
  };

  return { handleStateChange };
};
